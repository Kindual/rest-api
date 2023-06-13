const { default: mongoose } = require("mongoose");
require('dotenv').config();

async function main({name, phone, email}) {
    await mongoose.connect(process.env.DB_HOST)

    const contactSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            required: true,
            default: false,
        }
    })

    const createContact = mongoose.model('Contact', contactSchema);

    createContact.create({
        name,
        phone,
        email,
    })
}

main().catch(console.error)

module.exports = {
    main,
}


