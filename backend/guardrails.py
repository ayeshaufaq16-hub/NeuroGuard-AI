BLOCKED_WORDS = [
    "hack",
    "scam",
    "steal",
    "fraud",
    "attack",
    "malware",
    "phishing"
]


def is_unsafe(message):
    message = message.lower()

    for word in BLOCKED_WORDS:
        if word in message:
            return True

    return False