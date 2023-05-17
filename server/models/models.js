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
    },
    reasons: {
        type: DataTypes.TEXT,
    },
    symptoms_description: {
        type: DataTypes.TEXT,
    },

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

const Doctors = sequelize.define('doctors', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})


const DiseasesGroup = sequelize.define('diseases_group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const RiskGroups = sequelize.define('risk_groups', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
    }
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

const DiseaseRiskGroups = sequelize.define('disease_risk_groups', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
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

Diseases.belongsTo(DiseasesGroup);
DiseasesGroup.hasMany(Diseases);

DiseasesGroup.hasOne(Doctors);
Doctors.belongsTo(DiseasesGroup);

Diseases.belongsToMany(RiskGroups, {through: DiseaseRiskGroups});
RiskGroups.belongsToMany(Diseases, {through: DiseaseRiskGroups});

Diseases.belongsToMany(Symptoms, { through: DiseasesSymptoms });
Symptoms.belongsToMany(Diseases, { through: DiseasesSymptoms });

module.exports = {
    Diseases,
    Symptoms,
    Doctors,
    DiseasesSymptoms,
    DiseaseRiskGroups,
    DiseasesGroup,
    SymptomsGroup,
    RiskGroups,
}