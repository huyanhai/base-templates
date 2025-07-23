#! /bin/bash

WORKSPACE_NAME=$1
COMMAND_NAME=$2

if [ "$WORKSPACE_NAME" == "" ] || [ "$COMMAND_NAME" == "" ]; then
    echo "Usage:pnpm run pkg <workspace_name> <command_name>"
fi;

pnpm run -C packages/$WORKSPACE_NAME $COMMAND_NAME
