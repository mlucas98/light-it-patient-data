// Layout encargado de revisar autenticación y mostrar contenido protegido
import { Form, Link, NavLink, Outlet, redirect } from "react-router";
import logo from "../assets/images/Logo.svg";

import type { Route } from "./+types/authedContent";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("Cookie") || "";

  const hasCookie = cookie.includes("lightItCookie=true");

  if (!hasCookie) {
    throw redirect("/login");
  }

  // Usuario de prueba que simula intercambio de credenciales y validación exitosa con cliente de autenticación
  const user = {
    id: "123",
    email: "jdoe@example.com",
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
          <div className="flex items-center space-x-4">
            <span className="cursor-default">{`${user.name} ${user.lastName}`}</span>
            <Form method="post" action="/logout">
              <button className="ml-auto px-4 py-2 text-red-500 hover:text-red-700">
                Logout
              </button>
            </Form>
          </div>
        </div>
      </nav>
      <main className="flex-1 w-full bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
