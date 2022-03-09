var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://pietro:pietro@cluster0.hcj4x.mongodb.net/Feedbacks?retryWrites=true&w=majority";
var fs = require('fs')

module.exports.retrieve = function() {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Feedbacks");
        dbo.collection("UserOpinion").find({}).toArray(function(err, result) {
            if (err) throw err;
            fs.writeFile('public/json/comments.json', JSON.stringify(result), err => {
                // error checking
                if(err) throw err;

                console.log("New data added");
            });   
            db.close();
        });
    });
}