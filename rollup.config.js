import babel from 'rollup-plugin-babel'

const pkg = require('./package.json')

export default {
  input: 'preserve-scroll-position.js',
  output: [
    {
      file: pkg['module'],
      format: 'es'
    },
    {
      file: pkg['main'],
      format: 'umd',
      name: 'PreserveScrollPosition'
    }
  ],
  plugins: [
    babel({
      comments: false,
      presets: ['@babel/preset-env']
    })
  ]
}
