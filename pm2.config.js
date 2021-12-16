module.exports = {
  apps : [
    {
      name: 'movie-vueapp',
      script: './node_modules/nuxt/bin/nuxt.js',
      env: {
        NODE_ENV: "production"
      },
      exec_mode: "cluster_mode",
    }, 
  ],
};