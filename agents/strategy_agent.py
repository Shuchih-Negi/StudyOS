from core.gemini_client import GeminiClient

class StrategyAgent:
    def __init__(self):
        self.client = GeminiClient()
    
    def create_strategy(self, world_model, student_data):
        prompt = f"""
        Based on this student context: {world_model}
        
        Create a 6-week strategic learning plan for {student_data['exam']}.
        Focus on weak areas: {student_data['weak_areas']}
        Available time: {student_data['study_hours']} hours/day
        
        Return 3 main phases (Foundation, Application, Mastery) with brief goals.
        """
        return self.client.generate(prompt)