# 🎓 Placement Aptitude Pro

An AI-powered mock assessment platform designed to help students prepare for corporate campus placements. This application dynamically generates quantitative aptitude and logical reasoning tests, simulates a real enterprise testing environment, and provides deep topic-by-topic performance analysis.

## ✨ Key Features

*   **🧠 AI-Powered Question Generation:** Utilizes the Groq API (Llama-3.1-8b) to instantly generate unique, placement-standard multiple-choice questions.
*   **🏢 Enterprise-Grade UI:** A clean, professional, and distraction-free interface mimicking real corporate testing platforms (TCS iON, HackerRank, etc.).
*   **📊 Comprehensive Topic Analysis:** Tracks user responses to identify strong chapters (≥60% accuracy) and weak areas requiring improvement.
*   **⏱️ Dynamic Pacing Engine:** Automatically calculates and displays the required seconds-per-question based on the user's selected time constraints.
*   **💾 Local Session Tracking:** Saves past assessment scores and candidate history directly to the browser's local storage.

---

## 🏗️ System Architecture

This project is built using a modern full-stack JavaScript ecosystem:

*   **Frontend Environment:** Next.js 14 (App Router) & React
*   **Language:** TypeScript for strict type-safety and interface definitions.
*   **Styling:** Tailwind CSS for responsive, utility-first UI design.
*   **Icons:** Lucide-React for crisp, professional SVG iconography.
*   **Backend API:** Next.js Route Handlers (`/api/generate`) acting as a secure serverless backend.
*   **AI Integration:** `groq-sdk` handling server-side secure communication with Groq's LLM inference engine.

### Data Flow
1. **Configuration:** The user configures test parameters (length, difficulty, time) on the frontend dashboard.
2. **Request:** The Next.js frontend sends a POST request to the internal `/api/generate` route.
3. **Prompt Engineering:** The server securely attaches the `GROQ_API_KEY` and constructs a strict JSON-enforced prompt demanding specific mathematical topics.
4. **Inference & Delivery:** Groq returns the JSON payload, which the server parses, randomizes (shuffling question order and A/B/C/D options), and delivers back to the client.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn
*   A free API key from [Groq Cloud](https://console.groq.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/krishnasharma0329/aptitude_master_app.git](https://github.com/krishnasharma0329/aptitude_master_app.git)
   cd aptitude_master_app/aptitude-test
Install dependencies:

Bash
npm install
Set up Environment Variables:
Create a new file named .env.local in the root directory (next to package.json) and add your Groq API key:

Code snippet
GROQ_API_KEY=gsk_your_actual_api_key_here
Run the development server:

Bash
npm run dev
Open the application:
Navigate to http://localhost:3000 in your web browser.

📖 Usage
Dashboard Setup: Enter a candidate name, select the number of questions (5 to 50), choose a difficulty level, and set the total time using the slider.

Assessment: Read the questions carefully. The timer at the top will flash red when time is running low. Click an option to advance to the next question.

Analysis: Review the post-test dashboard to see the overall accuracy, a breakdown of strong/weak chapters, and a detailed review of any incorrect answers.

👨‍💻 Author
Krishna Kumar Sharma

Computer Science & Engineering

Built for the next generation of placement preparation.
