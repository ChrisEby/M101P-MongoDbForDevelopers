hw5-3 scratch

# shit from 5.2
db.grades.aggregate( [
	{ $match: { 
		'$scores.type': { $ne: 'quiz' }
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
			_id : "",
			avgPop : { $avg : "$avgCityPop" } 
		} 
	}
] )

select
	student_id,
	class_id,
	average(scores.score)
from
	grades
where
	scores.type <> 'quiz'
group by
	student_id,
	class_id

select
	class_id,
	avg_score
from (
	select
		student_id,
		class_id,
		avg_score = average(scores.score)
	from
		grades
	where
		scores.type <> 'quiz'
	group by
		student_id,
		class_id
)
order by
	avg_score desc

db.grades.aggregate(
	{ $match : { score : { $gte : 65 }, type:'exam' }}, 
	{ $group:{_id:'$student_id',count:{$sum: 1}, score :{ $min:'$score'}}}, 
	{'$sort':{'score':1}}, 
	{'$limit':1}
);
 