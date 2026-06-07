skills_db = [

    "python",
    "java",
    "sql",
    "mysql",
    "react",
    "node",
    "django",
    "flask",
    "docker",
    "aws",
    "git",
    "linux",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch"

]


def extract_skills(text):

    text = str(text).lower()

    skills = []

    for skill in skills_db:

        if skill in text:

            skills.append(skill)

    return sorted(
        list(
            set(skills)
        )
    )