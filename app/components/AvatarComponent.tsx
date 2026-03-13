import { useState } from "react";
import { User } from "lucide-react";

type AvatarProps = {
  src?: string | null;
  alt?: string;
};

export default function AvatarComponent({ src, alt = "Avatar" }: AvatarProps) {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-12 h-12">
      {/* fallback por si falla la imagen*/}
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-200 text-slate-500">
        <User size={20} />
      </div>
      {/* revisar por que no toma el error de la página */}
      {/* {src && !error && (
        <img
          src={src}
          alt={alt}
          className="w-12 h-12 rounded-full object-cover relative z-10"
          onError={() => {
            console.log("error al cargar imagen");
            setError(true);
          }}
        />
      )} */}
    </div>
  );
}
