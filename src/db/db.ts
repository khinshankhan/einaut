import { Database } from "sqlite3";

const db = new Database("data/database.db");

export const closeDatabase = async () => {
    db.close();
};
