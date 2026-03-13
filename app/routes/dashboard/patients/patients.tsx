import type { ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/patients";
import { createApiClient } from "~/utils/apiRequests.server";
import CardComponent from "~/components/CardComponent";
import type { Patient } from "~/types/interfaces";
import ModalComponent from "~/components/ModalComponent";
import { useEffect, useMemo, useState } from "react";
import PatientForm from "~/components/forms/PatientForm";
import useDebounce from "~/hooks/useDebounce";
import { DEFAULT_PAGE_SIZE } from "~/utils/constants";
import PaginationControlComponent from "~/components/PaginationControlComponents";

export async function loader() {
  const apiClient = createApiClient();

  const patients: Patient[] = await apiClient.get("/users");

  return { patients };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Descomentar para simular error en el formulario
    // throw new Error("Simulated API error");

    if (data.intent === "update") {
      console.log("[UPDATE_USER] User to be edited with data: ", data);
      // Simulación de PATCH
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (data.intent === "create") {
      console.log("[CREATE_USER] User to be created with data: ", data);
      // Simulación de POST
      await new Promise((r) => setTimeout(r, 1500));
    }
    return {
      success: true,
    };
  } catch (error) {
    return [
      {
        success: false,
        message: `Failed to ${data.intent} patient`,
      },
      { status: 400 },
    ];
  }
}

export default function Patient({ loaderData }: Route.ComponentProps) {
  const { patients } = loaderData;
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  // Memoizar valores para no recalcular el filtrado en cada render, solo cuando cambien pacientes o search
  const filteredPatients = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length < 2) return patients;

    const term = debouncedSearch.toLowerCase();

    return patients.filter((p) => {
      return p.name.toLowerCase().includes(term) || String(p.id).includes(term);
    });
  }, [patients, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const paginatedPatients = useMemo(() => {
    const start = (page - 1) * DEFAULT_PAGE_SIZE;
    const end = start + DEFAULT_PAGE_SIZE;

    return filteredPatients.slice(start, end);
  }, [filteredPatients, page]);

  const totalPages = Math.ceil(filteredPatients.length / DEFAULT_PAGE_SIZE);

  return (
    <div className="py-4 px-8">
      <h1 className="text-4xl font-bold my-8">Patients</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by name or id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2 bg-white text-sm focus:ring-2 focus:ring-violet-400 outline-none"
          />
          <div className="text-xs text-slate-500 my-1">
            Showing {(page - 1) * DEFAULT_PAGE_SIZE + 1} -{" "}
            {Math.min(page * DEFAULT_PAGE_SIZE, filteredPatients.length)} of{" "}
            {filteredPatients.length} patients
          </div>
        </div>
        <button
          className="px-4 py-2 bg-violet-600 text-white text-sm rounded hover:bg-violet-700 transition-colors"
          onClick={() => setCreateOpen(true)}
        >
          New patient
        </button>
      </div>
      <div>
        {paginatedPatients.map((patient: any) => (
          <CardComponent key={patient.id} patient={patient} />
        ))}
        <PaginationControlComponent
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
      <ModalComponent
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create patient"
      >
        <PatientForm
          intent="create"
          onSuccess={() => setCreateOpen(false)}
          onCancel={() => {
            setCreateOpen(false);
          }}
        />
      </ModalComponent>
    </div>
  );
}
