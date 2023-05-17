const { Doctors, DiseasesGroup} = require('../models/models')
const ApiError = require('../errors/ApiError')

class DoctorsController {

    async create(req, res, next) {
        try {
            const { name, description, diseasesGroupId } = req.body;
            const doctor = await Doctors.create({
                name,
                description,
                diseasesGroupId,
            })

            return res.json(doctor)
        } catch (e) {
            next(ApiError.badRequest('Unexpected Error'))
        }
    }

    async update(req, res, next) {
        try {
            const {name, description, id, diseasesGroupId} = req.body;
            const doctor = await Doctors.findByPk(id);

            if(!doctor) {
                next(ApiError.badRequest("Doctor with this ID doesn't exist"))
            }

            await doctor.set({
                name,
                description,
                diseasesGroupId,
            })

            await doctor.save();
            return res.json(doctor)
        } catch (e) {
            next(ApiError.internal('Unexpected error'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const doctor = await Doctors.findByPk(id);

            if(!doctor) {
                next(ApiError.badRequest("Doctor with this ID doesn't exist"))
            }

            await doctor.destroy()

            return res.json({
                status: 200,
                statusText: "Deleted successfully"
            })
        } catch (e) {
            next(ApiError.internal("Unexpected error"))
        }
    }

    async one(req, res, next) {
        try {
            const { id } = req.params;
            const doctor = await Doctors.findByPk(id);

            if(!doctor) {
                next(ApiError.badRequest("Doctor with this ID doesn't exist"))
            }

            return res.json(doctor);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'))
        }
    }

    async all(req, res, next) {
        try {
            let doctors = await Doctors.findAll();
            doctors = await Promise.all(doctors.map(async (item) => {
                let diseaseGroup = await DiseasesGroup.findByPk(item.diseasesGroupId);
                return {item, group: diseaseGroup};
            }))
            return res.json(doctors);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'))
        }
    }

}

module.exports = new DoctorsController()