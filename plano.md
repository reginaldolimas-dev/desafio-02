# 📋 Plano de Implementação — Câmbio Fácil

## Análise do estado atual

### ✅ O que já existe

| Arquivo | Status | Observações |
|---|---|---|
| `src/services/cotacaoService.js` | ✅ Funcional | Busca cotações na Frankfurter API (BRL → USD, EUR, GBP) |
| `src/hooks/useCotacoes.js` | ✅ Funcional | Hook corrigido para carregar cotações na montagem do componente |
| `src/components/Header.jsx` | ✅ Funcional | Título e subtítulo |
| `src/components/CardCotacao.jsx` | ✅ Funcional | Card individual com sigla, nome amigável, valor e legenda |
| `src/components/FiltroCotacoes.jsx` | ✅ Funcional | Filtro interativo com checkboxes para selecionar moedas |
| `src/components/ListaCotacoes.jsx` | ✅ Funcional | Renderiza grid de cards com estados de loading, erro e vazio |
| `src/components/ConversorMoedas.jsx` | ✅ Funcional | Conversor interativo em tempo real de BRL para moedas selecionadas |
| `src/components/Footer.jsx` | ✅ Funcional | Créditos |
| `src/components/BuscaPaises.jsx` | 🗑️ Removido | Arquivo vazio excluído (limpeza do projeto) |
| `src/App.jsx` | ✅ Funcional | Integrado com useCotacoes, ListaCotacoes e FiltroCotacoes |
| `src/App.css` | ✅ Funcional | Estilos organizados e responsivos (desktop 3 col, tablet 2 col, mobile 1 col) |
| `index.html` | ✅ Funcional | Configurado com `lang="pt-BR"` e título `Câmbio Fácil` |
| `README.md` | ✅ Funcional | Documentação completa com instruções, requisitos e uso de IA |

### API escolhida

**Frankfurter API** — `https://api.frankfurter.dev/v2/`

Resposta do endpoint `/v2/rates?base=BRL&quotes=USD,EUR,GBP`:

```json
[
  { "date": "2026-10-07", "base": "BRL", "quote": "EUR", "rate": 0.17814 },
  { "date": "2026-10-07", "base": "BRL", "quote": "GBP", "rate": 0.15106 },
  { "date": "2026-10-07", "base": "BRL", "quote": "USD", "rate": 0.20022 }
]
```

Cada item traz: data, moeda base, moeda destino e taxa de câmbio.

### Requisitos do desafio (checklist mínimo)

| # | Requisito | Atende? |
|---|---|---|
| 1 | Consumir API pública | ✅ Hook corrigido e apto para carregar dados na montagem |
| 2 | React + Vite | ✅ |
| 3 | Componentização com responsabilidades claras | ✅ Header, Footer, CardCotacao, FiltroCotacoes, ListaCotacoes |
| 4 | Pelo menos 1 forma de interação (busca, filtro, favoritos…) | ✅ Filtro de moedas por checkboxes com estado reativo |
| 5 | Responsividade (celular, tablet, desktop) | ✅ 3 breakpoints: desktop (3 col), tablet (2 col) e mobile (1 col) |
| 6 | Organização visual com CSS | ✅ Estilos organizados para cards, filtros, estados e layout |
| 7 | Comportamentos (loading, erro, vazio) — opcional | ✅ Loading, erro da API e estado vazio de filtro implementados |

---

## Plano de implementação

### Etapa 1 — Corrigir o bug do hook `useCotacoes` ✅ [Concluída]

**Arquivo:** `src/hooks/useCotacoes.js`

**Problema:** a função `carregar()` está dentro do **return** do `useEffect`, o que faz dela uma função de cleanup. Ela nunca é executada na montagem do componente — só na desmontagem.

**O que fazer:**
- Mover a chamada `carregar()` para o corpo do `useEffect`, **antes** do return
- A função `carregar()` deve ser definida e invocada diretamente dentro do `useEffect`, não dentro do return

**Estrutura corrigida (pseudocódigo):**
```
useEffect(() => {
  async function carregar() {
    try { ... setCotacoes(dados) }
    catch { ... setError(...) }
    finally { setCarregando(false) }
  }
  carregar();
}, []);
```

---

### Etapa 2 — Criar o componente `CardCotacao` ✅ [Concluída]

**Arquivo a criar:** `src/components/CardCotacao.jsx`

