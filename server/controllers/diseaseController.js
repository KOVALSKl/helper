const { Diseases, DiseasesSymptoms } = require("../models/models");
const ApiError = require('../errors/ApiError')

class DiseaseController {

    async create(req, res, next) {
        try {
            const { diseaseInfo, tips, symptoms } = req.body;

            const disease = await Diseases.create({
                name: diseaseInfo.name,
                description: diseaseInfo.description,
                tips,
            })

            let parsedSymtpoms = JSON.parse(symptoms).sort((a, b) => a - b);

            for (let i = 0; i < parsedSymtpoms.length; i++) {
                await DiseasesSymptoms.create({
                    diseaseId: disease.id,
                    symptomId: parsedSymtpoms[i]
                })
            }

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