#!/bin/bash

set -euo pipefail

# Install dependencies for the build/deploy environment
# Assumes that the base container is debian/ubuntu linux
# (node, for example)

BIN_DIR=/usr/local/bin

if ! command -v unzip &>/dev/null || ! command -v wget &>/dev/null ; then
    apt update && apt install -y -q unzip wget tar gzip
fi 

# awscli
if ! command -v aws &>/dev/null; then
    echo "awscli could not be found. Installing .."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip";
    unzip -q awscliv2.zip;
    ./aws/install;
    echo "Done."
fi