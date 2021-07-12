const User = require('../models/user');

const checkUserName = (userName) => {
    if (userName.length < 3) {
        return 0
    }
    return 1;
}

const checkPassword = (password) => {
    console.log("Password length", password.length);
    if (password.length < 3) {
        return 0;
    }
    return 1;
}

const checkDuplicate = async (userName) => {
    const users = await User.find({})
    const userNames = users.map(u => u.toJSON())

    console.log("Existing userNames", userNames, "Username to be checked", userName);
    const duplicate = userNames.find(user => user.username === userName);

    if (duplicate) {
        console.log("Found duplicate");
        return 0;
    }
    return 1;
}


module.exports = {
    checkPassword,
    checkUserName,
    checkDuplicate
}
