import { ArrowRight, Binary, Cpu, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureCards = [
  {
    title: "Logic Gate Studio",
    description: "Toggle A/B inputs and inspect AND, OR, NOT, NAND, NOR, XOR in real time with visual gates.",
    icon: Binary,
  },
  {
    title: "Stepwise FSM Engine",
    description: "Create Moore states, wire transitions, and run binary sequences one step at a time.",
    icon: GitBranch,
  },
  {
    title: "ALU Computation Desk",
    description: "Execute arithmetic and bitwise operations while comparing binary and decimal results.",
    icon: Cpu,
  },
];

export default function HomePage() {
  return (
    <section className="space-y-10" data-testid="home-page">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card" data-testid="home-hero-section">
        <img
          alt="Digital circuit board background"
          className="absolute inset-0 h-full w-full object-cover object-center"
          data-testid="home-hero-image"
          src="https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?q=85&w=1920&auto=format&fit=crop"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative grid gap-7 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary" data-testid="hero-kicker">
              Interactive Engineering Learning
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" data-testid="hero-heading">
              Build intuition for digital logic and finite state machines.
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base" data-testid="hero-description">
              Digital systems power processors, controllers, and communication hardware. This platform helps you learn by
              experimenting: flip logic inputs, test ALU operations, and watch FSM transitions update visually.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90" data-testid="hero-start-sim-btn">
                <Link to="/simulator/logic-gates">
                  Start Simulator
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </Button>
              <Button asChild className="rounded-sm border border-border bg-card hover:bg-muted" variant="outline" data-testid="hero-learn-btn">
                <Link to="/learn">Explore Learning Notes</Link>
              </Button>
              <Button asChild className="rounded-sm border border-border bg-card hover:bg-muted" variant="outline" data-testid="hero-examples-btn">
                <Link to="/examples">Try Worked Examples</Link>
              </Button>
            </div>
          </div>

          <Card className="neon-glow border-primary/30 bg-background/75" data-testid="hero-summary-card">
            <CardHeader>
              <CardTitle className="font-mono text-lg text-primary">What you can do now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p data-testid="hero-summary-item-1">• Simulate six core logic gates instantly.</p>
              <p data-testid="hero-summary-item-2">• Model a Moore FSM and run binary sequences.</p>
              <p data-testid="hero-summary-item-3">• Perform ALU arithmetic + bitwise operations.</p>
              <p data-testid="hero-summary-item-4">• Learn theory with compact engineering diagrams.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3" data-testid="home-feature-cards-grid">
        {featureCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group border-border bg-card/80 transition-colors duration-300 hover:border-primary/40"
              data-testid={`home-feature-card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CardHeader className="space-y-3">
                <div className="inline-flex w-fit rounded-sm border border-primary/30 bg-primary/10 p-2 text-primary">
                  <Icon size={18} />
                </div>
                <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground" data-testid={`home-feature-description-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
