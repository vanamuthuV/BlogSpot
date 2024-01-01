import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

/*
  To create a id uniquely just create a extension : create EXTENSION if not exists "uuid-ossp"; 
*/

const { Pool } = pg

const newpool = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
};

const poolconfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : newpool;

const pool = new Pool(poolconfig);

export default pool;