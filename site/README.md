# 🖥️ Portfólio em Sessões (v2)

Versão alternativa do portfólio de **Sr. Agente 208**, usando as mesmas informações da versão principal (`/index.html`), mas reorganizada como um site separado, dividido em **sessões de tela cheia** com **tela de início** própria.

## 🗂️ Sessões

| # | Sessão | Conteúdo |
|---|--------|----------|
| 00 | **Início** | Tela de abertura com apresentação, cartão de perfil e CTA "Explorar portfólio" |
| 01 | **Sobre** | Texto de apresentação, painéis Resolver/Construir/Evoluir e resumo em números |
| 02 | **Habilidades** | Suporte & Infra, Redes, Desenvolvimento Web, Automação & Bots |
| 03 | **Projetos** | Pokédex, Botfriend, Versionamento 2026 e Projetos & Mods |
| 04 | **Trajetória** | Linha do tempo de estudos e próximos passos |
| 05 | **Contato** | E-mail e GitHub + rodapé |

## ✨ Recursos

- Tela de início em tela cheia com grade animada, orbes de gradiente e número "208" gigante
- Rolagem por sessões com **scroll-snap** (cada sessão encaixa na tela)
- **Trilho lateral** de navegação com pontos e nomes das sessões
- **Barra de progresso** no topo
- Navegação por **teclado** (setas ↑/↓, PageUp/PageDown, Home/End)
- Numeração gigante de cada sessão ao fundo
- Animações de entrada escalonadas (respeitam `prefers-reduced-motion`)
- Menu mobile, responsivo e sem nenhuma dependência de framework

## 📂 Estrutura

```text
site/
├── index.html   # Estrutura e conteúdo (6 sessões)
├── style.css    # Identidade visual e layout em telas
├── script.js    # Menu, sessão ativa, progresso, teclado e animações
└── README.md    # Esta documentação
```

## 🌐 Publicar no GitHub Pages

1. Vá em **Settings → Pages** do repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch** com a branch `main` e a pasta `/ (root)`.
3. O site ficará disponível em `https://sr-agente208.github.io/Portif-lio-/site/`.

> A versão original continua intacta na raiz do repositório — as duas podem conviver no mesmo GitHub Pages.

## 🔗 Links creditados no site

- GitHub: https://github.com/Sr-agente208
- Pokédex: https://github.com/Sr-agente208/Pokemon_pokedex
- Botfriend: https://github.com/Sr-agente208/Botfriend
- Versionamento 2026: https://github.com/Sr-agente208/Versionamento_2026
- Meus jogos: https://github.com/Sr-agente208/Meus-jogos-
- E-mail: sr.agente208@gmail.com
