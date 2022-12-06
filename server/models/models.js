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

const SymptomsGroup = sequelize.define('symptoms_group', {
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


Symptoms.belongsTo(SymptomsGroup);
SymptomsGroup.hasMany(Symptoms);

Diseases.belongsToMany(Symptoms, { through: DiseasesSymptoms });
Symptoms.belongsToMany(Diseases, { through: DiseasesSymptoms });

module.exports = {
    Diseases,
    Symptoms,
    DiseasesSymptoms,
    SymptomsGroup
}