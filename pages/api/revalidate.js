export default async function handler(req, res) {

    try {
        await res.revalidate('/')
        console.log('Re-Validating... Successfull');
        return res.json({ revalidated: true })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error Re-Validating:")
    }
}
