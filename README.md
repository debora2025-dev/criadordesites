# Debora Imob — Site institucional

Site institucional para a **Debora Imob**, com destaque para o novo empreendimento
**Residencial Bosque Ipê** (galeria de fotos, diferenciais, imóveis e contato).

Feito em HTML, CSS e JavaScript puros — sem build, sem dependências. Basta abrir
`index.html` no navegador ou publicar os arquivos em qualquer serviço de hospedagem
(Vercel, Netlify, GitHub Pages, cPanel, etc.).

## Estrutura

```
index.html      → todas as seções do site (hero, empreendimento, diferenciais, imóveis, sobre, contato)
css/style.css   → estilos e responsividade
js/main.js      → menu mobile, galeria com lightbox e formulário de contato via WhatsApp
```

## O que personalizar antes de publicar

1. **Fotos do empreendimento** — as imagens atuais em `index.html` usam
   `https://picsum.photos/...` como placeholder. Substitua pelas fotos reais do
   Residencial Bosque Ipê (ou do empreendimento correto) na seção `#gallery` e no `hero`.
2. **Nome do empreendimento e dados** — troque "Residencial Bosque Ipê", metragens,
   número de quartos/vagas e bairro pelos dados reais.
3. **WhatsApp** — troque `5500000000000` (em `index.html` e em `js/main.js`,
   constante `WHATSAPP_NUMBER`) pelo número real no formato `55DDDNÚMERO`.
4. **Contato** — endereço, e-mail, telefone e CRECI no rodapé e na seção de contato.
5. **Redes sociais** — links de Instagram/Facebook na seção de contato.
6. **Domínio** — ao publicar, apontar `www.deboraimob.com.br` para o serviço de
   hospedagem escolhido.

## Formulário de contato

O formulário não possui backend: ao enviar, ele monta a mensagem e abre o WhatsApp
com o texto pronto para envio. Se preferir salvar os leads em um banco de dados
ou CRM, é possível integrar um serviço como Formspree, um endpoint próprio, ou
uma automação (ex.: Make/Zapier).
