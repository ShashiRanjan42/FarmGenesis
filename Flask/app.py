from flask import Flask,request,render_template,jsonify
from flask_cors import CORS
import numpy as np
import pandas
import sklearn
import pickle

model = pickle.load(open('model.pkl','rb'))
sc = pickle.load(open('standscaler.pkl','rb'))
mx = pickle.load(open('minmaxscaler.pkl','rb'))


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "<p>Machine Learning</p>"

@app.route("/recommendCrop", methods=['POST'])
def predict():
    data = request.get_json()
    # print("Received data:", data)

    N = data.get('nitrogen')
    P = data.get('phosphorous')
    K = data.get('potassium')
    temp = data.get('temperature')
    humidity = data.get('humidity')
    ph = data.get('phLevel')
    rainfall = data.get('rainfall')
   
    # print(N,P,K,temp,humidity,ph,rainfall)

    feature_list = [N, P, K, temp, humidity, ph, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    mx_features = mx.transform(single_pred)
    sc_mx_features = sc.transform(mx_features)
    prediction = model.predict(sc_mx_features)

    crop_dict = {1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
                 8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
                 14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
                 19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"}

    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = "{} is the best crop to be cultivated right there".format(crop)
    else:
        result = "Sorry, we could not determine the best crop to be cultivated with the provided data."
        
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)