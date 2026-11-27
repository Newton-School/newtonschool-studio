import { PixelIcon } from "@/components/pixel-icon";

const podMembers = [
  { role: "Technical owner", sprite: "sprite-owner", shirt: "#1f3a68", hair: "#2a1d16", skin: "#c98d62" },
  { role: "Product", sprite: "sprite-long", shirt: "#7f77dd", hair: "#4a2c1c", skin: "#e8b48a" },
  { role: "Services", sprite: "sprite-short", shirt: "#18b875", hair: "#1c1c1c", skin: "#a86f4c" },
  { role: "Data + AI", sprite: "sprite-long", shirt: "#f0a020", hair: "#1c1c1c", skin: "#d9a074" },
  { role: "Quality", sprite: "sprite-short", shirt: "#2989ff", hair: "#6b4226", skin: "#f0c49c" },
] as const;

const secondFrame = {
  "sprite-owner": "sprite-owner-thumb",
  "sprite-short": "sprite-short-type",
  "sprite-long": "sprite-long-type",
} as const;

export function PixelPod({ compact = false }: { compact?: boolean }) {
  return <div className={`pixel-pod ${compact ? "compact" : ""}`} aria-label="A delivery pod: one technical owner and student engineers across product, services, data and AI, and quality">
    {podMembers.map((member, index) => <figure key={member.role} style={{ ["--bob-delay" as string]: `${index * 0.18}s` }}>
      <span className={`pod-frames ${member.sprite === "sprite-owner" ? "pod-owner" : "pod-typist"}`} style={{ ["--px-shirt" as string]: member.shirt, ["--px-hair" as string]: member.hair, ["--px-skin" as string]: member.skin }}>
        <PixelIcon name={member.sprite} scale={compact ? 2 : 4} className="pod-frame-a" />
        <PixelIcon name={secondFrame[member.sprite]} scale={compact ? 2 : 4} className="pod-frame-b" />
      </span>
      {!compact && <figcaption>{member.role}</figcaption>}
    </figure>)}
  </div>;
}
