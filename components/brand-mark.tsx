import Image from "next/image";

/**
 * CentProof brand mark.  Renders the SVG logo at `/brand/centproof-logo.svg`.
 *
 * The logo file lives in `public/brand/` and is part of the repo; we assume
 * it exists.  Earlier versions of this component did a `node:fs.existsSync`
 * check at module load to fall back to a CSS "CP" tile if the file was
 * missing, but that check broke when the component was imported by a
 * client component (browsers don't have `node:fs`).  If we ever want the
 * fallback back, do it via a prop — not at module scope.
 */
type BrandMarkProps = {
  size?: 32 | 36 | 40;
  className?: string;
};

export function BrandMark({ size = 40, className = "" }: BrandMarkProps) {
  return (
    <Image
      src="/brand/centproof-logo.svg"
      alt="CentProof logo"
      width={size}
      height={size}
      className={`rounded-lg object-contain ${className}`}
      priority={size === 40}
    />
  );
}
