const logicDiagram = (
  <svg className="h-24 w-full" viewBox="0 0 220 90">
    <line stroke="#00f0ff" strokeWidth="2" x1="10" x2="70" y1="30" y2="30" />
    <line stroke="#00f0ff" strokeWidth="2" x1="10" x2="70" y1="60" y2="60" />
    <path d="M70 18 H110 A32 32 0 0 1 110 72 H70 Z" fill="transparent" stroke="#00f0ff" strokeWidth="2" />
    <line stroke="#00f0ff" strokeWidth="2" x1="142" x2="208" y1="45" y2="45" />
    <text className="font-mono" fill="#a1a1aa" fontSize="11" x="88" y="84">
      A,B → AND → Y
    </text>
  </svg>
);

const fsmDiagram = (
  <svg className="h-24 w-full" viewBox="0 0 220 90">
    <circle cx="55" cy="45" fill="rgba(0,240,255,0.12)" r="22" stroke="#00f0ff" strokeWidth="2" />
    <circle cx="165" cy="45" fill="rgba(112,0,255,0.2)" r="22" stroke="#7000ff" strokeWidth="2" />
    <line markerEnd="url(#miniArrow)" stroke="#00f0ff" strokeWidth="2" x1="78" x2="140" y1="45" y2="45" />
    <text className="font-mono" fill="#a1a1aa" fontSize="11" x="102" y="36">
      input=1
    </text>
    <defs>
      <marker id="miniArrow" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
        <polygon fill="#00f0ff" points="0 0,6 3,0 6" />
      </marker>
    </defs>
  </svg>
);

const aluDiagram = (
  <svg className="h-24 w-full" viewBox="0 0 220 90">
    <rect fill="rgba(17,17,17,1)" height="56" rx="10" stroke="#00f0ff" strokeWidth="2" width="90" x="65" y="17" />
    <text className="font-mono" fill="#00f0ff" fontSize="13" x="92" y="50">
      ALU
    </text>
    <line stroke="#ff2e63" strokeWidth="2" x1="15" x2="65" y1="30" y2="30" />
    <line stroke="#ff2e63" strokeWidth="2" x1="15" x2="65" y1="60" y2="60" />
    <line stroke="#00f0ff" strokeWidth="2" x1="155" x2="205" y1="45" y2="45" />
  </svg>
);

const controlDiagram = (
  <svg className="h-24 w-full" viewBox="0 0 220 90">
    <rect fill="rgba(17,17,17,1)" height="24" rx="6" stroke="#7000ff" width="70" x="18" y="33" />
    <rect fill="rgba(17,17,17,1)" height="24" rx="6" stroke="#00f0ff" width="70" x="130" y="16" />
    <rect fill="rgba(17,17,17,1)" height="24" rx="6" stroke="#00f0ff" width="70" x="130" y="50" />
    <line stroke="#a1a1aa" strokeWidth="2" x1="88" x2="130" y1="44" y2="28" />
    <line stroke="#a1a1aa" strokeWidth="2" x1="88" x2="130" y1="46" y2="62" />
    <text className="font-mono" fill="#a1a1aa" fontSize="10" x="27" y="48">
      Controller
    </text>
  </svg>
);

const mapping = {
  "Logic Gates": logicDiagram,
  "Finite State Machines": fsmDiagram,
  ALU: aluDiagram,
  "Control Logic": controlDiagram,
};

export const ConceptDiagram = ({ title }) => {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-2" data-testid={`concept-diagram-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      {mapping[title]}
    </div>
  );
};
