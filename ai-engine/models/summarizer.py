from transformers import pipeline

# Fast, lightweight summarization model
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def summarize_performance(data):
    attendance = data.get("attendance", 0)
    marks = data.get("marks", 0)
    activities = data.get("activities", [])
    feedback = data.get("feedback", "")

    # Create detailed input text
    full_text = f"""
    The student's overall performance details are as follows:
    - Attendance: {attendance}%
    - Academic Marks: {marks}%
    - Activities: {', '.join(activities) if activities else 'No activities participated'}
    - Feedback Summary: {feedback}

    Based on this information, generate a short, clear performance summary highlighting strengths and improvement areas.
    """

    try:
        ai_summary = summarizer(full_text, max_length=120, min_length=40, do_sample=False)
        return ai_summary[0]["summary_text"]
    
    except Exception as e:
        # Backup rule-based summary if model fails
        summary = []

        # Attendance analysis
        if attendance >= 90:
            summary.append("The student shows excellent attendance.")
        elif attendance >= 75:
            summary.append("The student maintains acceptable attendance.")
        else:
            summary.append("The student needs to improve attendance.")

        # Academic marks
        if marks >= 85:
            summary.append("Academically, the student performs exceptionally well.")
        elif marks >= 70:
            summary.append("The academic performance is good, with room for improvement.")
        else:
            summary.append("The student needs academic strengthening.")

        # Activities
        if activities:
            summary.append("Actively participates in various extracurricular activities.")
        else:
            summary.append("Should engage more in extracurricular activities.")

        # Feedback
        if feedback:
            summary.append(f"Feedback provided: {feedback}.")
        else:
            summary.append("No feedback provided.")

        return " ".join(summary)
