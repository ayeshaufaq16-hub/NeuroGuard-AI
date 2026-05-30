memory_store = {}


def save_name(name):
    memory_store["name"] = name


def get_name():
    return memory_store.get("name")