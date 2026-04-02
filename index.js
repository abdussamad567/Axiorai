import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ OpenRouter setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});


// ================= RESUME BUILDER =================
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
- DO NOT use fake names
- DO NOT invent data
- ONLY use provided details
- Skip empty fields

Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location}
Role: ${role}
Experience: ${experience}
Skills: ${skills}
Education: ${education}
Projects: ${projects}

IMPORTANT:
- Do NOT include html/body tags
          `,
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


// ================= WEBSITE BUILDER =================
app.post("/generate-website", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Generate a simple modern website HTML for: ${prompt}`,
        },
      ],
    });

    res.json({
      result: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("Website Error:", err);

    res.status(500).json({
      error: "Website generation failed",
      details: err.message,
    });
  }
});


// ================= 🔥 PORTFOLIO BUILDER (MAIN FEATURE) =================
app.post("/generate-portfolio", async (req, res) => {
  const { name, role, bio } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet", // 🔥 BEST FOR UI
      messages: [
        {
          role: "user",
          content: `
You are a senior frontend engineer and award-winning UI/UX designer.

Your task is to build a production-ready, highly polished personal portfolio website.

========================
USER DETAILS
========================
Name: ${name}
Role: ${role}
Bio: ${bio}

========================
REQUIREMENTS
========================

Create a COMPLETE, PROFESSIONAL portfolio website with:

1. Sticky Navbar
   - Logo (name)
   - Smooth scroll navigation
   - Active link highlight

2. Hero Section
   - Big bold heading (name)
   - Role subtitle
   - Short intro
   - Call-to-action buttons (Hire Me / View Projects)
   - Background gradient or subtle animation

3. About Section
   - Clean layout
   - Bio formatted professionally

4. Skills Section
   - Display skills as badges OR progress bars
   - Modern UI

5. Projects Section
   - Card-based layout
   - Each project with:
     - Title
     - Description
     - Hover effects
     - Buttons (Live / GitHub)

6. Contact Section
   - Styled contact form (name, email, message)
   - Clean inputs with focus states

7. Footer
   - Social links
   - Copyright

========================
DESIGN SYSTEM
========================

- Use modern design trends (like Framer / Webflow / Stripe)
- Use gradients, shadows, spacing
- Smooth hover animations
- Rounded corners
- Clean typography
- Proper section spacing

========================
TECH REQUIREMENTS
========================

- Use ONLY HTML, CSS, and minimal vanilla JS
- Use Flexbox and Grid
- Fully responsive (mobile-first)
- Smooth scrolling enabled
- Include subtle animations (hover, transitions)

========================
OUTPUT RULES (VERY IMPORTANT)
========================

- Return ONLY a complete HTML file
- Include <html>, <head>, <body>
- Include ALL CSS inside <style>
- Do NOT include explanations
- Do NOT use markdown
- Do NOT include \`\`\`

Make the website look like it was built by a professional developer.
Use a dark + gradient modern theme similar to high-end developer portfolios.
`
        },
      ],
    });

    let html = response.choices[0].message.content;

    // ✅ CLEAN AI RESPONSE
    html = html
      .replace(/```html/g, "")
      .replace(/```/g, "");

    res.json({ html });

  } catch (error) {
    console.error("Portfolio Error:", error);
    res.status(500).json({ error: error.message });
  }
});
// ================= CAPTION GENERATOR =================
app.post("/generate-caption", async (req, res) => {
  const { description, variants, hashtags, emojis } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a social media expert.

Generate ${variants} captions for this content.

User input: ${description}

Rules:
- Each caption should be unique
- Add emojis: ${emojis}
- Add hashtags: ${hashtags}
- Make captions engaging

Return ONLY captions, separated clearly.
          `,
        },
      ],
    });

    res.json({
      captions: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("Caption Error:", error);
    res.status(500).json({ error: error.message });
  }
});
 
// ================= COVER LETTER =================
app.post("/generate-cover-letter", async (req, res) => {
  const { jobTitle, company, jobDescription, resumeText } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a professional career coach.

Write a highly personalized cover letter.

Job Title: ${jobTitle}
Company: ${company}
Job Description: ${jobDescription}
Resume Info: ${resumeText}

Rules:
- Make it professional
- Tailor to job description
- Highlight skills
- Keep it concise
- No placeholders
          `,
        },
      ],
    });

    res.json({
      coverLetter: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("Cover Letter Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ================= JOB FIT SCORE =================
app.post("/job-fit-score", async (req, res) => {
  const { jobDescription, portfolio, resumeText } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Analyze job fit.

Job Description:
${jobDescription}

Resume:
${resumeText}

Portfolio:
${portfolio}

Return STRICT JSON:

{
 "score": number (0-100),
 "strengths": "text",
 "missing": "text",
 "suggestions": "text"
}
          `,
        },
      ],
    });

    let text = response.choices[0].message.content;

    // clean JSON
    text = text.replace(/```json/g, "").replace(/```/g, "");

    const data = JSON.parse(text);

    res.json(data);

  } catch (err) {
    console.error("Job Fit Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/github-repos/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

app.post("/generate-readme", async (req, res) => {
  const { name, description } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Create a professional GitHub README.

Project Name: ${name}
Description: ${description}

Include:
- Title
- Description
- Features
- Installation
- Usage
- Tech Stack
- Contributing
- License

Return clean markdown.
          `,
        },
      ],
    });

    res.json({
      readme: response.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= PORTFOLIO CRITIC =================
app.post("/portfolio-critic", async (req, res) => {
  const { link } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a senior UX/UI expert and portfolio reviewer.

The user provided this portfolio link:
${link}

IMPORTANT:
- You CANNOT access the website
- Instead, assume it is a typical developer portfolio
- Give realistic, helpful feedback based on industry standards

Return ONLY JSON:

{
 "score": number (1-10),
 "strengths": "text",
 "weaknesses": "text",
 "improvements": "text",
 "ux": "text"
}
          `,
        },
      ],
    });

    let text = response.choices[0].message.content;

    // CLEAN
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse failed:", text);

      // 🔥 SAFE FALLBACK
      return res.json({
        score: 7,
        strengths: "Clean layout and project showcase",
        weaknesses: "Limited content depth",
        improvements: "Add detailed case studies",
        ux: "Improve spacing and mobile responsiveness",
      });
    }

    res.json(data);

  } catch (err) {
    console.error("Portfolio Critic Error:", err);

    res.status(500).json({
      score: 5,
      strengths: "Error fallback",
      weaknesses: "AI failed",
      improvements: "Try again",
      ux: "Try again",
    });
  }
});

// ================= INTERVIEW SIMULATOR =================
app.post("/interview", async (req, res) => {
  const { jobDescription, portfolio, resumeText } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a technical interviewer.

Generate 5 interview questions.

Based on:
Job Description: ${jobDescription}
Resume: ${resumeText}
Portfolio: ${portfolio}

Rules:
- Mix technical + behavioral questions
- Make them realistic
- Number them

Return JSON:

{
 "questions": ["q1", "q2", "q3", "q4", "q5"]
}
          `,
        },
      ],
    });

    let text = response.choices[0].message.content;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const data = JSON.parse(text);

    res.json(data);

  } catch (err) {
    console.error("Interview Error:", err);

    res.json({
      questions: [
        "Tell me about yourself",
        "Explain a project you worked on",
        "What are your strengths?",
        "Describe a challenge you faced",
        "Why should we hire you?",
      ],
    });
  }
});

// ================= SERVER =================
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});