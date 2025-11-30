def generate_apar(data):
    marks = data.get("marks", 0)
    attendance = data.get("attendance", 0)
    discipline = data.get("discipline", "good")
    feedback = data.get("feedback", "")
    activities = data.get("activities", [])
    initiative = data.get("initiative", "average")
    behaviour = data.get("behaviour", "good")

    strengths = []
    improvements = []
    training_recommendations = []

    # ----------------------------
    # 1. Work Output (Performance)
    # ----------------------------
    if marks >= 85:
        strengths.append("Consistently delivers excellent academic performance.")
    elif marks >= 70:
        strengths.append("Shows good academic performance.")
        improvements.append("Can improve performance with more revision and practice.")
    else:
        improvements.append("Needs strong academic intervention for performance improvement.")
        training_recommendations.append("Enroll in academic skill enhancement workshops.")

    # ----------------------------
    # 2. Attendance & Punctuality
    # ----------------------------
    if attendance >= 90:
        strengths.append("Maintains excellent attendance and punctuality.")
    elif attendance >= 75:
        strengths.append("Attendance is acceptable.")
        improvements.append("Can improve attendance for better consistency.")
    else:
        improvements.append("Poor attendance, needs monitoring.")
        training_recommendations.append("Time-management and discipline training recommended.")

    # ----------------------------
    # 3. Discipline & Behaviour
    # ----------------------------
    if discipline.lower() == "good":
        strengths.append("Shows good discipline and classroom behaviour.")
    else:
        improvements.append("Discipline needs attention.")

    if behaviour.lower() == "excellent":
        strengths.append("Maintains excellent behaviour with peers and faculty.")

    # ----------------------------
    # 4. Co-curricular & Activities
    # ----------------------------
    if len(activities) > 0:
        strengths.append("Actively participates in college activities: " + ", ".join(activities))
    else:
        improvements.append("Should participate more in extracurricular and co-curricular events.")

    # ----------------------------
    # 5. Initiative & Leadership
    # ----------------------------
    if initiative == "high":
        strengths.append("Shows strong initiative and leadership qualities.")
    elif initiative == "low":
        improvements.append("Needs to take more initiative in academic and group activities.")

    # ----------------------------
    # 6. Overall Rating
    # ----------------------------
    if len(improvements) == 0:
        rating = "Outstanding"
    elif len(improvements) <= 2:
        rating = "Very Good"
    elif len(improvements) <= 4:
        rating = "Good"
    else:
        rating = "Needs Improvement"

    # ----------------------------
    # Final APAR JSON Output
    # ----------------------------
    return {
        "strengths": strengths,
        "improvements": improvements,
        "training_recommendations": training_recommendations,
        "final_rating": rating
    }
