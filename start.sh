#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "Criando .env a partir de .env.example..."
  cp .env.example .env

  if command -v openssl >/dev/null 2>&1; then
    AUTH_SECRET_VALUE=$(openssl rand -hex 32)
  else
    AUTH_SECRET_VALUE=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  fi

  if sed --version >/dev/null 2>&1; then
    sed -i "s#^AUTH_SECRET=.*#AUTH_SECRET=$AUTH_SECRET_VALUE#" .env
    sed -i "s#^DATABASE_URL=.*#DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/marketing_ai_saas\"#" .env
  else
    sed -i '' "s#^AUTH_SECRET=.*#AUTH_SECRET=$AUTH_SECRET_VALUE#" .env
    sed -i '' "s#^DATABASE_URL=.*#DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/marketing_ai_saas\"#" .env
  fi

  echo ""
  echo "AUTH_SECRET gerado automaticamente."
  echo "Defina sua OPENAI_API_KEY em .env antes de usar os geradores de IA."
  echo ""
fi

if command -v docker >/dev/null 2>&1; then
  echo "Subindo Postgres via Docker..."
  docker compose up -d db

  echo "Aguardando o banco ficar pronto..."
  until docker compose exec -T db pg_isready -U postgres >/dev/null 2>&1; do
    sleep 1
  done
else
  echo "Docker não encontrado — pulando o banco automático."
  echo "Garanta que DATABASE_URL em .env aponte para um Postgres acessível."
fi

echo "Instalando dependências..."
npm install

echo "Gerando client do Prisma e aplicando migrações..."
npx prisma generate
npx prisma migrate deploy

echo "Subindo o servidor em http://localhost:3000 ..."
npm run dev
