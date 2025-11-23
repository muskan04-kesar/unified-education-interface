def ai_chat(message):
    msg = message.lower()

    # greetings
    if "hello" in msg or "hi" in msg:
        return "Hello! I'm your AI Assistant. How can I help you today?"

    # explain APAR
    if "apar" in msg:
        return "APAR means Annual Performance Appraisal Report. I can help you generate a teacher's APAR."

    # performance help
    if "performance" in msg:
        return "To generate performance summary, please provide marks, attendance and feedback."

    # summary request
    if "summary" in msg:
        return "Sure! Send me attendance, marks, activities and feedback to create summary."

    # feedback analytics
    if "feedback" in msg:
        return "Feedback helps improve teaching quality. I can analyze feedback if you provide it."

    # fallback
    return "I'm here to help! Ask me anything about APAR, analytics, or performance."
