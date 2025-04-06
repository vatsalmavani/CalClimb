"use client";

import { Button } from "@/components/ui/button";
import { Edit, Repeat } from "lucide-react";

export default function PracticeComplete() {
  const handlePracticeAgain = () => {};
  const handleCustomizeSettings = () => {};
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Practice Complete!
        </h1>
        <p className="text-muted-foreground mt-2">
          Great job! Here's how you did in this practice session.
          {/** show metrics, show current settings */}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="gap-2" onClick={handlePracticeAgain}>
          <Repeat className="h-5 w-5" />
          Practice Again
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2"
          onClick={handleCustomizeSettings}
        >
          <Edit className="h-5 w-5" />
          Customize Settings
        </Button>
      </div>
    </div>
  );
}
