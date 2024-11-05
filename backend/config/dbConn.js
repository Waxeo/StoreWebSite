const mongoose = require('mongoose')

// Connexion a la database depuis l'URI renseigné dans le .env
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB