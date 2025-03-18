# Cliente Web Frontend

Este é um projeto frontend para gerenciamento de clientes, utilizando Express.js, EJS para renderização de views e axios para consumir uma API.

## Funcionalidades
- Autenticação de usuários
- Listagem de clientes paginada
- Pesquisa de clientes por nome
- Cadastro de novos clientes
- Edição de clientes existentes
- Exclusão de clientes
- Interface responsiva com estilização em CSS

## Tecnologias Utilizadas
- Node.js
- Express.js
- EJS
- Axios
- Express-Session
- Body-Parser
- CSS

## Estrutura do Projeto
```
├── app.js
├── package.json
├── public/
│   └── css/
│       ├── footer.css
│       ├── form.css
│       ├── login.css
│       └── style.css
└── views/
    ├── cadastro.ejs
    ├── editar.ejs
    ├── index.ejs
    └── login.ejs
```

## Instalação e Execução
### Requisitos
- Node.js instalado

### Passos
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Entre no diretório do projeto:
   ```sh
   cd cliente-web-frontend
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor:
   ```sh
   node app.js
   ```

O servidor será iniciado na porta `3000`.

## Configuração da API
A API de clientes deve estar rodando na porta `8080` para que o frontend funcione corretamente. O endpoint padrão utilizado é:
```
http://localhost:8080/api/clientes
```
Certifique-se de que a API esteja funcionando antes de rodar o frontend.

## Autenticação
Para acessar as funcionalidades, é necessário fazer login com as credenciais padrão:
- **Usuário:** admin
- **Senha:** admin

## Contato
Desenvolvido por:
- [Pedro Ariel](https://github.com/pedroOlvPinheiro)
- [Victor José](https://github.com/VictorJoseQM)

