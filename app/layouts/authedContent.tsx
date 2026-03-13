// Layout encargado de revisar autenticación y mostrar contenido protegido
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/images/Logo.svg";

import type { Route } from "./+types/authedContent";

export async function loader() {
  // Usuario de prueba que simula intercambio de credenciales y validación exitosa con cliente de autenticación
  const user = {
    id: "123",
    email: "john_doe@example.com",
    name: "John",
    lastName: "Doe",
  };
  return { user };
}

export default function AuthContentLayout({
  loaderData,
}: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="shadow p-4 bg-slate-900 text-slate-100">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/" className="h-12">
            <img src={logo} alt="Light It" className="h-full" />
          </NavLink>
          <div className="space-x-4">
            <span className="hover:text-violet-400">{`${user.name} ${user.lastName}`}</span>
            <Link
              className="ml-auto px-4 py-2 text-red-500 hover:text-red-700"
              to="#"
            >
              Log Out
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 w-full bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