**Responsabilidade:** exibir os dados de **uma única** cotação em formato de card.

**Props esperadas:** receber um objeto cotação com `quote` (sigla da moeda) e `rate` (valor da taxa).

**O que renderizar:**
- A sigla da moeda dentro de um `<span className="sigla">`
- O nome legível da moeda em um `<h3>` (pode usar um objeto de mapeamento simples: `{ USD: "Dólar Americano", EUR: "Euro", GBP: "Libra Esterlina" }`)
- O valor da taxa formatado com 4 casas decimais em um `<p className="valor">`
- Um texto de legenda como "1 BRL = X MOEDA" em um `<p className="legenda">`

> Os estilos `.card`, `.sigla`, `.valor` e `.legenda` já existem no `App.css`.

---

### Etapa 3 — Criar o componente `ListaCotacoes` ✅ [Concluída]

**Arquivo a criar:** `src/components/ListaCotacoes.jsx`

**Responsabilidade:** receber o array de cotações e renderizar um `CardCotacao` para cada item. Também tratar os estados de carregamento e erro.

**Props esperadas:** `cotacoes` (array), `carregando` (boolean), `erro` (string).

**O que renderizar:**
- Se `carregando` for true → exibir um parágrafo com texto "Carregando cotações…"
- Se `erro` tiver conteúdo → exibir o erro dentro de um `<p className="erro">`
- Caso contrário → renderizar a `<div className="grid-cotacoes">` com um `CardCotacao` para cada item do array, usando `quote` como `key`

> Os estilos `.grid-cotacoes` e `.erro` já existem no `App.css`.

---

### Etapa 4 — Integrar tudo no `App.jsx` ✅ [Concluída]

**Arquivo:** `src/App.jsx`

**O que fazer:**
- Chamar o hook `useCotacoes()` e desestruturar `{ cotacoes, error, carregando }`
- Importar `ListaCotacoes`
- Descomentar / substituir o bloco comentado por `<ListaCotacoes cotacoes={cotacoes} carregando={carregando} erro={error} />`
- Remover a importação do `BuscaPaises` se houver (ou deixar para a próxima etapa)

**Resultado esperado:** ao abrir a aplicação, os 3 cards (USD, EUR, GBP) devem aparecer com os valores vindos da API.

---

### Etapa 5 — Adicionar interação: Filtro de moedas ✅ [Concluída]

**Arquivo a criar:** `src/components/FiltroCotacoes.jsx`

**Responsabilidade:** permitir que o usuário escolha quais moedas deseja visualizar (a interação mínima exigida pelo desafio).

**O que fazer:**
- Criar um componente com 3 checkboxes (USD, EUR, GBP), todos marcados por padrão
- Gerenciar o estado das moedas selecionadas no `App.jsx` com `useState`
- Passar o estado para `ListaCotacoes`, que filtra o array de cotações antes de renderizar
- Posicionar o filtro visualmente entre o `<h2>` da seção e o grid de cards

**Lógica no App:**
- `const [selecionadas, setSelecionadas] = useState(["USD", "EUR", "GBP"])`
- Filtrar: `cotacoes.filter(c => selecionadas.includes(c.quote))`
- Passar o array filtrado para `ListaCotacoes`

> Isso atende ao requisito de **interação (filtro)** com o mínimo de complexidade.

---

### Etapa 6 — Ajustar responsividade ✅ [Concluída]

**Arquivo:** `src/App.css`

**O que fazer:**
- Já existe `@media (max-width: 768px)` trocando o grid para 1 coluna — isso cobre celular
- Adicionar breakpoint intermediário para tablet: `@media (max-width: 1024px)` com `grid-template-columns: repeat(2, 1fr)` (2 colunas no tablet)
- Verificar que o filtro (checkboxes) também se adapte em telas pequenas (pode usar `flex-wrap: wrap`)

---

### Etapa 7 — Ajustar `index.html` ✅ [Concluída]

**Arquivo:** `index.html`

**O que fazer:**
- Trocar `lang="en"` por `lang="pt-BR"`
- Trocar `<title>desafio02</title>` por `<title>Câmbio Fácil</title>`

---

### Etapa 8 — Deletar arquivo não utilizado ✅ [Concluída]

**Arquivo:** `src/components/BuscaPaises.jsx`

**O que fazer:**
- Remover este arquivo vazio que não será utilizado no projeto

---

