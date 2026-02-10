import { useEffect, useState } from "react";
import Heatmap from "./Heatmap";

const API_URL = "http://localhost:3000/risks";

function mitigation(level) {
  if (level === "Low") return "Monitor";
  if (level === "Medium") return "Plan mitigation";
  if (level === "High") return "Prioritize action per NIST";
  return "Immediate response";
}


function levelColor(level) {
  if (level === "Low") return "text-green-600";
  if (level === "Medium") return "text-yellow-600";
  if (level === "High") return "text-orange-600";
  return "text-red-600";
}

export default function Dashboard({ refresh }) {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => setRisks(d))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <p className="text-center">Loading risks…</p>;

  // ===== Stats calculations =====
  const total = risks.length;

  const highCritical = risks.filter(
    (r) => r.level === "High" || r.level === "Critical"
  ).length;

  const avgScore =
    total === 0
      ? 0
      : (
          risks.reduce((sum, r) => sum + r.score, 0) / total
        ).toFixed(1);

  const exportCSV = () => {
  if (risks.length === 0) return;

  const headers = [
    "Asset",
    "Threat",
    "Likelihood",
    "Impact",
    "Score",
    "Level",
    "Mitigation"
  ];

  const rows = risks.map((r) => [
    r.asset,
    r.threat,
    r.likelihood,
    r.impact,
    r.score,
    r.level,
    mitigation(r.level)
  ]);

  let csv = headers.join(",") + "\n";

  rows.forEach((row) => {
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "risks.csv";
  a.click();
};


  return (
    <div className="space-y-6">
      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-slate-500">Total Risks</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-slate-500">High + Critical</p>
          <p className="text-3xl font-bold text-red-600">
            {highCritical}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-slate-500">Average Score</p>
          <p className="text-3xl font-bold">{avgScore}</p>
        </div>
      </div>

      {/* ===== Risk Table ===== */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Risk Register</h2>
    <button
  onClick={exportCSV}
  className="mb-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  Export CSV
</button>

        {risks.length === 0 ? (
          <p>No risks yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-2 text-left">Asset</th>
                  <th className="p-2 text-left">Threat</th>
                  <th className="p-2 text-center">Likelihood</th>
                  <th className="p-2 text-center">Impact</th>
                  <th className="p-2 text-center">Score</th>
                  <th className="p-2 text-center">Level</th>
                  <th className="p-2 text-left">Mitigation</th>
                </tr>
              </thead>

              <tbody>
                {risks.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-2">{r.asset}</td>
                    <td className="p-2">{r.threat}</td>
                    <td className="p-2 text-center">
                      {r.likelihood}
                    </td>
                    <td className="p-2 text-center">{r.impact}</td>
                    <td className="p-2 text-center font-semibold">
                      {r.score}
                    </td>
                    <td
                      className={`p-2 text-center font-semibold ${levelColor(
                        r.level
                      )}`}
                    >
                      {r.level}
                    </td>
                    <td className="p-2">{mitigation(r.level)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== Heatmap ===== */}
      <Heatmap risks={risks} />
    </div>
  );
}
