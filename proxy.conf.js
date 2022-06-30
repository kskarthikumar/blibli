const PROXY_CONFIG = {
    "/backend/search/*": {
      "target": "https://blibli.com",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true
    }
  }
  
  module.exports = PROXY_CONFIG;