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
    res = {'username':'','password':'', 'phone':'', 'firstname':'','lastname':'','email':'', 'message':''}
    field_names = [i[0] for i in my_cursor.description]
    for ret in my_cursor:
        for i, x in enumerate(ret):
            res[field_names[i]] = x
    if res['username'] == '':
        res['message'] = 'incorrect credentials'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201   

@app.route('/api/register', methods=["POST"])
def register():
    data=request.get_json()
    try:
        res = {'username':data['username'],'password':data['password'], 'phone':data['phone'], 'firstname':data['firstname'],'lastname':data['lastname'],'email':data['email'], 'message':''}
        mydb, my_cursor = dbconnect()
        query = ("INSERT INTO "
                 "User(username,firstname, lastname,password, email, phone)"
                 "VALUES(%s,%s,%s,%s,%s,%s)")

        my_cursor.execute(query, (data['username'],data['firstname'],data['lastname'],data['password'],data['email'],data['phone']))
        count = my_cursor.rowcount
        if count == 0 or data['username'] == '':
            res['message'] = 'user not created'
        mydb.commit()     
    except:
        res['message'] = 'an error has occured'
    
    dbclose((mydb, my_cursor))
    return jsonify(res),201  

if __name__ == '__main__':
    app.run(debug=True)