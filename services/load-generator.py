import requests

while True:
    response = requests.get("http://service-a:5000/a")
    print(response.text)

