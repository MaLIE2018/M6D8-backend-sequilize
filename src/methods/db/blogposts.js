export default (sequelize, DataTypes) => { 
  const blogPost = sequelize.define('blogpost',{
  id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  category: {type: DataTypes.TEXT, allowNull: false},
  title:  {type: DataTypes.TEXT, allowNull: false},
  cover:  {type: DataTypes.TEXT, allowNull: false},
  readTime_value: {type: DataTypes.INTEGER , allowNull: false},
  readTime_unit:{type: DataTypes.TEXT, defaultValue: "minute"},
  content:  {type: DataTypes.TEXT, allowNull: false}
})
return blogPost

}