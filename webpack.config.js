module.exports = {
    devServer: {
      proxy: {
        '/backend/search/': {
          target: 'http://blibli.com',
          secure: false,
          changeOrigin: true
        },
      },
    },
  };