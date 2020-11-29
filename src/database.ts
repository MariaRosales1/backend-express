import mysql from 'mysql';
import keys from './keys';

console.log(keys.database);
const pool = mysql.createPool(keys.database);
pool.getConnection((err, connection) => {
    try {
        if (err) {
            console.log(err);
        };
        connection.release();
        console.log('DB is connected');
    } catch (error) {
        console.log('Error al conectarse a la base de datos '+ error);
    }
})

export default pool;
