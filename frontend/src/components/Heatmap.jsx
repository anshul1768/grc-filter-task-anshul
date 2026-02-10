function cellColor(score) {
  if (score <= 5) return "bg-green-300";
  if (score <= 12) return "bg-yellow-300";
  if (score <= 18) return "bg-orange-300";
  return "bg-red-400";
}

export default function Heatmap({ risks }) {
  // count risks for each (likelihood, impact)
  const getCount = (l, i) =>
    risks.filter((r) => r.likelihood === l && r.impact === i);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Risk Heatmap</h2>

      <div className="grid grid-cols-6 gap-1 text-sm">
        {/* Top labels */}
        <div></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="text-center font-medium">
            {i}
          </div>
        ))}

        {/* Likelihood rows (5 to 1) */}
        {[5, 4, 3, 2, 1].map((l) => (
          <>
            <div key={`l-${l}`} className="font-medium flex items-center">
              {l}
            </div>

            {[1, 2, 3, 4, 5].map((i) => {
              const matches = getCount(l, i);
              const score = l * i;

              return (
                <div
                  key={`${l}-${i}`}
                  title={matches.map((m) => m.asset).join(", ")}
                  className={`h-14 flex items-center justify-center rounded ${cellColor(
                    score
                  )}`}
                >
                  {matches.length}
                </div>
              );
            })}
          </>
        ))}
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Columns = Impact (1–5) | Rows = Likelihood (5–1)
      </div>
    </div>
  );
}
