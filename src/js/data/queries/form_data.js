/**
 * Created by guitarnut on 2/18/17.
 */

let database = require('../database');

module.exports = {

    getData: () => {
        let connection = database.getConnection();

        connection.connect();

        return new Promise((resolve, reject) => {
            let formData = {
                instruments: [],
                genres: [],
                travel: [],
                availability: [],
                vocals: [],
                profession: []
            };

            try {
                connection.query('SELECT * FROM form_options_instruments', (err, rows, fields) => {
                    if (err) {
                        // ignore
                    } else {
                        rows.forEach((val) => {
                            formData.instruments.push(val.value);
                        })
                    }
                });
                connection.query('SELECT * FROM form_options_genres', (err, rows, fields) => {
                    if (err) {
                        // ignore
                    } else {
                        rows.forEach((val) => {
                            formData.genres.push(val.value);
                        })
                    }
                });
                connection.query('SELECT * FROM form_options_travel', (err, rows, fields) => {
                    if (err) {
                        // ignore
                    } else {
                        rows.forEach((val) => {
                            formData.travel.push(val.value);
                        })
                    }
                });
                connection.query('SELECT * FROM form_options_availability', (err, rows, fields) => {
                    if (err) {
                        // ignore
                    } else {
                        rows.forEach((val) => {
                            formData.availability.push(val.value);
                        })
                    }
                });
                connection.query('SELECT * FROM form_options_vocals', (err, rows, fields) => {
                    if (err) {
                        // ignore
                    } else {
                        rows.forEach((val) => {
                            formData.vocals.push(val.value);
                        })
                    }
                });
                connection.query('SELECT * FROM form_options_profession', (err, rows, fields) => {
                    if (err) {
                        // ignore
                    } else {
                        rows.forEach((val) => {
                            formData.profession.push(val.value);
                        })
                    }
                });
            } catch (ex) {
                reject(ex);
            } finally {
                connection.end((err)=> {
                    resolve(formData);
                });
            }
        });
    },

};