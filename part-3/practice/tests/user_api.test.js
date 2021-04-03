const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper')

describe('when there is initally one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({username: 'root', passwordHash});

        await user.save();
    })

    test('creation succeeds with a fresh username', async() => {
        const userAtStart = await helper.usersInDb();

        const newUser = {
            username: 'gmolin',
            name: 'Gerhard Molin',
            password: 'gmolin!'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usersnames = usersAtEnd.map(u => u.username)
        expect(usersnames).toContain(newUser.username)
    })
})
