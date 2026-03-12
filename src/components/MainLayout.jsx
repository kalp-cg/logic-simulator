import { Cpu, GitBranch, GraduationCap, Lightbulb } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/", testId: "nav-home-link" },
  { label: "Logic Simulator", path: "/simulator/logic-gates", testId: "nav-logic-link" },
  { label: "FSM Simulator", path: "/simulator/fsm", testId: "nav-fsm-link" },
  { label: "ALU Demo", path: "/simulator/alu", testId: "nav-alu-link" },
  { label: "Learn", path: "/learn", testId: "nav-learn-link" },
  { label: "Examples", path: "/examples", testId: "nav-examples-link" },
];

const shortcuts = [
  { icon: Cpu, label: "Logic", path: "/simulator/logic-gates", testId: "shortcut-logic-link" },
  { icon: GitBranch, label: "FSM", path: "/simulator/fsm", testId: "shortcut-fsm-link" },
  { icon: Lightbulb, label: "ALU", path: "/simulator/alu", testId: "shortcut-alu-link" },
  { icon: GraduationCap, label: "Learn", path: "/learn", testId: "shortcut-learn-link" },
];

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="glass-header sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <NavLink
              data-testid="brand-logo-link"
              to="/"
              className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-card px-3 py-2 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-primary/10"
            >
              <Cpu size={16} />
              <span>Digital Logic & FSM Simulator</span>
            </NavLink>
            <p
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              data-testid="layout-header-tagline"
            >
              Precision Learning for Digital Systems
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2" data-testid="main-navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                data-testid={item.testId}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-sm border px-3 py-1.5 text-sm transition-colors duration-200",
                    isActive
                      ? "neon-glow border-primary/60 bg-primary/15 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2" data-testid="shortcut-navigation">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  data-testid={item.testId}
                  to={item.path}
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon size={13} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="page-enter" data-testid="page-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
