const PLATFORMS = [
  { label: "PlayStation 5", pct: 34 },
  { label: "PC / Steam", pct: 28 },
  { label: "Xbox Series X", pct: 19 },
  { label: "Nintendo Switch", pct: 14 },
  { label: "Mobile", pct: 5 },
];

export function PlatformStats() {
  return (
    <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-lg p-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-[#A0A0C0] mb-3">
        Plataformas mais buscadas
      </h3>
      {PLATFORMS.map(({ label, pct }) => (
        <div key={label} className="mb-2.5 last:mb-0">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#A0A0C0] font-medium">{label}</span>
            <span className="text-white font-bold">{pct}%</span>
          </div>
          <div className="h-1.5 bg-[#1A1A2E] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF3A20] to-[#FF6B4A] rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
