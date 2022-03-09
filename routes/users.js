var express = require('express');
var router = express.Router();
var fs = require('fs');

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

module.exports = router;