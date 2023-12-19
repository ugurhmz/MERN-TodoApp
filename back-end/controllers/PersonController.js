
const PersonModel = require("../models/PersonModel")

// CREATE Person
exports.createPersonController = async (req,res) => {
    try {
        if (!req.body.personMail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.status(400).json({ error: "Girilen mail uygun formatta değildir!" })
       }
    
       const existingPerson  = await  PersonModel.findOne({
        personMail: req.body.personMail
       })

       if (existingPerson) {
        return res.status(409).json({ error: "Böyle bir kullanıcı zaten var!" })
      }

        const newPerson = new PersonModel(req.body);
        const savedPerson = await newPerson.save();
        res.status(200).json(savedPerson);
    } catch (err) {
        if (err.name === "ValidationError") {
          res.status(400).json({ error: err.message });
        } else {
          res.status(500).json(err);
        }
      }
}

// GET