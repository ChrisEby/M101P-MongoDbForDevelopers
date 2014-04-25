use homework

db.zips.aggregate( [
	{ $match: { $or: [{ state: 'CA' }, { state: 'NY' }] } }, 
	{ $group: { _id: { city: '$city', state: '$state' }, pop: { $sum: '$pop'} } }, 
	{ $match: { pop: { $gt: 25000 } } }, 
	{ $group: {  _id: null, avg: { $avg: '$pop' } } }
] )

db.zips.aggregate( [
	{ $match: { state: { $in: ["CA", "NY"] } } },
	{ $group : { _id : { state : "$state", city : "$city" }, pop : { $sum : "$pop" } } }, 
	{ $match: { pop: { $gt: 25000 } } },
	{ $group : { _id : null, avgPop : { $avg : "$pop" } } }
] )