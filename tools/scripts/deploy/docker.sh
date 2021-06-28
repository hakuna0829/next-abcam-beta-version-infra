#!/bin/bash

set -eo pipefail

THIS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null 2>&1 && pwd )"

source ${THIS_DIR}/log.sh

function help {
  echo "Usage: docker.sh [ -v ] DOCKER_CONTEXT DOCKERFILE IMAGE_TAG DOCKER_IMAGE_REPOSITORY"
  echo "              -v VERBOSITY"
}

function getArgs {
    VERBOSITY="info"

    while getopts "v:h" flag
    do
        case "${flag}" in
            v) VERBOSITY=${OPTARG};;
            h | \?) help
                exit 1
                ;;
        esac
    done

    DOCKER_CONTEXT=${@:$OPTIND:1}
    DOCKERFILE=${@:$OPTIND+1:1}
    IMAGE_TAG=${@:$OPTIND+2:1}
    DOCKER_IMAGE_REPOSITORY=${@:$OPTIND+3:1}

    if [[ $DEBUG == 'true' ]]; then
      echo "===================================="
      echo "DOCKER_CONTEXT '${DOCKER_CONTEXT}'"
      echo "DOCKERFILE '${DOCKERFILE}'"
      echo "IMAGE_TAG '${IMAGE_TAG}'"
      echo "DOCKER_IMAGE_REPOSITORY '${DOCKER_IMAGE_REPOSITORY}'"
      echo "-v '${VERBOSITY}'"
    fi

    if [[ -z $DOCKER_CONTEXT ]] || [[ -z $DOCKERFILE ]] || [[ -z $IMAGE_TAG ]] || [[ -z $DOCKER_IMAGE_REPOSITORY ]]; then
      echo "Missing mandatory param or params";
      help;
      exit 1;
    fi
}

function main {

    if [[ "${CI}" == "true" ]]; then
      set -euo pipefail
      
      # This is meant to run on a docker image with support for Kaniko and nodejs such as overbit/kaniko-node:latest

      DOCKER_IMAGE_REPOSITORY=${DOCKER_IMAGE_REPOSITORY}
      DOCKER_CONTEXT=${DOCKER_CONTEXT}
      DOCKERFILE=${DOCKERFILE}
      IMAGE_TAG=${IMAGE_TAG}
      VERBOSITY=${VERBOSITY}

      log_debug "DOCKER_IMAGE_REPOSITORY=${DOCKER_IMAGE_REPOSITORY}"
      log_debug "DOCKER_CONTEXT=${DOCKER_CONTEXT}"
      log_debug "DOCKERFILE=${DOCKERFILE}"
      log_debug "IMAGE_TAG=${IMAGE_TAG}"

      export AWS_ROLE_ARN=${DEPLOYER_ROLE_ARN}
      export AWS_SDK_LOAD_CONFIG="true"
      # Only required if we're running in CI since we use Kaniko.
      # By default, the workdir of the image (overbit/kaniko-node:latest) is /workdir so we will need to move in the parent layer to store the config 
      printf '{"credsStore":"ecr-login"}' > /kaniko/.docker/config.json

      log_header "Build docker image and push to AWS ECR. Powered by Kaniko https://github.com/GoogleContainerTools/kaniko"
      /kaniko/executor  --verbosity=${VERBOSITY} \
                        --context "${DOCKER_CONTEXT}" \
                        --dockerfile "${DOCKERFILE}" \
                        --build-arg COMMITSHA=${CI_COMMIT_SHA} \
                        --build-arg BUILDDATE="$(date)" \
                        --build-arg BUILDID=${CI_JOB_ID} \
                        --destination $DOCKER_IMAGE_REPOSITORY:$IMAGE_TAG
    else
      docker build -f ${DOCKERFILE} -t $DOCKER_IMAGE_REPOSITORY:$IMAGE_TAG ${DOCKER_CONTEXT}
    fi
}

if [ "${0}" = "${BASH_SOURCE}" ]; then
    getArgs $@
    main
fi
