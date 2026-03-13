import { useEffect, useState } from "react";
import { User } from "lucide-react";

type AvatarProps = {
  src: string;
  alt?: string;
};

export default function AvatarComponent({ src, alt = "Avatar" }: AvatarProps) {
  const [validSrc, setValidSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setValidSrc(null);
      return;
    }

    const img = new Image();

    img.onload = () => {
      setValidSrc(src);
    };

    img.onerror = () => {
      console.log("Avatar failed", src);
      setValidSrc(null);
    };

    img.src = src;
  }, [src]);

  if (!validSrc) {
    return (
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-200 text-slate-500">
        <User size={20} />
      </div>
    );
  }

  return (
    <img
      src={validSrc}
      alt={alt}
      loading="lazy"
      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
    />
  );
}
