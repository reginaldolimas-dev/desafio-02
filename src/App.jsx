import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FiltroCotacoes from "./components/FiltroCotacoes";
import ListaCotacoes from "./components/ListaCotacoes";
import useCotacoes from "./hooks/useCotacoes";
import "./App.css";

const MOEDAS_PADRAO = ["USD", "EUR", "GBP"];

function App() {
  const { cotacoes, error, carregando } = useCotacoes();
  const [selecionadas, setSelecionadas] = useState(MOEDAS_PADRAO);

  const handleToggleMoeda = (moeda) => {
    setSelecionadas((atuais) =>
      atuais.includes(moeda)
        ? atuais.filter((m) => m !== moeda)
        : [...atuais, moeda]
    );
  };

  const cotacoesFiltradas = cotacoes.filter((c) =>
    selecionadas.includes(c.quote)
  );

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="cotacoes">
          <h2>Cotações de referência</h2>

          <p className="descricao">
            Valores de referência em relação ao real brasileiro.
          </p>

          <FiltroCotacoes
            moedasDisponiveis={MOEDAS_PADRAO}
            moedasSelecionadas={selecionadas}
            onToggle={handleToggleMoeda}
          />

          <ListaCotacoes
            cotacoes={cotacoesFiltradas}
            carregando={carregando}
            erro={error}
          />
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default App;