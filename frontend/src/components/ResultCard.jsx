function ResultCard({ result }) {

  if (!result)
    return null;

  return (

    <div>

      <h2>
        Analysis
      </h2>

      <p>
        Email:
        {result.email}
      </p>

      <p>
        Phone:
        {result.phone}
      </p>

      <p>
        LinkedIn:
        {result.linkedin}
      </p>

      <p>
        GitHub:
        {result.github}
      </p>

      <p>
        Semantic Match:
        {result.semantic_match}
      </p>

      <p>
        ATS Score:
        {result.ats_score}
      </p>

      <h3>
        Resume Skills
      </h3>

      <ul>
        {
          result.resume_skills.map(
            skill => (
              <li key={skill}>
                {skill}
              </li>
            )
          )
        }
      </ul>

      <h3>
        Missing Skills
      </h3>

      <ul>
        {
          result.missing_skills.map(
            skill => (
              <li key={skill}>
                {skill}
              </li>
            )
          )
        }
      </ul>

    </div>

  );
}

export default ResultCard;