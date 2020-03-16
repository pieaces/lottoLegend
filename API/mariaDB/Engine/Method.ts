import Engine from '../Engine';
import { RowDataPacket } from 'mysql2'

export default class Method {
    engine: Engine = Engine.getInstance();
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
    protected async query(sql: string, values: any[] = []):Promise<RowDataPacket[]> {
        const [rows] = await (await this.engine.connection).execute(sql, values);
        return <RowDataPacket[]>rows;
    }
}