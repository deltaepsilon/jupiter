const { config } = require('@swc/core/spack');
const path = require('path');

module.exports = config({
  entry: {
    'service-worker': path.resolve(__dirname, './service-worker.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../web/public'),
  },
  module: {},
});
