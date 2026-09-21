# Marketing AI SaaS

Aplicação Next.js (App Router + TypeScript) para gerar conteúdo de marketing
com IA e gerenciar campanhas e leads.

## Funcionalidades

- **Autenticação** por e-mail/senha (registro, login, logout) com sessão em
  cookie assinado — cada usuário ganha um workspace padrão automaticamente.
- **Geradores de IA** (`/dashboard/generators`): posts, Meta Ads, Google Ads,
  SEO, e-mail marketing, persona, funil, landing page, calendário de
  conteúdo e mensagens de WhatsApp. Cada geração é persistida no banco.
- **Campanhas** (`/dashboard/campaigns`): CRUD simples (nome, plataforma,
  objetivo, status, orçamento).
- **Leads** (`/dashboard/leads`): CRUD simples (nome, contato, origem,
  status, notas).
- **Calendário** (`/dashboard/calendar`): histórico de calendários de
  conteúdo já gerados.

## Como rodar (comando único)

Requer [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/) e
[Docker Desktop](https://www.docker.com/products/docker-desktop/) instalados
e abertos.

**Linux/macOS (ou Git Bash no Windows):**

```bash
./start.sh
```

**Windows (PowerShell):**

```powershell
.\start.ps1
```

Se o PowerShell bloquear a execução do script, rode uma vez:
`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

Qualquer um dos dois: cria o `.env` a partir de `.env.example` (gerando um
`AUTH_SECRET` automaticamente), sobe um Postgres via Docker Compose, instala
as dependências, aplica as migrações do Prisma e inicia o servidor. Depois é
só abrir http://localhost:3000, criar uma conta e gerar conteúdo.

> Antes de usar os geradores de IA, defina `OPENAI_API_KEY` no `.env` gerado.

### Rodando manualmente (sem Docker)

```bash
npm install
cp .env.example .env
# preencha DATABASE_URL (de um Postgres já existente), OPENAI_API_KEY e AUTH_SECRET

npx prisma migrate deploy
npm run dev
```

## Estrutura

```
app/
  api/            # rotas de autenticação, geração, campanhas e leads
  dashboard/      # área logada (geradores, campanhas, leads, calendário)
  login/ register/  # telas de autenticação
components/       # Sidebar, DashboardCard, GeneratorForm, CampaignCard, LeadTable, OutputEditor
lib/
  auth.ts         # hashing de senha, sessão via cookie assinado, workspace padrão
  openai.ts       # chamada ao modelo de IA com o system prompt de marketing
  prisma.ts       # cliente Prisma singleton
  prompts.ts      # system prompt + montagem do prompt por ferramenta
prisma/
  schema.prisma   # User, Workspace, Campaign, Lead, Generation
types/
  marketing.ts    # catálogo de ferramentas e tipos do briefing
docker-compose.yml  # Postgres local para desenvolvimento
start.sh            # sobe tudo com um único comando (Linux/macOS/Git Bash)
start.ps1           # equivalente para Windows PowerShell
```

## Notas técnicas

- Prisma está fixado em `6.19.3`: a série 7.x remove o campo `url` do
  `datasource` do schema em favor de adapters de driver, o que exigiria uma
  reestruturação maior (config file + adapter) fora do escopo pedido.
- A geração de conteúdo usa a API da OpenAI (`gpt-5` via Responses API). É
  necessário definir `OPENAI_API_KEY`.
- `AUTH_SECRET` deve ser uma string aleatória longa (ex: `openssl rand -hex 32`).
