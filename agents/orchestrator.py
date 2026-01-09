from agents.context_agent import ContextAgent
from agents.strategy_agent import StrategyAgent
from agents.planning_agent import PlanningAgent
from core.event_log import EventLog

class Orchestrator:
    def __init__(self):
        self.context_agent = ContextAgent()
        self.strategy_agent = StrategyAgent()
        self.planning_agent = PlanningAgent()
        self.event_log = EventLog()
    
    def process_student(self, student_data):
        # Context Agent
        self.event_log.add("Context Agent", "Building student world model...")
        world_model = self.context_agent.build_world_model(student_data)
        
        # Strategy Agent
        self.event_log.add("Strategy Agent", "Creating long-term strategy...")
        strategy = self.strategy_agent.create_strategy(world_model, student_data)
        
        # Planning Agent
        self.event_log.add("Planning Agent", "Generating daily tasks...")
        tasks = self.planning_agent.create_daily_tasks(strategy, student_data)
        
        self.event_log.add("Orchestrator", "✓ System ready. Monitoring activated.")
        
        return {
            'world_model': world_model,
            'strategy': strategy,
            'tasks': tasks,
            'logs': self.event_log.get_all()
        }