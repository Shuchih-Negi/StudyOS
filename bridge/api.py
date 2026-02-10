"""
StudyOS Universal API
Multi-agent AI system for ANY exam preparation
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import asyncio
import json
import uuid

app = FastAPI(
    title="StudyOS Universal API",
    description="Multi-Agent AI System for Universal Exam Preparation",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Universal Data Models
# ============================================================================

class StudentSetup(BaseModel):
    exam_name: str
    exam_type: str  # competitive, academic, certification, language, other
    deadline: int
    subjects: List[str]
    subject_weightages: Dict[str, int]  # {subject: weightage%}
    study_hours: int
    weak_areas: Optional[str] = ""
    strengths: Optional[str] = ""
    previous_attempts: str = "0"
    target_score: Optional[str] = ""
    study_style: str = "balanced"  # intensive, balanced, relaxed

class TestSubmission(BaseModel):
    student_id: str
    test_id: str
    answers: Dict[int, int]

class TaskUpdate(BaseModel):
    task_id: int
    completed: bool

# ============================================================================
# WebSocket Manager
# ============================================================================

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    async def connect(self, student_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[student_id] = websocket
        print(f"✓ Connected: {student_id}")
    
    def disconnect(self, student_id: str):
        if student_id in self.active_connections:
            del self.active_connections[student_id]
    
    async def send_log(self, student_id: str, agent: str, action: str, status: str):
        if student_id in self.active_connections:
            try:
                await self.active_connections[student_id].send_json({
                    "agent": agent,
                    "action": action,
                    "status": status,
                    "timestamp": datetime.now().isoformat()
                })
            except:
                self.disconnect(student_id)

manager = ConnectionManager()

# ============================================================================
# Universal Agent System
# ============================================================================

class UniversalAgentSystem:
    
    @staticmethod
    async def process_setup(student_data: StudentSetup, student_id: str):
        """Process any exam with multi-agent system"""
        
        # Context Agent
        await manager.send_log(student_id, "Context Agent", 
            f"Building learning model for {student_data.exam_name}...", "processing")
        await asyncio.sleep(1)
        
        subjects_str = ", ".join(student_data.subjects[:3])
        if len(student_data.subjects) > 3:
            subjects_str += f" + {len(student_data.subjects) - 3} more"
        
        await manager.send_log(student_id, "Context Agent",
            f"Analyzing: {len(student_data.subjects)} subjects, {student_data.deadline} days, {student_data.study_hours}h daily", 
            "complete")
        
        # Strategy Agent
        await asyncio.sleep(0.5)
        await manager.send_log(student_id, "Strategy Agent", 
            "Evaluating optimal learning strategy...", "processing")
        await asyncio.sleep(1.5)
        
        strategy_focus = student_data.weak_areas if student_data.weak_areas else "Balanced coverage"
        target = f"Target: {student_data.target_score}" if student_data.target_score else "Maximum score"
        
        await manager.send_log(student_id, "Strategy Agent",
            f"Prioritizing: {strategy_focus}, {target}", "complete")
        
        # Planning Agent
        await asyncio.sleep(0.5)
        await manager.send_log(student_id, "Planning Agent", 
            "Generating personalized roadmap...", "processing")
        await asyncio.sleep(1.5)
        
        await manager.send_log(student_id, "Planning Agent",
            f"Creating {student_data.study_style} study plan with daily missions", "complete")
        
        # Execution Agent
        await asyncio.sleep(0.5)
        await manager.send_log(student_id, "Execution Agent", 
            "Preparing practice questions and resources...", "processing")
        await asyncio.sleep(1.5)
        
        await manager.send_log(student_id, "Execution Agent",
            "Setting up adaptive testing system", "complete")
        
        # Orchestrator
        await asyncio.sleep(0.5)
        await manager.send_log(student_id, "Orchestrator",
            f"✓ StudyOS activated for {student_data.exam_name}. Monitoring your journey.", "ready")
        
        return {
            "context": {
                "exam": student_data.exam_name,
                "type": student_data.exam_type,
                "days": student_data.deadline,
                "subjects": student_data.subjects,
                "style": student_data.study_style
            },
            "strategy": {
                "focus": student_data.weak_areas,
                "target": student_data.target_score
            },
            "status": "ready"
        }
    
    @staticmethod
    def generate_daily_tasks(subjects: List[str], weightages: Dict[str, int], 
                            study_hours: int, weak_areas: str):
        """Generate tasks based on subjects and weightages"""
        
        tasks = []
        task_id = 1
        
        # Sort subjects by weightage (highest first)
        sorted_subjects = sorted(subjects, 
                                key=lambda s: weightages.get(s, 0), 
                                reverse=True)
        
        # Allocate time based on weightage
        total_weightage = sum(weightages.values()) or 100
        
        for subject in sorted_subjects[:5]:  # Max 5 subjects per day
            weightage = weightages.get(subject, 25)
            time_allocation = round((weightage / total_weightage) * study_hours * 60)
            
            if time_allocation < 10:
                continue
            
            is_weak = weak_areas and subject.lower() in weak_areas.lower()
            effort = "High" if weightage > 30 or is_weak else "Medium" if weightage > 20 else "Low"
            reason = "Identified as weak area" if is_weak else f"{weightage}% exam weightage"
            
            tasks.append({
                "id": task_id,
                "text": f"{subject}: Core concepts practice ({time_allocation} min)",
                "effort": effort,
                "reason": reason,
                "completed": False,
                "subject": subject,
                "weightage": weightage
            })
            task_id += 1
        
        # Add daily test
        tasks.append({
            "id": task_id,
            "text": f"Daily Mini-Test: {min(len(subjects), 5)} questions (15 min)",
            "effort": "Medium",
            "reason": "Daily assessment and progress tracking",
            "completed": False,
            "subject": "Test",
            "weightage": 0
        })
        
        return tasks
    
    @staticmethod
    def generate_daily_test(subjects: List[str]):
        """Generate questions for any exam"""
        
        questions = []
        selected_subjects = subjects[:5]  # Max 5 questions
        
        for idx, subject in enumerate(selected_subjects):
            questions.append({
                "id": idx + 1,
                "subject": subject,
                "question": f"Sample {subject} question. This will be replaced with actual exam-specific content based on your syllabus and exam pattern.",
                "options": [
                    f"{subject} - Option A",
                    f"{subject} - Option B", 
                    f"{subject} - Option C",
                    f"{subject} - Option D"
                ],
                "correct": idx % 4,  # Rotate correct answers
                "explanation": f"Detailed explanation for {subject} concept. The AI agent will generate contextual explanations based on your specific exam pattern and syllabus.",
                "difficulty": ["Easy", "Medium", "Hard"][idx % 3]
            })
        
        return questions
    
    @staticmethod
    def generate_learning_journey(deadline_days: int, subjects: List[str], 
                                  study_style: str, exam_type: str):
        """Generate adaptive learning journey for any exam"""
        
        weeks = min(max(deadline_days // 7, 4), 16)
        phases = []
        
        # Determine intensity multiplier based on study style
        intensity_map = {
            "intensive": {"foundation": "High", "practice": "Very High", "mastery": "Very High", "revision": "Medium"},
            "balanced": {"foundation": "Medium", "practice": "High", "mastery": "High", "revision": "Medium"},
            "relaxed": {"foundation": "Low", "practice": "Medium", "mastery": "Medium", "revision": "Low"}
        }
        
        intensities = intensity_map.get(study_style, intensity_map["balanced"])
        
        if weeks <= 4:
            # Crash course
            phases = [
                {
                    "week": 1,
                    "focus": "Rapid Foundation Building",
                    "status": "current",
                    "topics": f"Core concepts - All {len(subjects)} subjects",
                    "intensity": "High"
                },
                {
                    "week": 2,
                    "focus": "Problem Solving Sprint",
                    "status": "upcoming",
                    "topics": "Practice and application",
                    "intensity": "Very High"
                },
                {
                    "week": 3,
                    "focus": "Mock Tests & Analysis",
                    "status": "upcoming",
                    "topics": "Full-length practice tests",
                    "intensity": "High"
                },
                {
                    "week": 4,
                    "focus": "Final Revision",
                    "status": "upcoming",
                    "topics": "Weak areas + key concepts",
                    "intensity": "Medium"
                }
            ]
        
        elif weeks <= 8:
            # Standard preparation
            week_num = 1
            
            # Subject-focused weeks
            for i, subject in enumerate(subjects[:min(len(subjects), 4)]):
                phases.append({
                    "week": week_num,
                    "focus": f"{subject} Deep Dive",
                    "status": "current" if week_num == 1 else "upcoming",
                    "topics": "Comprehensive coverage",
                    "intensity": intensities["foundation"]
                })
                week_num += 1
            
            # Practice & mastery weeks
            remaining = 8 - week_num + 1
            if remaining >= 3:
                phases.append({
                    "week": week_num,
                    "focus": "Integration & Practice",
                    "status": "upcoming",
                    "topics": "Cross-topic problems",
                    "intensity": intensities["practice"]
                })
                week_num += 1
                
                phases.append({
                    "week": week_num,
                    "focus": "Mock Test Series",
                    "status": "upcoming",
                    "topics": "Exam simulation",
                    "intensity": intensities["mastery"]
                })
                week_num += 1
                
                phases.append({
                    "week": week_num,
                    "focus": "Final Prep & Rest",
                    "status": "upcoming",
                    "topics": "Light revision + recovery",
                    "intensity": intensities["revision"]
                })
        
        else:
            # Extended preparation
            foundation_weeks = max(2, weeks // 3)
            practice_weeks = max(2, weeks // 4)
            mastery_weeks = max(2, weeks // 5)
            revision_weeks = weeks - foundation_weeks - practice_weeks - mastery_weeks
            
            week_num = 1
            
            # Foundation
            for i in range(foundation_weeks):
                subject_idx = i % len(subjects)
                phases.append({
                    "week": week_num,
                    "focus": f"Foundation: {subjects[subject_idx]}",
                    "status": "current" if week_num == 1 else "upcoming",
                    "topics": "Fundamentals and basics",
                    "intensity": intensities["foundation"]
                })
                week_num += 1
            
            # Practice
            for i in range(practice_weeks):
                phases.append({
                    "week": week_num,
                    "focus": f"Advanced Practice Week {i+1}",
                    "status": "upcoming",
                    "topics": "Problem-solving and application",
                    "intensity": intensities["practice"]
                })
                week_num += 1
            
            # Mastery
            for i in range(mastery_weeks):
                phases.append({
                    "week": week_num,
                    "focus": f"Mastery Week {i+1}",
                    "status": "upcoming",
                    "topics": "Mock tests and analysis",
                    "intensity": intensities["mastery"]
                })
                week_num += 1
            
            # Revision
            for i in range(revision_weeks):
                is_final = i == revision_weeks - 1
                phases.append({
                    "week": week_num,
                    "focus": "Final Prep & Rest" if is_final else f"Revision Sprint {i+1}",
                    "status": "upcoming",
                    "topics": "Light review + recovery" if is_final else "Comprehensive revision",
                    "intensity": "Low" if is_final else intensities["revision"]
                })
                week_num += 1
        
        return phases[:weeks]

# Storage
STUDENTS_DB = {}
TESTS_DB = {}

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "StudyOS Universal API",
        "version": "2.0.0",
        "capabilities": "Any exam, Any subject, Fully adaptive",
        "agents": ["Context", "Strategy", "Planning", "Execution", "Orchestrator"]
    }

@app.post("/api/student/setup")
async def setup_student(data: StudentSetup):
    try:
        student_id = str(uuid.uuid4())
        
        STUDENTS_DB[student_id] = {
            "id": student_id,
            "exam_name": data.exam_name,
            "exam_type": data.exam_type,
            "deadline": data.deadline,
            "subjects": data.subjects,
            "subject_weightages": data.subject_weightages,
            "study_hours": data.study_hours,
            "weak_areas": data.weak_areas,
            "strengths": data.strengths,
            "previous_attempts": data.previous_attempts,
            "target_score": data.target_score,
            "study_style": data.study_style,
            "created_at": datetime.now().isoformat()
        }
        
        return {
            "status": "success",
            "student_id": student_id,
            "message": f"Agent system activated for {data.exam_name}"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/agents/{student_id}")
async def websocket_agent_logs(websocket: WebSocket, student_id: str):
    await manager.connect(student_id, websocket)
    
    try:
        if student_id in STUDENTS_DB:
            student_data = STUDENTS_DB[student_id]
            setup_data = StudentSetup(
                exam_name=student_data["exam_name"],
                exam_type=student_data["exam_type"],
                deadline=student_data["deadline"],
                subjects=student_data["subjects"],
                subject_weightages=student_data["subject_weightages"],
                study_hours=student_data["study_hours"],
                weak_areas=student_data["weak_areas"],
                strengths=student_data.get("strengths", ""),
                previous_attempts=student_data.get("previous_attempts", "0"),
                target_score=student_data.get("target_score", ""),
                study_style=student_data.get("study_style", "balanced")
            )
            await UniversalAgentSystem.process_setup(setup_data, student_id)
        
        while True:
            await websocket.receive_text()
            
    except WebSocketDisconnect:
        manager.disconnect(student_id)

@app.get("/api/tasks/daily/{student_id}")
async def get_daily_tasks(student_id: str):
    if student_id not in STUDENTS_DB:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student = STUDENTS_DB[student_id]
    tasks = UniversalAgentSystem.generate_daily_tasks(
        student["subjects"],
        student["subject_weightages"],
        student["study_hours"],
        student["weak_areas"]
    )
    
    return {"tasks": tasks}

@app.get("/api/test/daily/{student_id}")
async def get_daily_test(student_id: str):
    if student_id not in STUDENTS_DB:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student = STUDENTS_DB[student_id]
    test_id = str(uuid.uuid4())
    questions = UniversalAgentSystem.generate_daily_test(student["subjects"])
    
    TESTS_DB[test_id] = questions
    
    return {
        "test_id": test_id,
        "questions": questions
    }

@app.post("/api/test/submit")
async def submit_test(submission: TestSubmission):
    if submission.test_id not in TESTS_DB:
        raise HTTPException(status_code=404, detail="Test not found")
    
    questions = TESTS_DB[submission.test_id]
    score = 0
    detailed_results = []
    
    for question in questions:
        user_answer = submission.answers.get(question["id"])
        is_correct = user_answer == question["correct"]
        
        if is_correct:
            score += 1
        
        detailed_results.append({
            "question_id": question["id"],
            "correct": is_correct,
            "user_answer": user_answer,
            "correct_answer": question["correct"],
            "explanation": question["explanation"]
        })
    
    return {
        "score": score,
        "total": len(questions),
        "accuracy": round((score / len(questions)) * 100, 2),
        "detailed_results": detailed_results
    }

@app.get("/api/performance/{student_id}")
async def get_performance(student_id: str):
    if student_id not in STUDENTS_DB:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student = STUDENTS_DB[student_id]
    
    # Generate subject-wise performance
    subject_performance = []
    for subject in student["subjects"]:
        accuracy = 60 + (hash(subject) % 30)  # Pseudo-random but consistent
        subject_performance.append({
            "subject": subject,
            "accuracy": accuracy,
            "weightage": student["subject_weightages"].get(subject, 25)
        })
    
    return {
        "overall": {
            "accuracy": sum(s["accuracy"] for s in subject_performance) // len(subject_performance) if subject_performance else 0,
            "streak": 0,
            "tests_taken": 0
        },
        "subject_wise": subject_performance,
        "weak_topics": [],
        "exam_name": student["exam_name"]
    }

@app.get("/api/journey/{student_id}")
async def get_journey_map(student_id: str):
    if student_id not in STUDENTS_DB:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student = STUDENTS_DB[student_id]
    journey = UniversalAgentSystem.generate_learning_journey(
        student["deadline"],
        student["subjects"],
        student["study_style"],
        student["exam_type"]
    )
    
    return {
        "weeks": journey,
        "current_week": 1,
        "total_weeks": len(journey),
        "exam_name": student["exam_name"]
    }

@app.on_event("startup")
async def startup_event():
    print("=" * 60)
    print("🚀 StudyOS Universal API Starting...")
    print("=" * 60)
    print("📚 Universal Multi-Agent AI Learning System")
    print("🎯 Supports: ANY Exam, ANY Subject, FULLY Adaptive")
    print("🤖 Agents: Context | Strategy | Planning | Execution | Orchestrator")
    print("=" * 60)

@app.on_event("shutdown")
async def shutdown_event():
    print("\n🛑 StudyOS Universal API Shutting Down...")
