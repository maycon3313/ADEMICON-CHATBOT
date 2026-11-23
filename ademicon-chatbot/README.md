# Chatbot Ademicon — projeto inicial

Projeto demonstrativo com:
- Frontend React + Vite
- Backend Node.js + Express
- Respostas automáticas por regras
- Cadastro de interessados salvo em `backend/data/leads.json`
- Link para iniciar conversa no WhatsApp

## Requisitos
Instale Node.js (versão LTS) e VS Code.

## Instalação
Abra o terminal na pasta `ademicon-chatbot` e execute:

```bash
npm install
npm run install:all
```

Copie `backend/.env.example` para `backend/.env`.

## Executar
Na pasta principal:

```bash
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001  
Teste da API: http://localhost:3001/api/health

## Importante
Este é um protótipo inicial. As respostas são automáticas e baseadas em palavras-chave; ainda não usa IA generativa nem envia mensagens automaticamente pela API oficial do WhatsApp. O botão abre uma conversa no WhatsApp. Para produção, configure autenticação, proteção contra spam, validação de dados, política de privacidade e armazenamento seguro. Colete dados pessoais apenas com aviso e consentimento apropriados.
