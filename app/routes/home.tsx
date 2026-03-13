import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Light It | Patients" },
    { name: "description", content: "Patients main page" },
  ];
}

export default function Home() {
  // Futuro login
  return <h1>Hola Mundo</h1>;
}
