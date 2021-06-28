#!/bin/bash

set -euo pipefail

STAGE=${1}
ROOT_DIR="../../"
COMMON_SCRIPTS_DIR="${ROOT_DIR}tools/scripts/deploy"

SRC_DIR="deploy/infra"
OUTPUT_PATH="${ROOT_DIR}/dist/infra/browse"

$COMMON_SCRIPTS_DIR/terraform.sh ${SRC_DIR} settings/${STAGE}-backend.config settings/${STAGE}.tfvars

mkdir -p ${OUTPUT_PATH}
cp "${SRC_DIR}/terraform-output.json" "${OUTPUT_PATH}/terraform-output.json"