### Etapa 9 — Reescrever o `README.md` ✅ [Concluída]

**Arquivo:** `README.md`

**Estrutura sugerida:**

```markdown
# 💱 Câmbio Fácil

Painel interativo de cotações de moedas em relação ao real brasileiro.

## Sobre o projeto

Aplicação React que consome a API Frankfurter para exibir cotações
atualizadas de USD, EUR e GBP em relação ao BRL. O usuário pode
filtrar quais moedas deseja visualizar.

## Tecnologias

- React 19
- Vite 8
- Frankfurter API (https://frankfurter.dev)

## Como executar

npm install
npm run dev

## Funcionalidades

- Consulta de cotações em tempo real
- Filtro de moedas por checkbox
- Layout responsivo (celular, tablet, desktop)
- Tratamento de estados: carregando, erro

## Uso de IA

(descrever se e como a IA foi utilizada)

## Autor

(seu nome)
```

---

## Arquitetura final de componentes

```
App
├── Header
├── Main
│   ├── FiltroCotacoes
│   └── ListaCotacoes
│       └── CardCotacao (×3)
└── Footer
```

## Arquivos do projeto (estrutura final)

```
src/
├── components/
│   ├── CardCotacao.jsx      ← ✅ CRIADO (etapa 2 e 10)
│   ├── ConversorMoedas.jsx  ← ✅ CRIADO (etapa 10)
│   ├── FiltroCotacoes.jsx   ← ✅ CRIADO (etapa 5)
│   ├── Footer.jsx           ← JÁ EXISTE
│   ├── Header.jsx           ← JÁ EXISTE
│   └── ListaCotacoes.jsx    ← ✅ CRIADO (etapa 3)
├── hooks/
│   └── useCotacoes.js       ← ✅ CORRIGIDO (etapa 1)
├── services/
│   └── cotacaoService.js    ← JÁ EXISTE
├── App.css                  ← ✅ AJUSTADO (etapa 6 e 10)
├── App.jsx                  ← ✅ INTEGRADO (etapa 4 e 10)
└── main.jsx                 ← JÁ EXISTE
```

## Resumo das etapas

| Etapa | Ação | Tipo | Status |
|---|---|---|---|
| 1 | Corrigir bug do `useCotacoes` | Correção | ✅ Concluída |
| 2 | Criar `CardCotacao` | Componente novo | ✅ Concluída |
| 3 | Criar `ListaCotacoes` | Componente novo | ✅ Concluída |
| 4 | Integrar no `App.jsx` | Integração | ✅ Concluída |
| 5 | Criar `FiltroCotacoes` (interação) | Componente novo | ✅ Concluída |
| 6 | Ajustar responsividade (tablet) | CSS | ✅ Concluída |
| 7 | Ajustar `index.html` (lang, title) | HTML | ✅ Concluída |
| 8 | Deletar `BuscaPaises.jsx` | Limpeza | ✅ Concluída |
| 9 | Reescrever `README.md` | Documentação | ✅ Concluída |
| 10 | Conversor de moedas + corrigir legenda dos cards | Melhoria | ✅ Concluída |

---

### Etapa 10 — Conversor de moedas e correção de legenda ✅ [Concluída]

**Problema identificado:** O Header diz "Consulte cotações **e converta moedas**", mas não existe conversor. Além disso, a legenda "1 BRL = 0.2002 USD" é tecnicamente correta mas pouco intuitiva para o brasileiro. O formato "1 USD = 4,99 BRL" é a convenção usada no mercado.

**O que fazer:**

1. **Corrigir `CardCotacao.jsx`** — inverter a taxa para exibir no formato "1 USD = X BRL" (dividir 1 pela taxa da API). A API retorna `1 BRL → X USD`, e o usuário quer ver `1 USD → X BRL`.

2. **Criar `ConversorMoedas.jsx`** — componente com:
   - Um campo numérico para o usuário digitar um valor em BRL
   - Resultado da conversão para cada moeda selecionada, usando as taxas já carregadas
   - Cálculo: `valor * rate` (a API já retorna quanto de cada moeda equivale a 1 BRL)

3. **Adicionar estilos CSS** — estilizar o conversor no `App.css`

4. **Integrar no `App.jsx`** — posicionar o conversor como segunda seção, abaixo das cotações

5. **Atualizar `README.md`** — incluir o conversor nas funcionalidades documentadas

