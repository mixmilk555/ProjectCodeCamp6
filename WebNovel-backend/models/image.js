module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        type: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        }
    }, {
        tableName: 'image',
        timestamps: false
    })
    Image.associate = models => {
        Image.belongsTo(models.Novel, { foreignKey: 'novel_id' })
    }
    return Image
}