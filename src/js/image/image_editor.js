/**
 * Created by guitarnut on 2/19/17.
 */

//https://www.npmjs.com/package/lwip

let lwip = require('lwip');

module.exports = {

    createProfileImage: (imagePath) => {
        return new Promise((resolve, reject) => {
            lwip.open(imagePath, (err, image) => {
                if (err) {
                    reject(err);
                } else {
                    image.batch()
                        .crop(200, 200)
                        .writeFile(imagePath, (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                }
            })
        })
    }
};