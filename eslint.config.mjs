import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptLint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// 解析自动导入配置
import fs from 'node:fs';
let autoImportGlobals = {};
try {
  autoImportGlobals =
    JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf-8'))
      .globals || {};
} catch (error) {
  // 文件不存在或解析错误时使用空对象
  console.warn('Could not load auto-import globals', error);
}

// Element Plus组件
const elementPlusComponents = {
  // Element Plus 组件添加为全局变量，避免 no-undef 报错
  ElInput: 'readonly',
  ElSelect: 'readonly',
  ElSwitch: 'readonly',
  ElCascader: 'readonly',
  ElInputNumber: 'readonly',
  ElTimePicker: 'readonly',
  ElTimeSelect: 'readonly',
  ElDatePicker: 'readonly',
  ElTreeSelect: 'readonly',
  ElText: 'readonly',
  ElRadioGroup: 'readonly',
  ElCheckboxGroup: 'readonly',
  ElOption: 'readonly',
  ElRadio: 'readonly',
  ElCheckbox: 'readonly',
  ElInputTag: 'readonly',
  ElForm: 'readonly',
  ElFormItem: 'readonly',
  ElTable: 'readonly',
  ElTableColumn: 'readonly',
  ElButton: 'readonly',
  ElDialog: 'readonly',
  ElPagination: 'readonly',
  ElMessage: 'readonly',
  ElMessageBox: 'readonly',
  ElNotification: 'readonly',
  ElTree: 'readonly'
};

export default [
  pluginJs.configs.recommended,
  ...typescriptLint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts'],
    rules: {
      'no-undef': 'error',
      complexity: ['error', 10], // 圈复杂度
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器环境全局变量
        ...globals.node, // Node.js 环境全局变量
        ...globals.es2022, // ES2022 全局对象
        ...autoImportGlobals, // 自动导入的 API 函数
        ...elementPlusComponents, // Element Plus 组件
        // 全局类型定义，解决 TypeScript 中定义但 ESLint 不识别的问题
        PageQuery: 'readonly',
        PageResult: 'readonly',
        OptionType: 'readonly',
        ApiResponse: 'readonly',
        ExcelResult: 'readonly',
        TagView: 'readonly',
        AppSettings: 'readonly',
        __APP_INFO__: 'readonly'
      }
    }
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'commitlint.config.js',
      'eslint.config.mjs',
      '/**/**/auto-imports.d.ts',
      '/**/**/components.d.ts'
    ]
  }
];
