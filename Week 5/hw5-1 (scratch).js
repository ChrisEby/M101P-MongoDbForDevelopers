.aggregate([
    { $match: { /* Query can go here, if you want to filter results. */ } } 
  , { $project: { tokens: 1 } } /* select the tokens field as something we want to "send" to the next command in the chain */
  , { $unwind: '$tokens' } /* this converts arrays into unique documents for counting */
  , { $group: { /* execute 'grouping' */
          _id: { token: '$tokens' } /* using the 'token' value as the _id */
        , count: { $sum: 1 } /* create a sum value */
      }
    }
], function(err, topTopics) {
  console.log(topTopics);
  // [ foo: 4, bar: 2 baz: 2 ]
});

db.posts.aggregate([
    { $match: { /* Query can go here, if you want to filter results. */ } } 
  , { $project: { comments: 1 } } /* select the tokens field as something we want to "send" to the next command in the chain */
  , { $unwind: '$comments' } /* this converts arrays into unique documents for counting */
  , { $group: { /* execute 'grouping' */
          _id: { comment: '$comments' } /* using the 'token' value as the _id */
        , count: { $sum: 1 } /* create a sum value */
      }
    }
], function(err, topTopics) {
  console.log(topTopics);
  // [ foo: 4, bar: 2 baz: 2 ]
});

db.posts.aggregate( [ { $unwind: "$comments" }, { $group: { _id: { comment: "$comments" }, count: { $sum: 1 } } }, { $limit: 5 }, { $sort: { count: 1 } } ] );

db.posts.aggregate( [ { $unwind: "$comments" }, { $group: { _id: { author: "$comments.author" }, count: { $sum: 1 } } }, { $limit: 5 }, { $sort: { count: 1 } } ] );

db.posts.aggregate( [ { $unwind: "$comments" }, { $group: { _id: { author: "$comments.author" }, count: { $sum: 1 } } }, { $sort: { count: 1 } } ] );