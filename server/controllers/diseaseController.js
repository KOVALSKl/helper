const { Diseases, DiseasesSymptoms, DiseasesGroup} = require("../models/models");
const ApiError = require('../errors/ApiError')

class DiseaseController {

    async create(req, res, next) {
        try {
            const {
                name,
                group,
                description,
                tips,
                reasons,
                symptoms,
                risks,
                symptomsDescription,
            } = req.body;
            console.log({
                name,
                group,
                description,
                tips,
                reasons,
                symptoms,
                risks,
                symptomsDescription,
            })
            const disease = await Diseases.create({
                name,
                description,
                diseasesGroupId: group,
                symptoms_description: symptomsDescription,
                reasons,
                tips,
            })

            console.log("I'M HERE");
            let parsedSymtpoms = symptoms.sort((a, b) => a - b);

            for (let i = 0; i < parsedSymtpoms.length; i++) {
                await DiseasesSymptoms.create({
                    diseaseId: disease.id,
                    symptomId: parsedSymtpoms[i]
                })
            }

            return res.json(disease)
        } catch (e) {
            console.log(e.message);
            next(ApiError.internal('Unexpected Error'));
        }
    }

    async update(req, res, next) {
        try {
            const { diseaseInfo, tips, symptoms, diseaseID } = req.body;
            const parsedSymtpoms = JSON.parse(symptoms).sort((a, b) => a - b);

            const disease = await Diseases.findByPk(diseaseID);

            if (!disease) next(ApiError.badRequest(`There is no disease with ID:${diseaseID}`))

            disease.set({
                name: diseaseInfo.name,
                description: diseaseInfo.description,
                symptoms_description: diseaseInfo.symptoms_description,
                reasons: diseaseInfo.reasons,
                tips,
            })

            await DiseasesSymptoms.destroy({ where: { diseaseId: diseaseID } });

            for (let i = 0; i < parsedSymtpoms.length; i++) {
                await DiseasesSymptoms.create({
                    diseaseId: disease.id,
                    symptomId: parsedSymtpoms[i]
                })
            }

            await disease.save();

            return res.json(disease);
        } catch (e) {
            next(ApiError.internal('Unexpected Error'))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const disease = await Diseases.findByPk(id);

            if (!disease) next(ApiError.badRequest(`There is no disease with ID:${id}`))

            await disease.destroy();
            await DiseasesSymptoms.destroy({ where: { diseaseId: id } });

            return res.json({
                status: 200,
                statusText: "Delete successfully"
            })

        } catch (e) {
            next(ApiError.internal('Unexpected Error'))
        }
    }

    async all(req, res, next) {
        try {
            let diseases = await Diseases.findAll();
            diseases = await Promise.all(diseases.map(async (item) => {
                let diseaseGroup = await DiseasesGroup.findByPk(item.diseasesGroupId)
                let symptoms = await DiseasesSymptoms.findAll({
                    where: {diseaseId:item.id}
                })
                return {item, group: diseaseGroup, symptoms}
            }))

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