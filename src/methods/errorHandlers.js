

export const notFoundHandler = (err,req, res, next) => {
  if(err.status === 404){
    res.status(404).send(err.message)
  }else{
    next(err)
  }
}


export const badRequestHandler = (err,req, res, next) => {
  if (err.status === 400){
    res.status(400).send(err.errorList)
    console.log(err)
  }else{
    next(err)
  }
}

export const forbiddenHandler = (err, req, res, next) => {
  if(err.status === 403){
    res.status(403).send(err.message)
  } else {
    next(err)
  }
}

export const catchAllHandler = (err,req, res, next) => {
  console.log("err",err)
  if(err)  res.status(500).send("Generic Server Error")
  next()
}