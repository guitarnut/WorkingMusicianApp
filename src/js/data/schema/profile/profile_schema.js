/**
 * Created by guitarnut on 2/18/17.
 */

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

module.exports = {

    buildProfileModel: (data) => new ProfileModel(data, profile),

    profileSchema: () => profile,

    arrays: () => arrays

};

class ProfileModel {
    constructor(data) {
        profile.map((val) => {
            if (arrays.indexOf(val) > -1) {
                this[val] = JSON.parse(data[val]);
                // single items should be made into an array
                if (!Array.isArray(this[val])) {
                    this[val] = [this[val]];
                }
            } else {
                this[val] = data[val];
            }
        })
    }
}