import antfu from '@antfu/eslint-config'

export default antfu(
  {
    files: ['**/*.ts'],
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
