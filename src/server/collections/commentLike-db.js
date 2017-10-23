'use strict';

let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let protocol = process.env.DB_PROTOCOL;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let name = process.env.DB_NAME;
let username = process.env.Username;
let password = process.env.Password;
let url;
if (password !== undefined) {
  url = protocol + '://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
} else {
  url = protocol + '://' + host + ':' + port + '/' + name;
}
function update(videosId,commentId,votetype,res) {
  MongoClient.connect(url, (err, db) => {
    db.collection('videos').find({'videoId' :videosId}).toArray(function(err,items){   
      if (err) {
        console.log('Unable to connect to the MongoDB server. Error:', err);
      }    
      let obj = items[0];
      if(votetype === 'upvote'){
        obj.commentInfos[commentId-1].likeNum++;
      }
      else{
        obj.commentInfos[commentId-1].dislikeNum++;
      }
      db.collection('videos').update(
        {'videoId' : videosId }, { $set:{"commentInfos" : obj.commentInfos}}
      );
      res.status(200).send();
      db.close();
    });  
  });
}


module.exports = {updateComments: update};