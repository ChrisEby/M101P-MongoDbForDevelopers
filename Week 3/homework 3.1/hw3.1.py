__author__ = 'CEby'

import pymongo

connection = pymongo.Connection("localhost")
db = connection.school

x = db.students.aggregate([{"$unwind": "$scores"},
                           {"$match": {"scores.type": "homework"}},
                           {"$group": {'_id': '$_id', 'minitem': {'$min': "$scores.score"}}}])

# Pull out the lowest homework scores
for result in x['result']:
    db.students.update({'_id': result['_id']},
                       {'$pull': {'scores': {'score': result['minitem']}}})

# Gut check
print db.students.find_one({'_id': 100}, {'scores': 'true'})
print db.studentsOrig.find_one({'_id': 100}, {'scores': 'true'})
print db.students.aggregate([{"$unwind": "$scores"},
                             {'$group': {'_id': '$_id', 'average': {'$avg': '$scores.score'}}},
                             {'$sort': {'average': -1}},
                             {'$limit': 1}])
print db.studentsOrig.aggregate([{"$unwind": "$scores"},
                                 {'$group': {'_id': '$_id', 'average': {'$avg': '$scores.score'}}},
                                 {'$sort': {'average': -1}},
                                 {'$limit': 1}])
