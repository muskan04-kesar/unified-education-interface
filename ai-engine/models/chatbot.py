def ai_chat(message):
    msg = message.lower().strip()

    # ---------------------------
    # GREETINGS & SMALL TALK
    # ---------------------------
    greetings = ["hello", "hi", "hey", "namaste", "good morning", "good evening"]
    if any(g in msg for g in greetings):
        return "Hello! I'm your AI Assistant for the Unified Education Interface 😊 How can I help you today?"

    # ---------------------------
    # ABOUT SYSTEM
    # ---------------------------
    if "who are you" in msg or "what can you do" in msg:
        return (
            "I'm an AI Assistant integrated into the Unified Education Platform. "
            "I can help with APAR generation, performance analytics, syllabus doubts, "
            "feedback insights, and general student-teacher support!"
        )

    # ---------------------------
    # APAR QUERIES
    # ---------------------------
    if "apar" in msg and "help" in msg:
        return (
            "Sure! I can generate the APAR for a teacher automatically. "
            "Just provide attendance, feedback, discipline, and performance details."
        )

    if "apar" in msg:
        return (
            "APAR stands for Annual Performance Appraisal Report. "
            "I can generate strengths, improvements, training suggestions and rating for teachers."
        )

    # ---------------------------
    # PERFORMANCE ANALYTICS
    # ---------------------------
    if "performance" in msg:
        return (
            "Performance analysis includes marks, attendance, behaviour and feedback. "
            "Send me these details and I will generate a personalized summary."
        )

    if "summary" in msg:
        return "Sure! Send me marks, attendance, activities and feedback — I'll create a summary for you."

    # ---------------------------
    # FEEDBACK ANALYSIS
    # ---------------------------
    if "feedback" in msg:
        return (
            "Feedback helps identify strengths and improvement areas. "
            "You can provide student feedback here, and I will analyze it."
        )

    # ---------------------------
    # STUDENT QUERIES
    # ---------------------------
    if "exam" in msg or "marks" in msg:
        return "Your marks reflect your academic progress. Keep practicing and revising regularly."

    if "attendance" in msg:
        return "Attendance above 85% is recommended for maintaining good academic standing."

    # ---------------------------
    # ADMIN QUERIES
    # ---------------------------
    if "admin" in msg or "dashboard" in msg:
        return "Admin can view analytics, teacher reports, student profiles, and overall institution insights."

    # ---------------------------
    # THANK YOU / END
    # ---------------------------
    if "thank" in msg:
        return "You're welcome! Feel free to ask anything 😊"

    # ---------------------------
    # DEFAULT / FALLBACK
    # ---------------------------
    return (
        "I'm here to assist you with APAR, performance analytics, student support, "
        "and teacher insights. Ask me anything!"
    )
