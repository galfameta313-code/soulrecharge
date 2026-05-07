'use server';
/**
 * @fileOverview A Genkit flow for generating personalized event concept suggestions.
 *
 * - generateReflectionPrompts - A function that handles the generation of prompts.
 * - GenerateReflectionPromptsInput - The input type for the generateReflectionPrompts function.
 * - GenerateReflectionPromptsOutput - The return type for the generateReflectionPrompts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReflectionPromptsInputSchema = z.object({
  challenges: z
    .string()
    .describe("A description of the user's event goals."),
  aspirations: z
    .string()
    .describe("A description of the user's desired event theme and nuance."),
});
export type GenerateReflectionPromptsInput = z.infer<
  typeof GenerateReflectionPromptsInputSchema
>;

const GenerateReflectionPromptsOutputSchema = z.object({
  reflectionQuestions: z
    .array(z.string())
    .describe('A list of personalized event concept suggestions.'),
  journalingPrompts: z
    .array(z.string())
    .describe('A list of personalized event activity recommendations.'),
});
export type GenerateReflectionPromptsOutput = z.infer<
  typeof GenerateReflectionPromptsOutputSchema
>;

export async function generateReflectionPrompts(
  input: GenerateReflectionPromptsInput
): Promise<GenerateReflectionPromptsOutput> {
  return generateReflectionPromptsFlow(input);
}

const reflectionPrompt = ai.definePrompt({
  name: 'reflectionPrompt',
  input: { schema: GenerateReflectionPromptsInputSchema },
  output: { schema: GenerateReflectionPromptsOutputSchema },
  prompt: `You are an AI assistant designed to help users prepare for an event by generating personalized event concepts and activity recommendations.

Based on the user's event goals and theme, provide thoughtful and insightful concepts and activities to make their event truly memorable and meaningful.

User's Event Goals: {{{challenges}}}
User's Desired Theme: {{{aspirations}}}

Generate:
- Three to five event concept suggestions that encourage the user to think deeply about their event's core message and how it impacts their guests.
- Three to five event activity recommendations that guide the user to explore their aspirations for the event, the ideal atmosphere, and what steps they might take.

Please ensure the output is in JSON format, adhering strictly to the provided output schema.`,
});

const generateReflectionPromptsFlow = ai.defineFlow(
  {
    name: 'generateReflectionPromptsFlow',
    inputSchema: GenerateReflectionPromptsInputSchema,
    outputSchema: GenerateReflectionPromptsOutputSchema,
  },
  async (input) => {
    const { output } = await reflectionPrompt(input);
    return output!;
  }
);
