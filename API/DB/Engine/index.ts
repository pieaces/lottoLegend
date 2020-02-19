import mysql from 'mysql2'
const key = require('../../db_key');

export default class Engine {
    static instance:Engine = null;
    static getInstance():Engine{
        if(Engine.instance === null) Engine.instance = new Engine();
        return Engine.instance;
    }
    private constructor(){}

    pool: mysql.Pool = mysql.createPool({
        connectionLimit: 10,
        host: key.host,
        user: key.user,
        password: key.password,
        database: key.database
    });
    promisePool = this.pool.promise();
}