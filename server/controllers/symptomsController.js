const { Symptoms } = require("../models/models");
const ApiError = require('../errors/ApiError')

class SymptomsController {

    async create(req, res, next) {
        try {
            const { name } = req.body;
            const symptom = await Symptoms.create({
                name
            })
            res.json(symptom)
        } catch (e) {
            next(ApiError.badRequest(''))
        }
    }

    async all(req, res, next) {
        try {
            const symptoms = await Symptoms.findAll();
            return res.json(symptoms);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server.\nPlease try again later'));
        }
    }
}

module.exports = new SymptomsController()