module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Novel', {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        plot: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        }
    }, {
        tableName: 'novel',
        timestamps: false
    });
    model.associate = models => {
        model.belongsTo(models.User, { foreignKey: 'user_id' })
        model.hasMany(models.Chapter, { foreignKey: 'novel_id' })
    }
    return model
}