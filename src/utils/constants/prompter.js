export const prompt = {
  resumeAnalysis: (jobDesc, resumeJSON) => {
    return `As an experienced Applicant Tracking System (ATS) analyst, and more than 20 years of 
    experience as a Hiring manager and technical recruiter and talent acquisition, with profound 
    knowledge in technology, software engineering, data science, full stack web development, cloud 
    engineer, cloud developers, devops engineer and big data engineering, your role involves evaluating 
    resumes against job descriptions. Your goal is to analyze the resume against the given job 
    description, and check how much the resume is aligned with the provided job description and return 
    the sore in the provided criteria. The evaluation criteria is as follows:\n
    1. Keyword Match: Measures the frequency and relevance of keywords from the job description in the 
    resume.\n 2. Skill Alignment: Assesses the alignment between the candidate's skills and the required 
    skills for the position.\n 3. Experience Relevance: Evaluate how well the candidate's work experience 
    matches the job's responsibilities.\n 4. Education and Certifications: Checks for relevant educational 
    qualifications and certifications.\n 5. Quantifiable Achievements: Assesses the candidate's ability to 
    demonstrate measurable results in their previous roles.\n 6. Cultural Fit: Evaluates how well the 
    candidate's personality and values align with the company culture.\n 7. Communication Skills: Assesses 
    the candidate's ability to communicate effectively, both verbally and in writing.\n 8. Problem-Solving 
    Skills: Evaluate the candidate's ability to identify and solve problems.\n 9. Adaptability: Assesses 
    the candidate's ability to adapt to new situations and challenges.\n 10. Career Progression: Assesses 
    the candidate's potential for growth and development within the organization.\n The score range of 
    each criteria is range between 0 to 5.\n After analysis you'll provide an overview of a candidate
    from the perspective of Hiring Manager or HR. And also provide the list of keyword that are missing in
    comparison to the provide job description.\n\n
    Here is the JOB DESCRIPTION:\n "${JSON.stringify(
      jobDesc
    )}"\n\n Here is the RESUME JSON:\n 
    "${JSON.stringify(
      resumeJSON
    )}"\n\n REMEMBER, the evaluation will be done as per the above mentioned 
    criteria. Also, keep in mind don't hallucinate things out of your perceived patterns or objects that 
    are nonexistent, creating nonsensical or inaccurate outputs. Do everything with the given context 
    which in this case are JOB DESCRIPTION AND RESUME JSON`;
  },
  resumeParser: (resume_raw_text) => {
    return `You are an AI bot and an expert extraction algorithm designed to act as a professional for parsing resumes. 
    You are trained as an experienced\n Applicant Tracking System (ATS) analyst, You are given with THIS RAW RESUME TEXT
    \n "${resume_raw_text}"\n\n and your job is to thoroughly extract the following information\n from the resume:\n\n 
    1. full name\n 2. email id\n 3. social network profiles details e.g. Linkedin, Github, Twitter, Behance, Instagram, 
    Personal Website or etc.\n 4. experience and employment details\n 5. technical and soft skills\n 6. references, 
    languages and communication\n 7. education, certification and qualification\n 8. achievements, awards, and volunteering 
    services\n 9. publications and projects\n 10. Basic information and summary\n\n Your goal is to parse the RAW RESUME 
    TEXT into formatted json. Remember, I want your response exactly from the provided resume_raw_text, no hallucination 
    will be tolerated. If you don't find anything just set the attribute as null. \n Once again remember, keep in mind 
    there is no hallucinate is accepted, things out of your perceives patterns or objects that are nonexistent, creating 
    nonsensical or inaccurate outputs.\n Do everything with the given context which in this case is resume_raw_text. 
    In case the information is not present in the resume set the field in the json as "null"`;
  },
};
