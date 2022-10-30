const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Diseases = sequelize.define('diseases', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    tips: {
        type: DataTypes.TEXT,
    }
})

const Symptoms = sequelize.define('symptoms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
})

const DiseasesSymptoms = sequelize.define('diseases_symptoms', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
})

Diseases.belongsToMany(Symptoms, { through: DiseasesSymptoms });
Symptoms.belongsToMany(Diseases, { through: DiseasesSymptoms });

module.exports = {
    Diseases,
    Symptoms,
    DiseasesSymptoms
}