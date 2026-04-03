from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

from goal_planner import goal_planner

app = Flask(__name__)
CORS(app)

# ==============================
# Load Model
# ==============================
try:
    model = joblib.load("model.pkl")
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Model loading failed:", e)
    model = None


# ==============================
# Helper Functions
# ==============================
def get_behavior_label(pred):
    return {
        0: "Saver 💰",
        1: "Balanced 👍",
        2: "Overspender ⚠️"
    }.get(pred, "Unknown")


def get_score(pred):
    return {
        0: 85,
        1: 65,
        2: 45
    }.get(pred, 50)


def get_expense_tip(data):
    income = data.get("income", 1)

    if income <= 0:
        return "Invalid income data"

    food_ratio = data.get("food", 0) / income
    rent_ratio = data.get("rent", 0) / income

    if food_ratio > 0.3:
        return "You are spending too much on food 🍔"
    elif rent_ratio > 0.4:
        return "Your rent is too high compared to income 🏠"
    else:
        return "Your spending looks balanced 👍"


# ==============================
# Routes
# ==============================

@app.route("/")
def home():
    return "FinDNA Backend Running 🚀"


# 🔥 SIMPLE PREDICT (for testing / frontend basic use)
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        data = request.get_json()

        income = float(data.get("income", 0))
        rent = float(data.get("rent", 0))
        food = float(data.get("food", 0))
        travel = float(data.get("travel", 0))

        if income <= 0:
            return jsonify({"error": "Income must be greater than 0"}), 400

        features = np.array([[income, rent, food, travel]])

        pred = model.predict(features)[0]

        return jsonify({
            "prediction": int(pred),
            "behavior": get_behavior_label(pred),
            "score": get_score(pred)
        })

    except Exception as e:
        print("❌ Predict Error:", str(e))
        return jsonify({"error": "Prediction failed"}), 500


# 🔥 FULL ANALYSIS (main feature)
@app.route("/full_analysis", methods=["POST"])
def full_analysis():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        data = request.get_json()

        # ======================
        # Validation
        # ======================
        required_fields = ["income", "rent", "food", "travel", "goal_type"]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400

        income = float(data.get("income"))
        rent = float(data.get("rent"))
        food = float(data.get("food"))
        travel = float(data.get("travel"))

        if income <= 0:
            return jsonify({"error": "Income must be greater than 0"}), 400

        # ======================
        # ML Prediction
        # ======================
        features = np.array([[income, rent, food, travel]])
        pred = model.predict(features)[0]

        behavior = get_behavior_label(pred)
        score = get_score(pred)
        tip = get_expense_tip(data)

        print("📥 Input:", data)
        print("🤖 Prediction:", behavior)

        # ======================
        # Goal Planning
        # ======================
        goal_result = goal_planner(
            data.get("goal_type"),
            data.get("category"),
            float(data.get("price", 0)),
            int(data.get("months", 12))
        )

        # ======================
        # Final Response
        # ======================
        return jsonify({
            "financial_behavior": behavior,
            "score": score,
            "future_price": goal_result.get("future_price"),
            "monthly_saving": goal_result.get("monthly_saving"),
            "tip": tip
        })

    except Exception as e:
        print("❌ Full Analysis Error:", str(e))
        return jsonify({"error": "Internal server error"}), 500


# ==============================
# Run App
# ==============================
if __name__ == "__main__":
    app.run(debug=True)