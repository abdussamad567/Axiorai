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
You are an expert resume writer, ATS optimization specialist, and LaTeX engineer.

Your task is to generate a highly professional, ATS-friendly resume in LaTeX that compiles perfectly on Overleaf.

========================
PRIMARY GOAL
========================

Create a clean, structured, ATS-optimized resume that:
- Passes ATS parsing systems
- Looks professional and minimal
- Uses strong section hierarchy
- Maintains perfect alignment and spacing

========================
STRICT RULES (CRITICAL)
========================

- DO NOT invent or assume any data
- DO NOT add fake experience or skills
- ONLY use the provided data
- If any section is empty → SKIP it completely
- Keep formatting simple (ATS-friendly)
- Avoid fancy or complex LaTeX tricks
- Ensure output compiles without errors

========================
ATS OPTIMIZATION RULES
========================

- Use clear section headings (no icons, no graphics)
- Use standard keywords (Education, Experience, Skills, Projects)
- Avoid tables for layout
- Use bullet points for experience/projects
- Keep consistent formatting across sections
- Use readable fonts and spacing
- Ensure proper alignment (no broken structure)

========================
LATEX STRUCTURE (FOLLOW STRICTLY)
========================

- documentclass: article (10pt)
- margins: 0.75in
- packages:
  geometry
  titlesec
  hyperref
  enumitem
  parskip

- Section titles:
  - Bold
  - Horizontal rule below

- Bullet points:
  - Compact (no extra spacing)

========================
HEADER FORMAT
========================

Centered layout:

NAME (LARGE, BOLD)
Role / Title
Phone | Email | Location
Optional Links (LinkedIn, GitHub, Portfolio)

========================
SECTION ORDER (IMPORTANT)
========================

1. Education
2. Experience (if exists)
3. Projects
4. Skills
5. Additional / Links (if exists)

========================
SECTION FORMATTING RULES
========================

EDUCATION:
- University name (bold)
- Degree + field
- Year range
- Optional GPA

EXPERIENCE:
- Company name (bold)
- Role
- Duration
- Bullet points (impact-focused, action verbs)

PROJECTS:
- Project title (bold)
- GitHub/Live link using \\href{}
- Bullet points explaining:
  - what you built
  - technologies used
  - impact/features

SKILLS:
Group clearly:
- Programming Languages
- Frontend
- Backend
- Database
- Tools

========================
BULLET POINT QUALITY (VERY IMPORTANT)
========================

Each bullet must:
- Start with action verb (Developed, Built, Implemented, Designed)
- Be concise (1–2 lines max)
- Be meaningful (no fluff)

========================
USER DATA
========================

Name: \${name}
Email: \${email}
Phone: \${phone}
Location: \${location}
Role: \${role}
Experience: \${experience}
Skills: \${skills}
Education: \${education}
Projects: \${projects}
Links: \${links}

========================
FINAL POLISH PASS
========================

Before finishing:
- Fix alignment issues
- Ensure consistent spacing
- Ensure section clarity
- Ensure ATS readability

========================
OUTPUT RULES (STRICT)
========================

- Return ONLY LaTeX code
- Include full document:
  \\documentclass → \\end{document}
