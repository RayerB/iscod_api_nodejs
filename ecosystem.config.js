module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      error_file: "/logs/err.log",
      max_memory_restart: "200M",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

// pour lancer 3 instances en parallèle la commande : 
// pm2 start ecosystem.config.js -i 3

// Si on dispose de plusieurs environnement préciser avec l'argument --env [environment]