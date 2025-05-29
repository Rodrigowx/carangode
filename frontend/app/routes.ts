import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cursos", "routes/cursos.tsx"),
  route("cursos/:id", "routes/cursos.$id.tsx"),
  route("sobre", "routes/sobre.tsx"),
  route("contato", "routes/contato.tsx"),
  route("doacao", "routes/doacao.tsx"),
  route("login", "routes/login.tsx"),
  route("admin/cursos", "routes/admin/cursos.tsx"),
];
