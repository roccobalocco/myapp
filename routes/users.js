var express = require('express');
var router = express.Router();
var fs = require('fs');
var ip = require('ip');

/*POST zone page. */
router.post('/', (req, res, next) => {
  res.write("Ciao mondo, riesco ad arrivare fino a qui post")
  res.end()
})

/*GET zone page. */
router.get('/', (req, res, next) => { 
  res.writeHead(200, {"Content-Type": "text/html"})
  res.write(fs.readFileSync('public/html/zona.html'))
  res.end()  
})

router.get('/send_data' (req, res, next) => {
  //prima di tutto recupera i dati dal file di appoggio json
  /*TO-DO*/
  //richiama la funzione asincrona che permette l'invio di dati e fai await
  await(updateDb());
  //poi reindirizza a /zone?z=someZone
  /*TO-DO*/
  res.writeHead(302, {
    location: `http//${ip.address()}/zone?z=${req.query.z}`,
  });
  res.end()
})

module.exports = router;