module.exports = {
  apps: [
    {
      name: 'socket control core',
      script: 'build/core/index.js',
    },
    {
      name: 'socket send left panel',
      script: 'build/send/index.js',
      args: 'gpio-left build/gpio-left-bts/index.js'
    },
    {
      name: 'socket send right panel',
      script: 'build/send/index.js',
      args: 'gpio-right build/gpio-right-control/index.js'
    }
  ]
};
