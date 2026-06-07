from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.response_models import AnalysisResponse

from services.pdf_service import extract_pdf_text

from services.parser_service import (
    extract_email,
    extract_phone,
    extract_linkedin,
    extract_github
)

from services.skill_service import extract_skills

from services.matching_service import compare_skills

from services.embedding_service import semantic_similarity

from services.ats_service import calculate_ats_score


app = FastAPI(
    title="AI Resume Analyzer",
    version="1.0"
)


# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home Route

@app.get("/")
def home():

    return {

        "message":
        "AI Resume Analyzer Running"

    }


# Resume Analysis

@app.post(
    "/analyze",
    response_model=AnalysisResponse
)
async def analyze(

    resume: UploadFile = File(...),

    job_description: str = Form(...)

):

    try:

        # Validate PDF

        if resume.content_type != "application/pdf":

            raise HTTPException(

                status_code=400,

                detail="Only PDF files are allowed."

            )

        # Read PDF

        pdf_bytes = await resume.read()

        # Extract Text

        resume_text = extract_pdf_text(
            pdf_bytes
        )

        if not resume_text:

            raise HTTPException(

                status_code=400,

                detail="Could not extract text from PDF."

            )

        # Contact Info

        email = extract_email(
            resume_text
        )

        phone = extract_phone(
            resume_text
        )

        linkedin = extract_linkedin(
            resume_text
        )

        github = extract_github(
            resume_text
        )

        # Skills

        resume_skills = extract_skills(
            resume_text
        )

        jd_skills = extract_skills(
            job_description
        )

        skill_result = compare_skills(

            resume_skills,

            jd_skills

        )

        # Semantic AI Score

        semantic_score = semantic_similarity(

            resume_text,

            job_description

        )

        # ATS Score

        ats_score = calculate_ats_score(

            semantic_score,

            skill_result["matched"],

            jd_skills,

            email,

            phone,

            linkedin,

            github

        )

        # Response

        return {

            "email":
            str(email),

            "phone":
            str(phone),

            "linkedin":
            str(linkedin),

            "github":
            str(github),

            "semantic_match":
            float(semantic_score),

            "ats_score":
            float(ats_score),

            "resume_skills":
            resume_skills,

            "jd_skills":
            jd_skills,

            "matched_skills":
            skill_result["matched"],

            "missing_skills":
            skill_result["missing"],

            "resume_preview":
            str(
                resume_text[:500]
            )

        }

    except HTTPException:

        raise

    except Exception as e:

        print(e)

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )