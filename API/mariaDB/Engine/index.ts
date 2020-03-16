import mysql, { RowDataPacket } from 'mysql2/promise'
const key = require('../../db_key');

export default class Engine {
    private connection: Promise<mysql.Connection>;
    protected constructor() {
        this.connection = mysql.createConnection({
            host: key.host,
            user: key.user,
            password: key.password,
            database: key.database
        });
    }
    protected async query(sql: string, values: any[] = []): Promise<RowDataPacket[]> {
        const [rows] = await (await this.connection).execute(sql, values);
        return <RowDataPacket[]>rows;
    }
    async end() {
        (await this.connection).end(() => {
            console.log('MariaDB END Connection')
        });
    }
}