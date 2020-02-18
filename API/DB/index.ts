import mysql from 'mysql2'
const key = require('../db_key');

export interface KeyValue{
    key:string;
    value:number|string;
}
interface Params{
    [key: string]: number | string;
}
export default abstract class DB {
    
    protected tableName:string;
    pool: mysql.Pool = mysql.createPool({
        connectionLimit: 10,
        host: key.host,
        user: key.user,
        password: key.password,
        database: key.database
    });
    promisePool = this.pool.promise();

    abstract async scan<T>():Promise<T[]>;
    abstract async get<T>(id: number):Promise<T>;

    protected async _put(params: Params) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        const sql = `INSERT INTO ${this.tableName}(${keys.join(',')}) VALUES(${new Array(values.length).fill('?').join(',')})`;
        const [OkPacket] = await this.promisePool.execute(sql, values);
        this.end();
        return ((<mysql.OkPacket>OkPacket).insertId);
    }

    protected async _update(id: KeyValue, params: Params) {
        const entries = Object.entries(params);
        const sql = `UPDATE ${this.tableName} SET ${entries.reduce((acc, cur) => acc + cur[0] + '=?', '')} WHERE ${id.key}=?`;
        console.log(sql);
        const [OkPacket] = await this.promisePool.execute(sql, [...entries.map(entry => entry[1]), id.value]);
        this.end();
        console.log(sql, OkPacket);
        return ((<mysql.OkPacket>OkPacket).changedRows);
    }

    protected async _delete(params: KeyValue) {
        const sql = `DELETE FROM ${this.tableName} WHERE ${params.key}=?`;
        const [OkPacket] = await this.promisePool.execute(sql, [params.value]);
        this.end();
        return ((<mysql.OkPacket>OkPacket).affectedRows);
    }
    end() {
        this.pool.end(err => {
            if (err) console.log('DB pool 비정상종료', err);
            else console.log('DB pool 정상종료');
        });
    }
}