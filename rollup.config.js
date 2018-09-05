import babel from 'rollup-plugin-babel'

const pkg = require('./package.json')

export default {
  input: 'scroll-anchoring.js',
  output: [
    {
      file: pkg['module'],
      format: 'es'
    },
    {
      file: pkg['main'],
      format: 'umd',
      name: 'ScrollAnchoring'
    }
  ],
  plugins: [
    babel({
      comments: false,
      presets: ['@babel/preset-env']
    })
  ]
}
