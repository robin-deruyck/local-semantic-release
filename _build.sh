#!/bin/bash

RELEASE_BUILD_PATH=./build/release
LICENCE_PATH="$RELEASE_BUILD_PATH/LICENSE"

jq '{name,version,description,type,repository,keywords,author,license,bugs,homepage,dependencies,bin}' package.json > "$RELEASE_BUILD_PATH/package.json"
cp CHANGELOG.md README.md $RELEASE_BUILD_PATH
cat LICENSE $LICENCE_PATH > license.tmp
mv license.tmp $LICENCE_PATH
cp -r ./bin $RELEASE_BUILD_PATH
