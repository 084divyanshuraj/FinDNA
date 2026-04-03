def get_growth_rate(category):
    rates = {
        "car": 0.06,
        "electronics": -0.05,
        "gold": 0.08,
        "bike": 0.05
    }
    return rates.get(category, 0.05)


def predict_future_price(current_price, category, years):
    growth = get_growth_rate(category)
    return current_price * (1 + growth) ** years


def calculate_monthly_savings(future_price, months):
    return future_price / months


def goal_planner(goal_type, category=None, price=None, months=12):

    if goal_type == "save":
        return {
            "monthly_saving": price / months
        }

    elif goal_type == "buy":
        years = months / 12
        future_price = predict_future_price(price, category, years)
        monthly = calculate_monthly_savings(future_price, months)

        return {
            "future_price": round(future_price),
            "monthly_saving": round(monthly)
        }