import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the students database
db=connection.students
grades = db.grades


def find():

    query = {'type':'homework'}
    sorting = [('student_id',pymongo.ASCENDING),('score',pymongo.ASCENDING)]

    homework = grades.find(query)
    homework = homework.sort(sorting)

    previous_student_id = -1
    for doc in homework:
        print doc
        if  previous_student_id != doc['student_id']:
            db.grades.remove(doc)
            print "Removed document: ", doc

        previous_student_id = doc['student_id']

find()