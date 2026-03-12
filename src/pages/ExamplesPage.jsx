import { useState } from "react";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fixedExamples = [
  {
    title: "Logic: XOR as Difference Detector",
    detail: "Set A=1 and B=0 in the Logic Simulator to see XOR output become 1.",
    path: "/simulator/logic-gates",
  },
  {
    title: "FSM: Sequence 10110",
    detail: "Load sequence 10110 and step through transitions to track the active state.",
    path: "/simulator/fsm",
  },
  {
    title: "ALU: 12 XOR 5",
    detail: "Switch to decimal mode and select XOR to inspect decimal + binary outputs.",
    path: "/simulator/alu",
  },
];

const guidedSteps = [
  {
    title: "Step 1: Validate gate intuition",
    instruction: "Open Logic Simulator → set A=1, B=1 → verify AND=1 and NAND=0.",
    path: "/simulator/logic-gates",
  },
  {
    title: "Step 2: Inspect FSM memory",
    instruction: "Open FSM Simulator → run sequence 1100 → use Next Step to watch state retention.",
    path: "/simulator/fsm",
  },
  {
    title: "Step 3: Compare ALU operation classes",
    instruction: "Open ALU Demo → try ADD and XOR using same operands, compare binary outputs.",
    path: "/simulator/alu",
  },
];

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ExamplesPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="space-y-8" data-testid="examples-page">
      <div className="space-y-3" data-testid="examples-header">
        <Badge className="bg-primary/15 font-mono uppercase tracking-wider text-primary" data-testid="examples-header-badge">
          Examples & Guided Practice
        </Badge>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl" data-testid="examples-main-heading">
          Practice with predefined engineering scenarios.
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base" data-testid="examples-header-description">
          Use fixed examples for quick checks, then run the guided path to build stronger reasoning across logic, FSM,
          and ALU topics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="border-border bg-card" data-testid="examples-fixed-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Built-in Fixed Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fixedExamples.map((example) => (
              (() => {
                const slug = toSlug(example.title);
                return (
              <div
                className="rounded-lg border border-border bg-background p-4"
                data-testid={`fixed-example-${slug}`}
                key={example.title}
              >
                <p className="font-semibold text-foreground">{example.title}</p>
                <p className="mt-2 text-sm text-muted-foreground" data-testid={`fixed-example-detail-${slug}`}>
                  {example.detail}
                </p>
                <Button asChild className="mt-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90" data-testid={`fixed-example-open-${slug}`}>
                  <Link to={example.path}>
                    Open Example
                    <ArrowRight size={15} />
                  </Link>
                </Button>
              </div>
                );
              })()
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-card" data-testid="examples-guided-card">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-xl text-foreground">
              <BookOpenCheck className="text-primary" size={18} />
              Guided Example Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-primary/35 bg-primary/10 p-4" data-testid="guided-example-step-panel">
              <p className="font-semibold text-foreground" data-testid="guided-example-step-title">
                {guidedSteps[activeStep].title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="guided-example-step-instruction">
                {guidedSteps[activeStep].instruction}
              </p>
              <Button asChild className="mt-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90" data-testid="guided-example-open-page-button">
                <Link to={guidedSteps[activeStep].path}>Open Related Simulator</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2" data-testid="guided-example-controls">
              <Button
                className="rounded-sm border border-border bg-background hover:bg-muted"
                data-testid="guided-example-prev-button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((value) => Math.max(value - 1, 0))}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="guided-example-next-button"
                disabled={activeStep === guidedSteps.length - 1}
                onClick={() => setActiveStep((value) => Math.min(value + 1, guidedSteps.length - 1))}
              >
                Next
              </Button>
            </div>

            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground" data-testid="guided-example-step-indicator">
              Step {activeStep + 1} of {guidedSteps.length}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

