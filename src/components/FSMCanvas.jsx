const SYMBOLS = ["0", "1"];

const buildPositions = (states) => {
  const centerX = 390;
  const centerY = 170;
  const radius = Math.min(130, 80 + states.length * 8);

  return states.reduce((acc, state, index) => {
    const angle = (2 * Math.PI * index) / Math.max(states.length, 1) - Math.PI / 2;
    acc[state.name] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
    return acc;
  }, {});
};

export const FSMCanvas = ({ states, transitions, activeState }) => {
  const positions = buildPositions(states);

  return (
    <div
      className="grid-background overflow-hidden rounded-xl border border-border bg-card/70 p-3"
      data-testid="fsm-visualization-canvas"
    >
      <svg
        aria-label="Finite state machine visualization"
        className="h-[340px] w-full"
        data-testid="fsm-canvas-svg"
        viewBox="0 0 780 340"
      >
        <defs>
          <marker id="arrowhead" markerHeight="7" markerWidth="7" orient="auto" refX="6" refY="3.5">
            <polygon fill="var(--signal-low)" points="0 0, 7 3.5, 0 7" />
          </marker>
          <marker id="arrowheadActive" markerHeight="7" markerWidth="7" orient="auto" refX="6" refY="3.5">
            <polygon fill="var(--signal-high)" points="0 0, 7 3.5, 0 7" />
          </marker>
        </defs>

        {states.flatMap((state) =>
          SYMBOLS.map((symbol, symbolIndex) => {
            const from = positions[state.name];
            const toState = transitions[state.name]?.[symbol];
            if (!toState || !positions[toState]) {
              return null;
            }

            const to = positions[toState];
            const active = state.name === activeState;
            const lineColor = active ? "var(--signal-high)" : "var(--signal-low)";

            if (state.name === toState) {
              const loopOffset = symbolIndex === 0 ? -40 : 40;
              const path = `M ${from.x - 8} ${from.y - 26} Q ${from.x + loopOffset} ${from.y - 62} ${from.x + 16} ${from.y - 20}`;
              return (
                <g key={`${state.name}-${symbol}-loop`}>
                  <path
                    d={path}
                    fill="transparent"
                    markerEnd={active ? "url(#arrowheadActive)" : "url(#arrowhead)"}
                    stroke={lineColor}
                    strokeWidth="2"
                  />
                  <text
                    className="font-mono"
                    data-testid={`fsm-transition-${state.name}-${symbol}`}
                    fill={lineColor}
                    fontSize="11"
                    x={from.x + loopOffset - 4}
                    y={from.y - 66}
                  >
                    {symbol}
                  </text>
                </g>
              );
            }

            const offset = symbolIndex === 0 ? -9 : 9;
            const startX = from.x + offset;
            const startY = from.y + offset;
            const endX = to.x + offset;
            const endY = to.y + offset;
            const labelX = (startX + endX) / 2 + offset;
            const labelY = (startY + endY) / 2 - offset;

            return (
              <g key={`${state.name}-${symbol}-${toState}`}>
                <line
                  markerEnd={active ? "url(#arrowheadActive)" : "url(#arrowhead)"}
                  stroke={lineColor}
                  strokeWidth="2"
                  x1={startX}
                  x2={endX}
                  y1={startY}
                  y2={endY}
                />
                <text
                  className="font-mono"
                  data-testid={`fsm-transition-${state.name}-${symbol}`}
                  fill={lineColor}
                  fontSize="11"
                  x={labelX}
                  y={labelY}
                >
                  {symbol}
                </text>
              </g>
            );
          }),
        )}

        {states.map((state) => {
          const position = positions[state.name];
          const isActive = activeState === state.name;

          return (
            <g key={state.name}>
              <circle
                cx={position.x}
                cy={position.y}
                data-testid={`fsm-state-node-${state.name.toLowerCase()}`}
                fill={isActive ? "rgba(112, 0, 255, 0.35)" : "rgba(17, 17, 17, 0.95)"}
                r="30"
                stroke={isActive ? "var(--signal-high)" : "#404040"}
                strokeWidth="2"
              />
              <text
                className="font-mono"
                fill={isActive ? "var(--signal-high)" : "#e4e4e7"}
                fontSize="12"
                textAnchor="middle"
                x={position.x}
                y={position.y - 2}
              >
                {state.name}
              </text>
              <text
                className="font-mono"
                fill="#a1a1aa"
                fontSize="10"
                textAnchor="middle"
                x={position.x}
                y={position.y + 14}
              >
                out={state.output}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
