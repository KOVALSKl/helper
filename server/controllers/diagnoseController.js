const { Diseases, DiseasesSymptoms } = require("../models/models");
const ApiError = require('../errors/ApiError')

class DiagnoseController {

    static calculateLength(vector) {
        return Number(Math.sqrt(vector.reduce((prev, current) => prev + current ** 2, 0)).toFixed(5));
    }

    static calculateProbabiltiy(selectedSymptoms, diseaseSymptoms) {
        let matchingSymptoms = 0;
        selectedSymptoms.map((item) => {
            if (diseaseSymptoms.includes(item))
                matchingSymptoms++;
        })
        console.log(matchingSymptoms, diseaseSymptoms.length);
        return Math.floor((matchingSymptoms / diseaseSymptoms.length) * 100)
    }

    async make(req, res, next) {
        try {

            const symptoms = JSON.parse(req.body.symptoms);


            const diseases = await Diseases.findAll();
            const allSymptoms = await DiseasesSymptoms.findAll();


            const diseasesSymptoms = diseases.map((disease) => {
                let currentDiseaseSymptoms = allSymptoms.filter((symptom) => (symptom['diseaseId'] === disease.id))
                return {
                    id: disease.id,
                    name: disease.name,
                    description: disease.description,
                    tips: disease.tips,
                    probability: DiagnoseController.calculateProbabiltiy(symptoms, currentDiseaseSymptoms.map((item) => item['symptomId'])),
                }
            })

            console.log()

            return res.json(diseasesSymptoms.sort((a, b) => b.probability - a.probability).slice(0, 3));

        } catch (e) {
            next(ApiError.internal('Unexpected Error'));
        }
    }
}



module.exports = new DiagnoseController();