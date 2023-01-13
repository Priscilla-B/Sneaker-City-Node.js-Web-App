const trustedOrigins = ['http://*.127.0.0.1','http://localhost:5000']
//origins that can acess the backend
const corsOptions = {
    origin: (origin_, callback) => {
        // if domain is in trusted origins, let it pass
        if (trustedOrigins.indexOf(origin_) !== -1 || !origin_){
            callback(null, true)
        } else {
            callback(new Error ('Not allowed by Cors'))
        }
    },
    optionsSuccessState:200
}

module.exports = corsOptions