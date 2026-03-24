import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.post("/generate-resume", async (req, res) => {
  const {
    name,
    email,
    phone,
    location,
    role,
    experience,
    skills,
    education,
    projects,
  } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Create a PROFESSIONAL resume in HTML using ONLY the user data provided.

STRICT RULES:
- DO NOT use fake names like "John Doe"
- DO NOT invent data
- ONLY use the provided user details
- If a field is empty, skip it

USER DATA:

Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Role: ${role}
Experience: ${experience}
Skills: ${skills}
Education: ${education}
Projects: ${projects}

FORMAT:

<h1>${name}</h1>
<p>${email} | ${phone} | ${location}</p>

<h2>Summary</h2>
<p>Write a short professional summary based on role and experience</p>

<h2>Experience</h2>
<ul>
<li>Use ${role} and ${experience} years to create realistic bullet points</li>
</ul>

<h2>Skills</h2>
<ul>
<li>${skills}</li>
</ul>

<h2>Projects</h2>
<ul>
<li>${projects}</li>
</ul>

<h2>Education</h2>
<p>${education}</p>

IMPORTANT:
- Use EXACT user name: ${name}
- Use EXACT contact details
- Do NOT replace with dummy data
- Do NOT include html/body tags
`
        },
      ],
    });

    res.json({
      resume: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});