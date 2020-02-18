import mysql from 'mysql2'
const key = require('../db_key');

interface KeyValue {
    key: string;
    value: number | string;
}
interface Params {
    [key: string]: number | string;
}

export enum OrderOption {
    DESC="DESC", ASC="ASC"
}
interface GetOption {
    projection?: string[];
    condition?: Params;
    order?: { [key: string]: OrderOption };
    limit?: number | [number, number];
}
export default abstract class DB {
    protected tableName: string;
    pool: mysql.Pool = mysql.createPool({
        connectionLimit: 10,
        host: key.host,
        user: key.user,
        password: key.password,
        database: key.database
    });
    promisePool = this.pool.promise();

    /**
     * mariaDB Query
     * @example _get({['id', 'title'], {id:2}, {created:'DESC', id:'ASC'}, 3|[1,4]})
     * @param projection - string[]
     * @param condition - { [key:string]: number|string }
     * @param order - { [key: string]: OrderOption }
     * @param limit - number | [number,number]
     * @returns rows
    */
    async _get(option: GetOption) {
        let sql: string;
        if (option.projection) {
            sql = `SELECT ${option.projection.map(item => 'A.' + item).join(',')} FROM ${this.tableName} AS A`;
        } else {
            sql = `SELECT * FROM ${this.tableName} AS A`
        }
        const values = [];
        if (option.condition) {
            const keys = Object.keys(option.condition);
            const _values = Object.values(option.condition);
            sql += ` WHERE ${keys.map(key => key + '=?').join(' and ')}`
            values.push(..._values);
        }
        if (option.order) {
            const entries = Object.entries(option.order);
            sql += ` ORDER BY ${entries.map(entry => `${entry[0]} ${entry[1]}`).join(',')}`;
        }
        if (option.limit) {
            if (typeof option.limit === 'number') {
                sql += ` LIMIT ${option.limit}`
            } else {
                sql += ` LIMIT ${option.limit[0], option.limit[1]}`
            }
        }
        const [rows] =
            await this.promisePool.execute(
                sql, values);
        this.end();
        return rows;
    }
    protected async _post(params: Params) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        const sql = `INSERT INTO ${this.tableName}(${keys.join(',')}) VALUES(${new Array(values.length).fill('?').join(',')})`;
        const [OkPacket] = await this.promisePool.execute(sql, values);
        this.end();
        return ((<mysql.OkPacket>OkPacket).insertId);
    }

    protected async _patch(id: KeyValue, params: Params) {
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