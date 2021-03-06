import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

const production = process.env.NODE_ENV;

const plugins = [
  resolve({
    jsnext: true,
    browser: true,
    preferBuiltins: false
  }),
  commonjs({
    include: 'node_modules/**',
    sourceMap: false
  }),
  babel({
    runtimeHelpers: true,
    babelrc: false, // ignore babel config from package.json (used for node/gulp)
    exclude: 'node_modules/**', // only transpile our source code
    presets: [
      [
        'env',
        {
          targets: {
            browsers: 'last 2 versions'
          },
          modules: false,
          loose: true,
          runtimeHelpers: true
        }
      ]
    ],
    plugins: [
      [
        'transform-runtime',
        {
          polyfill: false,
          regenerator: true
        }
      ],
      'transform-class-properties',
      'transform-object-rest-spread',
      'external-helpers'
    ]
  })
];

if (production) {
  plugins.push(uglify());
}

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/main.bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins
};
