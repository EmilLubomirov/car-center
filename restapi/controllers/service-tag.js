const models = require("../models");

module.exports = {

    get: (req, res, next) => {

        models.ServiceTag.find()
            .then((services) => res.send(services))
            .catch(next)
    },
};