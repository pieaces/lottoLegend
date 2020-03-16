import mysql from 'mysql2/promise'
const key = require('../../db_key');

export default class Engine {
    static instance:Engine = null;
    static getInstance():Engine{
        if(Engine.instance === null) Engine.instance = new Engine();
        return Engine.instance;
    }
    private constructor(){}

    connection = mysql.createConnection({
        host: key.host,
        user: key.user,
        password: key.password,
        database: key.database
    });

    end(){
        this.connection.then(conn => conn.end(()=>console.log('MariaDB END Connection')));
    }
}