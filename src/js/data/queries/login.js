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
                connection.query('SELECT * FROM users WHERE username="' + data.username_existing + '" and password="' + data.password_existing + '"', (err, rows, fields) => {
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

                    resolve(data.username_existing);
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
                        reject("This username has already been taken.");
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
                        resolve(newUser.username);
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