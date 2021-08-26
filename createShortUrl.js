import { getDatabase, ref, set, child, get } from "firebase/database";
import shortid from 'shortid'
import { validURL } from './utils.js'

const checkDataIsExists = async shortID => {
    const dbRef = ref(getDatabase());
    try {
        return (await get(child(dbRef, `url/${shortID}`))).exists()
    } catch (error) {
        console.error(error);
    }
}

export const createShortUrl = async (req, res) => {
    try {
        const url = req.body.url
        if (validURL(url)) {
            const db = getDatabase();
            let randomID = shortid.generate()
            if (await checkDataIsExists(randomID)) {
                randomID = shortid.generate()
            }
            set(ref(db, 'url/' + randomID), {
                url: url
            });
            res.status(200).json({ url: url })
        } else {
            res.status(400).send("invalid url")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}