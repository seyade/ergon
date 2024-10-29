module.exports = {
  apps: [
    {
      name: "ergon",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
