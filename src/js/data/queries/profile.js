/**
 * Created by guitarnut on 2/18/17.
 */

let database = require('../database');
let schema = require('../schema/profile/profile_schema');
let error = require('../../constants/error_messages');

function stringifyArrayData(data) {
    let arrays = schema.arrays();

    arrays.map((val)=> {
        data[val] = JSON.stringify(data[val]);
    })
}

module.exports = {

    getProfileByUserId: (userId) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT id FROM profiles WHERE user_id=' + userId, (err, rows, fields) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (rows.length === 0) {
                        reject(new Error(error.SERVER.PROFILE.DOES_NOT_EXIST));
                        return;
                    }

                    if (rows.length > 1) {
                        reject(new Error(error.SERVER.PROFILE.MULTIPLE_FOUND));
                        return;
                    }

                    resolve(rows[0].id);
                });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    getProfile: (id, userId) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM profiles WHERE id=' + id + ' AND user_id=' + userId, (err, rows, fields) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (rows.length === 0) {
                        reject(new Error(error.SERVER.PROFILE.DOES_NOT_EXIST));
                        return;
                    }

                    if (rows.length > 1) {
                        reject(new Error(error.SERVER.PROFILE.MULTIPLE_FOUND));
                        return;
                    }

                    resolve(schema.buildProfileModel(rows[0]));
                });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    createProfile: (data, userId) => {
        let connection = database.getConnection();

        connection.connect();

        data.profile_views = 0;
        data.user_id = userId;

        stringifyArrayData(data);

        return new Promise((resolve, reject) => {
            try {
                connection.query('INSERT INTO profiles SET ?', data, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.insertId);
                })
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    updateProfile: (id, data) => {
        let connection = database.getConnection();

        connection.connect();
        stringifyArrayData(data);

        console.log(data);

        return new Promise((resolve, reject) => {
            try {
                connection.query('UPDATE profiles SET ? WHERE id=' + id, data, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(id);
                })
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    deleteProfile: (id) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('DELETE FROM profiles WHERE id=' + id, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                })
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    },

    saveProfileImagePath: (path) => {

    }
};