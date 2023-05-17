const { DiseasesGroup } = require('../models/models')
const ApiError = require('../errors/ApiError')

class DiseasesGroupController {

    async create(req, res, next) {
        try {
            const { name } = req.body;
            const diseaseGroup = await DiseasesGroup.create({
                name,
            })

            return res.json(diseaseGroup)
        } catch (e) {
            next(ApiError.badRequest('Unexpected Error'))
        }
    }

    async update(req, res, next) {
        try {
            const {name, id} = req.body;
            const group = await DiseasesGroup.findByPk(id);

            if(!group) {
                next(ApiError.badRequest("Group with this ID doesn't exist"))
            }

            await group.set({
                name
            })

            await group.save();
            return res.json(group)
        } catch (e) {
            next(ApiError.internal('Unexpected error'));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const group = await DiseasesGroup.findByPk(id);

            if(!group) {
                next(ApiError.badRequest("Group with this ID doesn't exist"))
            }

            await group.destroy()

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
            const {id} = req.params;
            const group = await DiseasesGroup.findByPk(id);

            if(!group) {
                next(ApiError.badRequest("Group with this ID doesn't exist"))
            }

            return res.json(group);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'))
        }
    }

    async all(req, res, next) {
        try {
            const groups = await DiseasesGroup.findAll();
            return res.json(groups);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'))
        }
    }

}

module.exports = new DiseasesGroupController()