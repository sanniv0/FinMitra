'use server';

import {
  investmentGuidance,
  type InvestmentGuidanceInput,
} from '@/ai/flows/investment-guidance';
import {
  investmentPlanGenerator,
  type InvestmentPlanInput,
} from '@/ai/flows/investment-plan-generator';
import {
  simplifyFinancialConcept,
  type SimplifyFinancialConceptInput,
} from '@/ai/flows/financial-concept-simplification';
import { z } from 'zod';

const InvestmentGuidanceSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18.").max(100, "Please enter a valid age."),
  income: z.coerce.number().min(0, "Income cannot be negative."),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']),
  financialGoals: z.string().min(10, "Please describe your financial goals in more detail.").max(500),
  investmentAmount: z.coerce.number().min(500, "Investment amount must be at least ₹500."),
  timeHorizon: z.string().min(1, "Please provide a time horizon (e.g., '5 years').").max(50),
  dependents: z.coerce.number().min(0, "Number of dependents cannot be negative.").int(),
  debt: z.coerce.number().min(0, "Debt amount cannot be negative."),
});

const InvestmentPlanSchema = z.object({
  riskProfile: z.enum(['conservative', 'moderate', 'aggressive']),
});

const SimplifyConceptSchema = z.object({
  concept: z.string().min(2, "Concept must be at least 2 characters long.").max(100),
});


export async function getInvestmentGuidance(values: InvestmentGuidanceInput) {
  const validatedFields = InvestmentGuidanceSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid input.', details: validatedFields.error.flatten() };
  }
  try {
    const result = await investmentGuidance(validatedFields.data);
    return { data: result };
  } catch (error) {
    console.error("AI flow error in getInvestmentGuidance:", error);
    return { error: 'Our AI assistant is currently unavailable. Please try again later.' };
  }
}

export async function generateInvestmentPlan(values: InvestmentPlanInput) {
    const validatedFields = InvestmentPlanSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid input.' };
    }
  try {
    const result = await investmentPlanGenerator(validatedFields.data);
    return { data: result };
  } catch (error) {
    console.error("AI flow error in generateInvestmentPlan:", error);
    return { error: 'Our AI assistant is currently unavailable. Please try again later.' };
  }
}

export async function getSimplifiedConcept(values: SimplifyFinancialConceptInput) {
    const validatedFields = SimplifyConceptSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid input.' };
    }
  try {
    const result = await simplifyFinancialConcept(validatedFields.data);
    return { data: result };
  } catch (error) {
    console.error("AI flow error in getSimplifiedConcept:", error);
    return { error: 'Our AI assistant is currently unavailable. Please try again later.' };
  }
}
