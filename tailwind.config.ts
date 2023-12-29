import type { Config } from 'tailwindcss'
import daisyUI from 'daisyui'

const config: Config = {
  content: ['./src/**/*.tsx'],
  plugins: [daisyUI],
}

export default config
