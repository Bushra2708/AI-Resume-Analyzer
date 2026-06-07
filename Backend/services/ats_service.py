def calculate_ats_score(

    semantic_match,

    matched_skills,

    jd_skills,

    email,

    phone,

    linkedin,

    github

):

    score = 0

    score += semantic_match * 0.50

    if len(jd_skills) > 0:

        score += (

            len(matched_skills)

            /

            len(jd_skills)

        ) * 30

    else:

        score += 30

    if email:
        score += 5

    if phone:
        score += 5

    if linkedin:
        score += 5

    if github:
        score += 5

    return round(

        min(score, 100),

        2

    )