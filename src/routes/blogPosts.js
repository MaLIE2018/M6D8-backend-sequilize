import express from 'express';
import createError from 'http-errors'
import { checkBlogPostSchema, checkValidationResult } from '../methods/validations.js';
import models from "../methods/db/index.js"; 
const blogPosts = models.BlogPost
const Author = models.Author
const bpRouter = express.Router();

bpRouter.get("/", async (req, res, next) =>{  
    try { 
    const blogPost = await blogPosts.findAll({
      include:[
        {model: Author},
      ]})
    res.status(200).send(blogPost)
    } catch (err) {
      console.log(err)
      next(err)
    }
})

bpRouter.get("/:id", async ( req, res, next) =>{
  try {
   const blogPost = await query(`SELECT * FROM blogposts WHERE blogpost_id=${req.params.id}`)
     res.status(blogPost?200:400).send(blogPost? blogPost: "blogPost not found")
  } catch (err) {
    console.log(err)
    next(err)
  }
})

bpRouter.post("/post/:author_id", async ( req, res, next) =>{
  try {
    const blogPost = await blogPosts.create({...req.body,authorId: req.params.author_id})
    res.status(200).send({_id:blogPost.id})
  } catch (err) {
    console.log(err)
    next(err)
  }
})


bpRouter.get('/:id/email', async (req, res, next) =>{
  try {
    console.log('s')
  } catch (error) {
  }
})

bpRouter.put("/:id",checkBlogPostSchema,checkValidationResult, async (req, res, next) =>{
  try {
    const {title} = req.body
    const blogPost = await query(`UPDATE blogposts SET title='${title}' WHERE blogpost_id=${req.params.id} RETURNING *`)
    res.status(200).send({_id:blogPost.blogpost_id})
  } catch (err) {
    console.log(err)
    next(err)
  }
})
bpRouter.delete("/:id", async (req, res, next) =>{
  try {
  const blogPost = await query(`DELETE FROM blogposts WHERE blogpost_id=${req.params.id}`)
  res.status(204).send()
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export default bpRouter