const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCursos = async (req, res) => {
  try {
    // Retornar todos os cursos - o filtro por 'exibir' será feito no frontend conforme necessário
    const cursos = await prisma.curso.findMany({
      orderBy: { id: 'desc' } // Ordenar por mais recente primeiro
    });
    res.json(cursos);
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.getCursoById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const curso = await prisma.curso.findUnique({ where: { id } });
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json(curso);
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.createCurso = async (req, res) => {
  try {
    const { titulo, descricao, imagemCapa, dataInicio, dataFim, exibir } = req.body;
    const novoCurso = await prisma.curso.create({
      data: { 
        titulo, 
        descricao, 
        imagemCapa, 
        dataInicio: new Date(dataInicio), 
        dataFim: new Date(dataFim), 
        exibir: exibir !== false 
      }
    });
    res.status(201).json({ message: 'Curso criado com sucesso!', data: novoCurso });
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.updateCurso = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, imagemCapa, dataInicio, dataFim, exibir } = req.body;
    const curso = await prisma.curso.update({
      where: { id },
      data: { 
        titulo, 
        descricao, 
        imagemCapa, 
        dataInicio: new Date(dataInicio), 
        dataFim: new Date(dataFim), 
        exibir 
      }
    });
    res.json({ message: 'Curso atualizado com sucesso!', data: curso });
  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.deleteCurso = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.curso.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar curso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.toggleExibir = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const curso = await prisma.curso.update({
      where: { id },
      data: { exibir: req.body.exibir }
    });
    res.json({ message: 'Status de exibição atualizado!', data: curso });
  } catch (error) {
    console.error('Erro ao atualizar exibição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.createPessoaInscrita = async (req, res) => {
  try {
    const cursoId = Number(req.params.id);
    const { nome, email } = req.body;
    // Verifica se o curso existe e está visível
    const curso = await prisma.curso.findUnique({ where: { id: cursoId, exibir: true } });
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado ou não disponível para inscrição' });
    // Verifica se já existe inscrição para o mesmo email no mesmo curso
    const jaInscrito = await prisma.pessoaInscrita.findFirst({ where: { email, cursoId } });
    if (jaInscrito) return res.status(400).json({ error: 'Você já está inscrito neste curso' });
    const pessoa = await prisma.pessoaInscrita.create({ data: { nome, email, cursoId } });
    res.status(201).json({ message: 'Inscrição realizada com sucesso!', data: pessoa });
  } catch (error) {
    console.error('Erro ao criar inscrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.getPessoasPorCurso = async (req, res) => {
  try {
    const cursoId = Number(req.params.id);
    const pessoas = await prisma.pessoaInscrita.findMany({ 
      where: { cursoId },
      orderBy: { inscritoEm: 'desc' }
    });
    res.json(pessoas);
  } catch (error) {
    console.error('Erro ao buscar inscritos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};