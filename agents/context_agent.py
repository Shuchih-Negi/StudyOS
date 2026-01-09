from core.gemini_client import GeminiClient

class ContextAgent:
    def __init__(self):
        self.client = GeminiClient()
    
    def build_world_model(self, student_data):
        prompt = f"""
        Analyze this student profile and create a structured world model:
        Exam: {student_data['exam']}
        Deadline: {student_data['deadline']} days
        Subjects: {student_data['subjects']}
        Study Hours: {student_data['study_hours']} hours/day
        Weak Areas: {student_data['weak_areas']}
        
        Return a brief analysis of their situation.
        """
        return self.client.generate(prompt)