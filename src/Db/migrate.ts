/** @format */

import path from "node:path";
import { JSONStorage, Umzug } from "umzug";
import { query } from "./db";

const migrator = new Umzug({
  migrations: { glob: path.join(__dirname, "..", "migrations", "*.ts") },
  context: { query },
  storage: new JSONStorage({
    path: path.join(__dirname, "..", "migrations", "migrations.json"),
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

(async () => {
  await migrator.up();
})();

async () => {
  await migrator.down();
};
