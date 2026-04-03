import pandas as pd
import matplotlib.pyplot as plt
import pickle

# ==============================
# STEP 1: Load Dataset
# ==============================
df = pd.read_csv("D:/synthetic_personal_finance_dataset.csv")
print(" Data Loaded")

# ==============================
# STEP 2: Data Cleaning
# ==============================
print("\nChecking missing values:")
print(df.isnull().sum())

df = df.dropna()

numeric_cols = [
    'monthly_income_usd',
    'monthly_expenses_usd',
    'savings_usd',
    'loan_amount_usd',
    'credit_score'
]

df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
df = df.dropna()

print("Data cleaned")

# ==============================
# STEP 3: Create Target (NO LEAKAGE)
# ==============================
def classify_health(row):
    if (
        row['credit_score'] > 700 and
        row['savings_usd'] > 2000 and
        row['monthly_expenses_usd'] < 0.6 * row['monthly_income_usd']
    ):
        return "Good"
    elif row['credit_score'] > 600:
        return "Average"
    else:
        return "Poor"

df['financial_health'] = df.apply(classify_health, axis=1)
print("Target column created")

# ==============================
# STEP 4: Feature Selection
# ==============================
features = [
    'monthly_income_usd',
    'monthly_expenses_usd',
    'savings_usd',
    'loan_amount_usd',
    'credit_score'
]

X = df[features]
y = df['financial_health']

# ==============================
# STEP 5: Train-Test Split
# ==============================
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ==============================
# STEP 6: Scaling (for Logistic)
# ==============================
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ==============================
# STEP 7: Train Models
# ==============================
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

models = {
    "Random Forest": RandomForestClassifier(max_depth=5),
    "Logistic Regression": LogisticRegression(max_iter=2000),
    "Decision Tree": DecisionTreeClassifier(max_depth=5)
}

best_model = None
best_accuracy = 0

print("\nModel Comparison:")

for name, model in models.items():
    
    if name == "Logistic Regression":
        model.fit(X_train_scaled, y_train)
        accuracy = model.score(X_test_scaled, y_test)
    else:
        model.fit(X_train, y_train)
        accuracy = model.score(X_test, y_test)

    print(f"{name} Accuracy: {accuracy:.2f}")

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model

print("\nBest Model Selected:", best_model)
print("Best Accuracy:", best_accuracy)

# ==============================
# STEP 8: Feature Importance
# ==============================
if hasattr(best_model, "feature_importances_"):
    print("\nFeature Importance:")
    importance = best_model.feature_importances_

    for i, col in enumerate(features):
        print(f"{col}: {importance[i]:.3f}")

    plt.figure()
    plt.barh(features, importance)
    plt.title("Feature Importance")
    plt.xlabel("Importance Score")
    plt.ylabel("Features")
    plt.show()

# ==============================
# STEP 9: Save Model
# ==============================
pickle.dump(best_model, open("model.pkl", "wb"))
print("Model saved as model.pkl")

# ==============================
# STEP 10: Sample Prediction
# ==============================
sample = [[5000, 3000, 1500, 10000, 650]]

prediction = best_model.predict(sample)[0]

print("\nPrediction:", prediction)

# ==============================
# STEP 11: Explainability + Suggestions
# ==============================
print("\nWhy this prediction?")

income = sample[0][0]
expenses = sample[0][1]
savings = sample[0][2]
loan = sample[0][3]
credit = sample[0][4]

if expenses > income * 0.7:
    print("- Expenses are too high compared to income")

if savings < 1000:
    print("- Savings are low")

if credit < 650:
    print("- Credit score is low")

if loan > income * 5:
    print("- Loan amount is relatively high")

print("\nSuggestions:")

if prediction == "Poor":
    print("Reduce unnecessary expenses, increase savings, and avoid large loans.")
elif prediction == "Average":
    print("Improve savings and maintain a good credit score.")
else:
    print("Excellent financial health! Consider investing for future growth.")