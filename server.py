from flask import Flask,request, jsonify
from flask import send_from_directory
import mysql.connector
import config

app = Flask(__name__)

def dbconnect():
    mydb = mysql.connector.connect(
        host=config.mysql['host'],
        user=config.mysql['user'],
        passwd = config.mysql['passwd'],
        database=config.mysql['database']
    )
    my_cursor = mydb.cursor()
    return (mydb, my_cursor)

def dbclose(tuple):
   mydb, my_cursor = tuple
   mydb.close()
   my_cursor.close()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory('./client/dist/','index.html')


@app.route('/assets/<file>')
def js_css(file):
    return send_from_directory('./client/dist/assets/',file)

@app.route('/api/login', methods=["POST"])
def login():
    data=request.get_json()
    mydb, my_cursor = dbconnect()
    query = ("SELECT * FROM User WHERE username= %s AND password=%s")
    my_cursor.execute(query, (data['username'],data['password']))
    res = {'username':'','password':'', 'phone':'', 'firstname':'','lastname':'','email':'','university':'','level':'', 'message':''}
    field_names = [i[0] for i in my_cursor.description]
    for ret in my_cursor:
        for i, x in enumerate(ret):
            res[field_names[i]] = x
    if res['username'] == '':
        res['message'] = 'incorrect credentials'
    student = ("SELECT university_id from Student WHERE username=%s")
    admin = ("SELECT university_id from Admin WHERE username=%s")
    super_admin = ("SELECT username from Super_Admin WHERE username=%s")
    uid = 0
    
    my_cursor.execute(super_admin, (data['username'],))
    for ret in my_cursor:
        uid = -1
    if uid != 0:
        res['level'] = 'super_admin'
        dbclose((mydb, my_cursor))
        return jsonify(res),201   
    
    my_cursor.execute(admin, (data['username'],))
    for ret in my_cursor:
        uid = ret[0]
    if uid != 0:
        res['level'] = 'admin'
        res['university'] = uid
        dbclose((mydb, my_cursor))
        return jsonify(res),201
    
    my_cursor.execute(student, (data['username'],))
    for ret in my_cursor:
        uid = ret[0]
    if uid !=0:
        res['level'] = 'student'
        res['university'] = uid

    dbclose((mydb, my_cursor))
    return jsonify(res),201   

@app.route('/api/getComments', methods=['POST'])
def getComments():
    data=request.get_json()
    mydb, my_cursor = dbconnect()
    query = ("SELECT * FROM Commented WHERE event_id = %s")

    arr = []
    my_cursor.execute(query, (data['event_id'],))
    for ret in my_cursor:
        arr.append({'id':ret[0],'event_id':ret[1],'student_username':ret[2],'text':ret[3], 'timestamp': ret[4]})
    res = {'comments': arr, 'message':''}
    if len(arr) == 0:
        res['message'] = 'no comments on this event yet...'
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/addComment', methods=['POST'])
def addComment():
    data=request.get_json()
    mydb, my_cursor = dbconnect()
    insert = ("INSERT INTO Commented" 
              "(event_id, student_username, text, timestamp)"
              "VALUES (%s, %s, %s, %s)")

    my_cursor.execute(insert, (data['event_id'],data['student_username'],data['text'],data['timestamp']))
    lastrowid = my_cursor.lastrowid
    if lastrowid != 0:
        res = {'message':'comment '+ str(lastrowid) +' was posted'}
        mydb.commit()
    else:
        res['message'] = 'comment was not posted'
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/getUniversities', methods=['POST'])
def universities():
    mydb, my_cursor = dbconnect()
    query = ("SELECT id, name FROM University")
    my_cursor.execute(query)
    
    arr = []
    for ret in my_cursor:
        arr.append({'id':ret[0],'name':ret[1]})
    res = {'universities': arr, 'message':''}
    if len(arr) == 0:
        res['message'] = 'no universities returned'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/getPendingAdmins', methods=['POST'])
