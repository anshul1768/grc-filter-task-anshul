import { useState } from "react";
import RiskForm from "./components/RiskForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          GRC Risk Assessment Dashboard
        </h1>

        <RiskForm onRiskAdded={() => setRefresh(!refresh)} />
        <Dashboard refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
