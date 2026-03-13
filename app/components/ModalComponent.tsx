import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function ModalComponent({
  open,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center justify-between p-4 border-b border-violet-600">
          <h2 className="font-semibold text-lg ">{title}</h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2 p-4 border-t">{footer}</div>
        )}
      </div>
    </div>
  );
}
