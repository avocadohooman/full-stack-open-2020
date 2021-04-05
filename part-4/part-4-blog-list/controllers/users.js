const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const userHelper = require('../utils/user_controller_helper');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(users.map(u => u.toJSON()));
})

userRouter.post('/', async (request, response) => {
    const body = request.body;

    if (!userHelper.checkPassword(body.password) || !userHelper.checkUserName(body.username)) {
        return response.status(400).json({error:'Username and password need to have a minimum of three characters'})
    }

    if (!await userHelper.checkDuplicate(body.username)) {
        console.log("Error 400");
        return response.status(400).json({error:'Username already exists'});
    }

    const saldRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saldRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save();

    response.json(savedUser);
})

module.exports = userRouter