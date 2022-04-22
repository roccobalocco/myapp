var express = require('express');
var router = express.Router();
var fs = require('fs');
var ip = require('ip');
var myDb = require('../public/javascripts/db')

/*POST zone page. */
router.post('/', (req, res, next) => {
  res.write("Ciao mondo, riesco ad arrivare fino a qui post")
  res.end()
})

/*GET zone page. */
router.get('', (req, res, next) => { 
  console.log("entrando in router / con url pari a: " + req.url)
  res.writeHead(200, {"Content-Type": "text/html"})
  res.write(fs.readFileSync('public/html/zona.html'))
  res.end()  
})

router.get('/send_data', (req, res, next) => {
  console.log("entrando in router /send_data con url originale pari a: " + req.originalUrl)
  myDb.insert(req.query.u, req.query.o, req.query.z);
  myDb.retrieve();
  
  var firstPart = ""
  
  if(req.url.includes("heroku")){
    firstPart = "https://ciclabili-valchiavenna.herokuapp.com"
  }else{
    firstPart = `http://${ip.address()}:3000`
  }

  console.log("PRIMA PARTE: " + firstPart)
  
  if(req.query.z == "Ciclabile Valchiavenna"){
    res.redirect(firstPart + `/piste`)
  }else{
    res.redirect(firstPart + `/zone?z=${req.query.z}`)
  }
  res.end()
})

module.exports = router;