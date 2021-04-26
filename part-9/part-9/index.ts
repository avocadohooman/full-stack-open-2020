import express from 'express';
const app = express();
const cors = require('cors');
import diagnosisRouter from './controllers/diagnosisRouter';
import patientRouter from './controllers/patientRouter';

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', async (_request, response) => {
    console.log('pong');
    return response.status(201).json({success: "pong"});
})

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})
