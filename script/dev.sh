#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

npm link vue3

npm link magi-ui

npm run vue-cli-service serve

cd -