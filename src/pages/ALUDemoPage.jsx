import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const operations = ["ADD", "SUBTRACT", "AND", "OR", "XOR"];

const formatBinary = (value) => {
  const absValue = Math.abs(value);
  const binary = absValue.toString(2);
  return value < 0 ? `-${binary}` : binary;
};

const parseValue = (value, mode) => {
  if (mode === "decimal") {
    if (!/^-?\d+$/.test(value.trim())) {
      return { valid: false, message: "Decimal inputs must be integers." };
    }
    return { valid: true, value: parseInt(value, 10) };
  }

  if (!/^[01]+$/.test(value.trim())) {
    return { valid: false, message: "Binary inputs can only contain 0 and 1." };
  }
  return { valid: true, value: parseInt(value, 2) };
};

const runOperation = (left, right, operation) => {
  if (operation === "ADD") return left + right;
  if (operation === "SUBTRACT") return left - right;
  if (operation === "AND") return left & right;
  if (operation === "OR") return left | right;
  return left ^ right;
};

export default function ALUDemoPage() {
  const [mode, setMode] = useState("decimal");
  const [leftInput, setLeftInput] = useState("12");
  const [rightInput, setRightInput] = useState("5");
  const [operation, setOperation] = useState("ADD");

  const result = useMemo(() => {
    const leftParsed = parseValue(leftInput, mode);
    const rightParsed = parseValue(rightInput, mode);

    if (!leftParsed.valid || !rightParsed.valid) {
      return {
        valid: false,
        message: leftParsed.valid ? rightParsed.message : leftParsed.message,
      };
    }

    const rawResult = runOperation(leftParsed.value, rightParsed.value, operation);
    return {
      valid: true,
      left: leftParsed.value,
      right: rightParsed.value,
      operation,
      decimalResult: rawResult,
      binaryResult: formatBinary(rawResult),
      leftBinary: formatBinary(leftParsed.value),
      rightBinary: formatBinary(rightParsed.value),
    };
  }, [leftInput, mode, operation, rightInput]);

  return (
    <section className="space-y-8" data-testid="alu-demo-page">
      <div className="space-y-3" data-testid="alu-header">
        <Badge className="bg-secondary/15 font-mono uppercase tracking-wider text-primary" data-testid="alu-header-badge">
          ALU Operation Demo
        </Badge>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl" data-testid="alu-main-heading">
          Evaluate arithmetic and bitwise operations with instant output.
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base" data-testid="alu-header-description">
          Enter two numbers in decimal or binary mode, choose an ALU operation, and inspect the resulting value in both
          numeral systems.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="border-border bg-card" data-testid="alu-input-controls-card">
          <CardHeader>
            <CardTitle className="font-mono text-lg text-primary">Input + Operation Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2" data-testid="alu-mode-toggle-group">
              <Button
                className={cn(
                  "rounded-sm border border-border bg-background hover:bg-muted",
                  mode === "decimal" ? "neon-glow border-primary text-primary" : "",
                )}
                data-testid="alu-mode-decimal-button"
                onClick={() => setMode("decimal")}
                variant="outline"
              >
                Decimal Mode
              </Button>
              <Button
                className={cn(
                  "rounded-sm border border-border bg-background hover:bg-muted",
                  mode === "binary" ? "neon-glow border-primary text-primary" : "",
                )}
                data-testid="alu-mode-binary-button"
                onClick={() => setMode("binary")}
                variant="outline"
              >
                Binary Mode
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase text-muted-foreground" htmlFor="alu-left-input">
                  Input X
                </label>
                <Input
                  aria-label="ALU first input"
                  className="font-mono"
                  data-testid="alu-input-x"
                  id="alu-left-input"
                  onChange={(event) => setLeftInput(event.target.value)}
                  placeholder={mode === "decimal" ? "e.g. 12" : "e.g. 1100"}
                  value={leftInput}
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase text-muted-foreground" htmlFor="alu-right-input">
                  Input Y
                </label>
                <Input
                  aria-label="ALU second input"
                  className="font-mono"
                  data-testid="alu-input-y"
                  id="alu-right-input"
                  onChange={(event) => setRightInput(event.target.value)}
                  placeholder={mode === "decimal" ? "e.g. 5" : "e.g. 0101"}
                  value={rightInput}
                />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2" data-testid="alu-operations-grid">
              {operations.map((item) => (
                <Button
                  className={cn(
                    "justify-start rounded-sm border border-border bg-background font-mono hover:bg-muted",
                    operation === item ? "neon-glow border-primary text-primary" : "",
                  )}
                  data-testid={`alu-operation-${item.toLowerCase()}-button`}
                  key={item}
                  onClick={() => setOperation(item)}
                  variant="outline"
                >
                  {item}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card" data-testid="alu-result-card">
          <CardHeader>
            <CardTitle className="font-mono text-lg text-primary">Output Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!result.valid && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive" data-testid="alu-validation-message">
                {result.message}
              </div>
            )}

            {result.valid && (
              <>
                <div className="rounded-lg border border-border bg-background p-4" data-testid="alu-expression-display">
                  <p className="font-mono text-sm text-muted-foreground">Operation Expression</p>
                  <p className="mt-2 font-mono text-base text-foreground" data-testid="alu-expression-value">
                    {result.left} {result.operation} {result.right}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-primary/35 bg-primary/10 p-4" data-testid="alu-decimal-output-display">
                    <p className="font-mono text-xs uppercase text-muted-foreground">Decimal Result</p>
                    <p className="mt-2 font-mono text-2xl text-primary" data-testid="alu-decimal-result-value">
                      {result.decimalResult}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4" data-testid="alu-binary-output-display">
                    <p className="font-mono text-xs uppercase text-muted-foreground">Binary Result</p>
                    <p className="mt-2 font-mono text-xl text-foreground" data-testid="alu-binary-result-value">
                      {result.binaryResult}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background p-4" data-testid="alu-binary-breakdown-display">
                  <p className="font-mono text-xs uppercase text-muted-foreground">Operand binary breakdown</p>
                  <p className="mt-2 font-mono text-sm text-foreground" data-testid="alu-left-binary-value">
                    X = {result.leftBinary}
                  </p>
                  <p className="font-mono text-sm text-foreground" data-testid="alu-right-binary-value">
                    Y = {result.rightBinary}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
