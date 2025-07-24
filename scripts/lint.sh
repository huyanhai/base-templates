#!/bin/bash
# set -e
# set -x
trap 'echo "Error at line $LINENO"; exit 1' ERR

# 注意这里加了 || true
files=$(git diff --cached --name-only -- '*.js' '*.ts' '*.tsx' '*.vue')

if [ -z "$files" ]; then
  echo "No changed ts/tsx/vue files to check."
  exit 0
fi

echo "Running ESLint on the following files:"
echo "$files"

# 用 xargs -r 只有在有输入时才执行
echo "$files" | xargs -r npx eslint --fix

echo "All files passed ESLint."
exit 0