def pendingAdmins():
    mydb, my_cursor = dbconnect()
    query = ("SELECT username FROM Pending_Admin")
    my_cursor.execute(query)
    
    arr = []
    for ret in my_cursor:
        arr.append({'username':ret[0]})
    res = {'pendingAdmins': arr, 'message':''}
    if len(arr) == 0:
        res['message'] = 'no universities returned'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/getPendingEvents', methods=['POST'])
def pendingEvents():
    mydb, my_cursor = dbconnect()
    query = ("SELECT * FROM Pending_Event P INNER JOIN Event E ON P.id=E.id")
    my_cursor.execute(query)
    
    arr = []
    for ret in my_cursor:
        arr.append({'id':ret[0],'location_id':ret[2],'category_id':ret[3],'contact_username':ret[4],'name':ret[5],'timestamp':ret[6],'description':ret[7]})
    res = {'pendingEvents': arr, 'message':''}
    if len(arr) == 0:
        res['message'] = 'no pending events returned'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/getEvent', methods=['POST'])
def getEvent():
    # SELECT E.id, E.name, C.name AS category_name, E.contact_username, E.timestamp, E.description, L.name AS location_name, L.latitude, L.longitude FROM Event E INNER JOIN Location L ON E.location_id=L.id INNER JOIN Event_Category C ON E.category_id=C.id
    # INNER JOIN Public_Event U ON E.id=U.id
    res = {'message':''}
    mydb, my_cursor = dbconnect()
    try:
        data=request.get_json()
        print(data)

        public = ("SELECT * FROM Public_Event INNER JOIN Event ON Public_Event.id=Event.id WHERE Public_Event.id=%s")
        private = ("SELECT * FROM Private_Event INNER JOIN Event ON Private_Event.id=Event.id WHERE Private_Event.id=%s")
        rso = ("SELECT * FROM Rso_Event INNER JOIN Event ON Rso_Event.id=Event.id WHERE Rso_Event.id=%s")

        eid = -1
        resEvent = {}

        my_cursor.execute(public, (data['id'],))
        for ret in my_cursor:
            resEvent = {'id':ret[0],'location_id':ret[2],'category_id':ret[3],'contact_username':ret[4],'name':ret[5],'timestamp':ret[6],'description':ret[7]}
            eid = ret[0]
        if eid != -1:
            res['event'] = resEvent
            dbclose((mydb, my_cursor))
            return jsonify(res),201 

        my_cursor.execute(private,(data['id'],))
        for ret in my_cursor:
            resEvent = {'id':ret[0],'university_id':ret[1],'location_id':ret[3],'category_id':ret[4],'contact_username':ret[5],'name':ret[6],'timestamp':ret[7],'description':ret[8]}
            eid = ret
        if eid != -1:
            res['event'] = resEvent
            dbclose((mydb, my_cursor))
            return jsonify(res),201 
        
        my_cursor.execute(rso,(data['id'],))
        for ret in my_cursor:
            resEvent = {'id':ret[0],'rso_id':ret[1],'location_id':ret[3],'category_id':ret[4],'contact_username':ret[5],'name':ret[6],'timestamp':ret[7],'description':ret[8]}
            eid = ret
        if eid != -1:
            res['event'] = resEvent
            dbclose((mydb, my_cursor))
            return jsonify(res),201 

        
    except:
        dbclose((mydb, my_cursor))
        res['message'] = 'There has been an error'

    dbclose((mydb, my_cursor))
    return jsonify(res),201 

