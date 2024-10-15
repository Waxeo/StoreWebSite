const express = require ('express')
const router = express.Router()
const path = require('path')

// Regex pour determiner les routes ok et celles qui sont inexistantes
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router