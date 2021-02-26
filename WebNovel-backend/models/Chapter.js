module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Chapter', {
        chapterName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        story: {
            type: DataTypes.TEXT('long')
        }
    }, {
        tableName: 'chapter',
        timestamps: false
    })
    model.associate = models => {
        model.belongsTo(models.Novel, { foreignKey: 'novel_id' })
    }
    return model;
}