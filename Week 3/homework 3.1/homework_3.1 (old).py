import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the school database
db=connection.school
students = db.students


def find():

    query = {'type':'homework'}
    sorting = [('student_id',pymongo.ASCENDING),('score',pymongo.ASCENDING)]

    try:
        x= students.find(query)
        x= x.sort(sorting)

    except:
        print "Unexpected error:"

    previous_student_id = -1
    for doc in x:
        print doc
        if  previous_student_id != doc['student_id']:
            db.students.remove(doc)
            print "Removed document: ", doc

        previous_student_id = doc['student_id']

find()