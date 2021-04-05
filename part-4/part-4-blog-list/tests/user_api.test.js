const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        console.log('Database cleared');
    
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({username: 'root', passwordHash});
        await user.save();
        console.log('Database for testing initialised')
    })
    
    test('creating user with a fresh username', async() => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: 'gmolin',
            name: 'Gerhard Molin',
            password: 'satan!'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
            const usersAtEnd = await helper.usersInDb();
            expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

            const usernames = usersAtEnd.map(u => u.username);
            expect(usernames).toContain(newUser.username);
    })
})

describe('testing new user validity: uniquness and minLength', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        console.log('Database cleared');
    
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({username: 'root', passwordHash});
        await user.save();
        console.log('Database for testing initialised')
    })

    test('creating user with userName too short', async() => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: '1',
            name: 'Gerhard Molin',
            password: 'satan!'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(userAtStart.length);
    })

    test('testing uniquness of userName', async() => {
        const userAtStart = await helper.usersInDb();

        console.log("UsersAtStart", userAtStart);
        const newUser = {
            username: 'root',
            name: 'Gerhard Molin',
            password: 'satab'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(userAtStart.length);

    })

    test('creating user with password too short', async() => {
        const userAtStart = await helper.usersInDb();
    
        const newUser = {
            username: '223',
            name: 'Gerhard Molin',
            password: 'sa'
        }
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(userAtStart.length);
    })
})



afterAll(() => {
    mongoose.connection.close();
})