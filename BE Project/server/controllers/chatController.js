import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createChat = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message: ", message);
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Select the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Properly structure the request
    const result = await model.generateContent({
      contents: [{ parts: [{ text: message }] }]
    });

    // Extract response text correctly
    const response = await result.response; // Get the full response object
    
    
    const responseText = response.candidates[0]?.content?.parts[0]?.text || "No response received.";

    console.log("Response: ",  responseText);

    res.status(200).json({
      text: responseText,
      status: true,
      message: 'Chat response generated successfully'
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to generate chat response',
      error: error.message
    });
  }
};
