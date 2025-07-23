#! /bin/bash

# package name
NAME=$1

# project dirname
DIR_PATH=$(pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm run gen \${name} with no space"
  exit 1
fi

# package dirname
DIR_NAME="$DIR_PATH/packages/$NAME"

if [ -d "$DIR_NAME" ]; then
  echo "$NAME already exists, please change it"
  exit 1
fi

# name to upper
# NORMALIZED_NAME=""
# for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
#   C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
#   NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
# done
# NAME=$NORMALIZED_NAME

# created folder
mkdir -p "$DIR_NAME"

# writed index.ts
cat > $DIR_NAME/index.ts <<EOF
export default () => {
  console.log('$NAME');
};
EOF

# writed package.json
cat > $DIR_NAME/package.json <<EOF
{
  "name": "@base/$NAME",
  "main": "index.ts",
  "author": "",
  "license": "ISC",
  "scripts": {
    "test": "echo 'success'",
    "clean:dist": "rm -rf dist"
  }
}

EOF

echo "🎉 Generate Success"