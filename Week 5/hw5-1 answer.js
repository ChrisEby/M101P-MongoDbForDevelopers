db.posts.aggregate( [ { $unwind: "$comments" }, { $group: { _id: { author: "$comments.author" }, count: { $sum: 1 } } }, { $sort: { count: 1 } } ] );

db.posts.aggregate( [ { $unwind: "$comments" }, { $group: { _id: { author: "$comments.author" }, count: { $sum: 1 } } }, { $sort: { count: -1 } } ] );