def generate_apar(data):
    marks = data.get("marks", 0)
    attendance = data.get("attendance", 0)
    discipline = data.get("discipline", "good")
    feedback = data.get("feedback", "")

    strengths = []
    improvements = []

    if marks >= 80:
        strengths.append("Strong academic performance")
    else:
        improvements.append("Needs academic improvement")

    if attendance >= 85:
        strengths.append("Good attendance consistency")
    else:
        improvements.append("Attendance needs improvement")

    if discipline.lower() == "good":
        strengths.append("Maintains discipline")
    else:
        improvements.append("Discipline needs attention")

    if feedback:
        strengths.append("Positive feedback noted")

    rating = "Excellent" if len(improvements) == 0 else "Good"

    return {
        "strengths": strengths,
        "improvements": improvements,
        "final_rating": rating
    }
