# 💱 Câmbio Fácil — Painel Interativo com API Pública

Painel interativo responsivo desenvolvido em **React + Vite** para consulta de cotações de moedas estrangeiras em relação ao Real Brasileiro (BRL), consumindo dados em tempo real de uma API pública.

Projeto desenvolvido para o **DESAFIO 02: Painel Interativo com API Pública usando React + Vite**.

---

## 💡 Problemática Resolvida

> *Como transformar dados disponibilizados por uma API pública em uma aplicação que facilite a consulta e a interação do usuário com essas informações?*

Muitas APIs financeiras fornecem taxas de câmbio em formatos JSON brutos, de difícil leitura para usuários comuns. O **Câmbio Fácil** transforma esses dados brutos em uma interface visual clara, organizada em cards informativos e com ferramentas de filtro que permitem ao usuário focar apenas nas moedas do seu interesse.

---

## 🎯 Requisitos do Desafio Atendidos

- [x] **1. API Pública**: Consome a API pública [Frankfurter](https://frankfurter.dev) (`https://api.frankfurter.dev/v2/rates?base=BRL&quotes=USD,EUR,GBP`), sem necessidade de chaves privadas ou autenticações complexas.
- [x] **2. React + Vite**: Desenvolvido com React 19 e Vite, com carregamento rápido e empacotamento otimizado.
- [x] **3. Componentização**: Arquitetura modular com divisão clara de responsabilidades:
  - `Header`: Cabeçalho com título e descrição do aplicativo.
  - `FiltroCotacoes`: Componente interativo com seleção via checkboxes.
  - `ListaCotacoes`: Gerenciador da exibição em grid e controle de estados.
  - `CardCotacao`: Exibição visual de cada cotação (sigla, nome por extenso, cotação comercial brasileira `1 MOEDA = R$ X` e valor formatado).
  - `ConversorMoedas`: Conversor interativo em tempo real para cálculo de Reais (BRL) para moedas estrangeiras.
  - `Footer`: Rodapé com créditos e indicação da fonte de dados.
- [x] **4. Interação com os Dados**:
  - **Filtro de moedas**: Seleção reativa via checkboxes (`useState`).
  - **Conversão em tempo real**: Campo numérico interativo onde o usuário digita qualquer quantia em BRL e visualiza instantaneamente o valor equivalente convertido para as moedas selecionadas.
- [x] **5. Responsividade**: Layout totalmente adaptável com 3 breakpoints:
  - 🖥️ **Desktop (> 1024px)**: Grid em 3 colunas.
  - 📱 **Tablet (<= 1024px)**: Grid em 2 colunas.
  - 📲 **Celular (<= 768px)**: Grid em 1 coluna e formulário do conversor e filtros adaptados para tela cheia.
- [x] **6. Organização Visual**: Interface estilizada com CSS moderno, paleta de cores harmoniosa, tipografia legível, bordas arredondadas e sombras sutis.
- [x] **7. Comportamentos da Aplicação**:
  - **Carregamento (*Loading*)**: Mensagem amigável enquanto a requisição à API é processada.
  - **Erro**: Alerta visual destacado caso ocorra falha de conexão ou erro da API.
  - **Estado Vazio**: Mensagem informativa caso o usuário desmarque todas as opções no filtro.

---

## 🏗️ Arquitetura da Aplicação

```text
App
├── Header
├── Main
│   ├── FiltroCotacoes (Interação: Filtro)
│   ├── ListaCotacoes
│   │   └── CardCotacao (Card individual por moeda)
│   └── ConversorMoedas (Interação: Conversão em tempo real)
└── Footer
```

### Estrutura de Pastas

```text
src/
├── components/
│   ├── CardCotacao.jsx      # Card individual de cotação
│   ├── ConversorMoedas.jsx  # Conversor interativo de moedas
│   ├── FiltroCotacoes.jsx   # Filtro interativo com checkboxes
│   ├── Footer.jsx           # Rodapé da aplicação
│   ├── Header.jsx           # Cabeçalho da aplicação
│   └── ListaCotacoes.jsx    # Lista com loading, erro e cards
├── hooks/
│   └── useCotacoes.js       # Hook customizado para consumo da API
├── services/
│   └── cotacaoService.js    # Chamada HTTP fetch para a Frankfurter API
├── App.css                  # Estilização global e responsiva
├── App.jsx                  # Componente principal
└── main.jsx                 # Ponto de entrada da aplicação
```

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)**
- **[Vite 8](https://vite.dev/)**
- **JavaScript (ES6+)**
- **CSS3** (Flexbox, CSS Grid, Media Queries)
- **[Frankfurter API](https://frankfurter.dev/)** (API pública de taxas de câmbio do Banco Central Europeu)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Gerenciador de pacotes `npm`

### Passo a passo

1. **Clone o repositório ou navegue até a pasta do projeto:**
   ```bash
   cd desafio02
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

### Outros comandos úteis

- **Verificar linter de código:**
  ```bash
  npm run lint
  ```
- **Gerar build de produção:**
  ```bash
  npm run build
  ```
- **Pré-visualizar build localmente:**
  ```bash
  npm run preview
  ```

---

## 🤖 Uso de Inteligência Artificial

Em conformidade com as orientações do desafio, a Inteligência Artificial foi utilizada como ferramenta de apoio técnico durante o desenvolvimento das seguintes formas:

1. **Análise de Requisitos e Planejamento**: Análise do edital do desafio para estruturar o plano de desenvolvimento em etapas enumeradas registradas no arquivo [`plano.md`](./plano.md).
2. **Diagnóstico e Correção de Bugs**: Identificação de um bug sutil no hook customizado `useCotacoes.js` (onde a função assíncrona havia sido colocada dentro da função de *cleanup* do `useEffect`), permitindo sua rápida correção.
3. **Componentização e Boas Práticas**: Apoio na separação de responsabilidades dos componentes React (`CardCotacao`, `ListaCotacoes` e `FiltroCotacoes`).
4. **Responsividade e Estados de Borda**: Sugestão e implementação de breakpoints para tablet e mensagens para estados vazios e de erro.

Todo o código produzido foi revisado, testado e validado quanto ao funcionamento e conformidade com os critérios acadêmicos do desafio.

---

## 👤 Autor

Desenvolvido para fins acadêmicos como parte do curso de Desenvolvimento Web / React.
