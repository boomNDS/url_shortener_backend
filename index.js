import express from 'express'
import { firebaseConfig } from './config.js'
const app = express();

app.get('/', (req, res) => {
    res.json({ data: "Hello World" })
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`App listening on ${process.env.PORT || 5000}`)
});
