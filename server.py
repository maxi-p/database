from flask import Flask
from flask import send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('./client/dist/','index.html')

@app.route('/assets/<file>')
def js_css(file):
    return send_from_directory('./client/dist/assets/',file)

if __name__ == '__main__':
    app.run(debug=True)