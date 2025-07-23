/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const targetDir = path.resolve(__dirname, '..', 'build');
const sourceDirPath = path.resolve(__dirname, '..', 'apps');

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function readDirs(ditPath) {
  const dirs = fs.readdirSync(ditPath);
  return (
    dirs?.map((item) => {
      return {
        path: path.resolve(ditPath, item, 'dist'),
        name: item
      };
    }) || []
  );
}

async function moveDirs(targetDir) {
  const dirs = readDirs(sourceDirPath);

  try {
    await fsExtra.emptyDir(targetDir);
    // 确保目标目录存在
    createDir(targetDir);
    dirs.forEach((item) => {
      fs.accessSync(item.path);
      let targetDirPath = path.resolve(targetDir, item.name);
      if (item.name !== 'main') {
        targetDirPath = path.resolve(targetDir, 'subapp', item.name);
        createDir(path.resolve(targetDirPath, '..'));
      }
      fs.renameSync(item.path, targetDirPath);
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

moveDirs(targetDir);
