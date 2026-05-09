import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

const logoSrc = "/brand/centproof-logo.svg";
const logoExists = existsSync(
  join(process.cwd(), "public", "brand", "centproof-logo.svg"),
);

type BrandMarkProps = {
  size?: 32 | 36 | 40;
  className?: string;
};

export function BrandMark({ size = 40, className = "" }: BrandMarkProps) {
  if (logoExists) {
    return (
      <Image
        src={logoSrc}
        alt="CentProof logo"
        width={size}
        height={size}
        className={`rounded-lg object-contain ${className}`}
        priority={size === 40}
      />
    );
  }

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-lg bg-[#0F766E] font-semibold text-white shadow-sm ${className} ${
        size === 40 ? "text-sm" : "text-xs"
      }`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      CP
    </span>
  );
}
