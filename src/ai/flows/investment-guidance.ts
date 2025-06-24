// src/ai/flows/investment-guidance.ts
'use server';

/**
 * @fileOverview Provides personalized investment guidance based on user's risk profile and financial goals.
 *
 * - investmentGuidance - A function that provides investment guidance.
 * - InvestmentGuidanceInput - The input type for the investmentGuidance function.
 * - InvestmentGuidanceOutput - The return type for the investmentGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentGuidanceInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  income: z.number().describe('The annual income of the user in INR.'),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']).describe('The risk tolerance of the user.'),
  financialGoals: z.string().describe('The financial goals of the user, e.g., retirement, buying a house, etc.'),
  investmentAmount: z.number().describe('The amount the user wants to invest per month in INR.'),
  timeHorizon: z.string().describe('The time horizon for the investment in years, e.g., 5 years, 10 years, etc.'),
  dependents: z.number().describe('The number of dependents the user has.'),
  debt: z.number().describe('The amount of debt the user has in INR.'),
});
export type InvestmentGuidanceInput = z.infer<typeof InvestmentGuidanceInputSchema>;

const InvestmentGuidanceOutputSchema = z.object({
  investmentOptions: z.array(
    z.object({
      name: z.string().describe('The name of the investment option.'),
      description: z.string().describe('A brief description of the investment option.'),
      riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The risk level of the investment option.'),
      expectedReturn: z.string().describe('The expected return on the investment option.'),
      suitability: z.string().describe('Why this investment option is suitable for the user.'),
    })
  ).describe('A list of investment options suitable for the user.'),
  disclaimer: z.string().describe('A disclaimer about investment risks.'),
});
export type InvestmentGuidanceOutput = z.infer<typeof InvestmentGuidanceOutputSchema>;

export async function investmentGuidance(input: InvestmentGuidanceInput): Promise<InvestmentGuidanceOutput> {
  return investmentGuidanceFlow(input);
}

const investmentGuidancePrompt = ai.definePrompt({
  name: 'investmentGuidancePrompt',
  input: {schema: InvestmentGuidanceInputSchema},
  output: {schema: InvestmentGuidanceOutputSchema},
  prompt: `You are a financial advisor specializing in the Indian market. Based on the user's profile, provide personalized investment guidance.

User Profile:
Age: {{{age}}}
Income: {{{income}}} INR
Risk Tolerance: {{{riskTolerance}}}
Financial Goals: {{{financialGoals}}}
Investment Amount: {{{investmentAmount}}} INR per month
Time Horizon: {{{timeHorizon}}}
Number of Dependents: {{{dependents}}}
Debt: {{{debt}}} INR

Consider investment options like mutual funds, stocks, fixed deposits, and government schemes (e.g., SIPs, NPS, PPF, ELSS).
Explain the pros/cons and risk levels of each option.
Provide a disclaimer about investment risks. Never give specific stock tips or guarantees. Promote long-term, consistent investing.

Here's an example output:
{
  "investmentOptions": [
    {
      "name": "Equity Mutual Funds",
      "description": "Invest in a diversified portfolio of stocks.",
      "riskLevel": "High",
      "expectedReturn": "12-15% per annum",
      "suitability": "Suitable for long-term goals like retirement if you have a high risk tolerance."
    },
    {
      "name": "National Pension System (NPS)",
      "description": "A government-backed retirement savings scheme.",
      "riskLevel": "Moderate",
      "expectedReturn": "8-10% per annum",
      "suitability": "Good for retirement savings and tax benefits."
    }
  ],
  "disclaimer": "Investments are subject to market risks. Please read all scheme related documents carefully."
}

Return the output in the above format.
`,
});

const investmentGuidanceFlow = ai.defineFlow(
  {
    name: 'investmentGuidanceFlow',
    inputSchema: InvestmentGuidanceInputSchema,
    outputSchema: InvestmentGuidanceOutputSchema,
  },
  async input => {
    const {output} = await investmentGuidancePrompt(input);
    return output!;
  }
);
