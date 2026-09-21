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

## Como rodar

```bash
npm install
cp .env.example .env.local
# preencha DATABASE_URL (Postgres), OPENAI_API_KEY e AUTH_SECRET

npx prisma migrate dev --name init
npm run dev
```

Abra http://localhost:3000, crie uma conta e comece a gerar conteúdo.

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
```

## Notas técnicas

- Prisma está fixado em `6.19.3`: a série 7.x remove o campo `url` do
  `datasource` do schema em favor de adapters de driver, o que exigiria uma
  reestruturação maior (config file + adapter) fora do escopo pedido.
- A geração de conteúdo usa a API da OpenAI (`gpt-5` via Responses API). É
  necessário definir `OPENAI_API_KEY`.
- `AUTH_SECRET` deve ser uma string aleatória longa (ex: `openssl rand -hex 32`).
