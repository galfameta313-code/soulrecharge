'use server';
/**
 * @fileOverview A Genkit flow for generating personalized reflection questions and journaling prompts.
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
    .describe("A description of the user's current challenges and struggles."),
  aspirations: z
    .string()
    .describe("A description of the user's aspirations and what they hope to achieve."),
});
export type GenerateReflectionPromptsInput = z.infer<
  typeof GenerateReflectionPromptsInputSchema
>;

const GenerateReflectionPromptsOutputSchema = z.object({
  reflectionQuestions: z
    .array(z.string())
    .describe('A list of personalized reflection questions.'),
  journalingPrompts: z
    .array(z.string())
    .describe('A list of personalized journaling prompts.'),
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
  prompt: `You are an AI assistant designed to help users prepare for a retreat by generating personalized reflection questions and journaling prompts.

Based on the user's challenges and aspirations, provide thoughtful and insightful questions and prompts to encourage deep self-reflection and clarity of intention.

User's Current Challenges: {{{challenges}}}
User's Aspirations: {{{aspirations}}}

Generate:
- Three to five reflection questions that encourage the user to think deeply about their challenges and how they impact their life.
- Three to five journaling prompts that guide the user to explore their aspirations, their ideal future, and what steps they might take.

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
