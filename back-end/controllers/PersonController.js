
const PersonModel = require("../models/PersonModel")

// CREATE Person
exports.createPersonController = async (req,res) => {
    const newPerson = new PersonModel(req.body)

    try {
        const savedPerson = await newPerson.save()
        res.status(200).json(savedPerson)
    } catch(err) {
        res.status(500).json(err)
    }
}