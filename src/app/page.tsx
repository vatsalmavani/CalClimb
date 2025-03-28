import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Clock,
  LineChart,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center font-bold text-xl">CalClimb</div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Log in
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Arithmetic Skills for Quant Success
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Boost your calculation speed and accuracy with targeted
                    practice. The #1 platform for quantitative aspirants.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>10K+ Users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>95% Success Rate</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-3xl blur-3xl opacity-50"></div>
                <div className="relative bg-background rounded-3xl border shadow-xl overflow-hidden">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Daily Challenge</h3>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-lg text-center">
                        <p className="text-xl font-medium">
                          Calculate: 847 × 36
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-12">
                          30,492
                        </Button>
                        <Button variant="outline" className="h-12">
                          30,592
                        </Button>
                        <Button variant="outline" className="h-12">
                          30,392
                        </Button>
                        <Button variant="outline" className="h-12">
                          30,292
                        </Button>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Average time: 18s
                        </span>
                        <span className="text-muted-foreground">
                          Your best: --
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Train Like a Quant Pro
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg/relaxed md:text-base/relaxed">
                  Our platform offers specialized tools designed to enhance your
                  mental math abilities and prepare you for quantitative
                  assessments.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Speed Drills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Timed exercises that gradually increase in difficulty to
                    improve your calculation speed under pressure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Progress Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed analytics to monitor your improvement over time
                    with personalized insights.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Targeted Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Focus on specific operation types or number ranges where you
                    need the most improvement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/*
Practice Section
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Practice Makes Perfect
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Tailored Practice for Every Skill Level
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our adaptive learning system identifies your strengths and
                  weaknesses, creating a personalized curriculum that evolves as
                  you improve.
                </p>
                <ul className="grid gap-2">
                  {[
                    "Addition & Subtraction",
                    "Multiplication & Division",
                    "Percentages & Fractions",
                    "Estimation Techniques",
                    "Word Problems",
                    "Data Interpretation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button className="gap-1">
                    Try Free Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle>Daily Streak</CardTitle>
                    <CardDescription>
                      Keep practicing to maintain your streak
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div key={day} className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              day < 6
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted-foreground/20"
                            }`}
                          >
                            {day}
                          </div>
                          <span className="text-xs mt-1">
                            {["M", "T", "W", "T", "F", "S", "S"][day - 1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Current streak: 5 days
                    </p>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Addition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Multiplication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Success Stories
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg/relaxed md:text-base/relaxed">
                  Hear from users who transformed their quantitative abilities
                  with our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Investment Banking Analyst",
                  content:
                    "After just 6 weeks of daily practice, my mental math speed improved by 70%. I aced my quant interview and landed my dream job.",
                },
                {
                  name: "Sarah Chen",
                  role: "MBA Candidate",
                  content:
                    "The targeted practice helped me overcome my math anxiety. I went from dreading the GMAT to scoring in the 95th percentile.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Data Scientist",
                  content:
                    "The competitive practice sessions prepared me for the pressure of timed assessments. My calculation accuracy is now consistently above 95%.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="text-center shadow-lg">
                  <CardHeader>
                    <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center mb-2">
                      <span className="text-xl font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Arithmetic Skills?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of successful quantitative professionals who
                  started with QuickMath.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  View Pricing
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/60">
                No credit card required. 7-day free trial.
              </p>
            </div>
          </div>
        </section>
      </main>
      {/*
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <Brain className="h-5 w-5 text-primary" />
            <span>QuickMath</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 QuickMath. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
      */}
    </div>
  );
}
