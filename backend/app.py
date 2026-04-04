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


# 🔥 SCORING SYSTEM
def calculate_score(data):
    income = data.get("income", 1)

    total_expense = (
        data.get("rent", 0) +
        data.get("food", 0) +
        data.get("travel", 0)
    )

    if income <= 0:
        return 1

    ratio = total_expense / income

    if ratio < 0.3:
        return 9
    elif ratio < 0.5:
        return 7
    elif ratio < 0.7:
        return 5
    elif ratio < 0.9:
        return 3
    else:
        return 1


def get_score_label(score):
    if score >= 8:
        return "Excellent 🟢"
    elif score >= 5:
        return "Good 🟡"
    else:
        return "Poor 🔴"


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


# 🔥 NEW: AFFORDABILITY FUNCTION
def check_affordability(data, monthly_saving):
    income = data.get("income", 0)

    total_expense = (
        data.get("rent", 0) +
        data.get("food", 0) +
        data.get("travel", 0)
    )

    available_money = income - total_expense

    if available_money <= 0:
        return False, "You have no savings left after expenses ❌"

    if monthly_saving > available_money:
        return False, "This goal is not affordable with your current income ❌"
    else:
        return True, "You can afford this goal ✅"


# ==============================
# Routes
# ==============================

@app.route("/")
def home():
    return "FinDNA Backend Running 🚀"


# 🔥 SIMPLE PREDICT
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

        score = calculate_score(data)
        score_label = get_score_label(score)

        return jsonify({
            "prediction": int(pred),
            "behavior": get_behavior_label(pred),
            "score": score,
            "score_label": score_label
        })

    except Exception as e:
        print("❌ Predict Error:", str(e))
        return jsonify({"error": "Prediction failed"}), 500


# 🔥 FULL ANALYSIS (MAIN)
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

        # ======================
        # SCORE
        # ======================
        score = calculate_score(data)
        score_label = get_score_label(score)

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

        monthly_saving = goal_result.get("monthly_saving", 0)

        # ======================
        # 🔥 AFFORDABILITY CHECK
        # ======================
        affordable, affordability_msg = check_affordability(
            data,
            monthly_saving
        )

        # ======================
        # Final Response
        # ======================
        return jsonify({
            "financial_behavior": behavior,
            "score": score,
            "score_label": score_label,
            "future_price": goal_result.get("future_price"),
            "monthly_saving": monthly_saving,
            "affordable": affordable,
            "affordability_message": affordability_msg,
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