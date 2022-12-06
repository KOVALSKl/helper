const { Diseases, DiseasesSymptoms } = require("../models/models");
const ApiError = require('../errors/ApiError')

class DiagnoseController {

    static calculateEuclidianDistance(selectedSymptoms, diseaseSymptoms) {

        let userSymptoms = [...selectedSymptoms];
        let distance = 0;

        if (selectedSymptoms.length < diseaseSymptoms.length) {
            userSymptoms.concat(new Array(diseaseSymptoms.length - selectedSymptoms.length).fill(0));
        }

        for (let i = 0; i < userSymptoms.length; i++) {
            distance += (userSymptoms[i] - (diseaseSymptoms[i] ?? 0)) ** 2;
        }

        distance = Math.sqrt(distance)

        return Number(distance.toFixed(3));
    }

    async make(req, res, next) {
        try {

            const symptoms = JSON.parse(req.body.symptoms).sort((a, b) => a - b);


            const diseases = await Diseases.findAll();
            const allSymptoms = await DiseasesSymptoms.findAll();


            const diseasesSymptoms = diseases.map((disease) => {
                let currentDiseaseSymptoms = allSymptoms.filter((symptom) => (symptom['diseaseId'] === disease.id))
                return {
                    id: disease.id,
                    name: disease.name,
                    description: disease.description,
                    tips: disease.tips,
                    distance: DiagnoseController.calculateEuclidianDistance(symptoms,
                        currentDiseaseSymptoms.map((item) => item['symptomId'])),
                }
            })

            return res.json(diseasesSymptoms.sort((a, b) => a.distance - b.distance).slice(0, 3));

        } catch (e) {
            next(ApiError.internal('Unexpected Error'));
        }
    }
}



module.exports = new DiagnoseController();