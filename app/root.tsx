import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { AlertTriangle } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = "Something went wrong";
  const details = "An unexpected error occurred while loading this page.";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <AlertTriangle className="text-violet-600 mb-3" size={32} />

          <h1 className="text-lg font-semibold text-slate-900">{message}</h1>

          <p className="text-sm text-slate-500 mt-1">{details}</p>
        </div>

        <div className="flex justify-center mt-4">
          <Link
            to="/patients"
            className="px-4 py-2 bg-violet-600 text-white text-sm rounded hover:bg-violet-700 transition-colors"
          >
            Go back to patients
          </Link>
        </div>
      </div>
    </main>
  );
}
