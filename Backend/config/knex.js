import knex from "knex";

const connectionConfig = process.env.POSTGRES_URL
  ? { connectionString: process.env.POSTGRES_URL }
  : {
      host: process.env.PGHOST || "127.0.0.1",
      port: process.env.DB_PORT || 5432,
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "test",
      database: process.env.PGDATABASE || "smart-brain",
    };

const knexConfig = knex({
  client: "pg",
  connection: Object.assign({}, connectionConfig),
});
export default knexConfig;
