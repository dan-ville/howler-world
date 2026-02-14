import { Metadata } from "next";
import { colors } from "@/data/colors";

export const metadata: Metadata = {
  title: "The Color Hierarchy",
  description:
    "The fourteen Colors of the Society — from Gold rulers to Red laborers.",
};

export default function ColorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 font-heading text-3xl font-bold text-gold">
        The Color Hierarchy
      </h1>
      <p className="mb-8 text-gray-400">
        The Society is organized into fourteen Colors, each genetically
        engineered for a specific role. From the ruling Golds to the laboring
        Reds, every person is born into their caste and expected to serve its
        purpose.
      </p>

      <div className="space-y-4">
        {colors.map((colorInfo) => (
          <div
            key={colorInfo.color}
            className="glass-card overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Color bar */}
              <div
                className={`flex items-center justify-center px-6 py-3 sm:w-40 sm:py-0 ${colorInfo.cssClass}`}
              >
                <div className="text-center">
                  <span className="font-heading text-lg font-bold">{colorInfo.color}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <p className="mb-1 text-sm font-semibold text-gold uppercase tracking-wide">
                  {colorInfo.role}
                </p>
                <p className="mb-3 text-sm text-gray-300">
                  {colorInfo.description}
                </p>
                {colorInfo.notableMembers.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Notable:{" "}
                    </span>
                    <span className="text-xs text-gray-400">
                      {colorInfo.notableMembers.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
