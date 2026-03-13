import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("layouts/authedContent.tsx", [
    route("patients", "routes/dashboard/patients/patients.tsx"),
  ]),
] satisfies RouteConfig;
