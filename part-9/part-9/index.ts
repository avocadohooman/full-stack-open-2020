import express from 'express';
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', async (_request, response) => {
    console.log('pong');
    return response.status(201).json({success: "pong"});
})

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})
