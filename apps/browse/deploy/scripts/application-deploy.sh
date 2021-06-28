#!/bin/bash

set -euo pipefail

STAGE=${1}
ROOT_DIR="../../"
COMMON_SCRIPTS_DIR="${ROOT_DIR}tools/scripts/deploy"

HELM_CHART_DIR=deploy/helm/app 
HELM_RELEASE_NAME=yeti-browse 
HELM_VALUES_FILE=${STAGE}-values.yaml
HELM_SET_ARGS=${HELM_SET_ARGS:-""}
CONTAINER_TAG=${DEPLOYMENT_TAG:-"latest"}

EKS_CLUSTER_NAME=${STAGE}-ekscalibur-cluster

${COMMON_SCRIPTS_DIR}/install-jq.sh

# SECURITY_GROUP=$(cat "${ROOT_DIR}/dist/infra/browse/terraform-output.json" | jq -r .BROWSE_APP_SECURITY_GROUP.value) 

# Exporting args to be used by the Helm.sh script
# export HELM_SET_ARGS="$HELM_SET_ARGS --set ingress_security_group=${SECURITY_GROUP}"
export HELM_SET_ARGS="$HELM_SET_ARGS --set image.tag=${CONTAINER_TAG}"

# override secrets configured in GITLAB CI variables
AEM_GRAPHQL_AUTHORIZATION=${AEM_GRAPHQL_AUTHORIZATION} # If the AEM_GRAPHQL_AUTHORIZATION env variable is not available, the script will stop

export HELM_SET_ARGS="$HELM_SET_ARGS --set extra_envvars.GRAPHQL_AUTHORIZATION=${AEM_GRAPHQL_AUTHORIZATION}"

${COMMON_SCRIPTS_DIR}/helm.sh $EKS_CLUSTER_NAME $HELM_CHART_DIR $HELM_RELEASE_NAME $HELM_VALUES_FILE