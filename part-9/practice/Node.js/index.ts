import express from 'express';
import diaryRouter from './controllers/diaries';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', async(_req, res) => {
    console.log('someone pinged here');
    res.status(201).json({success: 'pong'});
})

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

