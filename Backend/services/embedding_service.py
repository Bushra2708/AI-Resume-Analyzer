from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def semantic_similarity(resume_text, job_description):
    resume_text = str(resume_text or "").strip()
    job_description = str(job_description or "").strip()

    if not resume_text or not job_description:
        return 0.0

    corpus = [resume_text, job_description]
    vectorizer = TfidfVectorizer().fit_transform(corpus)
    score = cosine_similarity(vectorizer[0:1], vectorizer[1:2])[0][0]

    return float(round(score * 100, 2))