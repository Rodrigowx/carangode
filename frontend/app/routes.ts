import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  
  // Páginas principais existentes
  route("cursos", "routes/cursos.tsx"),
  route("cursos/:id", "routes/cursos.$id.tsx"),
  route("contato", "routes/contato.tsx"),
  route("doacao", "routes/doacao.tsx"),
  route("login", "routes/login.tsx"),
  route("admin/cursos", "routes/admin/cursos.tsx"),
  
  // Página principal Sobre Nós
  route("sobre", "routes/sobre.tsx"),
  
  // Seção Sobre Nós (páginas secundárias disponíveis se necessário)
  route("sobre/quem-somos", "routes/sobre/quem-somos.tsx"),
  route("sobre/missao-visao-valores", "routes/sobre/missao-visao-valores.tsx"),
  route("sobre/transparencia", "routes/sobre/transparencia.tsx"),
  
  // Seção Nossos Projetos
  route("projetos/bazar-solidario", "routes/projetos/bazar-solidario.tsx"),
  //route("projetos/pontos-coleta", "routes/projetos/pontos-coleta.tsx"),
  //route("projetos/manual-doacao", "routes/projetos/manual-doacao.tsx"),
  route("projetos/caprichando-moradia", "routes/projetos/caprichando-moradia.tsx"),
  //route("projetos/analise-moradia", "routes/projetos/analise-moradia.tsx"),
  //route("projetos/escritorio-arquitetura", "routes/projetos/escritorio-arquitetura.tsx"),
  //route("projetos/agricultura-familiar", "routes/projetos/agricultura-familiar.tsx"),
  //route("projetos/cadastro-produtores", "routes/projetos/cadastro-produtores.tsx"),
  
  // Seção Como Apoiar
  route("apoiar/voluntariado", "routes/apoiar/voluntariado.tsx"),
  //route("apoiar/parcerias-empresas", "routes/apoiar/parcerias-empresas.tsx"),
  //route("apoiar/formulario-parceiros", "routes/apoiar/formulario-parceiros.tsx"),
  //route("apoiar/trabalhe-conosco", "routes/apoiar/trabalhe-conosco.tsx"),
  //route("apoiar/vagas", "routes/apoiar/vagas.tsx"),
  //route("apoiar/curriculo", "routes/apoiar/curriculo.tsx"),
  
  // Seção Notícias
  route("noticias", "routes/noticias.tsx"),
  
  // Rota catch-all para DevTools e outras rotas não encontradas
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
