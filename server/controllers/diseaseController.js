const { Diseases } = require("../models/models");
const ApiError = require('../errors/ApiError')

class DiseaseController {

    async create(req, res, next) {
        try {
            const { name, description, tips } = req.body;
            const disease = await Diseases.create({
                name,
                description,
                tips,
            })
            return res.json(disease)
        } catch (e) {
            next(ApiError.internal('Unexpected Error'));
        }
    }

    async all(req, res, next) {
        try {
            const diseases = await Diseases.findAll();
            return res.json(diseases);
        } catch (e) {
            next(ApiError.internal('Unexpected Error'));
        }
    }

    async one(req, res, next) {
        try {
            const { id } = req.params;
            const disease = await Diseases.findByPk(id);

            return (disease)
                ? res.json(disease)
                : next(ApiError.badRequest(`There is no disease with ID:${id}`))
        } catch (e) {
            next(ApiError.internal('Unexpected Error'));
        }
    }
}

module.exports = new DiseaseController()