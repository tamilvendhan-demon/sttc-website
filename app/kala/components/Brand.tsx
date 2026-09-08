import Image from "next/image";

export default function Brand({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <Image src="/kala-logo.svg" alt="THEDAL" width={size} height={size} />
      <div>
        <div className="text-lg font-semibold">THEDAL</div>
        <div className="text-xs text-gray-600">From Craft to Market — Powered by AI</div>
      </div>
    </div>
  );
}
