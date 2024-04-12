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
        if count == 0 or data['username'] == '':
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