@app.route('/api/getRso', methods=['POST'])
def getRso():
    res = {'message':''}
    mydb, my_cursor = dbconnect()
    try:
        data=request.get_json()
        # print(data)

        query = ("SELECT * FROM Rso WHERE Rso.id=%s")
        participants = ("SELECT student_username FROM Participates WHERE Participates.rso_id=%s")

        rso = {}
        members = []
        rid = -1
        my_cursor.execute(query, (data['id'],))
        for ret in my_cursor:
            # print(ret)
            rso = {'id':ret[0],'owner_username':ret[1],'name':ret[2],'status':ret[3]}
            rid = ret[2]
        if rid != -1:
            my_cursor.execute(participants, (data['id'],))
            for (student_username,) in my_cursor:
                members.append(student_username)
        else:
            dbclose((mydb, my_cursor))
            res['message'] = 'RSO not found'
            return jsonify(res),201
        rso['participants'] = members
        res['rso'] = rso 
        print(res)
    except:
        dbclose((mydb, my_cursor))
        res['message'] = 'There has been an error'

    dbclose((mydb, my_cursor))
    return jsonify(res),201 

@app.route('/api/getEvents', methods=['POST'])
def getEvents():
    # SELECT E.id, E.name, C.name AS category_name, E.contact_username, E.timestamp, E.description, L.name AS location_name, L.latitude, L.longitude FROM Event E INNER JOIN Location L ON E.location_id=L.id INNER JOIN Event_Category C ON E.category_id=C.id
    # INNER JOIN Public_Event U ON E.id=U.id
    res = {'message':''}
    public_arr, private_arr, rso_arr = [],[],[]
    mydb, my_cursor = dbconnect()
    try:
        data=request.get_json()
        print(data)

        public = ("SELECT * FROM Public_Event" 
                  "INNER JOIN Event ON Public_Event.id=Event.id")
        
        private = ("SELECT * FROM Private_Event" 
                   "INNER JOIN Event ON Private_Event.id=Event.id" 
                   "INNER JOIN (SELECT university_id FROM Student WHERE username=%s) AS T" 
                   "ON Private_Event.university_id=T.university_id;")
        
        rso = ("SELECT * FROM RSO_Event" 
               "INNER JOIN Event ON RSO_Event.id=Event.id" 
               "INNER JOIN (SELECT rso_id FROM Participates WHERE student_username=%s) AS T" 
               "ON RSO_Event.rso_id=T.rso_id;")

        if data['public'] == True:
            my_cursor.execute(public)
            for ret in my_cursor:
                public_arr.append({'id':ret[0],'location_id':ret[2],'category_id':ret[3],'contact_username':ret[4],'name':ret[5],'timestamp':ret[6],'description':ret[7]})

        if data['private'] == True:
            my_cursor.execute(private,(data['username'],))
            for ret in my_cursor:
                private_arr.append({'id':ret[0],'university_id':ret[1],'location_id':ret[3],'category_id':ret[4],'contact_username':ret[5],'name':ret[6],'timestamp':ret[7],'description':ret[8]})

        if data['rso'] == True:
            my_cursor.execute(rso,(data['username'],))
            for ret in my_cursor:
                rso_arr.append({'id':ret[0],'rso_id':ret[1],'location_id':ret[3],'category_id':ret[4],'contact_username':ret[5],'name':ret[6],'timestamp':ret[7],'description':ret[8]})

        res['public_event'] = public_arr
        res['private_event'] = private_arr
        res['rso_event'] = rso_arr
    except:
        dbclose((mydb, my_cursor))
        res['message'] = 'There has been an error'

    dbclose((mydb, my_cursor))
    return jsonify(res),201 

@app.route('/api/requestToBeAdmin', methods=["POST"])
def requestToBeAdmin():
    data=request.get_json()
    print(data)
    res = {'message':''}
    if data['level'] != 'student':
        res['message'] = 'You are already an promoted'
        return jsonify(res),201
    
    try:
        mydb, my_cursor = dbconnect()
        query = ("INSERT INTO "
                 "Pending_Admin(username,university_id)"
                 "VALUES(%s,%s)")

        my_cursor.execute(query, (data['username'],data['university']))
        count = my_cursor.rowcount
        if count == 0 or data['username'] == '':
            res['message'] = 'request was not executed'
            dbclose((mydb, my_cursor))
            return jsonify(res),201
        mydb.commit() 
        res['message'] = 'request has been sent'
    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/leaveRso', methods=["POST"])