- No explanations
- No markdown
- No \`\`\`
- Must compile without errors in Overleaf

The final output should look like a clean, professional, ATS-optimized resume used by top candidates.
`
}
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
  content: `
You are a world-class frontend engineer, UI/UX designer, and creative director.

Your task is to generate a visually stunning, professional, and modern website.

========================
USER REQUEST
========================
${prompt}

========================
GOAL
========================
Create a premium-quality website that looks like it was built by a top designer.

This must NOT look like a basic template.

========================
DESIGN STYLE (STRICT)
========================

- Modern, minimal, and premium
- Dark or light theme based on context
- Use gradients, soft shadows, and spacing
- Inspired by high-end websites (like SaaS landing pages)
- Clean layout with strong visual hierarchy

========================
LAYOUT RULES
========================

- Avoid basic stacked layout
- Use sections with variation (grid, split, cards)
- Maintain max-width (~1100px)
- Proper spacing and alignment
- Make hero section visually strong

========================
UI/UX REQUIREMENTS
========================

- Sticky navbar with smooth scrolling
- Hero section with heading + subheading + CTA
- Multiple sections depending on context
- Card-based layouts where appropriate
- Clean footer

========================
INTERACTIONS
========================

- Smooth hover effects
- Button animations
- Subtle transitions (0.3s ease)
- Scroll behavior smooth

========================
TYPOGRAPHY
========================

- Modern font stack (Inter, system-ui)
- Clear hierarchy (large headings, muted text)

========================
TECH REQUIREMENTS
========================

- ONLY HTML, CSS, and vanilla JavaScript
- No frameworks
- Fully responsive
- Use Flexbox and Grid

========================
ANTI-GENERIC RULE
========================

- Do NOT generate boring or template-like design
- Make layout visually appealing and unique

========================
FINAL POLISH
========================

Improve spacing, alignment, and overall aesthetics before finishing.

========================
OUTPUT RULES
========================

- Return ONLY a complete HTML file
- Include <html>, <head>, <body>
- Include ALL CSS inside <style>
- Include ALL JS inside <script>
- NO explanations
- NO markdown
- NO \`\`\`
`
}
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
  const { name, role, bio, projects, skills } = req.body;

  try {
    const response = await client.chat.completions.create({
     model: "openai/gpt-4o-mini",
      messages: [
       
    {
  role: "user",
  content: `
You are a world-class frontend engineer, UI/UX designer, and creative director.

Your task is to build a stunning, production-ready personal portfolio website that looks like a premium SaaS landing page — something that would impress recruiters, clients, and designers instantly.

========================
USER DATA
========================
Name: ${name}
Role: ${role}
Bio: ${bio}

Projects:
${projects} 
// Each project may include: title, description, image(optional), live link, github link

Skills:
${skills}

========================
GOAL
========================
Create a visually impressive, modern, and highly polished portfolio website.

This should NOT look like a basic template.
It must feel like a premium product built by a top-tier designer.

========================
DESIGN DIRECTION (STRICT)
========================

- Style: Futuristic + Minimal + Glassmorphism
- Theme: Dark mode with vibrant gradients (purple, blue, neon accents)
- Inspired by: Stripe, Vercel, Linear, Framer
- Use soft glow effects, gradients, and blurred backgrounds
- Use depth (shadows, layers)
- Smooth animations everywhere

========================
LAYOUT RULES (VERY IMPORTANT)
========================

- Avoid generic stacked sections
- Use alternating layouts (left/right split)
- Use asymmetrical compositions
- Use proper max-width container (1100px–1200px)
- Add whitespace for premium feel
- Make hero section visually dominant

========================
SECTIONS TO BUILD
========================

1. NAVBAR
- Sticky, transparent initially
- Blur + dark background on scroll
- Active link highlight
- Smooth scrolling

2. HERO SECTION
- Large bold name
- Role subtitle with gradient text
- Short intro
- CTA buttons (Hire Me, View Work)
- Animated gradient background OR subtle glow effect

3. ABOUT SECTION
- Clean split layout
- Professional formatted bio
- Optional highlight cards (experience, passion)

4. SKILLS SECTION
- Show skills as:
  - modern badges OR
  - animated progress bars
- Add hover effects

5. PROJECTS SECTION (IMPORTANT)

- Card-based modern layout
- Each project must include:
  - Image (if provided, display it properly)
  - Title
  - Description
  - Buttons (Live Demo, GitHub)
- If image exists:
  - Show image with cover fit
  - Add hover zoom effect
- If NO image:
  - Show gradient placeholder with icon
- Add hover lift + glow effect

6. CONTACT SECTION
- Beautiful styled form
- Inputs with glow focus states
- Button with gradient hover animation

7. FOOTER
- Social links
- Minimal clean design

========================
INTERACTIONS & ANIMATIONS
========================

- Smooth scrolling
- Hover lift effect on cards
- Button hover glow
- Subtle fade-in animations on scroll
- Navbar background transition on scroll
- Use transition timing (0.3s–0.5s ease)

========================
TYPOGRAPHY
========================

- Use modern font stack (Inter, system-ui)
- Strong hierarchy:
  - Hero title: very large & bold
  - Section titles: bold
  - Body text: muted color (#aaa)
- Use letter-spacing for premium feel

========================
TECH REQUIREMENTS
========================

- ONLY HTML, CSS, and vanilla JavaScript
- No frameworks
- Use Flexbox + Grid
- Fully responsive (mobile-first)
- Clean, well-structured code

========================
IMAGE HANDLING (IMPORTANT)
========================

- Dynamically render project images from provided data
- Use <img> tags properly
- Ensure:
  - object-fit: cover
  - consistent card sizes
- Add fallback UI if image is missing

========================
ANTI-GENERIC RULE
========================

- DO NOT create a basic template
- DO NOT use boring layouts
- Make it feel like a premium designer portfolio
- Add small delightful UI details

========================
FINAL POLISH PASS
========================

After generating, improve:
- spacing
- alignment
- color balance
- visual hierarchy

Make it visually stunning and professional.

========================
OUTPUT RULES (STRICT)
========================

- Return ONLY a complete HTML file
- Include <html>, <head>, <body>
- Include ALL CSS inside <style>
- Include ALL JS inside <script>
- NO explanations
- NO markdown
- NO \`\`\`

          The final result should feel like a top-tier developer portfolio that people would genuinely love.
`
        }
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