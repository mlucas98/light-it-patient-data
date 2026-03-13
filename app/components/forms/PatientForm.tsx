import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import { useEffect, useState } from "react";
import type { Patient } from "~/types/interfaces";
import AvatarComponent from "../AvatarComponent";
import { CheckCircle2 } from "lucide-react";
import SpinnerComponent from "../SpinnerComponent";

type Props = {
  patient?: Patient;
  intent: "update" | "create";
  onSuccess: () => void;
  onCancel: () => void;
};

type FormValues = {
  id?: string;
  name: string;
  description: string;
  website: string;
};

export default function PatientForm({
  patient,
  intent,
  onSuccess,
  onCancel,
}: Props) {
  // hook para tener control sobre el estado del envío del formulario y su respuesta
  const fetcher = useFetcher();
  const [success, setSuccess] = useState<boolean>(false);

  // Mejora: se podría usar useRevalidator para refrescar datos después de la actualización, pero no hay actualización real
  // const revalidator = useRevalidator();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: patient ?? {
      name: "",
      description: "",
      website: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Envío para manejo de actionFunction en el route
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("intent", intent);

    fetcher.submit(formData, {
      method: "post",
    });
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      setSuccess(true);

      setTimeout(() => {
        onSuccess();
      }, 1200);
    }
  }, [fetcher.data]);

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <CheckCircle2 className="text-green-500 animate-scale-in" size={48} />
        <span className="text-green-600 font-medium">
          Patient saved successfully!
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {intent === "update" && (
        <input type="hidden" value={patient?.id} {...register("id")} />
      )}

      <input type="hidden" value={intent} name="intent" />

      <div className="flex flex-col md:flex-row items-center gap-x-5">
        <div className="my-auto">
          <AvatarComponent src={patient?.avatar} alt={patient?.name} />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            {...register("name", { required: true })}
            className="border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-violet-400 outline-none"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">Name is required</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          className="border border-slate-300 rounded px-3 py-2 min-h-24 focus:ring-2 focus:ring-violet-400 outline-none"
        />
        {errors.description && (
          <span className="text-red-500 text-xs">Description is required</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Website</label>
        <input
          {...register("website", { required: true })}
          className="border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-violet-400 outline-none"
        />
        {errors.website && (
          <span className="text-red-500 text-xs">Website is required</span>
        )}
      </div>

      {/* Feedback de error */}
      {fetcher.data && !fetcher.data.success && (
        <div className="text-red-600 text-sm">{fetcher.data.message}</div>
      )}

      <div className="flex gap-x-4 mt-6">
        <button
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          disabled={fetcher.state === "submitting"}
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 disabled:opacity-50"
        >
          {fetcher.state === "submitting" ? (
            <SpinnerComponent />
          ) : intent === "create" ? (
            "Create patient"
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </form>
  );
}
