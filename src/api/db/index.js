import knex from "knex";

import config from "../../../knexfile";

const env = process.env.NODE_ENV ?? "development";

export function connect() {
  return knex(config[env]);
}
