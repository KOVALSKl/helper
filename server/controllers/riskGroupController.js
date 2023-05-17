const { RiskGroups } = require('../models/models')
const ApiError = require('../errors/ApiError')

class RiskGroupsController {

    async create(req, res, next) {
        try {
            const { name } = req.body;

            const group = await RiskGroups.create({name})

            return res.json(group)
        } catch (e) {
            next(ApiError.badRequest('Unexpected Error'))
        }
    }

    async update(req, res, next) {
        try {
            const {name, id} = req.body;
            const group = await RiskGroups.findByPk(id);

            if(!group) {
                next(ApiError.badRequest("Group with this ID doesn't exist"))
            }

            await group.set({
                name,
            })

            await group.save();
            return res.json(group)
        } catch (e) {
            next(ApiError.internal('Unexpected error'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const group = await RiskGroups.findByPk(id);

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
            const { id } = req.params;
            const group = await RiskGroups.findByPk(id);

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
            const groups = await RiskGroups.findAll();
            return res.json(groups);
        } catch (e) {
            next(ApiError.internal('Something went wrong on server, please try again later'))
        }
    }

}

module.exports = new RiskGroupsController()