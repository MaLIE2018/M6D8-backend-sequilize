import express from 'express';
import ARouter from "./routes/authors.js"
import bpRouter from './routes/blogPosts.js';
import fRouter from './methods/fileHandler.js'
import { notFoundHandler,badRequestHandler,catchAllHandler, forbiddenHandler } from './methods/errorHandlers.js';
import {publicFolderPath2}  from "./methods/fs-tools.js"
import  createError from 'http-errors';
import cors from "cors"
import rc from './routes/comments.js';
import models from "../src/methods/db/index.js"
// import mongoose from "mongoose"
const db = models.sequelize

const port = process.env.PORT || 3001;

const whiteList = [process.env.FRONTEND_DEV_URL, process.env.FRONTEND_CLOUD_URL]

const app = express();

const corsOptions = {
  origin: function (origin,next){
    if(whiteList.indexOf(origin) !== -1 ){
      next(null,true)
    } else{
      next(createError(400,{message: "Check your cors settings!"}))
    }
  }
}

/*Global Middleware */
app.use(express.static(publicFolderPath2))
app.use(express.json())
app.use(cors(corsOptions))
/*Routes */
app.use("/authors",ARouter, fRouter)
app.use("/blogPosts", bpRouter, fRouter, rc)

/* Error Middleware */
app.use(notFoundHandler)
app.use(badRequestHandler)
app.use(catchAllHandler)
app.use(forbiddenHandler)

app.use((req,res,next)=>{
  if(!req.route && !req.headersSent){
    res.send(createError(404,{message:"The route is not implemented"}))
  }
})


db.sync( ).then(() => {  //{force: true}
  app.listen(port, () => {
    console.log("Server is 🆗 at " + port)})
  app.on("error", (error) =>
    console.info(" ❌ Server is not running due to : ", error)
  );
  
})
.catch((e) => {
  console.log(e);
});

// mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true} ).then(()=>
//   app.listen(port, () => {
//   console.log("Server is running " + port)
// }))
