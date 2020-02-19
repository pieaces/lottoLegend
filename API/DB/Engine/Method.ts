import Engine from '.';
import {OkPacket} from 'mysql2'

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
export default class Method {
    engine:Engine = Engine.getInstance();
    protected tableName: string;
    /**
     * mariaDB Query
     * @example _get({['id', 'title'], {id:2}, {created:'DESC', id:'ASC'}, 3|[1,4]})
     * @param projection - string[]
     * @param condition - { [key:string]: number|string }
     * @param order - { [key: string]: OrderOption }
     * @param limit - number | [number,number]
     * @returns rows
    */
    protected async _get(option: GetOption) {
        let sql: string;
        if (option.projection) {
            sql = `SELECT ${option.projection.join(',')} FROM ${this.tableName}`;
        } else {
            sql = `SELECT * FROM ${this.tableName}`
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
        const [rows] = await this.engine.promisePool.execute(sql, values);
        this.end();
        return rows;
    }
    protected async _post(params: Params) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        const sql = `INSERT INTO ${this.tableName}(${keys.join(',')}) VALUES(${new Array(values.length).fill('?').join(',')})`;
        const [OkPacket] = await this.engine.promisePool.execute(sql, values);
        this.end();
        return ((<OkPacket>OkPacket).insertId);
    }

    protected async _patch(id: KeyValue, params: Params) {
        const entries = Object.entries(params);
        const sql = `UPDATE ${this.tableName} SET ${entries.reduce((acc, cur) => acc + cur[0] + '=?', '')} WHERE ${id.key}=?`;
        console.log(sql);
        const [OkPacket] = await this.engine.promisePool.execute(sql, [...entries.map(entry => entry[1]), id.value]);
        this.end();
        console.log(sql, OkPacket);
        return ((<OkPacket>OkPacket).changedRows);
    }

    protected async _delete(params: KeyValue) {
        const sql = `DELETE FROM ${this.tableName} WHERE ${params.key}=?`;
        const [OkPacket] = await this.engine.promisePool.execute(sql, [params.value]);
        this.end();
        return ((<OkPacket>OkPacket).affectedRows);
    }
    end() {
        this.engine.pool.end(err => {
            if (err) console.log('DB pool 비정상종료', err);
            else console.log('DB pool 정상종료');
        });
    }
}