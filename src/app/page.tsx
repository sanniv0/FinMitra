import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InvestmentGuidance from '@/components/InvestmentGuidance';
import InvestmentPlans from '@/components/InvestmentPlans';
import FinancialDictionary from '@/components/FinancialDictionary';
import { MotionDiv } from '@/components/MotionDiv';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            Welcome to FinMitra
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your friendly AI assistant designed to simplify investing for everyone in India.
          </p>
        </MotionDiv>

        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="guidance" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-14">
              <TabsTrigger value="guidance" className="py-2">Personalized Guidance</TabsTrigger>
              <TabsTrigger value="plans" className="py-2">Starter Plans</TabsTrigger>
              <TabsTrigger value="dictionary" className="py-2">Finance 101</TabsTrigger>
            </TabsList>
            <TabsContent value="guidance" className="mt-6">
              <InvestmentGuidance />
            </TabsContent>
            <TabsContent value="plans" className="mt-6">
              <InvestmentPlans />
            </TabsContent>
            <TabsContent value="dictionary" className="mt-6">
              <FinancialDictionary />
            </TabsContent>
          </Tabs>
        </MotionDiv>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} FinMitra. All rights reserved. Investments are subject to market risks.
      </footer>
    </div>
  );
}
