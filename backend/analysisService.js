import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function analyzeResume(fileBuffer) {
  const pdfData = await pdfParse(fileBuffer);
  const resumeText = pdfData.text;

  const prompt = `
    You are an expert recruiter. Extract information from this resume into JSON.

    Resume Text:
    """
    ${resumeText}
    """

    JSON Structure:
    {
      "name": "string | null",
      "email": "string | null",
      "phone": "string | null",
      "linkedin_url": "string | null",
      "portfolio_url": "string | null",
      "summary": "string | null",
      "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
      "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
      "technical_skills": ["string"],
      "soft_skills": ["string"],
      "projects": ["string"],
      "certifications": ["string"],
      "resume_rating": "number",
      "improvement_areas": "string",
      "upskill_suggestions": ["string"]
    }
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);

  const jsonResponse = JSON.parse(result.response.text());
  return jsonResponse;
}
