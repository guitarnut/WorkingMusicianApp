/**
 * Created by guitarnut on 2/18/17.
 */
// check out https://github.com/visionmedia/node-pwd

let crypto = require('crypto');

/**
 * Bytesize.
 */

let len = 128;

/**
 * Iterations. ~300ms
 */

let iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

module.exports = {
    hash: function (pwd, salt, fn) {
        if (3 == arguments.length) {
            crypto.pbkdf2(pwd, salt, iterations, len, fn);
        } else {
            fn = salt;

            crypto.randomBytes(len, function (err, salt) {
                if (err) {
                    return fn(err);
                }

                salt = salt.toString('base64');

                crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
                    if (err) {
                        return fn(err);
                    }

                    fn(null, salt, hash);
                });
            });
        }
    }
};