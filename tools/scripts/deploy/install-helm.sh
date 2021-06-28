#!/bin/bash

set -euo pipefail

# Install dependencies for the deploy environment
# Assumes that the base container is debian/ubuntu linux
# (node, for example)

BIN_DIR=/usr/local/bin

HELM_VERSION=${HELM_VERSION:-3.5.2}
HELM=${HELM:-"https://get.helm.sh/helm-v${HELM_VERSION}-linux-amd64.tar.gz"}

if ! command -v helm &>/dev/null; then
  apt update && apt install -y -q wget tar
  echo "Installing Helm from ${HELM}..."
  wget -q -O /tmp/helm.tar.gz ${HELM}
  pushd /tmp > /dev/null
  tar xzf helm.tar.gz
  cp linux-amd64/helm ${BIN_DIR}/helm
  chmod +x ${BIN_DIR}/helm
  popd > /dev/null
  echo "Done."
fi