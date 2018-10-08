#!/bin/bash

set -e

copy_package_file() {
    cp src/$1/package.json dist/$1
}

rm -rf dist

yarn tsc -d
copy_package_file extenders
copy_package_file filters
copy_package_file writers
yarn tsc -m es2015 --importHelpers --outDir ./dist/_esm5
yarn tsc -m es2015 -t es2015 --importHelpers --outDir ./dist/_esm2015
yarn rollup -c
cp -r src dist/src
cp ./{package.json,LICENSE.md,README.md,tsconfig.json} dist/
