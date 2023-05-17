const { Symptoms, SymptomsGroup} = require("../models/models");
const ApiError = require('../errors/ApiError')

class SymptomsController {

    async create(req, res, next) {
        try {
            const { name, description, symptomsGroupId } = req.body;
            const symptom = await Symptoms.create({
                name,
                description,
                symptomsGroupId,
            })
            return res.json(symptom)
        } catch (e) {
            next(ApiError.badRequest('Unexpected Error'))
        }
    }

    async update(req, res, next) {
        try {
            const { name, description, symptomsGroupId, id } = req.body;
            const symptom = await Symptoms.findByPk(id);
            if (!symptom) next(ApiError.badRequest('Symptom with this id does not exist'))

            symptom.set({
                name,
                description,
                symptomsGroupId
            });
            await symptom.save();

            return res.json(symptom);
        } catch (e) {
            next(ApiError.internal('Unexpected Error'))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const symptom = await Symptoms.findByPk(id);

            if (!symptom) next(ApiError.badRequest('Symptom with this id does not exist'))

            await symptom.destroy();

            return res.json({
                status: 200,
                statusText: "Delete successfully"
            })
        } catch (e) {
            next(ApiError.internal('Unexpected error'))
        }
    }

    async all(req, res, next) {
        try {
            let symptoms = await Symptoms.findAll();
            symptoms = await Promise.all(symptoms.map(async (item) => {
                let symptomsGroup = await SymptomsGroup.findByPk(item.symptomsGroupId);
                return {item, group: symptomsGroup}
            }))
            return res.json(symptoms);
        } catch (e) {
            next(ApiError.internal('Unexpected error'))
        }
    }
}

module.exports = new SymptomsController()