def leaveRso():
    data=request.get_json()
    print(data)
    res = {'message':''}


    mydb, my_cursor = dbconnect()
    admin_check = ("SELECT * FROM RSO WHERE "
             "id=%s AND owner_username=%s")
    delete = ("DELETE FROM Participates WHERE "
             "rso_id=%s AND student_username=%s")
    
    my_cursor.execute(admin_check, (data['id'],data['username']))         
    count = 0
    for found_admin in my_cursor:
        count = 1
    print("admin count ",count)
    my_cursor.fetchall()
    if count != 0:
        res['message'] = 'You are the admin in this RSO'
        dbclose((mydb, my_cursor))
        return jsonify(res),201
    my_cursor.execute(delete, (data['id'],data['username']))
    count = my_cursor.rowcount
    my_cursor.fetchall()
    print(count)
    if count == 0 or data['username'] == '':
        res['message'] = 'user was not removed from RSO'
        dbclose((mydb, my_cursor))
        return jsonify(res),201
    mydb.commit() 
    res['message'] = ''
    # except:
    #     res['message'] = 'There was an error'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/createRso', methods=["POST"])
def createRso():
    data=request.get_json()
    print(data)
    res = {'message':''}
    rid = -1
    
    try:
        mydb, my_cursor = dbconnect()
        query = ("INSERT INTO RSO" 
                 "(owner_username, name, status)"
                 "VALUES  (%s, %s, 'inact')")
        join = ("INSERT INTO Participates" 
                "(rso_id, student_username)"
                "VALUES  (%s, %s)")
        my_cursor.execute(query, (data['owner_username'],data['name']))
        count = my_cursor.rowcount

        print(count)
        if count == 0 or data['name'] == '':
            res['message'] = 'request was not executed'
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        rid = my_cursor.lastrowid
        print(rid)
        my_cursor.execute(join, (rid, data['owner_username']))
        count = my_cursor.rowcount
        if count == 0 or data['owner_username'] == '':
            res['message'] = 'request was not executed'
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        if data['username1'] != '':
            my_cursor.execute(join, (rid, data['username1']))
        if data['username2'] != '':
            my_cursor.execute(join, (rid, data['username2']))
        if data['username3'] != '':
            my_cursor.execute(join, (rid, data['username3']))
        if data['username4'] != '':
            my_cursor.execute(join, (rid, data['username4']))

        mydb.commit() 
        res['message'] = ''
        res['id'] = rid
    except:
        res['message'] = 'There was an error'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/createEvent', methods=["POST"])
def createEvent():
    data=request.get_json()
    print(data)
    res = {'message':''}
    
    location = ("INSERT INTO Location" 
                "(name, latitude, longitude)"
                "VALUES  (%s, %s, %s)")
    event = ("INSERT INTO Event" 
             "(location_id, category_id, contact_username, name, timestamp, description)"
             "VALUES (%s, %s, %s, %s, %s, %s)")
    try:
        mydb, my_cursor = dbconnect()
        my_cursor.execute(location, (data['location_name'],data['latitude'],data['longitude']))
        
        lid = my_cursor.lastrowid
        print("lid",lid)
        if lid > 0:
            my_cursor.execute(event, (lid, data['category'],data['contact_username'],data['name'],data['timestamp'],data['description']))
            
            eid = my_cursor.lastrowid
            print("eid", eid)
            if eid > 0:
                if data['type'] == 'public':
                    public = ("INSERT INTO Pending_Event (id) VALUES(%s)")
                    my_cursor.execute(public, (eid,))
                    res['message'] = 'public event inserted'
                    res['eid'] = eid
                    mydb.commit()
                elif data['type'] == 'private':
                    private = ("INSERT INTO Private_Event (id, university_id) VALUES(%s, %s)")
                    my_cursor.execute(private, (eid, data['university']))
                    res['message'] = 'private event inserted'
                    res['eid'] = eid
                    mydb.commit()
                else: # RSO
                    rso = ("INSERT INTO Rso_Event (id, rso_id) VALUES(%s, %s)")
                    my_cursor.execute(rso, (eid, data['rso']))
                    res['message'] = 'rso event inserted'
                    res['eid'] = eid
                    mydb.commit()

    except Exception as e:
        print(e)
        res['message'] = 'There was an error'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/getRsos', methods=["POST"])
