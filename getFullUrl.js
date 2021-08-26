import { getDatabase, ref, set, child, get } from "firebase/database";



export const getFullUrl = async (req, res) => {
    try {
        const shortURL = req.params.shortURL
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `url/${shortURL}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let { url } = snapshot.val()
                res.redirect(url)
            } else {
                console.log("No data available");
                res.status(404).send(error.message)
            }
        }).catch((error) => {
            console.error(error);
            res.status(404).send(error.message)
        });
        res.status(200).json({ url: url })

    } catch (error) {
        res.status(400).send(error.message)
    }
}