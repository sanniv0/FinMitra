// src/ai/flows/investment-plan-generator.ts
'use server';

/**
 * @fileOverview Generates personalized investment plans based on the user's risk profile.
 *
 * - investmentPlanGenerator - A function that generates an investment plan.
 * - InvestmentPlanInput - The input type for the investmentPlanGenerator function.
 * - InvestmentPlanOutput - The return type for the investmentPlanGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentPlanInputSchema = z.object({
  riskProfile: z
    .enum(['conservative', 'moderate', 'aggressive'])
    .describe('The risk profile of the user.'),
});
export type InvestmentPlanInput = z.infer<typeof InvestmentPlanInputSchema>;

const InvestmentPlanOutputSchema = z.object({
  plan: z
    .string()
    .describe(
      `A personalized investment plan based on the user provided risk profile.
      The plan should contain a number of different investment options along with
      a percentage of investment that the user should allocate to each. Explain the reasoning behind the plan.
      The possible options include: Fixed Deposits, Government Bonds, Mutual Funds, Stocks, Gold, Real Estate, etc.

      For conservative profiles, the plan should focus on low-risk investments such as fixed deposits and government bonds.
      For moderate profiles, the plan should include a mix of low-risk and medium-risk investments such as mutual funds and stocks.
      For aggressive profiles, the plan should focus on high-risk investments such as stocks and real estate.`
    ),
});
export type InvestmentPlanOutput = z.infer<typeof InvestmentPlanOutputSchema>;

export async function investmentPlanGenerator(input: InvestmentPlanInput): Promise<InvestmentPlanOutput> {
  return investmentPlanGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investmentPlanPrompt',
  input: {schema: InvestmentPlanInputSchema},
  output: {schema: InvestmentPlanOutputSchema},
  prompt: `You are a financial advisor who specializes in generating investment plans.

  Based on the risk profile of the user, generate an investment plan.

  Risk Profile: {{{riskProfile}}}
  `,
});

const investmentPlanGeneratorFlow = ai.defineFlow(
  {
    name: 'investmentPlanGeneratorFlow',
    inputSchema: InvestmentPlanInputSchema,
    outputSchema: InvestmentPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
