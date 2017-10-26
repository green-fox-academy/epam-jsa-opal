'use strict';
let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;
let ObjectID = require('mongodb').ObjectID;
let url = 'mongodb://localhost:27017/epam';
mongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('can not connect to the mongodb server');
  }
  console.log('connected to the server '+url);
  insertData(db, function(result) {
    console.log(result);
  });
  db.close();
});

function insertData(db, consoleFunction) {
  let collection = db.collection('videos');
  let data = [
   {
    "videoId" : "59eecd63abb2117ba6f42a15",
    "videoUrl" : "http://nettuts.s3.amazonaws.com/763_sammyJSIntro/trailer_test.mp4",
    "videoDetails" : {
        "title" : "test video",
        "id" : "59ed7f1f1707c6894c13e013",
        "views" : "1",
        "LikeStatus" : [ 
            {
                "userId" : "",
                "liked" : true,
                "dislied" : false
            }, 
            {
                "userId" : "",
                "liked" : true,
                "dislied" : false
            }
        ],
        "publishDate" : 1508743101405,
    },
    "uploader" : {
        "name" : "uploader name",
        "userId" : "uploader Id",
        "avatar" : "avatar",
        "subscribers" : 1000
    },
    "commentInfos" : [ 
        {
            "username" : "zoe",
            "userId" : "59e02b5d120d8b14a06816b6",
            "avatar" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLDxSdH8lLX-y9TJzLDWZPvoLexXrE8Ft5EAAWaZNyQHVM-yh-3A",
            "commentTime" : 1508743106105,
            "LikeStatus" : [ 
                {
                    "userId" : "",
                    "liked" : true,
                    "dislied" : false
                }, 
                {
                    "userId" : "",
                    "liked" : true,
                    "dislied" : false
                }
            ],
            "commentContent" : "hahaha i like it",
            "commentId" : 1
        }
    ]
  }
  ];

  collection.insert(data, function() {
    return consoleFunction;
  });
}
