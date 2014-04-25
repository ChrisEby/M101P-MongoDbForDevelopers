# Wrong but close
db.zips.aggregate( [ { $match: { $and: [ { "pop": { $gt: 25000 } }, { $or: [ { "state": "CT" }, { "state": "NJ" } ] } ] } }, { $group: { _id: "_id" , average: { $avg: "$pop" } } }, { $sort: { average: 1 } } ] );

# Same using in for states
db.zips.aggregate( [ { $match: { $and: [ { "pop": { $gt: 25000 } }, { "state": { $in: ["CT", "NJ"] } } ] } }, { $group: { _id: "_id" , average: { $avg: "$pop" } } }, { $sort: { average: 1 } } ] );

# Remove sort
db.zips.aggregate( [ { $match: { $and: [ { "pop": { $gt: 25000 } }, { "state": { $in: ["CT", "NJ"] } } ] } }, { $group: { _id: "_id" , average: { $avg: "$pop" } } } ] );

# Just CT pver 25k - 35,892
db.zips.aggregate( [ { $match: { $and: [ { pop: { $gt: 25000 } }, { state: "CT" } ] } }, { $group: { _id: "_id" , average: { $avg: "$pop" } } } ] );

# Just NJ over 25k - 35,800
db.zips.aggregate( [ { $match: { $and: [ { pop: { $gt: 25000 } }, { state: "NJ" } ] } }, { $group: { _id: "_id" , average: { $avg: "$pop" } } } ] );

# Just pop over 25k - 37,831
db.zips.aggregate( [ { $match: { $and: [ { "pop": { $gt: 25000 } } ] } }, { $group: { _id: "_id" , average: { $avg: "$pop" } } } ] );

# Group by city
db.zips.aggregate( [ { $match: { $and: [ { "pop": { $gt: 25000 } }, { "state": { $in: ["CT", "NJ"] } } ] } }, { $group: { _id: "$city" , average: { $avg: "$pop" } } } ] );

# Playing with the grouping
db.zips.aggregate( [ 
	{ $match: { 
		$and: [ 
			{ pop: { $gt: 25000 } }, 
			{ state: { $in: ["CT", "NJ"] } } 
		] 
	} }, 
	{ $group: { 
		_id: "$state", 
		average: { $avg: "$pop" } 
	} } 
] );

# avg city pop from docs
db.zips.aggregate( { 
	$group :
		{ _id : { state : "$state", city : "$city" },
        pop : { $sum : "$pop" } } 
	}, { 
	$group :
		{ _id : "$_id.state",
        avgCityPop : { $avg : "$pop" } } 
	} 
)

# Getting closer
db.zips.aggregate( [
	{ $match: { 
		pop: { $gt: 25000 }
	} },
	{ $match: { 
		state: { $in: ["CT", "NJ"] }
	} },
	{ $group : { 
			_id : { state : "$state", city : "$city" },
			pop : { $sum : "$pop" } 
		} 
	}, 
	{ $group : { 
			_id : "$_id.state",
			avgCityPop : { $avg : "$pop" } 
		} 
	}, 
	{ $group : { 
			_id : null,
			avgPop : { $avg : "$avgCityPop" } 
		} 
	}
] )