import { useMemo, useState } from "react";
import { toast } from "sonner";
import { GateDiagram } from "@/components/GateDiagram";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const gateList = ["AND", "OR", "NOT", "NAND", "NOR", "XOR"];

const bit = (value) => (value ? 1 : 0);

export default function LogicSimulatorPage() {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const outputs = useMemo(
    () => ({
      AND: bit(inputA && inputB),
      OR: bit(inputA || inputB),
      NOT: bit(!inputA),
      NAND: bit(!(inputA && inputB)),
      NOR: bit(!(inputA || inputB)),
      XOR: bit(inputA !== inputB),
    }),
    [inputA, inputB],
  );

  const truthRows = useMemo(
    () =>
      [
        { A: 0, B: 0 },
        { A: 0, B: 1 },
        { A: 1, B: 0 },
        { A: 1, B: 1 },
      ].map((row) => {
        const a = row.A === 1;
        const b = row.B === 1;
        return {
          ...row,
          AND: bit(a && b),
          OR: bit(a || b),
          NOT: bit(!a),
          NAND: bit(!(a && b)),
          NOR: bit(!(a || b)),
          XOR: bit(a !== b),
        };
      }),
    [],
  );

  const activeRowIndex = truthRows.findIndex((row) => row.A === bit(inputA) && row.B === bit(inputB));

  const handleRandomize = () => {
    const nextA = Math.random() > 0.5;
    const nextB = Math.random() > 0.5;
    setInputA(nextA);
    setInputB(nextB);
    toast.success(`Inputs randomized → A=${bit(nextA)}, B=${bit(nextB)}`);
  };

  return (
    <section className="space-y-8" data-testid="logic-simulator-page">
      <div className="space-y-3" data-testid="logic-header">
        <Badge className="bg-primary/10 font-mono uppercase tracking-wider text-primary" data-testid="logic-header-badge">
          Logic Gate Simulator
        </Badge>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl" data-testid="logic-main-heading">
          Toggle inputs and observe gate behavior in real time.
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base" data-testid="logic-header-description">
          Use binary inputs A and B to evaluate six fundamental gates. Every output and truth table row updates instantly,
          helping you map equations to hardware logic.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.45fr]">
        <Card className="border-border bg-card" data-testid="logic-input-card">
          <CardHeader>
            <CardTitle className="font-mono text-lg text-primary">Input Control Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                aria-label="Toggle input A"
                className={cn(
                  "rounded-sm border border-border bg-background text-foreground transition-colors hover:bg-muted",
                  inputA ? "neon-glow border-primary text-primary" : "",
                )}
                data-testid="logic-toggle-input-a"
                onClick={() => setInputA((value) => !value)}
              >
                Input A: {bit(inputA)}
              </Button>
              <Button
                aria-label="Toggle input B"
                className={cn(
                  "rounded-sm border border-border bg-background text-foreground transition-colors hover:bg-muted",
                  inputB ? "neon-glow border-primary text-primary" : "",
                )}
                data-testid="logic-toggle-input-b"
                onClick={() => setInputB((value) => !value)}
              >
                Input B: {bit(inputB)}
              </Button>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="logic-randomize-inputs-button"
                onClick={handleRandomize}
              >
                Randomize Inputs
              </Button>
              <Button
                className="rounded-sm border border-border bg-background hover:bg-muted"
                data-testid="logic-reset-inputs-button"
                onClick={() => {
                  setInputA(false);
                  setInputB(false);
                }}
                variant="outline"
              >
                Reset to 0/0
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-background p-4 font-mono text-sm" data-testid="logic-current-input-summary">
              Current input vector = [A:{bit(inputA)}, B:{bit(inputB)}]
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="logic-output-grid">
          {gateList.map((gate) => (
            <Card
              key={gate}
              className="border-border bg-card transition-colors duration-300 hover:border-primary/40"
              data-testid={`logic-output-card-${gate.toLowerCase()}`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base text-foreground">
                  {gate}
                  <span
                    className={cn(
                      "font-mono text-lg",
                      outputs[gate] === 1 ? "text-primary" : "text-muted-foreground",
                    )}
                    data-testid={`logic-output-${gate.toLowerCase()}`}
                  >
                    {outputs[gate]}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GateDiagram gateType={gate} isActive={outputs[gate] === 1} value={outputs[gate]} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-border bg-card" data-testid="logic-truth-table-card">
        <CardHeader>
          <CardTitle className="font-mono text-lg text-primary">Dynamic Truth Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table data-testid="logic-truth-table">
            <TableHeader>
              <TableRow>
                {["A", "B", "AND", "OR", "NOT", "NAND", "NOR", "XOR"].map((column) => (
                  <TableHead className="font-mono uppercase" key={column}>
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {truthRows.map((row, index) => {
                const isActive = index === activeRowIndex;
                return (
                  <TableRow
                    className={cn(
                      "font-mono",
                      isActive ? "bg-primary/15 text-primary hover:bg-primary/20" : "text-foreground",
                    )}
                    data-testid={`logic-truth-row-${row.A}-${row.B}`}
                    key={`${row.A}${row.B}`}
                  >
                    <TableCell>{row.A}</TableCell>
                    <TableCell>{row.B}</TableCell>
                    <TableCell>{row.AND}</TableCell>
                    <TableCell>{row.OR}</TableCell>
                    <TableCell>{row.NOT}</TableCell>
                    <TableCell>{row.NAND}</TableCell>
                    <TableCell>{row.NOR}</TableCell>
                    <TableCell>{row.XOR}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
