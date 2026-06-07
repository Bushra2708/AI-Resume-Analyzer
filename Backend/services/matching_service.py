def compare_skills(
    resume_skills,
    jd_skills
):

    matched = sorted(
        list(
            set(resume_skills)
            &
            set(jd_skills)
        )
    )

    missing = sorted(
        list(
            set(jd_skills)
            -
            set(resume_skills)
        )
    )

    return {

        "matched": matched,

        "missing": missing

    }