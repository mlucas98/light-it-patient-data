import { Form, useActionData } from "react-router";

export default function Login() {
  const error = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-violet-600">
            Patient Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue</p>
        </div>

        <Form method="post" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              placeholder="example@test.com"
              className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 bg-violet-600 text-white py-2 rounded text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            Sign in
          </button>
        </Form>
      </div>
    </div>
  );
}
