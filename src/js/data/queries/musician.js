/**
 * Created by guitarnut on 2/18/17.
 */

let database = require('../database');
let schema = require('../schema/profile/profile_schema');
let error = require('../../constants/error_messages');

module.exports = {

    getProfile: (id) => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM profiles WHERE id=' + id, (err, rows, fields) => {
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

                    incrementProfileView(id);
                    resolve(schema.buildProfileModel(rows[0]));
                });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    }
};

function incrementProfileView(id) {
    let connection = database.getConnection();

    connection.connect();

    try {
        connection.query('UPDATE profiles SET profile_views = profile_views + 1 WHERE id=' + id, (err, rows, fields) => {
            // for now this fails silently, not an important feature
            // handle dupe IP on view hits
            if (err) {
                let ex = err;
            }
        });
    } catch (ex) {
        // shhhh
    } finally {
        connection.end();
    }
}