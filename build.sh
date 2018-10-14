#!/bin/bash

set -e

EXIT_CODE=0

copy_package_files() {
    for dir in "$@"
    do
        cp src/${dir}/package.json dist/${dir}
    done
}

tsc () {
    yarn tsc -p ./dist/tsconfig.json "$@"
}

rollup () {
   tsc --noEmitHelpers --outDir ./dist/_rollup
   yarn rollup -c
   rm -rf ./dist/_rollup
}

rm -rf dist
mkdir dist
cp ./{package.json,LICENSE.md,README.md,tsconfig.json} dist/
cp -r src dist/src

tsc -d --outDir ./dist/ &
tsc -m es2015 --outDir ./dist/_esm5 &
tsc -m es2015 -t es2015 --outDir ./dist/_esm2015 &
rollup &

for job in `jobs -p`
do
    wait ${job} || let "EXIT_CODE+=1"
done

if [ "$EXIT_CODE" != "0" ];
then
    exit ${EXIT_CODE}
fi

copy_package_files extenders filters writers
