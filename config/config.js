const env = process.env

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "root",
    password: env.DB_passowrd || "root",
    database: env.DB_NAME || "school",
  },
};

module.exports = config;
