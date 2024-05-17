// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin-ts'

export default withNuxt({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    'comma-dangle': 'off',
    'no-unused-vars': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error'
  }
})