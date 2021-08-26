import express from "express"
import cors from "cors"
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config.js'
import { createShortUrl } from "./createShortUrl.js"
import { getFullUrl } from "./getFullUrl.js"
const app = express();
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
initializeApp(firebaseConfig)

app.get('/:shortURL', getFullUrl);

app.post('/', createShortUrl)


app.listen(process.env.PORT || 5000, () => {
    console.log(`API shortener Start!!`)
})
