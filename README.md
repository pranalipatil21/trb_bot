🚗 Team Red Baron – AI Intelligence Hub

An AI-powered web application developed for Team Red Baron to demonstrate Artificial Intelligence integration in business strategy, post-sales customer support, and risk assessment for All-Terrain Vehicles (ATVs).

This project showcases how AI can be practically embedded into a company’s operations to improve decision-making, customer experience, and strategic planning.

📌 Project Objectives

Demonstrate AI-assisted business decision-making

Improve post-sales customer support using an AI chatbot

Use AI to analyze risks related to supply chain, logistics, and market disruptions

Present a clear AI integration strategy, not just AI technology

🧠 AI Scenarios Implemented
1️⃣ AI-Based Customer Support Chatbot (Post-Sales)

Purpose:
Provide 24/7 intelligent post-sales support for ATV customers.

Features:

Maintenance guidance

Troubleshooting assistance

Warranty-related queries

Technical explanations for ATV components

Easy accessibility via a floating chatbot UI

AI Role:
The chatbot acts as a Post-Sales AI Assistant trained to respond with technical, helpful, and precise answers relevant to ATVs.

2️⃣ AI-Assisted Risk Assessment & Mitigation Strategy

Purpose:
Support strategic decision-making by identifying potential business risks.

AI Capabilities:

Analyzes industry trends, logistics challenges, and supply chain risks

Predicts potential disruptions

Generates insights to assist human decision-making

Human Role (Important):

AI provides insights and predictions

The team proposes practical mitigation strategies

Ensures AI output is used responsibly and effectively

🏗️ Technology Stack
Category	Technology
Frontend	React + TypeScript
Build Tool	Vite
Styling	Tailwind CSS
AI Model	Google Gemini (via @google/genai)
Deployment	Vercel
Version Control	Git & GitHub
📂 Project Structure
trb_bot/
│
├── public/
│   ├── logo.png
│   ├── trb25.mp4
│
├── src/
│   ├── main.tsx
│   ├── index.css
│
├── .gitignore
├── .env.example
├── package.json
├── vite.config.ts
├── README.md

🔐 Environment Variables

This project uses environment variables for security.

.env (NOT committed to GitHub)
VITE_GEMINI_API_KEY=your_api_key_here

.env.example (Safe to commit)
VITE_GEMINI_API_KEY=your_api_key_here


⚠️ Important:
.env files are ignored using .gitignore to prevent API key exposure.

🚀 Local Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/trb_bot.git
cd trb_bot

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create a .env file in the root directory:

VITE_GEMINI_API_KEY=your_api_key_here

4️⃣ Run the Development Server
npm run dev


The app will run at:

http://localhost:5173

🌐 Deployment (Vercel)

Push code to GitHub

Import repository into Vercel

Add environment variable in Vercel:

VITE_GEMINI_API_KEY

Deploy 🚀

Any future changes pushed to main branch will auto-deploy.

🔄 Updating the Deployed Website

To make changes after deployment:

git add .
git commit -m "Describe your changes"
git push origin main


Vercel will automatically redeploy the updated version.

🧪 Example Queries for Evaluation
Customer Support Bot

“How often should ATV suspension be serviced?”

“Troubleshoot overheating issues in an electric ATV”

“Explain warranty coverage for drivetrain components”

Risk Assessment Bot

“Analyze supply chain risks for motorsports components”

“What are the logistics risks during monsoon season?”

“Suggest mitigation strategies for lithium battery shortages”

🏆 Key Evaluation Highlights

AI is purpose-driven, not generic

Human decision-making is enhanced, not replaced

Strong alignment with business objectives

Secure handling of sensitive information

Scalable and real-world applicable AI model

👥 Team

Team Red Baron
Inspired to Build, Determined to Win.
