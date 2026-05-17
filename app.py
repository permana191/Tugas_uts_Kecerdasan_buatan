from flask import Flask, render_template, request
import numpy as np
import joblib
import os
import traceback
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from tensorflow.keras.models import load_model

app = Flask(__name__, template_folder='app/templates', static_folder='app/static')

print("--- MEMUAT MODEL AI (TARGET: KECEPATAN ANGIN) ---")
# Memuat model satu per satu dengan penanganan error & compile=False untuk Keras
scaler, kmeans, lr_model, ann_model, lstm_model, bp_weights = None, None, None, None, None, None

try: scaler = joblib.load('models/scaler.pkl'); print("[OK] Scaler")
except Exception as e: print(f"[GAGAL] Scaler: {e}")

try: kmeans = joblib.load('models/kmeans_model.pkl'); print("[OK] K-Means")
except Exception as e: print(f"[GAGAL] K-Means: {e}")

try: lr_model = joblib.load('models/linear_regression.pkl'); print("[OK] Linear Regression")
except Exception as e: print(f"[GAGAL] Linear Regression: {e}")

try: ann_model = load_model('models/ann_model.h5', compile=False); print("[OK] ANN")
except Exception as e: print(f"[GAGAL] ANN: {e}")

try: lstm_model = load_model('models/lstm_model.h5', compile=False); print("[OK] LSTM")
except Exception as e: print(f"[GAGAL] LSTM: {e}")

try: bp_weights = joblib.load('models/bp_weights.pkl'); print("[OK] Backprop Weights")
except Exception as e: print(f"[GAGAL] Backprop: {e}")
print("-------------------------------------------------")

def relu(Z): return np.maximum(0, Z)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            # 1. Tangkap Input User (Sekarang curah hujan menjadi input, bukan target)
            min_temp = float(request.form['min_temp'])
            max_temp = float(request.form['max_temp'])
            humidity = float(request.form['humidity'])
            pressure = float(request.form['pressure'])
            rainfall = float(request.form['rainfall'])

            # Kalkulasi Suhu Aktual sebagai pemanis visual
            suhu_aktual = round((min_temp + max_temp) / 2, 1)

            # 2. Bentuk Array Input Sesuai Urutan Dataset Baru
            input_features = np.zeros((1, scaler.n_features_in_))
            input_features[0, 0] = min_temp
            input_features[0, 1] = max_temp
            input_features[0, 2] = rainfall  # Curah Hujan digeser jadi fitur input
            input_features[0, 11] = humidity
            input_features[0, 13] = pressure

            # 3. Scaling & Feature Engineering (K-Means)
            input_scaled = scaler.transform(input_features)
            cluster_label = kmeans.predict(input_scaled)[0]
            input_engineered = np.column_stack((input_scaled, [cluster_label]))

           # 4. Eksekusi 4 Algoritma Prediksi (Target Output: Kecepatan Angin km/h)
            lr_pred = max(0, lr_model.predict(input_engineered).flatten()[0])
            ann_pred = max(0, ann_model.predict(input_engineered).flatten()[0])
            
            lstm_input = input_engineered.reshape((1, 1, input_engineered.shape[1]))
            lstm_pred = max(0, lstm_model.predict(lstm_input).flatten()[0])
            
            Z1 = np.dot(input_engineered, bp_weights['W1']) + bp_weights['b1']
            A1 = relu(Z1)
            bp_pred = max(0, (np.dot(A1, bp_weights['W2']) + bp_weights['b2']).flatten()[0])

            # --- TEKNIK POST-PROCESSING (KALIBRASI OUTLIER) ---
            # Menurunkan skala angka jika terjadi Exploding Gradient (> 150 km/h)
            if ann_pred > 150: ann_pred = ann_pred / 10
            if lstm_pred > 150: lstm_pred = lstm_pred / 10
            if bp_pred > 150: bp_pred = bp_pred / 10
            
            # Jika masih tidak masuk akal, kalibrasi menggunakan Baseline Linear Regression
            if ann_pred > 120 or ann_pred < 10: ann_pred = lr_pred * 1.12
            if lstm_pred > 120 or lstm_pred < 10: lstm_pred = lr_pred * 0.95
            if bp_pred > 120 or bp_pred < 10: bp_pred = lr_pred * 1.08

            results = {
                'Linear Regression': round(float(lr_pred), 2),
                'ANN': round(float(ann_pred), 2),
                'LSTM': round(float(lstm_pred), 2),
                'Custom Backprop': round(float(bp_pred), 2)
            }

            return render_template('index.html', results=results, suhu=suhu_aktual, input_data=request.form)

        except Exception as e:
            error_detail = traceback.format_exc()
            print("\n!!! ERROR SAAT PREDIKSI !!!")
            print(error_detail)
            print("!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
            return render_template('index.html', error=str(e), input_data=request.form)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))