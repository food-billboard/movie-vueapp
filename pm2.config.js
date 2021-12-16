module.exports = {
  apps : [
    {
      name: 'movie-vueapp',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: `start -c ${process.cwd()}/nuxt.config.js`,
      env: {
        NODE_ENV: "production"
      },
      exec_mode: "cluster_mode",
    }, 
  ],
};