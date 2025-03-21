from flask import Flask
import requests

app = Flask(__name__)

@app.route('/a', methods=['GET'])
def service_a():
    response = requests.get("http://service-b:5001/b")
    return f"Service A -> {response.text}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

