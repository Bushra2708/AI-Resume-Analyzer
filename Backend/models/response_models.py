from pydantic import BaseModel


class AnalysisResponse(BaseModel):

    email: str

    phone: str

    linkedin: str

    github: str

    semantic_match: float

    ats_score: float

    resume_skills: list[str]

    jd_skills: list[str]

    matched_skills: list[str]

    missing_skills: list[str]

    resume_preview: str