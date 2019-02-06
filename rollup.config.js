import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import autoExternal from 'rollup-plugin-auto-external';
import cleanup from 'rollup-plugin-cleanup';

const config = [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/web3-zsl.cjs.js',
        format: 'cjs'
      },
      {
        name: 'Web3',
        file: 'dist/web3-zsl.umd.js',
        format: 'umd',
        globals: {
          'web3': 'web3',
        }
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        runtimeHelpers: true,
        presets: [
          [
            '@babel/env',
            {
              modules: false,
              targets: {
                node: '6',
                browsers: 'last 2 versions'
              }
            }
          ]
        ],
        plugins: [
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-export-namespace-from',
          ["@babel/plugin-transform-runtime", {
            "helpers": true,
            "regenerator": true
          }]
        ]
      }),
      json(),
      autoExternal(),
      cleanup(),
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/web3-zsl.esm.js',
        format: 'es'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        plugins: [
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-export-namespace-from'
        ]
      }),
      json(),
      autoExternal(),
      cleanup(),
    ]
  }
];

export default config