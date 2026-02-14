import { Color } from "@/data/types";
import { getColorClasses } from "@/lib/utils";

interface ColorBadgeProps {
  color: Color;
  size?: "sm" | "md";
}

export default function ColorBadge({ color, size = "sm" }: ColorBadgeProps) {
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-block rounded-full font-semibold ${sizeClasses} ${getColorClasses(color)}`}
    >
      {color}
    </span>
  );
}
