const { SymptomsGroup } = require("../models/models");
const ApiError = require('../errors/ApiError')

class SymptomsGroupController {

    async create(req, res, next) {
        try {
            const { name } = req.body;

            const item = await SymptomsGroup.findOne({
                where: {
                    name
                }
            })

            if (item) next(ApiError.badRequest('Group with this name alredy exist'))

            const group = await SymptomsGroup.create({
                name
            })

            res.json(group)
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, plese try again later'))
        }
    }

    async one(req, res, next) {
        try {
            const { id } = req.body;

            if (!id) next(ApiError.badRequest("Group with this id does not exist"))

            const group = SymptomsGroup.findByPk(id);

            res.json(group);

        } catch (e) {
            next(ApiError.internal('Something went wrong on server, plese try again later'))
        }
    }

    async all(req, res, next) {
        try {
            const groups = await SymptomsGroup.findAll();
            return res.json(groups);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'));
        }
    }
}

module.exports = new SymptomsGroupController()