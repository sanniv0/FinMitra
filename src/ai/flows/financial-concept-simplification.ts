// src/ai/flows/financial-concept-simplification.ts
'use server';
/**
 * @fileOverview A flow that simplifies financial concepts for users.
 *
 * - simplifyFinancialConcept - A function that simplifies financial concepts.
 * - SimplifyFinancialConceptInput - The input type for the simplifyFinancialConcept function.
 * - SimplifyFinancialConceptOutput - The return type for the simplifyFinancialConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyFinancialConceptInputSchema = z.object({
  concept: z.string().describe('The financial concept to simplify.'),
});
export type SimplifyFinancialConceptInput = z.infer<typeof SimplifyFinancialConceptInputSchema>;

const SimplifyFinancialConceptOutputSchema = z.object({
  simplifiedExplanation: z.string().describe('A simplified explanation of the financial concept.'),
});
export type SimplifyFinancialConceptOutput = z.infer<typeof SimplifyFinancialConceptOutputSchema>;

export async function simplifyFinancialConcept(
  input: SimplifyFinancialConceptInput
): Promise<SimplifyFinancialConceptOutput> {
  return simplifyFinancialConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyFinancialConceptPrompt',
  input: {schema: SimplifyFinancialConceptInputSchema},
  output: {schema: SimplifyFinancialConceptOutputSchema},
  prompt: `You are a financial expert specializing in simplifying complex financial concepts for individuals with low to moderate financial literacy.

  Please provide a simplified explanation of the following financial concept:

  {{concept}}

  Your explanation should be easy to understand, avoid jargon, and use analogies or real-world examples where possible.
`,
});

const simplifyFinancialConceptFlow = ai.defineFlow(
  {
    name: 'simplifyFinancialConceptFlow',
    inputSchema: SimplifyFinancialConceptInputSchema,
    outputSchema: SimplifyFinancialConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
