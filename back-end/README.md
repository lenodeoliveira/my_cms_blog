<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/typescript.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/npm.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/nodedotjs.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/docker.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/mysql.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/jest.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/swagger.svg" />&nbsp;&nbsp;
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/sequelize.svg" />&nbsp;&nbsp;
<br>

# CMS BRAVE 🚀

Projeto tem por objetivo criar um CMS que sirva como um ponto de partida para os produtos que utilizem algum gerenciamento de conteúdo.

API construída utilizando TDD como metodologia de trabalho, Clean Architecture para fazer a distribuição de responsabilidades em camadas, sempre que possível seguindo os princípios do SOLID e aplicando alguns Design Patterns para resolver alguns problemas.
> ## BOAS PRÁTICAS

Nesse projeto estamos utilizando eslint para code style e Conventional Commits.<br>
Padrão de commits:
- `feat: commit message`
- `fix: commit message`
- `docs: commit message`
- `style: commit message`
- `refactor: commit message`
- `test: commit message`
- `chore: commit message`
- `perf: commit message`
- `ci: commit message`
- `build: commit message`
- `temp: commit message`


>  ## Principais ferramentas utilizadas ⚙️ :

⚠️ Nesse projeto é utilizado a lib Husky js para verificação de lint e execução de testes antes do envio para o repositório.
* Typescript: **v4.8.3**
* Node: **v16.16.0**
* NPM: **v8.11.0**
* Docker: **v20.10.17**
* Mysql: **v8.0.30**
* Mysql2: **v2.3.3**
* Sequelize: **v6.23.0**
* Bcrypt: **v5.0.1**
* Swagger: **v1.0.0**
* Express: **4.18.1**
* Jest: **v29.0.3**
* git-commit-msg-linter: **v4.1.3**
* Eslint: **v8.23.1**
* Jsonwebtoken: **v8.5.1**
* Winston: **v3.8.2**
* Multer: **v1.4.5-lts.1**
* Rimraf: **v3.0.2**
* Nodemon: **v2.0.19**
* Swagger-ui-express: **v4.5.0**
* Validator: **v13.7.0**
* Lint-staged: **v13.0.3**
* Standard-version: **9.5.0**
* Husky JS: **8.0.1**

>  ## Setup ⚙️ :

Para executar o projeto em modo de desenvolvimento, é preciso somente clonar o repositório, criar os arquivos para adicionar as variáveis de ambiente, depois é necessário rodar o comando `docker-compose up --build` na raiz do projeto (deve subir os containers do back-end e front-ent). <br>
Ao subir o projeto ele deve criar um banco de desenvolvimento de acordo com os scritps que estão na basta `scripts/schema.sql`. <br>


> Para rodar os testes do back-end é necessário entrar na pasta back-end e rodar os comandos de testes:
* Para testes unitários: `npm run test:unit`
* Para testes de integração: `npm run test:integration`
* Para rodar todos os testes: `npm test` <br><br>
**VARIÁVEIS DB:** <br>
`MYSQL_DATABASE=`<br>
`MYSQL_ROOT_PASSWORD=`<br>
`MYSQL_USER=`<br>
`MYSQL_PASSWORD=`<br>

> ⚠️  🐳   -  Verifique se as imagens do Mysql e NodeJS foram baixadas corretamente no momento em que os containers subirem.


## Rotas ⚙️ :

Endpoints disponíveis:
<pre>
✅ POST   - /api/login<br>
✅ POST   - /api/signup<br>
✅ GET    - /api/contents?page=number&limit=number<br>
✅ GET    - /api/contents/{slug}<br>
✅ POST   - /api/contents<br>
✅ PUT    - /api/contents/{Id}<br>
✅ DELETE - /api/contents/{Id}<br>
✅ POST   - /api/upload<br>
✅ DELETE - /api/upload/:image<br>
✅ POST   - /api/register/auth/users<br>
✅ PUT    - /api/register/auth/users/:id<br>
✅ GET    - /api/register/auth/users/:id<br>
✅ GET    - /api/register/auth/users/<br>
✅ GET    - /api/register/auth/users/:id<br>
✅ GET    - /api/register/auth/users?page=number&limit=number<br>
✅ POST   - /api/forgot-password/<br>
✅ POST   - /api/reset-password?code=string&email=string/<br>
✅ GET    - /api/contents-by-admin<br>
✅ GET    - /api/contents-by-admin/{id}<br>
✅ GET    - /api/contents-by-admin?page=number&limit=number<br>
✅ GET    - /api/upload/files?page=number&limit=number<br>
✅ GET    - /api/contents/dashboard/last-update?start=string&end=string&orientation=string&orderBy=string<br>
✅ GET    - /api/contents/dashboard/count-by-authors/<br>
</pre>

> ⚠️  **SWAGGER**  -  Ao subir a API é possível consultar mais detalhes de cada endpoint através da rota `(url)/api-docs/`
