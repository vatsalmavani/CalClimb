"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Percent,
  Plus,
  Divide,
  X,
  ArrowLeft,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getDifficultyLevels } from "@/lib/utils";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

export default function CustomPractice() {
  const [difficulty, setDifficulty] = useState("medium");
  const [timeLimit, setTimeLimit] = useState(60);
  const [showMoreCustomizations, setShowMoreCustomizations] = useState(false);

  // Addition/Subtraction ranges
  const [addSubRange, setAddSubRange] = useState([0, 999]);
  const [addSubDecimalPrecision, setAddSubDecimalPrecision] = useState(2);

  // Multiplication/Division ranges
  const [multDivRange, setMultDivRange] = useState([0, 100]);
  const [multDivDecimalPrecision, setMultDivDecimalPrecision] = useState(1);

  // Percentage ranges
  const [percentValueRange, setPercentValueRange] = useState([100, 900]);
  const [percentRange, setPercentRange] = useState([0, 50]);

  const defaultDifficultyLevels = getDifficultyLevels();

  const handleStartPractice = () => {
    // Here you would handle starting the practice with the selected configuration
    console.log({
      difficulty,
      timeLimit,
      addSubRange,
      addSubDecimalPrecision,
      multDivRange,
      multDivDecimalPrecision,
      percentValueRange,
      percentRange,
    });
  };

  const calcTimeStampPos = (value: number) => {
    const min = 15;
    const max = 180;
    const percentage = ((value - min) / (max - min)) * 100;
    return Math.ceil(percentage).toString();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link
            href="/score-calculation"
            className="text-sm font-medium hover:text-primary"
          >
            Scoring
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
      </Header>
      <main className="flex-1 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col inset-0 mx-auto max-w-4xl py-12 md:py-16 lg:py-20">
          {/* Header Section */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Custom Practice
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Tailor your arithmetic practice to match your specific needs and
              skill level.
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Select Difficulty Level
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {defaultDifficultyLevels.map((level) => (
                <Card
                  key={level.id}
                  className={`m-0 p-0 cursor-pointer transition-all hover:shadow-md ${
                    difficulty === level.id
                      ? `${level.borderColor} border-2 shadow-md`
                      : "border"
                  }`}
                  onClick={() => {
                    setDifficulty(level.id);
                    setTimeLimit(level.timeLimit);
                  }}
                >
                  <CardHeader className={`${level.color} rounded-t-lg p-4`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className={level.textColor}>
                        {level.title}
                      </CardTitle>
                      {<level.icon className={`${level.textColor} h-8 w-8`} />}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6 max-md:pb-4">
                    <CardDescription>{level.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Time Limit Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Time Limit</h2>
              <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{timeLimit} seconds</span>
              </div>
            </div>
            <Slider
              value={[timeLimit]}
              min={15}
              max={180}
              step={5}
              onValueChange={(value) => setTimeLimit(value[0])}
              className="py-4"
            />
            <div className="relative text-sm text-muted-foreground">
              <span>15s</span>
              <span
                className={"-translate-x-1/2 absolute"}
                style={{ left: `${calcTimeStampPos(60)}%` }}
              >
                60s
              </span>
              <span
                className={"-translate-x-1/2 absolute"}
                style={{ left: `${calcTimeStampPos(120)}%` }}
              >
                120s
              </span>
              <span className={"-translate-x-full absolute left-[100%]"}>
                180s
              </span>
            </div>
          </div>

          {/* More Customizations Toggle */}
          <div>
            <Button
              variant="outline"
              onClick={() => setShowMoreCustomizations(!showMoreCustomizations)}
              className="w-full flex items-center justify-between"
            >
              <span>More Customizations</span>
              {showMoreCustomizations ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* More Customizations Section */}
          {showMoreCustomizations && (
            <div className="space-y-8 border rounded-lg p-6 bg-muted/30 mt-4">
              {/* Addition and Subtraction */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-500" />
                  <Separator orientation="vertical" className="min-h-8" />
                  <Minus className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-medium">
                    Addition & Subtraction
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Number Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {addSubRange[0]} to {addSubRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={addSubRange}
                      min={0}
                      max={9999}
                      step={1}
                      onValueChange={(val) => setAddSubRange(val)}
                      className="py-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="add-sub-min">Minimum Value</Label>
                      <Input
                        id="add-sub-min"
                        type="number"
                        value={addSubRange[0]}
                        onChange={(e) =>
                          setAddSubRange([
                            Number.parseInt(e.target.value || "0"),
                            addSubRange[1],
                          ])
                        }
                        min={0}
                        max={Math.max(addSubRange[1] - 1, 0)}
                        aria-invalid={
                          addSubRange[0] < 0 ||
                          addSubRange[0] >= addSubRange[1] ||
                          addSubRange[0] >= 9999
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="add-sub-max">Maximum Value</Label>
                      <Input
                        id="add-sub-max"
                        type="number"
                        value={addSubRange[1]}
                        onChange={(e) =>
                          setAddSubRange([
                            addSubRange[0],
                            Number.parseInt(e.target.value || "0"),
                          ])
                        }
                        min={Math.min(addSubRange[0] + 1, 9999)}
                        max={9999}
                        aria-invalid={
                          addSubRange[1] <= addSubRange[0] ||
                          addSubRange[1] <= 0 ||
                          addSubRange[1] > 9999
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="add-sub-precision">Decimal Precision</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="add-sub-precision"
                        type="number"
                        value={addSubDecimalPrecision}
                        onChange={(e) =>
                          setAddSubDecimalPrecision(
                            Number.parseInt(e.target.value) >= 0 &&
                              Number.parseInt(e.target.value) <= 5
                              ? Number.parseInt(e.target.value)
                              : Number.parseInt(e.target.value) > 5
                              ? 5
                              : 0
                          )
                        }
                        min={0}
                        max={5}
                        aria-invalid={
                          addSubDecimalPrecision < 0 ||
                          addSubDecimalPrecision > 5
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        Example:{" "}
                        {(
                          Math.random() * (addSubRange[1] - addSubRange[0]) +
                          addSubRange[0]
                        ).toFixed(addSubDecimalPrecision)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Multiplication and Division */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5 text-amber-500" />
                  <Separator orientation="vertical" className="min-h-8" />
                  <Divide className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-medium">
                    Multiplication & Division
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Number Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {multDivRange[0]} to {multDivRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={multDivRange}
                      min={0}
                      max={999}
                      step={1}
                      onValueChange={setMultDivRange}
                      className="py-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mult-div-min">Minimum Value</Label>
                      <Input
                        id="mult-div-min"
                        type="number"
                        value={multDivRange[0]}
                        onChange={(e) =>
                          setMultDivRange([
                            Number.parseInt(e.target.value || "0"),
                            multDivRange[1],
                          ])
                        }
                        min={0}
                        max={Math.max(multDivRange[1] - 1, 0)}
                        aria-invalid={
                          multDivRange[0] < 0 ||
                          multDivRange[0] >= multDivRange[1] ||
                          multDivRange[0] >= 999
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mult-div-max">Maximum Value</Label>
                      <Input
                        id="mult-div-max"
                        type="number"
                        value={multDivRange[1]}
                        onChange={(e) =>
                          setMultDivRange([
                            multDivRange[0],
                            Number.parseInt(e.target.value || "0"),
                          ])
                        }
                        min={Math.min(multDivRange[0] + 1, 999)}
                        max={999}
                        aria-invalid={
                          multDivRange[1] <= multDivRange[0] ||
                          multDivRange[1] <= 0 ||
                          multDivRange[1] > 999
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mult-div-precision">
                      Decimal Precision
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="mult-div-precision"
                        type="number"
                        value={multDivDecimalPrecision}
                        onChange={(e) =>
                          setMultDivDecimalPrecision(
                            Number.parseInt(e.target.value) >= 0 &&
                              Number.parseInt(e.target.value) <= 3
                              ? Number.parseInt(e.target.value)
                              : Number.parseInt(e.target.value) > 3
                              ? 3
                              : 0
                          )
                        }
                        min={0}
                        max={3}
                        aria-invalid={
                          multDivDecimalPrecision < 0 ||
                          multDivDecimalPrecision > 3
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">
                        Example:{" "}
                        {(
                          Math.random() * (multDivRange[1] - multDivRange[0]) +
                          multDivRange[0]
                        ).toFixed(multDivDecimalPrecision)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Percentages */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-medium">Percentages</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Value Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {percentValueRange[0]} to {percentValueRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={percentValueRange}
                      min={0}
                      max={9999}
                      step={1}
                      onValueChange={setPercentValueRange}
                      className="py-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="percent-value-min">Minimum Value</Label>
                      <Input
                        id="percent-value-min"
                        type="number"
                        value={percentValueRange[0]}
                        onChange={(e) =>
                          setPercentValueRange([
                            Number.parseInt(e.target.value || "0"),
                            percentValueRange[1],
                          ])
                        }
                        min={0}
                        max={Math.max(percentValueRange[1] - 1, 0)}
                        aria-invalid={
                          percentValueRange[0] < 0 ||
                          percentValueRange[0] >= percentValueRange[1] ||
                          percentValueRange[0] >= 9999
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="percent-value-max">Maximum Value</Label>
                      <Input
                        id="percent-value-max"
                        type="number"
                        value={percentValueRange[1]}
                        onChange={(e) =>
                          setPercentValueRange([
                            percentValueRange[0],
                            Number.parseInt(e.target.value || "0"),
                          ])
                        }
                        min={Math.min(percentValueRange[0] + 1, 9999)}
                        max={9999}
                        aria-invalid={
                          percentValueRange[1] <= percentValueRange[0] ||
                          percentValueRange[1] <= 0 ||
                          percentValueRange[1] > 9999
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Percentage Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {percentRange[0]}% to {percentRange[1]}%
                      </span>
                    </div>
                    <Slider
                      value={percentRange}
                      min={0}
                      max={1000}
                      step={1}
                      onValueChange={setPercentRange}
                      className="py-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="percent-min">Minimum Percentage</Label>
                      <Input
                        id="percent-min"
                        type="number"
                        value={percentRange[0]}
                        onChange={(e) =>
                          setPercentRange([
                            Number.parseInt(e.target.value || "0"),
                            percentRange[1],
                          ])
                        }
                        min={0}
                        max={Math.max(percentRange[1] - 1, 0)}
                        aria-invalid={
                          percentRange[0] < 0 ||
                          percentRange[0] >= percentRange[1] ||
                          percentRange[0] >= 1000
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="percent-max">Maximum Percentage</Label>
                      <Input
                        id="percent-max"
                        type="number"
                        value={percentRange[1]}
                        onChange={(e) =>
                          setPercentRange([
                            percentRange[0],
                            Number.parseInt(e.target.value || "0"),
                          ])
                        }
                        min={Math.min(percentRange[0] + 1, 1000)}
                        max={1000}
                        aria-invalid={
                          percentRange[1] <= percentRange[0] ||
                          percentRange[1] <= 0 ||
                          percentRange[1] > 1000
                        }
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">Example problem:</p>
                    <p className="font-medium mt-1">
                      Find{" "}
                      {Math.floor(
                        Math.random() * (percentRange[1] - percentRange[0]) +
                          percentRange[0]
                      )}
                      % of{" "}
                      {Math.floor(
                        Math.random() *
                          (percentValueRange[1] - percentValueRange[0]) +
                          percentValueRange[0]
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Start Practice Button */}
          <Button size="lg" className="mt-8" onClick={handleStartPractice}>
            Start Practice
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
