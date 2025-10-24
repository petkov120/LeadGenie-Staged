
import { GoogleGenAI, Type } from '@google/genai';
import type { FormBlock } from '../types';

// FIX: Initialize GoogleGenAI with API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Implement generateFormWithAI to call the Gemini API.
export const generateFormWithAI = async (prompt: string): Promise<FormBlock[]> => {
    
    const model = 'gemini-2.5-flash';
    
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                id: { type: Type.STRING, description: 'A unique identifier for the block.' },
                type: { type: Type.STRING, description: "The type of the form block. Can be 'welcome_screen', 'short_text', 'email', or 'end_screen'." },
                content: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: 'The main text or question for the block.' },
                        description: { type: Type.STRING, description: 'Optional descriptive text.' },
                        buttonText: { type: Type.STRING, description: 'Optional text for a button, e.g., on a welcome screen.' },
                    },
                    required: ['title'],
                },
            },
            required: ['id', 'type', 'content'],
        }
    };
    
    const fullPrompt = `You are a form generation assistant. Create a JSON array of form blocks based on the following user request: "${prompt}".
The JSON array should contain objects, each representing a block in the form. Adhere to the provided JSON schema.

Here are the available block types and their required 'content' structure:
1.  **type**: 'welcome_screen', **content**: { "title": "string", "description": "string", "buttonText": "string" }
2.  **type**: 'short_text', **content**: { "title": "string" }
3.  **type**: 'email', **content**: { "title": "string" }
4.  **type**: 'end_screen', **content**: { "title": "string", "description": "string" }
`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: fullPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const jsonStr = response.text;
        const generatedBlocks: FormBlock[] = JSON.parse(jsonStr);
        return generatedBlocks;
    } catch (error) {
        console.error("Error calling Gemini API or parsing response:", error);
        throw new Error("Failed to generate form with AI. Please check the console for more details.");
    }
};
