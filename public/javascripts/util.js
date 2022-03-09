module.exports.mongo_connection = function (){
    let { MongoClient, ServerApiVersion } = require('mongodb');
    let uri = "mongodb+srv://pietro:pietro@cluster0.hcj4x.mongodb.net/Feedbacks?retryWrites=true&w=majority";
    let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client
}

module.exports.retrieve_zone = function (client, zone, res, req){
    client.connect(err => {
        if (err) throw err;
        client.db("Feedbacks").collection("UserOpinion").find({ tratto: zone }).toArray( function(err, result) {
          if (err){
            console.log("Retrieve Fallita, " + err)
            return "Fallita"
          }else{
            console.log("Retrieve Riuscita" + result)
            return result
          }
        })
    })
}

module.exports.close_mongo_connection = function (client){
    client.close();
}

function getWebPageByZone(zone, result){
  let page = ""
  

  return page
}

function getDataByZone(zone){
  let data = ""

  return data;
}

function getFormByZone(zone){
  let form = ""
  
  return form
}