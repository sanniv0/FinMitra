"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getInvestmentGuidance } from "@/app/actions";
import { type InvestmentGuidanceOutput } from "@/ai/flows/investment-guidance";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle, TrendingUp, Shield, BarChart, Info } from "lucide-react";
import { MotionDiv } from "./MotionDiv";

const formSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18.").max(100, "Please enter a valid age."),
  income: z.coerce.number().min(0, "Income cannot be negative."),
  riskTolerance: z.enum(['Conservative', 'Moderate', 'Aggressive']),
  financialGoals: z.string().min(10, "Please describe your financial goals in more detail.").max(500),
  investmentAmount: z.coerce.number().min(500, "Investment amount must be at least ₹500."),
  timeHorizon: z.string().min(1, "Please provide a time horizon (e.g., '5 years').").max(50),
  dependents: z.coerce.number().min(0, "Number of dependents cannot be negative.").int(),
  debt: z.coerce.number().min(0, "Debt amount cannot be negative."),
});

type FormData = z.infer<typeof formSchema>;

export default function InvestmentGuidance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentGuidanceOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskTolerance: "Moderate",
      dependents: 0,
      debt: 0,
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);

    const response = await getInvestmentGuidance(values);

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setResult(response.data);
    }

    setLoading(false);
  }

  const getRiskIcon = (riskLevel: 'Low' | 'Medium' | 'High') => {
    switch(riskLevel) {
      case 'Low': return <Shield className="h-5 w-5 text-primary" />;
      case 'Medium': return <BarChart className="h-5 w-5 text-yellow-500" />;
      case 'High': return <TrendingUp className="h-5 w-5 text-destructive" />;
      default: return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  }

  return (
    <Card className="shadow-lg border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Financial Snapshot</CardTitle>
        <CardDescription>Fill in your details to get a customized investment plan from our AI assistant.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 28" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 800000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="riskTolerance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Tolerance</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your risk tolerance" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Conservative">Conservative</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="investmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Investment Amount (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeHorizon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Time Horizon</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dependents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Dependents</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="debt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Debt (INR, optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 200000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="financialGoals"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Financial Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Save for retirement, buy a house in 5 years, child's education..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe what you are saving for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Getting Your Plan..." : "Get Guidance"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {loading && (
        <CardFooter>
            <div className="w-full flex justify-center items-center gap-2 text-muted-foreground p-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="font-semibold text-primary">Our AI is preparing your plan...</span>
            </div>
        </CardFooter>
      )}

      {error && (
         <CardFooter className="flex-col items-start gap-2 rounded-none border-t bg-destructive/10 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-destructive font-semibold">An error occurred</p>
          </div>
          <p className="text-destructive/80 text-sm">{error}</p>
        </CardFooter>
      )}

      {result && (
        <MotionDiv
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CardFooter className="flex-col items-start gap-4 rounded-none border-t bg-muted/30 p-6">
            <h3 className="font-headline text-xl font-semibold text-foreground">Your Recommended Investment Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {result.investmentOptions.map((option, index) => (
                <Card key={index} className="flex flex-col bg-card shadow-md">
                  <CardHeader>
                      <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-headline">{option.name}</CardTitle>
                          {getRiskIcon(option.riskLevel)}
                      </div>
                    <CardDescription>Expected Return: {option.expectedReturn}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2 text-sm">
                    <p>{option.description}</p>
                    <p className="text-muted-foreground"><span className="font-semibold text-card-foreground">Why it's suitable:</span> {option.suitability}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 w-full rounded-lg border border-dashed border-amber-500 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300 dark:bg-amber-900/20 dark:border-amber-500/50">
              <p className="font-semibold">Disclaimer</p>
              <p>{result.disclaimer}</p>
            </div>
          </CardFooter>
        </MotionDiv>
      )}
    </Card>
  );
}
