#!/bin/bash

set -euo pipefail

# Install dependencies for the build/deploy environment
# Assumes that the base container is debian/ubuntu linux
# (node, for example)

BIN_DIR=/usr/local/bin

if ! command -v wget &>/dev/null; then
    apt update && apt install -y -q wget
fi

# Links
JQ=${JQ:-"https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64"}

# jq
if ! command -v jq &>/dev/null; then
    echo "Installing jq from ${JQ}..."
    wget -q -O $BIN_DIR/jq ${JQ}
    chmod +x $BIN_DIR/jq
    echo "Done."
fi