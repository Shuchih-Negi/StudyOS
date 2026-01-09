from datetime import datetime

class EventLog:
    def __init__(self):
        self.logs = []
    
    def add(self, agent, action):
        self.logs.append({
            'agent': agent,
            'action': action,
            'timestamp': datetime.now().isoformat()
        })
    
    def get_all(self):
        return self.logs