def getRsos():
    data=request.get_json()
    print(data)
    res = {'message':''}
    rsos = []

    try:
        mydb, my_cursor = dbconnect()
        query = ("SELECT * from Participates INNER JOIN Rso ON Rso.id=Participates.rso_id WHERE Participates.student_username=%s")

        my_cursor.execute(query, (data['username'],))
        for ret in my_cursor:
            rsos.append({'id':ret[2],'owner_username':ret[3],'name':ret[4],'status':ret[5]})
        res['rsos'] = rsos
    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/getAllRsos', methods=["POST"])
def getAllRsos():
    data=request.get_json()
    print(data)
    res = {'message':''}
    rsos = []
    myRsos = []

    try:
        mydb, my_cursor = dbconnect()
        query = ("SELECT * FROM RSO R WHERE NOT EXISTS (SELECT * FROM Participates P WHERE P.rso_id=R.id AND P.student_username=%s)")
        myQuery = ("SELECT * from Participates INNER JOIN Rso ON Rso.id=Participates.rso_id WHERE Participates.student_username=%s")

        my_cursor.execute(query, (data['username'],))
        for ret in my_cursor:
            rsos.append({'id':ret[0],'owner_username':ret[1],'name':ret[2],'status':ret[3]})
        res['rsos'] = rsos
        
        my_cursor.execute(myQuery, (data['username'],))
        for ret in my_cursor:
            myRsos.append({'id':ret[2],'owner_username':ret[3],'name':ret[4],'status':ret[5]})
        res['myRsos'] = myRsos

    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/editComment', methods=["POST"])
def editComment():
    data=request.get_json()
    print(data)
    res = {'message':''}
    
    try:
        mydb, my_cursor = dbconnect()
        update = ("UPDATE Commented C "
                  "SET C.text=%s "
                  "WHERE C.id=%s ")
        
        my_cursor.execute(update, (data['newComment'], data['id']))

        count = my_cursor.rowcount
        if count == 0:
            res['message'] = 'error: comment was not edited'
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        mydb.commit() 
    except:
        res['message'] = 'There was an error'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/deleteComment', methods=["POST"])
def deleteComment():
    data=request.get_json()
    print(data)
    res = {'message':''}
    
    try:
        mydb, my_cursor = dbconnect()
        delete = ("DELETE FROM Commented C "
                  "WHERE C.id=%s ")
        
        my_cursor.execute(delete, (data['id'],))

        count = my_cursor.rowcount
        if count == 0:
            res['message'] = 'error: comment was not deleted'
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        mydb.commit() 
    except:
        res['message'] = 'There was an error'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201


@app.route('/api/joinRso', methods=["POST"])
def joinRSO():
    data=request.get_json()
    print(data)
    res = {'message':''}
    
    try:
        mydb, my_cursor = dbconnect()
        join = ("INSERT INTO Participates" 
                "(rso_id, student_username) "
                 "VALUES  (%s, %s)")
        
        my_cursor.execute(join, (data['id'], data['username']))
        count = my_cursor.rowcount
        
        if count == 0 or data['username'] == '':
            res['message'] = 'error: RSO was not joined'
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        mydb.commit() 
        res['message'] = 'Joined RSO '+ data['id']
    except:
        res['message'] = 'There was an error'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/decidePending', methods=["POST"])
