import mysql from 'mysql2'
const key = require('../db_key');

export default class DB {
    pool: mysql.Pool = mysql.createPool({
        connectionLimit: 10,
        host: key.host,
        user: key.user,
        password: key.password,
        database: key.database
    });
    promisePool = this.pool.promise();
    async put(params:object) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        const [rows] = await this.promisePool.execute(
            `INSERT INTO Comments(${keys.join(',')}) VALUES(${new Array(values.length).fill('?').join(',')})`,
            values);
        console.log(rows);
        this.end();
    }

    end() {
        this.pool.end(err => {
            if (err) console.log('DB pool 비정상종료', err);
            else console.log('DB pool 정상종료');
        });
    }
}

/*
// query database using promises
let [rows, fields] = await promisePool.execute({
    sql:'SELECT * FROM Posts ORDER BY created DESC LIMIT 2'
}, []);
console.log(rows);
pool.end(err => console.log('조ㅗㅇ료', err));
*/
/*
pool.query('SELECT * FROM Posts ORDER BY created DESC LIMIT 2', function (error, results, fields) {
    if (error) throw error;
    console.log('Posts: ', results);
    pool.end(()=>{
        console.log('종료');
    });
});
*/

/*
pool.query(
    'insert into Posts(title, writerId, writerName, contents) values(?, ?, ?, ?)',
    ['자유글입니다2.', 'pieaces521', '재성', '잘 해내겠죠?...?'],
    (err, result, fields) => {
        if (err) throw err;
        console.log(result, fields);
        pool.end();
    }
);
*/