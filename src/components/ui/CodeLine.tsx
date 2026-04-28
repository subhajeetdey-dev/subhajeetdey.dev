interface CodeLineProps {
  text: string;
  indent?: number;
  color?: string;
}

export function CodeLine({
  text,
  indent = 0,
  color = "#71717a",
}: CodeLineProps) {
  return (
    <div
      className="flex items-center gap-2 font-mono text-xs leading-6"
      style={{ paddingLeft: indent * 16 }}
    >
      <span
        style={{
          color: "#3f3f46",
          minWidth: 28,
          textAlign: "right",
          userSelect: "none",
        }}
      />

      <span style={{ color }}>{text}</span>
    </div>
  );
}