def decidePending():
    data=request.get_json()
    print(data)
    res = {'message':''}
    
    try:
        mydb, my_cursor = dbconnect()
        select = ("SELECT username, university_id FROM Pending_Admin "
                  "WHERE username=%s")
        delete = ("DELETE FROM Pending_Admin "
                  "WHERE username=%s")
        insert = ("INSERT INTO "
                 "Admin(username,university_id) "
                 "VALUES(%s,%s)")
        uname = ''
        uid = ''
        my_cursor.execute(select, (data['username'],))
        for ret in my_cursor:
            print(ret)
            uname = ret[0]
            uid = ret[1]

        my_cursor.execute(delete, (uname,))
        count = my_cursor.rowcount
        if count == 0 == '':
            res['message'] = 'user was not deleted from pending'
            dbclose((mydb, my_cursor))
            return jsonify(res),201
        
        if data['decision'] == 'reject':
            res['message'] = 'User '+data['username']+' was successfully rejected.'
            mydb.commit() 
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        my_cursor.execute(insert, (uname, uid))
        count = my_cursor.rowcount
        if count == 0 or data['username'] == '':
            res['message'] = 'user was not inserted into admin'
            dbclose((mydb, my_cursor))
            return jsonify(res),201
        
        mydb.commit() 
        res['message'] = 'User '+data['username']+' was successfully accepted.'
    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/decidePendingEvent', methods=["POST"])
def decidePendingEvent():
    data=request.get_json()
    print(data)
    res = {'message':''}
    
    try:
        mydb, my_cursor = dbconnect()
        delete = ("DELETE FROM Pending_Event "
                  "WHERE id=%s")
        insert = ("INSERT INTO "
                 "Public_Event(id) "
                 "VALUES(%s)")

        my_cursor.execute(delete, (data['id'],))
        count = my_cursor.rowcount
        if count == 0 or data['id'] == '':
            res['message'] = 'pending event '+data['name']+' was not deleted from pending list'
            dbclose((mydb, my_cursor))
            return jsonify(res),201
        
        if data['decision'] == 'reject':
            res['message'] = 'Event '+data['name']+' was successfully rejected.'
            mydb.commit() 
            dbclose((mydb, my_cursor))
            return jsonify(res),201

        my_cursor.execute(insert, (data['id'],))
        count = my_cursor.rowcount
        if count == 0 or data['id'] == '':
            res['message'] = 'event '+ data['name']+' was not inserted into public event list'
            dbclose((mydb, my_cursor))
            return jsonify(res),201
        
        mydb.commit() 
        res['message'] = 'Event '+data['name']+' was successfully approved.'
    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201

@app.route('/api/register', methods=["POST"])
def register():
    data=request.get_json()
    print(data)
    try:
        res = {'level':'student','university':data['university'],'username':data['username'],'password':data['password'], 'phone':data['phone'], 'firstname':data['firstname'],'lastname':data['lastname'],'email':data['email'], 'message':''}
        mydb, my_cursor = dbconnect()
        query = ("INSERT INTO "
                 "User(username,firstname, lastname,password, email, phone)"
                 "VALUES(%s,%s,%s,%s,%s,%s)")
        query2 = ("INSERT INTO "
                 "Student(username, university_id)"
                 "VALUES(%s,%s)")

        my_cursor.execute(query, (data['username'],data['firstname'],data['lastname'],data['password'],data['email'],data['phone']))
        count = my_cursor.rowcount
        if count == 0 or data['username'] == '':
            res['message'] = 'user not created'
        my_cursor.execute(query2, (data['username'],data['university']))
        count = my_cursor.rowcount
        if count == 0 or data['username'] == '':
            res['message'] = 'student not created'
        mydb.commit()     
    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201  

if __name__ == '__main__':
    app.run(debug=True)