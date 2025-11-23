from transformers import pipeline

# lightweight model (fast + easy)
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def summarize_performance(data):
    attendance = data.get("attendance", 0)
    marks = data.get("marks", 0)
    activities = data.get("activities", "")
    feedback = data.get("feedback", "")

    text = f"""
    The student has an attendance of {attendance} percent,
    academic marks around {marks} percent,
    participated in activities: {activities},
    and overall feedback: {feedback}.
    """

    try:
        result = summarizer(text, max_length=60, min_length=20, do_sample=False)
        return result[0]['summary_text']
    except Exception:
        return "AI Summarizer temporarily unavailable."
