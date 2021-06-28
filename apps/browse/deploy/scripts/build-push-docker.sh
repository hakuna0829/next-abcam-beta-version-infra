#!/bin/bash

set -euo pipefail

ROOT_DIR="../../"
COMMON_SCRIPTS_DIR="${ROOT_DIR}tools/scripts/deploy"

IMAGE_TAG=${1}

DOCKERFILE="./Dockerfile"

if [[ "${CI}" == "true" ]]; then
  DOCKER_CONTEXT="${CI_PROJECT_DIR}"
else
  DOCKER_CONTEXT="${ROOT_DIR}"
fi

APP_NAME="yeti-browse"
DOCKER_IMAGE_REPOSITORY="770061602930.dkr.ecr.eu-west-1.amazonaws.com/${APP_NAME}"

${COMMON_SCRIPTS_DIR}/docker.sh "$DOCKER_CONTEXT" "$DOCKERFILE" "$IMAGE_TAG" "$DOCKER_IMAGE_REPOSITORY"