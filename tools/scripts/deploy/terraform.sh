#!/bin/bash
set -euo pipefail

THIS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null 2>&1 && pwd )"

source ${THIS_DIR}/log.sh

export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-eu-west-1}

function help {
  echo "Usage: terraform.sh [-i | -v | -p ] TERRAFORM_DIR TERRAFORM_BACKEND_CONFIG_FILE TERRAFORM_VARS_FILE"
  echo "     TERRAFORM_DIR: folder containing terraform code"
  echo "     TERRAFORM_BACKEND_CONFIG_FILE: backend config file path relative to TERRAFORM_DIR"
  echo "     TERRAFORM_VARS_FILE: variables file path relative to TERRAFORM_DIR"
  echo "              -i TERRAFORM_INIT_ARGS"
  echo "              -v TERRAFORM_VAR_ARGS"
  echo "              -p TERRAFORM_PLAN_FILE"
  echo "              -h help"
}

function install-deps {
    source ${THIS_DIR}/install-terraform.sh
    source ${THIS_DIR}/install-jq.sh
}

function getArgs {
    
    while getopts "v:p:h" flag
    do
        case "${flag}" in
            i) TERRAFORM_INIT_ARGS=${OPTARG};;
            v) TERRAFORM_VAR_ARGS=${OPTARG};;
            p) TERRAFORM_PLAN_FILE=${OPTARG};;
            h | \?) help
                exit 1
                ;;
        esac
    done

    # These vars need to be set in the environment
    # in order to run this:
    TERRAFORM_DIR=${@:$OPTIND:1}
    TERRAFORM_BACKEND_CONFIG_FILE=${@:$OPTIND+1:1}
    TERRAFORM_VARS_FILE=${@:$OPTIND+2:1}

    TERRAFORM_INIT_ARGS=${TERRAFORM_INIT_ARGS:-""}
    TERRAFORM_VAR_ARGS=${TERRAFORM_VAR_ARGS:-""}
    TERRAFORM_PLAN_FILE=${TERRAFORM_PLAN_FILE:-"plan.tfplan"}

    CI=${CI:-"false"}
    DEBUG=${DEBUG:-""}

    if [[ $DEBUG == "true" ]]; then
        log_debug "TERRAFORM_DIR '$TERRAFORM_DIR'" 
        log_debug "TERRAFORM_BACKEND_CONFIG_FILE '$TERRAFORM_BACKEND_CONFIG_FILE'" 
        log_debug "TERRAFORM_INIT_ARGS '$TERRAFORM_INIT_ARGS'" 
        log_debug "TERRAFORM_VARS_FILE '$TERRAFORM_VARS_FILE'" 
        log_debug "TERRAFORM_VAR_ARGS '$TERRAFORM_VAR_ARGS'" 
        log_debug "TERRAFORM_PLAN_FILE '$TERRAFORM_PLAN_FILE'" 
    fi
}

function validate_cli_tools {
    # Make sure that all the necessary command line tools are installed and in path:
    log_header "Validating that all deployment CLI tools are installed..."
    for each in terraform jq; do
        echo "Validating ${each}..." && echo $(which ${each}) && echo "${each} is installed" || (log_error "${each} is not installed" && exit 1)
    done
    log_success "Done."
}

function configure_git_for_tf_module_access {
    # Configure git to access Terraform modules from the central repo.
    # Configuration details depends on how this script is being run
    # (locally or in a GitLab CI context).
    # See the module "source" references in `terraform/*.tf`.
    #
    # To manage this configuration, we use the URL rewrite feature of Git 
    # for convenience.

    if [[ "${CI}" == "true" ]]; then
        log_header "Configuring git for Terraform module access..."
        echo "Re-mapping GitLab URLs..."
        echo "===== WARNING: This will modify ~/.gitconfig ====="
        # In GitLab, we can take advantage of the CI_JOB_TOKEN variable
        # that's available in the build context.
        # See https://docs.gitlab.com/ee/user/project/new_ci_build_permissions_model.html#job-token.
        git config --global url."https://gitlab-ci-token:${CI_JOB_TOKEN}@gitlab.abcam.com".insteadOf ssh://git@gitlab.abcam.com
        echo "Done."
    fi
}

function tf_init {
    # Relative to the current directory:
    local backend_config_file=${1}
    local init_args=${2:-""}

    terraform init \
        -input=false \
        ${init_args} \
        -backend=true \
        -backend-config=${backend_config_file}
}

function tf_plan {
    # Relative to the current directory:
    local tf_vars_file=${1}
    local tf_plan_file=${2}
    local tf_args=${@:3}

    log_success "Terraform plan"
    
    terraform plan \
        -input=false \
        ${tf_args} \
        -var-file ${tf_vars_file} \
        -out=${tf_plan_file}
}

function tf_apply {
    local tf_plan_file=${1}

    log_success "Terraform apply"

    terraform apply \
        -auto-approve \
        ${tf_plan_file}
}

function tf_output {
    log_success "Storing teraform output in: ${TERRAFORM_DIR}/terraform-output.json"
    terraform output -json > terraform-output.json
}

function tf_destroy {
    local tf_vars_file=${1}
    local tf_var_args=${2}
    local option=${3:-""}

    log_success "Terraform destroy"

    terraform destroy \
        -var-file=${tf_vars_file} \
        ${tf_var_args} \
        ${option}
}

function main {
    configure_git_for_tf_module_access

    pushd ${TERRAFORM_DIR} > /dev/null
    log_header "Provisioning resources in ${TERRAFORM_DIR}"
    tf_init "${TERRAFORM_BACKEND_CONFIG_FILE}" "${TERRAFORM_INIT_ARGS}"
    tf_plan "${TERRAFORM_VARS_FILE}" "${TERRAFORM_PLAN_FILE}" "${TERRAFORM_VAR_ARGS}"
    tf_apply "${TERRAFORM_PLAN_FILE}"
    tf_output
    popd > /dev/null
}

if [ "${0}" = "${BASH_SOURCE}" ]; then
    getArgs $@
    install-deps;
    validate_cli_tools;
    main;
fi