#!/bin/bash

set -euo pipefail

# Install dependencies for the build/deploy environment
# Assumes that the base container is debian/ubuntu linux
# (node, for example)

BIN_DIR=/usr/local/bin

if ! command -v unzip &>/dev/null || ! command -v wget &>/dev/null ; then
    apt update && apt install -y -q unzip wget
fi 

TF_VERSION=${TF_VERSION:-0.14.9}

# Links
TF=${TF:-"https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip"}

# terraform
if ! command -v terraform &>/dev/null; then
    echo "Installing Terraform from ${TF}..."
    pushd $BIN_DIR > /dev/null
    wget -q -O /tmp/terraform.zip ${TF}
    unzip -q /tmp/terraform.zip  # unzips to the current working directory
    rm /tmp/terraform.zip
    popd > /dev/null
    echo "Done."
fi
