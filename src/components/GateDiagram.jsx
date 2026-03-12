import { cn } from "@/lib/utils";

const baseStroke = "var(--signal-low)";
const activeStroke = "var(--signal-high)";

const GateBody = ({ type, strokeColor }) => {
  if (type === "NOT") {
    return (
      <>
        <path d="M55 20 L55 80 L110 50 Z" fill="transparent" stroke={strokeColor} strokeWidth="2" />
        <circle cx="116" cy="50" r="5" fill="transparent" stroke={strokeColor} strokeWidth="2" />
      </>
    );
  }

  if (type === "OR" || type === "NOR" || type === "XOR") {
    return (
      <>
        {type === "XOR" && <path d="M48 16 Q66 50 48 84" fill="none" stroke={strokeColor} strokeWidth="2" />}
        <path
          d="M54 18 Q88 20 110 50 Q88 80 54 82 Q68 50 54 18 Z"
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="2"
        />
      </>
    );
  }

  return (
    <path
      d="M55 18 H86 A32 32 0 0 1 86 82 H55 Z"
      fill="transparent"
      stroke={strokeColor}
      strokeWidth="2"
    />
  );
};

export const GateDiagram = ({ gateType, isActive, value }) => {
  const strokeColor = isActive ? activeStroke : baseStroke;
  const outX = gateType === "NOT" ? 132 : 126;
  const hasBubble = gateType === "NAND" || gateType === "NOR";

  return (
    <div className="rounded-lg border border-border bg-background/60 p-3" data-testid={`gate-diagram-container-${gateType.toLowerCase()}`}>
      <svg
        aria-label={`${gateType} gate diagram`}
        className="h-24 w-full"
        data-testid={`gate-diagram-${gateType.toLowerCase()}`}
        viewBox="0 0 160 100"
      >
        {gateType !== "NOT" && (
          <>
            <line
              className={cn(isActive ? "logic-wire-active" : "")}
              stroke={strokeColor}
              strokeWidth="2"
              x1="16"
              x2="55"
              y1="35"
              y2="35"
            />
            <line
              className={cn(isActive ? "logic-wire-active" : "")}
              stroke={strokeColor}
              strokeWidth="2"
              x1="16"
              x2="55"
              y1="65"
              y2="65"
            />
          </>
        )}
        {gateType === "NOT" && (
          <line
            className={cn(isActive ? "logic-wire-active" : "")}
            stroke={strokeColor}
            strokeWidth="2"
            x1="16"
            x2="55"
            y1="50"
            y2="50"
          />
        )}

        <GateBody type={gateType} strokeColor={strokeColor} />

        {hasBubble && <circle cx="126" cy="50" fill="transparent" r="5" stroke={strokeColor} strokeWidth="2" />}

        <line
          className={cn(isActive ? "logic-wire-active" : "")}
          stroke={strokeColor}
          strokeWidth="2"
          x1={hasBubble ? "132" : String(outX)}
          x2="150"
          y1="50"
          y2="50"
        />

        <text
          className="font-mono"
          data-testid={`gate-output-bit-${gateType.toLowerCase()}`}
          fill={isActive ? activeStroke : "#a1a1aa"}
          fontSize="11"
          x="138"
          y="40"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};
