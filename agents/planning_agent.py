from core.gemini_client import GeminiClient

class PlanningAgent:
    def __init__(self):
        self.client = GeminiClient()
    
    def create_daily_tasks(self, strategy, student_data):
        prompt = f"""
        Based on this strategy: {strategy}
        
        Create 3 daily study tasks for today focusing on:
        - Weak areas: {student_data['weak_areas']}
        - Subjects: {student_data['subjects']}
        - Time available: {student_data['study_hours']} hours
        
        Format each task as: "Subject: Topic (duration)" with effort level and reason.
        """
        return self.client.generate(prompt)