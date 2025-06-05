// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      '@stylistic/object-curly-spacing': ['warn', 'always'],
    },
  },
)
