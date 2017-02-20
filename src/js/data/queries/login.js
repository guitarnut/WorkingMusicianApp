/**
 * Created by guitarnut on 2/18/17.
 */

let database = require('../database');
let error = require('../../constants/error_messages');

module.exports = {

    loginExistingUser: (data) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM users WHERE username="' + data.username_existing + '" and password="' + data.password_existing + '"', (err, rows, fields) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (rows.length === 0) {
                        reject(error.SERVER.LOGIN.INVALID_CREDENTIALS);
                        return;
                    }

                    if (rows.length > 1) {
                        reject(error.SERVER.LOGIN.MULTIPLE_FOUND);
                        return;
                    }

                    resolve({username: data.username_existing, userId: rows[0].id});
                });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    checkForExistingUser: (data) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM users WHERE username="' + data.username_new + '"', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else if (rows.length >= 1) {
                        reject(error.SERVER.LOGIN.USERNAME_TAKEN);
                    } else {
                        resolve();
                    }
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
                let newUser = {
                    username: data.username_new,
                    password: data.password_new
                };

                connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({username: newUser.username, userId: result.insertId});
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