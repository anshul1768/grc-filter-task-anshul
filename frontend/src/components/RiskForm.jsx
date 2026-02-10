import { useState } from "react";

const API_URL = "http://localhost:3000/assess-risk";

function getLevel(score) {
  if (score <= 5) return "Low";
  if (score <= 12) return "Medium";
  if (score <= 18) return "High";
  return "Critical";
}

export default function RiskForm({ onRiskAdded }) {
  const [asset, setAsset] = useState("");
  const [threat, setThreat] = useState("");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);
  const [loading, setLoading] = useState(false);

  const score = likelihood * impact;
  const level = getLevel(score);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!asset || !threat) return alert("Asset and Threat required");

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset,
          threat,
          likelihood: Number(likelihood),
          impact: Number(impact),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed");
        setLoading(false);
        return;
      }

      await res.json();
      alert("Risk added!");
      onRiskAdded(); // 🔥 trigger dashboard refresh

      setAsset("");
      setThreat("");
      setLikelihood(3);
      setImpact(3);
    } catch {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Risk</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Asset</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            placeholder="Customer Database"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Threat</label>
          <input
            className="w-full border rounded-lg p-2 mt-1"
            value={threat}
            onChange={(e) => setThreat(e.target.value)}
            placeholder="Unauthorized Access"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Likelihood (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full border rounded-lg p-2 mt-1"
            value={likelihood}
            onChange={(e) => setLikelihood(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Impact (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full border rounded-lg p-2 mt-1"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
          />
        </div>

        <div className="bg-gray-100 p-3 rounded-lg text-sm">
          <b>Preview:</b> Score = {score} | Level ={" "}
          <span className="font-semibold">{level}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Risk"}
        </button>
      </form>
    </div>
  );
}
