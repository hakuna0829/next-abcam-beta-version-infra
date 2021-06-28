# AbcamWeb

This project was generated using [Nx](https://nx.dev).

## Nx monorepo

For more information on what is NX and how to Generate an application/library, Run development server, build, tests, etc check the [Nx specific docs](.docs/Nx-README.md)

## Gitlab CI integration with monorepos Nx

### Pipeline

Pipeline structure is shared by all the application in the monorepo and it is defined as following:

- init
- code-analysis
- test
- build
- package
- infrastructure:staging
- deploy:staging
- e2e-test:staging
- infrastructure:preprod
- deploy:preprod
- infrastructure:prod
- deploy:prod

The current flow is driven by a MergeRequest workflow that consists of:

1. For every commit against a Merge/Pull request the following jobs will run:
   ```
   init
   |__ code-analysis
      |__ test
          |__ build
   ```
2. For every commit against the default branch `master` the following jobs will:
   ```
   init
   |__ code-analysis
      |__ test
          |__ build
              |__ package
                  |__ infrastructure:staging
                      |__ deploy:staging
                          |__ e2e-test:staging
                              |__ infrastructure:preprod      [ 👆 manual trigger ]
                                  |__ deploy:preprod
                                      |__ infrastructure:prod [ 👆 manual trigger ]
                                          |__ deploy:prod
   ```

Each step is triggered automatically once the previous is successfully completed unless is flagged as 👆 manual.

### Pipeline jobs behaviour with Nx

In each Gitlab stage is defined a single job that execute Nx CLI commands on the affected apps in the monorepo.

`workspaces.json` define the Nx workspace that all the apps belong to. When changes to an app in the repository, or changes to a dependent app, are pushed to Gitlab Ci, each job will execute the relative action, such as _`build`_, **only for each affected app** that define that action into the `workspaces.json` manifest.

i.e.
There are two apps: fusillo and maccherone. And the `workspace.json` looks like this (excluding not relevant bits):

```json
// ....
 "projects": {
    "fusillo": {
      "root": "apps/fusillo",
      "sourceRoot": "apps/fusillo",
      "projectType": "application",
      "targets": {
        "build": {
          "executor": "@nrwl/next:build",
          //...
        },
        "deploy": {
          "executor": "@nrwl/workspace:run-commands",
          "options": {
            //...
          }
        }
      }
    },
    "maccherone": {
      "root": "apps/maccherone",
      "sourceRoot": "apps/maccherone",
      "projectType": "application",
      "targets": {
        "build": {
          "executor": "@nrwl/next:build",
          //...
        }
      }
    },
//....
```

When a commit that contains changes to both the application is pushed, the _build job_ will run the app specific build action for each app but the _deploy job_ will only run for `fusillo` since `maccherone` doesn't have the `deploy` target specified.

### Run affected apps scripts

Browse app defined the first structure for running custom scripts for the different actions like _package_, _deploy_, _infrastructure_. Even if that is not a strict convention, reusing common scripts and conventions can be handy when adding additional apps that behave in a similar manner.

Some of the most reusable script are available in the folder `tools/scripts/deploy`. Those are just an opinionated way to run official CLIs such as terraform or docker(installed at job exec time) and they are quite generic in use terms.
To follow the browse app conventions, each app will store any custom deploy scripts and resources in a `deploy` folder withing the app subfolder (i.e. `apps/browse/deploy/scripts/application-deploy.sh`)

i.e. **Package** step
Browse app needs to be packaged as a docker image in order to be released/deployed and run in a kubernetes cluster. In order to run the `package` command when browse app changes, `workspaces.json` needs to be updated by adding the following target:

```json
// ....
 "projects": {
    "fusillo": {
      "root": "apps/fusillo",
      "sourceRoot": "apps/fusillo",
      "projectType": "application",
      "targets": {
        "build": { /* ... */ },
        "package": {
          "executor": "@nrwl/workspace:run-commands",
          "options": {
            "commands": ["./deploy/scripts/build-push-docker.sh {args.tag}"],
            "cwd": "apps/browse",  // Folder from where the commands will be executed
            "parallel": false
          }
        },
        }
      }
    },
```

This will instruct Nx CLI to run the `./deploy/scripts/build-push-docker.sh {args.tag}` script from the **cwd** folder context. The script can use any environment variable defined in Gitlab Ci.

### Secrets

Secrets management can be achieved in multiple ways.

The recommended approach is to always store secrets in [Gitlab CI/CD variables](https://gitlab.abcam.com/abcamdigital/abcam-web/-/settings/ci_cd) as masked (and scoped per environement if needed).
Any variable defined in there, will be available as environment variable in each job execution context so can be retrieved by any of the custom scripts like: `apps/browse/deploy/scripts/application-deploy.sh`

If a secrets need to be passed using AWS SSM parameter store, for example when an application need to retrieve secrets at run time, a step in the pipeline will need to be setup. This step will be in charge to get secrets at Gitlab CI execution time and store them in the correct AWS account (abcam-ekscalibur-dev, abcam-ekscalibur-test, abcam-ekscalibur-staging, abcam-ekscalibur-preprod, abcam-ekscalibur-prod)

### Passing artifacts between stages

Differently from Github actions that runs all ci steps in the same VM, Gitlab ci jobs run in isolated containers. This means that if a _deploy_ job needs the outcome of an _infrastructure_ job to work, this will need to be exposed as artifact.

Currently _deploy_ jobs will include any folder/file in the artifact from the relative _infrastucture_ job. In order to be able to share artifact of apps within this monorepo, the `dist/` is currently expose so i.e. any output of the **browse** infrastructure script needs to be saved under `dist/infra/browse` so the **browse** deploy script can use it without colliding with output from other apps.
