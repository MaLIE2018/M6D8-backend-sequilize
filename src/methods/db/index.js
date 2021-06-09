import s from 'sequelize';
import BlogPostModel from "./blogposts.js";
import AuthorModel from "./authors.js"
const Sequelize = s.Sequelize;
const DataTypes = s.DataTypes;
const {PGDATABASE, PGPASSWORD, PGUSER,PGHOST } = process.env


const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST, 
  dialect: 'postgres'
})

const test = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established")
  } catch (error) {
    console.log("Unable to connect to database", error)
  }
}

const models = {
  BlogPost: BlogPostModel(sequelize, DataTypes),
  Author: AuthorModel(sequelize, DataTypes),
  sequelize: sequelize,
}

models.Author.hasMany(models.BlogPost, {foreignKey:{allowNull:false, onDelete:"CASCADE"}})
models.BlogPost.belongsTo(models.Author, {foreignKey:{allowNull:false, onDelete:"CASCADE"}})



test()

export default models