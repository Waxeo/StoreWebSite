const express = require ('express')
const router = express.Router()
const path = require('path')

// Regex pour rediriger les utilisateurs accédant à /, /index, ou /index.html vers le même fichier index.html.
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router