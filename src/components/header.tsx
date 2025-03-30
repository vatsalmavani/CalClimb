import Link from "next/link";

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center font-bold text-xl">
          <Link href="/" className="text-primary hover:text-primary/80">
            CalClimb
          </Link>
        </div>
        {children}
      </div>
    </header>
  );
}
