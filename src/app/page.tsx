"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, LineChart, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
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
      </Header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center gap-4 w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="text-center text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Master Arithmetic Skills for Quant Success
          </div>
          <div className="text-center max-w-[600px] text-muted-foreground md:text-xl">
            Boost your calculation speed and accuracy with targeted practice.
            The #1 platform for quantitative aspirants.
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              className="px-8"
              onClick={() => router.push("/quickstart")}
            >
              Quick Start
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/custom-practice")}
            >
              Custom Session
            </Button>
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
      </main>
      <Footer />
    </div>
  );
}
