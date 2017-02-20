/**
 * Created by guitarnut on 2/18/17.
 */

let database = require('../database');

module.exports = {

    searchProfiles: (data) => {
        let connection = database.getConnection();

        connection.connect();

        let profile = [
            "id",
            "user_id",
            "first_name",
            "last_name",
            "availability",
            "city",
            "profession",
            "state",
            "travel",
            "profile_views",
            "profile_picture",
            "instruments",
            "vocals",
            "genres"
        ];

        let arrays = [
            "availability",
            "instruments",
            "vocals",
            "genres"
        ];

        return new Promise((resolve, reject) => {
            try {
                connection.query('SELECT * FROM profiles WHERE ' +
                    'availability like"%' + data.availability + '%"',
                    //'city="' + data.city + '"' +
                    //'profession="' + data.profession + '"' +
                    //'state="' + data.state + '"' +
                    //'travel="' + data.travel + '"' +
                    //'instruments="' + data.instruments + '"' +
                    //'vocals="' + data.vocals + '"' +
                    //'genres="' + data.genres + '"',
                    (err, rows, fields) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(rows);
                    });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end();
            }
        });
    }
};