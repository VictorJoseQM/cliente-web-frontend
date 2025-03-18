const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key-admin",
    resave: false,
    saveUninitialized: false,
  })
); // As sessões são mantidas no servidor e associadas ao usuário enquanto ele navega pelo site.
app.set("view engine", "ejs");
app.use(express.static("public"));

// Middleware de autenticação
const requireAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Rotas de autenticação
app.get("/login", (req, res) => {
  if (req.session.isAuthenticated) return res.redirect("/");
  res.render("login", { error: null });
});

// Rota para autenticar o usuário
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("login", {
      error: "Por favor, preencha todos os campos!",
    });
  }

  if (username === "admin" && password === "admin") {
    req.session.isAuthenticated = true;
    return res.redirect("/");
  } else {
    return res.render("login", { error: "Usuário ou senha incorretos!" });
  }
});

// Rota para deslogar
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// URL da API
const apiUrl = "http://localhost:8080/api/clientes";

// Rotas protegidas

// Rota para requisição de busca de cliente pelo nome na API
app.get("/api/clientes/buscar-por-nome", requireAuth, async (req, res) => {
  const { nome } = req.query;

  try {
    const response = await axios.get(
      `http://localhost:8080/api/clientes/buscar-por-nome?nome=${encodeURIComponent(
        nome
      )}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

// Rota para listar clientes
app.get("/", requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const response = await axios.get(apiUrl);
    const clientes = response.data;

    const totalClientes = clientes.length;
    const totalPages = Math.ceil(totalClientes / limit);
    const startIndex = (page - 1) * limit;
    const clientesPaginados = clientes.slice(startIndex, startIndex + limit);

    res.render("index", { clientes: clientesPaginados, page, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar os clientes");
  }
});

// Rota para exibir o formulário de cadastro
app.get("/novo", requireAuth, (req, res) => {
  res.render("cadastro");
});

// Rota para cadastrar um novo cliente
app.post("/novo", requireAuth, async (req, res) => {
  const { nome, nascimento, cpf, endereco, telefone, email } = req.body;
  try {
    await axios.post(apiUrl, {
      nome,
      nascimento,
      cpf,
      endereco,
      telefone,
      email,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar cliente");
  }
});

// Rota para exibir formulário de edição
app.get("/editar/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    const cliente = response.data;
    res.render("editar", { cliente });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar cliente");
  }
});

// Rota para atualizar um cliente
app.post("/editar/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { nome, nascimento, cpf, endereco, telefone, email } = req.body;
  try {
    await axios.patch(`${apiUrl}/${id}`, {
      nome,
      nascimento,
      cpf,
      endereco,
      telefone,
      email,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar cliente");
  }
});

// Rota para excluir um cliente
app.post("/excluir/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${apiUrl}/${id}`);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir cliente");
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
