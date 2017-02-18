/**
 * Created by guitarnut on 2/18/17.
 */

let database = require('../database');

module.exports = {

    loginExistingUser: (data) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM users WHERE username="' + data.username + '" and password="' + data.password + '"', (err, rows, fields) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (rows.length === 0) {
                        reject("Invalid credentials.");
                        return;
                    }

                    if (rows.length > 1) {
                        reject("Multiple profiles for that user exist");
                        return;
                    }

                    resolve(data.username);
                });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    createNewUser: (data) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM users WHERE username="' + data.username + '"', (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (rows.length >= 1) {
                        reject("This username has already been taken.");
                    } else {
                        connection.query('INSERT INTO users SET ?', data, (err, result) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(data.username);
                        })
                    }
                })
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    }
};