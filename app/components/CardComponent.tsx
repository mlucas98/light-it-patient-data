import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import type { Patient } from "~/types/interfaces";
import AvatarComponent from "./AvatarComponent";
import { Link } from "react-router";
import ModalComponent from "./ModalComponent";
import PatientForm from "./forms/PatientForm";

type CardProps = {
  patient: Patient;
};

export default function CardComponent({ patient }: CardProps) {
  const { name, avatar, description, website, id } = patient;
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="mb-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-violet-300 transition-colors">
        <div
          className="flex items-center p-4 cursor-pointer hover:bg-slate-50 hover:rounded-lg"
          onClick={() => setOpen(!open)}
        >
          <AvatarComponent src={avatar} alt={name} />
          <div className="ml-4 flex-1">
            <div className="font-semibold text-slate-900">{name}</div>
            <div className="flex items-center text-sm text-slate-500">
              <span>#{id}</span>
              <Pencil
                className="ml-2 w-4 h-4 text-violet-600 hover:text-violet-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
              />
            </div>
          </div>

          <div className="text-slate-500">
            <ChevronDown
              size={20}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Contenido expandido */}
        <div
          className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col items-start gap-1 mb-2">
            <span className="font-semibold text-sm text-violet-600">
              Description
            </span>
            <span className="text-sm text-slate-500">{description}</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-semibold text-sm text-violet-600">
              Website
            </span>
            <span className="text-sm text-blue-500">
              <Link to={website} target="_blank">
                {website}
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Edit patient"
      >
        <PatientForm
          patient={patient}
          intent="update"
          onSuccess={() => {
            setOpenModal(false);
          }}
          onCancel={() => {
            setOpenModal(false);
          }}
        />
      </ModalComponent>
    </>
  );
}
