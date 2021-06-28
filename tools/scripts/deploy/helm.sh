#!/bin/bash

set -euo pipefail
THIS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null 2>&1 && pwd )"

source ${THIS_DIR}/log.sh

function help {
  log_warning "Usage: helm.sh [ -v ] EKS_CLUSTER_NAME HELM_CHART_DIR HELM_RELEASE_NAME HELM_VALUES_FILE HELM_ARGS"
  log_warning "              EKS_CLUSTER_NAME: name of the EKS cluster"
  log_warning "              HELM_CHART_DIR: directory where Helm chart is stored"
  log_warning "              HELM_RELEASE_NAME: name of the helm release"
  log_warning "              HELM_VALUES_FILE: helm variable file path relative to HELM_CHART_DIR"
  log_warning "              HELM_ARGS: helm additional args. i.e. '--set var1=value1 --set var2=val2'"
}

function getArgs {

    EKS_CLUSTER_NAME=${1}
    HELM_CHART_DIR=${2}
    HELM_RELEASE_NAME=${3}
    HELM_VALUES_FILE=${4}
    HELM_SET_ARGS=${HELM_SET_ARGS:-""}
    
    if [[ $# < 4 ]]; then
      log_error "Missing mandatory params: '$0 $@'";
      help;
      exit 1;
    fi
}

function install-deps {
  source ${THIS_DIR}/install-helm.sh
  source ${THIS_DIR}/install-awscli.sh
}

function auth-k8s {
  if [[ "${CI}" == "true" ]]; then
    
    ROLE_ARN=${DEPLOYER_ROLE_ARN}
    role_arn_args="--role-arn ${ROLE_ARN}"
    
    aws eks \
        --region eu-west-1 \
        update-kubeconfig \
        --name ${EKS_CLUSTER_NAME} \
        ${role_arn_args}
  fi
}

function deploy {

  APP_NAMESPACE="yeti";

  log_header "Deploying Helm chart ${HELM_RELEASE_NAME}"
  
  log_debug "helm upgrade --install --wait --create-namespace --namespace ${APP_NAMESPACE} ${HELM_RELEASE_NAME} ${HELM_CHART_DIR} --values ${HELM_CHART_DIR}/${HELM_VALUES_FILE} ${HELM_SET_ARGS}"

  helm upgrade  --install \
                --wait \
                --create-namespace \
                --namespace ${APP_NAMESPACE} \
                ${HELM_RELEASE_NAME} \
                ${HELM_CHART_DIR} \
                --values ${HELM_CHART_DIR}/${HELM_VALUES_FILE} \
                ${HELM_SET_ARGS}

  helm -n ${APP_NAMESPACE} list --all \
                                --output json
}

function main {
    install-deps
    auth-k8s
    deploy
}

if [ "${0}" = "${BASH_SOURCE}" ]; then
    getArgs $@
    main;
fi