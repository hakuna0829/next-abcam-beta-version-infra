#!/bin/bash

set -euo pipefail

ROOT_DIR="../../"
COMMON_SCRIPTS_DIR="${ROOT_DIR}tools/scripts/deploy"

$COMMON_SCRIPTS_DIR/terraform.sh deploy/ecr/ settings/ops-backend.config settings/ops.tfvars
