from pydantic import BaseModel
from typing import List, Optional

class StudentState(BaseModel):
    exam: str
    deadline: int
    subjects: List[str]
    study_hours: int
    weak_areas: str
    tasks: List[dict] = []
    journey_map: List[dict] = []