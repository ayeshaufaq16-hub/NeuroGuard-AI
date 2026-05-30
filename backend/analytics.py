analytics = {
    "total_messages": 0,
    "blocked_messages": 0
}


def increment_messages():
    analytics["total_messages"] += 1


def increment_blocked():
    analytics["blocked_messages"] += 1


def get_analytics():
    return analytics