use homework

db.zips.aggregate([
    { $project: { first_char: {$substr : ["$city", 0, 1]}, pop: "$pop" } },
	{ $match: { $or: [ {first_char: '0'}, {first_char: '1'}, {first_char: '2'}, {first_char: '3'}, {first_char: '4'}, {first_char: '5'}, {first_char: '6'}, {first_char: '7'}, {first_char: '8'}, {first_char: '9'} ] } },
	{ $group: { _id: null, total: { $sum: '$pop' } } }
])

db.zips.aggregate([
    { $project: { first_char: {$substr : ["$city", 0, 1]}, pop: "$pop" } },
	{ $match: { first_char: { $regex: /^[0-9]/ } } },
	{ $group: { _id: null, total: { $sum: '$pop' } } }
])

db.zips.aggregate([
	{ $match: { city: { $regex: /^[0-9]/ } } }, 
	{ $group: { _id: null, sum: { $sum: '$pop' } } }
])