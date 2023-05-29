module.exports = (sequelize, DataTypes) => {
    return sequelize.define('vocals', {
        voice_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: false,
        },
        guild_id: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: false,
        },
        ignore_voices: {
            type: DataTypes.TEXT,
            defaultValue: '[]',
            allowNull: false,
            get() {
                const data = this.getDataValue('ignore_voices');
                return data ? JSON.parse(data) : [];
            },
            set(value) {
                const data = value ? JSON.stringify(value) : '[]';
                this.setDataValue('ignore_voices', data);
            },
        },
    }, {
        timestamps: false,
    });
};
