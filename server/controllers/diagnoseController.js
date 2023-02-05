const { Diseases, DiseasesSymptoms, Symptoms } = require("../models/models");
const ApiError = require('../errors/ApiError')

class DiagnoseController {

    static calculateEuclidianDistance(selectedSymptoms, diseaseSymptoms) {

        let userNormalizedSymptoms = DiagnoseController.normilize([...selectedSymptoms]);
        let diseaseNormalized = DiagnoseController.normilize([...diseaseSymptoms]);

        if (selectedSymptoms.length < diseaseSymptoms.length) {
            userNormalizedSymptoms = userNormalizedSymptoms.concat(new Array(diseaseSymptoms.length - selectedSymptoms.length).fill(0));
        }

        let euclidianDistanceVector = [];

        for (let i = 0; i < userNormalizedSymptoms.length; i++) {
            euclidianDistanceVector.push(userNormalizedSymptoms[i] - (diseaseNormalized[i] ?? 0))
        }

        const distance = DiagnoseController.vectorLength(euclidianDistanceVector);

        return 1 / (1 + distance);
    }

    static vectorLength(vector) {
        return Math.sqrt(vector.reduce((prev, current, arr) => prev + current ** 2, 0));
    }

    static normilize(vector) {
        const length = this.vectorLength(vector);
        return [...vector.map(item => item / length)];
    }

    async make(req, res, next) {
        try {

            const symptoms = JSON.parse(req.body.symptoms).sort((a, b) => a - b);

            const diseases = await Diseases.findAll();
            const allDiseasesSymptoms = await DiseasesSymptoms.findAll();


            const diseasesSymptoms = diseases.map((disease) => {
                const currentDiseaseSymptoms =
                    allDiseasesSymptoms.filter((symptom) => (symptom['diseaseId'] === disease.id))

                const distance = DiagnoseController.calculateEuclidianDistance(symptoms,
                    currentDiseaseSymptoms.map((item) => item['symptomId']));

                return {
                    id: disease.id,
                    name: disease.name,
                    description: disease.description,
                    tips: disease.tips,
                    distance: Math.round(distance * 100),
                }
            })

            return res.json(diseasesSymptoms.sort((a, b) => b.distance - a.distance).slice(0, 3));

        } catch (e) {
            next(ApiError.internal('Unexpected Error'));
        }
    }
}



module.exports = new DiagnoseController();