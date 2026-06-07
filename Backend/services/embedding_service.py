from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

_model = None


def get_model():

    global _model

    if _model is None:

        print("Loading AI model...")

        _model = SentenceTransformer(
             "sentence-transformers/all-MiniLM-L6-v2"
        )

        print("AI model loaded.")

    return _model


def get_embedding(text):

    if text is None:
        text = ""

    text = str(text).strip()

    return get_model().encode(text)


def semantic_similarity(
    resume_text,
    job_description
):

    resume_embedding = get_embedding(
        resume_text
    )

    jd_embedding = get_embedding(
        job_description
    )

    score = cosine_similarity(
        [resume_embedding],
        [jd_embedding]
    )

    return float(
        round(
            float(score[0][0]) * 100,
            2
        )
    )