$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if (-not (Test-Path ".env")) {
    Write-Host "Criando .env a partir de .env.example..."
    Copy-Item ".env.example" ".env"

    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $authSecret = -join ($bytes | ForEach-Object { $_.ToString("x2") })

    $content = Get-Content ".env"
    $content = $content -replace '^AUTH_SECRET=.*', "AUTH_SECRET=$authSecret"
    $content = $content -replace '^DATABASE_URL=.*', 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marketing_ai_saas"'
    Set-Content ".env" $content

    Write-Host ""
    Write-Host "AUTH_SECRET gerado automaticamente."
    Write-Host "Defina sua OPENAI_API_KEY em .env antes de usar os geradores de IA."
    Write-Host ""
}

$docker = Get-Command docker -ErrorAction SilentlyContinue
if ($docker) {
    Write-Host "Subindo Postgres via Docker..."
    docker compose up -d db

    Write-Host "Aguardando o banco ficar pronto..."
    do {
        Start-Sleep -Seconds 1
        docker compose exec -T db pg_isready -U postgres | Out-Null
        $ready = $LASTEXITCODE -eq 0
    } until ($ready)
} else {
    Write-Host "Docker não encontrado — pulando o banco automático."
    Write-Host "Garanta que DATABASE_URL em .env aponte para um Postgres acessível."
}

Write-Host "Instalando dependências..."
npm install

Write-Host "Gerando client do Prisma e aplicando migrações..."
npx prisma generate
npx prisma migrate deploy

Write-Host "Subindo o servidor em http://localhost:3000 ..."
npm run dev
