#!/bin/bash

REALEASE_BUILD_PATH=./build/release
PACKAGE_JSON="package.json"
CURRENT_NAME=$(jq -r '.name' "$PACKAGE_JSON")
cd $REALEASE_BUILD_PATH || exit

jq --arg v "@local/$CURRENT_NAME" '.name = $v' $PACKAGE_JSON > temp.json

mv temp.json $PACKAGE_JSON

npm publish ---registry http://localhost:4873
