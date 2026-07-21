# Estudante Offline - Back-end

Back-end do sistema de gestão escolar "Estudante Offline", projeto final da matéria de FullStack.

## Tecnologias

- Node.js
- Express
- MySQL (mysql2)
- JWT (jsonwebtoken)
- bcrypt

## Estrutura de pastas

```
backend/
├── config/         -> conexão com o banco
├── models/         -> queries SQL de cada entidade
├── controllers/    -> regras das rotas
├── routes/         -> rotas do Express
├── middlewares/    -> autenticação (JWT) e autorização (roles)
├── db/schema.sql   -> script com as tabelas do banco
├── app.js          -> configuração do Express
└── server.js       -> inicia o servidor
```

## Como rodar o projeto

1. Instale as dependências:
   ```
   npm install
   ```

2. Confira o arquivo `.env` na raiz do projeto (já vem criado) e ajuste com os dados do seu MySQL:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=estudante_offline
   JWT_SECRET=algum_segredo_forte
   JWT_EXPIRES_IN=8h
   ```
   Troque `DB_USER` e `DB_PASSWORD` pelos dados reais do seu MySQL (no MySQL Workbench, geralmente é o usuário `root` e a senha que você definiu na instalação).

3. Crie o banco `estudante_offline`:
   ```sql
   CREATE DATABASE estudante_offline;
   ```
   Depois rode o script `db/schema.sql` dentro desse banco (pelo MySQL Workbench, terminal `mysql`, ou qualquer cliente MySQL).

4. Inicie o servidor:
   ```
   node server.js
   ```
   ou, se quiser reiniciar sozinho a cada alteração:
   ```
   npm run dev
   ```

A API vai subir em `http://localhost:3000`.

## Roles do sistema

- **admin**: acesso completo (usuários, turmas, matrículas, notas)
- **professor**: gerencia alunos e lança notas
- **aluno**: consulta suas próprias notas e turmas

## Endpoints

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | /auth/register | Cria um usuário (admin, professor ou aluno) |
| POST | /auth/login | Login, retorna token JWT |

### Students
| Método | Rota | Descrição |
|---|---|---|
| GET | /students | Lista todos os alunos |
| GET | /students/:id | Busca um aluno |
| POST | /students | Cria um aluno (admin, professor) |
| PUT | /students/:id | Atualiza um aluno (admin, professor) |
| DELETE | /students/:id | Remove um aluno (admin) |

### Classes
| Método | Rota | Descrição |
|---|---|---|
| GET | /classes | Lista todas as turmas |
| GET | /classes/:id | Busca uma turma |
| POST | /classes | Cria uma turma (admin) |
| PUT | /classes/:id | Atualiza uma turma (admin) |
| DELETE | /classes/:id | Remove uma turma (admin) |

### Enrollments
| Método | Rota | Descrição |
|---|---|---|
| GET | /enrollments | Lista todas as matrículas |
| GET | /enrollments/:id | Busca uma matrícula |
| GET | /enrollments/student/:studentId | Matrículas de um aluno |
| POST | /enrollments | Matricula um aluno numa turma (admin) |
| PUT | /enrollments/:id | Atualiza status da matrícula (admin) |
| DELETE | /enrollments/:id | Remove matrícula (admin) |

### Grades
| Método | Rota | Descrição |
|---|---|---|
| GET | /grades | Lista todas as notas |
| GET | /grades/enrollment/:enrollmentId | Notas de uma matrícula |
| POST | /grades | Lança uma nota (admin, professor) |
| PUT | /grades/:id | Atualiza uma nota (admin, professor) |
| DELETE | /grades/:id | Remove uma nota (admin) |

Todas as rotas (exceto `/auth`) exigem o header:
```
Authorization: Bearer <token>
```
