const { SymptomsGroup } = require("../models/models");
const ApiError = require('../errors/ApiError')

class SymptomsGroupController {

    async create(req, res, next) {
        try {
            const { name } = req.body;

            const item = await SymptomsGroup.findOne({where: {name}})
            if (item) next(ApiError.badRequest('Group with this name already exist'))

            const group = await SymptomsGroup.create({
                name
            })

            return res.json(group)
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'))
        }
    }

    async update(req, res, next) {
        try {
            const { name, id } = req.body;
            const group = await SymptomsGroup.findByPk(id);

            if (!group) next(ApiError.badRequest("Group with this id does not exist"))

            await group.set({
                name
            })

            await group.save();

            return res.json(group);

        } catch (e) {
            next(ApiError.internal('Unexpected error'))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const group = await SymptomsGroup.findByPk(id);

            if (!group) next(ApiError.badRequest("Group with this id does not exist"))

            await group.destroy();

            return res.json({
                status: 200,
                statusText: "Delete successfully"
            })

        } catch (e) {
            next(ApiError.internal('Unexpected error'))
        }
    }

    async one(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) next(ApiError.badRequest("Group with this id does not exist"))

            const group = await SymptomsGroup.findByPk(id);

            return res.json(group);

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