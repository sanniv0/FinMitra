"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSimplifiedConcept } from "@/app/actions";
import { type SimplifyFinancialConceptOutput } from "@/ai/flows/financial-concept-simplification";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle, BookOpen } from "lucide-react";
import { MotionDiv } from "./MotionDiv";

const formSchema = z.object({
  concept: z.string().min(2, "Please enter a financial term.").max(50, "Term is too long."),
});

type FormData = z.infer<typeof formSchema>;

const suggestedTerms = ["Stock Market", "Bonds", "401(k)", "ETF", "Roth IRA", "Index Fund"];

export default function FinancialDictionary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimplifyFinancialConceptOutput | null>(null);
  const [submittedConcept, setSubmittedConcept] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    setSubmittedConcept(values.concept);

    const response = await getSimplifiedConcept(values);

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setResult(response.data);
    }
    setLoading(false);
  }

  const handleTermClick = (term: string) => {
    form.setValue("concept", term);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="shadow-lg border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Finance 101</CardTitle>
        <CardDescription>Confused by a financial term? Enter it below or select a common term to get a simple explanation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input placeholder="e.g., 'Mutual Fund', 'SIP', 'ELSS'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} size="lg">
              {loading && !result ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
              <span className="ml-2 hidden sm:inline">{loading && !result ? "Explaining..." : "Explain"}</span>
            </Button>
          </form>
        </Form>
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-3">Or try one of these common terms:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTerms.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => handleTermClick(term)}
                disabled={loading}
                className="rounded-full"
              >
                {loading && submittedConcept === term && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {term}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>

      {loading && !result && (
        <CardFooter>
          <div className="w-full flex justify-center items-center gap-2 text-muted-foreground p-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="font-semibold text-primary">Simplifying "{submittedConcept}"...</span>
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardFooter className="flex-col items-start gap-4 rounded-none border-t bg-muted/30 p-6">
            <h3 className="font-headline text-xl font-semibold capitalize text-foreground">What is "{submittedConcept}"?</h3>
            <div className="text-base text-foreground/90 whitespace-pre-wrap leading-relaxed">
              <p>{result.simplifiedExplanation}</p>
            </div>
          </CardFooter>
        </MotionDiv>
      )}
    </Card>
  );
}
