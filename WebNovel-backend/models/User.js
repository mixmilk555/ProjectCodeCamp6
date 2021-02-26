module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(255),
            unique: true
        },
        password: {
            type: DataTypes.STRING(255)
        }
    }, {
        tableName: 'user',
        timestamps: false
    })
    model.associate = models => {
        model.hasMany(models.Novel, { foreignKey: 'user_id' })
    }
    return model;
}