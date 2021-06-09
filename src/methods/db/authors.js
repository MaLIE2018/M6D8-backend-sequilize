const AuthorModel = (sequelize, DataTypes) => {
    const Author = sequelize.define('author',{
        id:  {type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true },
        email: {type: DataTypes.TEXT, allowNull: false},
        avatar: {type: DataTypes.TEXT, allowNull: false},
        name: {type: DataTypes.TEXT, allowNull: false},
        dateOfBirth: {type: DataTypes.DATE, allowNull: false},
    })
    return Author;
}

export default AuthorModel