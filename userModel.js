const mongoose = require('mongoose')

const testUser = new mongoose.Schema({
    email : {type : String},
    name : {type : String},
    password : {type : String}
})


const User = mongoose.model('User', testUser)

export default User;

