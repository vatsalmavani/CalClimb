"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function RangeSlider({
  min,
  max,
  step,
  label,
  suffix = "",
  rangeState,
  setRangeState,
}: {
  min: number;
  max: number;
  step: number;
  label: string;
  suffix?: string;
  rangeState: number[];
  setRangeState: (range: [number, number]) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>{label} Range</Label>
          <span className="text-sm text-muted-foreground">
            {rangeState[0].toString() + suffix} to{" "}
            {rangeState[1].toString() + suffix}
          </span>
        </div>
        <Slider
          value={rangeState}
          min={min}
          max={max}
          step={step}
          onValueChange={setRangeState}
          className="py-4"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Minimum Value</Label>
          <Input
            type="number"
            value={rangeState[0]}
            onChange={(e) =>
              setRangeState([
                Number.parseInt(e.target.value || "0"),
                rangeState[1],
              ])
            }
            min={min}
            max={Math.max(rangeState[1] - 1, min)}
            aria-invalid={
              rangeState[0] < min ||
              rangeState[0] >= max ||
              rangeState[0] >= rangeState[1]
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Maximum Value</Label>
          <Input
            type="number"
            value={rangeState[1]}
            onChange={(e) =>
              setRangeState([
                rangeState[0],
                Number.parseInt(e.target.value || "0"),
              ])
            }
            min={Math.min(rangeState[0] + 1, max)}
            max={max}
            aria-invalid={
              rangeState[1] <= min ||
              rangeState[1] > max ||
              rangeState[1] <= rangeState[0]
            }
          />
        </div>
      </div>
    </div>
  );
}
