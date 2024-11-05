const allowedOrigins = require('./allowedOrigins')

// Mise en place des options personalisées pour CORS avce un objet corsOptions et une fonction origin pour éviter des appels depuis des url exterieures a celles autorisées

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions

/***** CORS (Partage de ressource cross-origin) est un mécanisme qui consiste à transmettre des entêtes HTTP qui déterminent s'il faut ou non bloquer les requêtes à des ressources restreintes sur une page web qui se trouve sur un domaine externe au domaine dont la ressource est originaire. *****/