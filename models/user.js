module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // User.associate = (models) => {
    //     models.User.hasMany(models.Book, {
    //         onDelete: 'CASCADE'
    //     });
    // };

    return User;
};