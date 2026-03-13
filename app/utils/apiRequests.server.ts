// Cliente para centralizar pegadas a la API
import axios from "axios";

export function createApiClient(token?: string) {
  // Se crea el cliente y se deja token como opcional para simular autenticación aunque no se use en este proyecto
  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // Interceptor para manejar respuestas y errores
  api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const status = error.response?.status || 500;

      // Usar Response en lugar de Error para manejo de react-router
      throw new Response(error.response?.data?.message || "API Error", {
        status,
      });
    },
  );

  return api;
}
