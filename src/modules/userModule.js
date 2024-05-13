const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// pre save schema for has and salt
userSchema.pre('save', function (next) {
    //this ref to user req like email and password
    const user = this;
    if (!user.isModified('password')) {
        return next(); //is user not modified pass call callback 
    }

    //create random string has to add after to hased pass using slat
    bcrypt.genSalt(10, (err, slat) => {
        if (err) {
            return next(err)
        }

        //hash user pass here
        bcrypt.hash(user.password, slat, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash // add user password to has and saving it in monngo//not saving it here it will go back and save there 
            next();
        })
    })

});


//comparse pass
userSchema.methods.comparePassword = function (candidatePassword) {
    //this ref to user here as well
    const user = this;
    return new Promise((resolve, reject) => {
        //compare pass
        bcrypt.compare(candidatePassword, user.password, (err, ismatch) => {
            if (err) {
                console.log("bcrypt copare err", err);
                return reject(err)
            }

            //pass not matched
            if (!ismatch) {
                return reject(false)
            }
            resolve(true);
        })
    })

};

mongoose.model("User", userSchema)