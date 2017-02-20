/**
 * Created by guitarnut on 2/18/17.
 */

let mysql = require("mysql");

module.exports = {

    getConnection: ()=> {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'workingmusician'
        });
    }

};