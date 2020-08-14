#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:tomgalpin/covid-19-in-the-us-dashboard.git master:gh-pages

cd -