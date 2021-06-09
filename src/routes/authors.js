import express from 'express';
import { nanoid } from 'nanoid'
import {getItems, writeItems, getFilePath} from '../methods/fs-tools.js'
import {pipeline} from "stream"
import { Transform } from 'json2csv';
import {createFileStream} from "../methods/csv.js"
//import Authors from "../methods/schemas/authorSchema.js"
import createError from "http-errors"
const ARouter = express.Router();
const filePath = getFilePath('authors.json')
import models from "../methods/db/index.js"
const Author = models.Author



// ********************Requests******************************

ARouter.get('/', async (req, res, next) => {
  try {
    // const authors = await Author.findAll()
    res.status(200).send({test:"authors"})
  } catch (error) {
    next(error)
  }
  
})

ARouter.get('/csv', async (req, res, next) => {
  try {
    const fields = ['name', 'surname', 'email', "dateOfBirth", "avatar", "_id"];
    const opts = { fields };
    const json2csv = new Transform(opts)
    res.setHeader("Content-Disposition", `attachment; filename=export.csv`)
    pipeline(createFileStream(), json2csv, res, error => {if(error){
      next(error)
    }})
    res.status(200).send(await getItems(filePath))
  } catch (error) {
    next(error)
  }
  
})
ARouter.get('/:id', async (req, res) => {
  try {
   
  } catch (error) {
    
  }
})

ARouter.post('/', async (req, res, next) => {
  try {
    const author = await Author.create(req.body)
    res.status(201).send({_id: author.id})
  } catch (error) {

    console.log(error)
    next(createError(500, {errorList: error}))
  }  
  
})
// Validator as Middleware here
ARouter.put('/:id', async (req, res, next) => {
  try {
   
  } catch (error) {
    next(createError(500)) 
  }
 
})
ARouter.delete('/:id', async (req, res) => {
  try {
    
  } catch (error) {
    
  }
  
})

export default ARouter;