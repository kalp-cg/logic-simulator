import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { MainLayout } from "@/components/MainLayout";
import HomePage from "@/pages/HomePage";
import LogicSimulatorPage from "@/pages/LogicSimulatorPage";
import FSMSimulatorPage from "@/pages/FSMSimulatorPage";
import ALUDemoPage from "@/pages/ALUDemoPage";
import LearnPage from "@/pages/LearnPage";
import ExamplesPage from "@/pages/ExamplesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulator/logic-gates" element={<LogicSimulatorPage />} />
          <Route path="/simulator/fsm" element={<FSMSimulatorPage />} />
          <Route path="/simulator/alu" element={<ALUDemoPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border border-border text-foreground",
            description: "text-muted-foreground",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;