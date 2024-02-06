#! /bin/bash

# $#参数总个数

# echo "Generate package: $NAME,$WORK_NAME"
while [ $# -gt 0 ];
do 
  case $1 in
   -w) WORK_NAME=$2
       shift
       ;;
   -p) NAME=$2
       shift
       ;;
   esac
   shift
done

# project dirname
DIR_PATH=$(pwd)

re="[[:space:]]+"

if [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
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
  "name": "@${WORK_NAME}/$NAME",
  "main": "index.ts",
  "author": "",
  "license": "ISC",
  "scripts": {
    "serve": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "clean:dist": "rm -rf dist"
  }
}

EOF

echo "🎉 Generate Success"