import knex from "knex";
const knexConfig = knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST || "127.0.0.1",
    port: process.env.DATABASE_URL || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "test",
    database: process.env.PGDATABASE || "smart-brain",
  },
});
export default knexConfig;
