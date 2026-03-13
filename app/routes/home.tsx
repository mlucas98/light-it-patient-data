import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Light It | Patients" },
    { name: "description", content: "Patients main page" },
  ];
}

export default function loader() {
  return redirect("/patients");
}
