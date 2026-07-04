import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface RateLimitRecord {
  count: number;
  startTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; 
const MAX_REQUESTS_PER_WINDOW = 3; 

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const currentTime = Date.now();
    const userRecord = rateLimitMap.get(ip);

    if (userRecord) {
      if (currentTime - userRecord.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, startTime: currentTime });
      } else if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please wait a minute before generating more tests." },
          { status: 429 }
        );
      } else {
        userRecord.count += 1;
        rateLimitMap.set(ip, userRecord);
      }
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    }

    const { amount, difficulty } = await request.json();

    const prompt = `
      You are an expert test creator generating a strict corporate placement quantitative aptitude exam.
      Generate exactly ${amount} multiple-choice questions at a ${difficulty} difficulty level.
      
      You MUST generate the questions sequentially from this exact list, looping back to the beginning if needed:
      1. Number System
      2. Percentages
      3. Ratio and Proportion
      4. Average
      5. Profit and Loss
      6. Time and Work
      7. Time, Speed and Distance
      8. Simple Interest
      9. Compound Interest
      10. Mixture and Alligation
      11. Partnership
      12. Problems on Ages
      13. HCF and LCM
      14. Simplification and Approximation
      15. Algebra (Linear & Quadratic Equations)
      16. Permutation and Combination
      17. Probability
      18. Data Interpretation (Tables, Pie Charts, Bar Graphs, Line Graphs)
      19. Geometry and Mensuration
      20. Pipes and Cisterns
      
      STRICT NEGATIVE CONSTRAINTS:
      - ABSOLUTELY NO Data Structures, Algorithms, Programming, or Coding questions.
      
      You must respond in strict JSON format matching this exact structure:
      {
        "questions": [
          {
            "topic": "The specific chapter name from the list above",
            "question": "The question text here",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correctAnswer": "The exact text of the correct option"
          }
        ]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7, 
      response_format: { type: 'json_object' },
    });

    const generatedData = JSON.parse(chatCompletion.choices[0]?.message?.content || '{"questions": []}');
    return NextResponse.json(generatedData.questions);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}