require('dotenv').config({path:'../config/.env'});
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dbname = process.env.DB_NAME;
module.exports={
DB:`mongodb://${host}:${port}/${dbname}`
}