import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FSMCanvas } from "@/components/FSMCanvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const initialStates = [
  { name: "S0", output: "0" },
  { name: "S1", output: "1" },
  { name: "S2", output: "0" },
];

const initialTransitions = {
  S0: { 0: "S0", 1: "S1" },
  S1: { 0: "S2", 1: "S1" },
  S2: { 0: "S0", 1: "S1" },
};

const stateExists = (states, name) => states.some((state) => state.name === name);

export default function FSMSimulatorPage() {
  const [states, setStates] = useState(initialStates);
  const [transitions, setTransitions] = useState(initialTransitions);
  const [startState, setStartState] = useState("S0");
  const [sequence, setSequence] = useState("10110");
  const [stateName, setStateName] = useState("");
  const [stateOutput, setStateOutput] = useState("0");
  const [fromState, setFromState] = useState("S0");
  const [toState, setToState] = useState("S1");
  const [transitionSymbol, setTransitionSymbol] = useState("1");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const outputMap = useMemo(
    () =>
      states.reduce((acc, state) => {
        acc[state.name] = state.output;
        return acc;
      }, {}),
    [states],
  );

  const runSimulation = () => {
    if (!/^[01]*$/.test(sequence)) {
      toast.error("Input sequence must contain only 0 and 1.");
      return;
    }

    const nextSteps = [{ index: 0, input: "-", state: startState, output: outputMap[startState] || "0" }];
    let activeState = startState;

    sequence.split("").forEach((symbol, index) => {
      activeState = transitions[activeState]?.[symbol] || activeState;
      nextSteps.push({
        index: index + 1,
        input: symbol,
        state: activeState,
        output: outputMap[activeState] || "0",
      });
    });

    setSteps(nextSteps);
    setCurrentStep(0);
    toast.success("Simulation loaded. Step through the sequence to inspect transitions.");
  };

  const addState = () => {
    const cleaned = stateName.trim().toUpperCase();

    if (!cleaned) {
      toast.error("Please provide a state name.");
      return;
    }

    if (stateExists(states, cleaned)) {
      toast.error("State already exists.");
      return;
    }

    const nextStates = [...states, { name: cleaned, output: stateOutput }];
    setStates(nextStates);
    setTransitions((prev) => ({
      ...prev,
      [cleaned]: { 0: cleaned, 1: cleaned },
    }));
    setStateName("");
    setFromState(cleaned);
    setToState(cleaned);
    toast.success(`State ${cleaned} added.`);
  };

  const addTransition = () => {
    if (!fromState || !toState) {
      toast.error("Choose source and target states first.");
      return;
    }

    setTransitions((prev) => ({
      ...prev,
      [fromState]: {
        ...(prev[fromState] || {}),
        [transitionSymbol]: toState,
      },
    }));
    toast.success(`Transition updated: ${fromState} --${transitionSymbol}--> ${toState}`);
  };

  const resetSimulator = () => {
    setSteps([]);
    setCurrentStep(0);
  };

  const activeState = steps.length > 0 ? steps[currentStep]?.state : startState;
  const currentOutput = outputMap[activeState] || "0";

  return (
    <section className="space-y-8" data-testid="fsm-simulator-page">
      <div className="space-y-3" data-testid="fsm-header">
        <Badge className="bg-accent/20 font-mono uppercase tracking-wider text-primary" data-testid="fsm-header-badge">
          Finite State Machine Simulator
        </Badge>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl" data-testid="fsm-main-heading">
          Design states, map transitions, and simulate a Moore machine.
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base" data-testid="fsm-header-description">
          Start from a pre-wired example, then add your own states and transitions. Run a 0/1 sequence and inspect how
          the active state and output evolve at each step.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.45fr]">
        <div className="space-y-6">
          <Card className="border-border bg-card" data-testid="fsm-machine-controls-card">
            <CardHeader>
              <CardTitle className="font-mono text-lg text-primary">Machine Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground" htmlFor="start-state">
                    Start State
                  </label>
                  <select
                    className="h-10 w-full rounded-md border border-border bg-background px-3 font-mono text-sm"
                    data-testid="fsm-start-state-select"
                    id="start-state"
                    onChange={(event) => setStartState(event.target.value)}
                    value={startState}
                  >
                    {states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase text-muted-foreground" htmlFor="sequence-input">
                    Input Sequence
                  </label>
                  <Input
                    aria-label="Binary input sequence"
                    className="font-mono"
                    data-testid="fsm-sequence-input"
                    id="sequence-input"
                    onChange={(event) => setSequence(event.target.value)}
                    placeholder="e.g. 10110"
                    value={sequence}
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="fsm-run-simulation-button" onClick={runSimulation}>
                  Load Sequence
                </Button>
                <Button
                  className="border-border bg-background hover:bg-muted"
                  data-testid="fsm-next-step-button"
                  onClick={() => setCurrentStep((value) => Math.min(value + 1, Math.max(steps.length - 1, 0)))}
                  variant="outline"
                >
                  Next Step
                </Button>
                <Button className="border-border bg-background hover:bg-muted" data-testid="fsm-reset-button" onClick={resetSimulator} variant="outline">
                  Reset
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-3 font-mono text-sm" data-testid="fsm-current-state-display">
                  Current State: <span className="text-primary">{activeState}</span>
                </div>
                <div className="rounded-lg border border-border bg-background p-3 font-mono text-sm" data-testid="fsm-current-output-display">
                  Moore Output: <span className="text-primary">{currentOutput}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card" data-testid="fsm-state-builder-card">
            <CardHeader>
              <CardTitle className="font-mono text-lg text-primary">Add State / Transition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                <Input
                  aria-label="New state name"
                  className="font-mono"
                  data-testid="fsm-add-state-name-input"
                  onChange={(event) => setStateName(event.target.value)}
                  placeholder="State name (e.g. S3)"
                  value={stateName}
                />
                <select
                  className="h-10 rounded-md border border-border bg-background px-3 font-mono text-sm"
                  data-testid="fsm-add-state-output-select"
                  onChange={(event) => setStateOutput(event.target.value)}
                  value={stateOutput}
                >
                  <option value="0">Output 0</option>
                  <option value="1">Output 1</option>
                </select>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="fsm-add-state-button" onClick={addState}>
                  Add State
                </Button>
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_80px_1fr_140px]">
                <select
                  className="h-10 rounded-md border border-border bg-background px-3 font-mono text-sm"
                  data-testid="fsm-transition-from-select"
                  onChange={(event) => setFromState(event.target.value)}
                  value={fromState}
                >
                  {states.map((state) => (
                    <option key={`from-${state.name}`} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <select
                  className="h-10 rounded-md border border-border bg-background px-3 font-mono text-sm"
                  data-testid="fsm-transition-symbol-select"
                  onChange={(event) => setTransitionSymbol(event.target.value)}
                  value={transitionSymbol}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
                <select
                  className="h-10 rounded-md border border-border bg-background px-3 font-mono text-sm"
                  data-testid="fsm-transition-to-select"
                  onChange={(event) => setToState(event.target.value)}
                  value={toState}
                >
                  {states.map((state) => (
                    <option key={`to-${state.name}`} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <Button className="border-border bg-background hover:bg-muted" data-testid="fsm-add-transition-button" onClick={addTransition} variant="outline">
                  Save Transition
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card" data-testid="fsm-visual-card">
            <CardHeader>
              <CardTitle className="font-mono text-lg text-primary">State Transition Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <FSMCanvas activeState={activeState} states={states} transitions={transitions} />
            </CardContent>
          </Card>

          <Card className="border-border bg-card" data-testid="fsm-steps-card">
            <CardHeader>
              <CardTitle className="font-mono text-lg text-primary">Simulation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <Table data-testid="fsm-steps-table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-mono">Step</TableHead>
                    <TableHead className="font-mono">Input</TableHead>
                    <TableHead className="font-mono">State</TableHead>
                    <TableHead className="font-mono">Output</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {steps.length === 0 && (
                    <TableRow>
                      <TableCell className="text-muted-foreground" colSpan={4} data-testid="fsm-empty-steps-message">
                        Run simulation to see state evolution.
                      </TableCell>
                    </TableRow>
                  )}
                  {steps.map((step, index) => (
                    <TableRow
                      className={index === currentStep ? "bg-primary/15 text-primary" : ""}
                      data-testid={`fsm-step-row-${index}`}
                      key={`${step.index}-${step.input}-${step.state}`}
                    >
                      <TableCell className="font-mono">{step.index}</TableCell>
                      <TableCell className="font-mono">{step.input}</TableCell>
                      <TableCell className="font-mono">{step.state}</TableCell>
                      <TableCell className="font-mono">{step.output}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
