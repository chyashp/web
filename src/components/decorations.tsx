interface GradientBlobProps {
  color?: "orange" | "navy";
  size?: number;
  className?: string;
}

const blobColors = {
  orange: "rgba(255, 107, 43, 0.12)",
  navy: "rgba(26, 54, 93, 0.08)",
};

export function GradientBlob({
  color = "orange",
  size = 400,
  className = "",
}: GradientBlobProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${blobColors[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
      aria-hidden="true"
    />
  );
}

interface DotGridProps {
  className?: string;
  opacity?: number;
}

export function DotGrid({ className = "", opacity = 0.3 }: DotGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255, 107, 43, 0.15) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity,
      }}
      aria-hidden="true"
    />
  );
}

interface GlowOrbProps {
  color?: "orange" | "white";
  size?: number;
  className?: string;
}

const orbColors = {
  orange: "rgba(255, 107, 43, 0.2)",
  white: "rgba(255, 255, 255, 0.06)",
};

export function GlowOrb({
  color = "orange",
  size = 300,
  className = "",
}: GlowOrbProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${orbColors[color]} 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
