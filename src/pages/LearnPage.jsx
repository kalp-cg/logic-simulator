import { ConceptDiagram } from "@/components/ConceptDiagram";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const conceptCards = [
  {
    title: "Logic Gates",
    summary:
      "Logic gates are Boolean building blocks. With two binary inputs, they generate deterministic outputs used throughout combinational circuits.",
    bullets: ["AND outputs 1 only if both inputs are 1.", "XOR detects input mismatch.", "NAND and NOR are universal gates."],
  },
  {
    title: "Finite State Machines",
    summary:
      "An FSM models behavior over time using states and transitions. Inputs decide movement between states according to transition rules.",
    bullets: ["State = memory of past behavior.", "Transition = edge selected by input symbol.", "Moore machine output depends on current state only."],
  },
  {
    title: "ALU",
    summary:
      "The Arithmetic Logic Unit executes arithmetic and bitwise tasks in CPUs. It receives control signals and operands, then outputs the result.",
    bullets: ["Arithmetic: add, subtract.", "Bitwise: AND, OR, XOR.", "Output flags can indicate zero or overflow."],
  },
  {
    title: "Control Logic",
    summary:
      "Control logic orchestrates datapath operations by issuing signals that select operations, route data, and synchronize state updates.",
    bullets: ["Decoders map instructions to control signals.", "Timing coordination often uses clocked FSMs.", "Accurate control avoids invalid state behavior."],
  },
];

export default function LearnPage() {
  return (
    <section className="space-y-8" data-testid="learn-page">
      <div className="space-y-3" data-testid="learn-header">
        <Badge className="bg-primary/15 font-mono uppercase tracking-wider text-primary" data-testid="learn-header-badge">
          Learning Section
        </Badge>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl" data-testid="learn-main-heading">
          Core concepts behind digital systems.
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base" data-testid="learn-header-description">
          Use these compact notes and diagrams to connect simulation behavior with engineering theory.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2" data-testid="learn-concept-grid">
        {conceptCards.map((concept) => (
          <Card
            className="border-border bg-card transition-colors duration-300 hover:border-primary/35"
            data-testid={`learn-card-${concept.title.toLowerCase().replace(/\s+/g, "-")}`}
            key={concept.title}
          >
            <CardHeader>
              <CardTitle className="text-xl text-foreground">{concept.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ConceptDiagram title={concept.title} />
              <p className="text-sm text-muted-foreground" data-testid={`learn-summary-${concept.title.toLowerCase().replace(/\s+/g, "-")}`}>
                {concept.summary}
              </p>
              <ul className="space-y-1.5 text-sm text-foreground" data-testid={`learn-bullets-${concept.title.toLowerCase().replace(/\s+/g, "-")}`}>
                {concept.bullets.map((bullet) => (
                  <li className="font-mono text-xs sm:text-sm" key={bullet}>
                    • {bullet}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
