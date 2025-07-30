import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      indent: ['off', 4],
      semi: ['off', 'always'],
      'unused-imports/no-unused-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-empty-function': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',

      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      'no-duplicate-imports': 'warn',
      '@typescript-eslint/no-duplicate-imports': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-useless-empty-export': 'warn',

      'prefer-const': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-dynamic-delete': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/prefer-enum-initializers': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',
      '@typescript-eslint/unified-signatures': 'warn',
      'no-implied-eval': 'warn',
      '@typescript-eslint/no-implied-eval': 'warn',
      '@typescript-eslint/no-use-before-define': 'warn',

      'arrow-body-style': ['off', 'always'],
      'block-scoped-var': 'warn',
      'default-case-last': 'warn',
      'default-param-last': 'warn',

      'max-classes-per-file': ['warn', 1],
      'max-params': ['warn', 5],
      'no-else-return': 'warn',
      'no-empty': 'warn',
      'no-extra-semi': 'warn',
      'no-floating-decimal': 'warn',
      'no-nested-ternary': 'off',
      'no-new': 'warn',
      'no-new-object': 'warn',
      'no-param-reassign': 'warn',
      'no-useless-concat': 'warn',
      'no-useless-return': 'warn',
      'prefer-template': 'warn',
      yoda: 'warn',
      'no-unsafe-optional-chaining': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',

      // 'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
      // 'tailwindcss/no-custom-classname': 'warn',
      // 'tailwindcss/classnames-order': 'warn',
    },
  },
]

export default eslintConfig
