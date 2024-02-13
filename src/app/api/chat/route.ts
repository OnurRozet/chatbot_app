import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Request } from 'express'; // Request'ı express modülünden içeri aktarın
import OpenAI from 'openai'; // OpenAI ve diğer ilgili öğeleri içeri aktarın
 
// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
 
export async function POST(req: Request) { // Request'ı doğru şekilde içe aktardığınızdan emin olun

    // Extract the `messages` from the body of the request
    const { messages } = req.body; // İstek gövdesinden 'messages'ı çıkarın
  
    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: messages,
    });
   
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
   
    // Respond with the stream
    return new StreamingTextResponse(stream);
  
}
