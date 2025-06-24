import { IndianRupee } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-20 items-center justify-start px-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center">
            <IndianRupee className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="font-headline text-3xl font-bold text-foreground">
            FinMitra
          </span>
        </div>
      </div>
    </header>
  );
}
