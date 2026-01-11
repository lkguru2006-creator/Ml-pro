import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(SCRIPT_DIR, "tasks.json")

def load_tasks():
    if not os.path.exists(DATA_FILE):
        return [
            {"id": 1, "text": "Welcome! Complete your first task.", "completed": False}
        ]
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []
    except Exception as e:
        print(f"Error loading tasks: {e}")
        return []

def save_tasks(tasks):
    os.makedirs("data", exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(tasks, f, indent=4)
