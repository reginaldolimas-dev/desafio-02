import Header from "./components/Header";
import Footer from "./components/Footer";
import ListaCotacoes from "./components/ListaCotacoes";
import useCotacoes from "./hooks/useCotacoes";
import "./App.css";

function App() {
  const { cotacoes, error, carregando } = useCotacoes();

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="cotacoes">
          <h2>Cotações de referência</h2>

          <p className="descricao">
            Valores de referência em relação ao real brasileiro.
          </p>

          <ListaCotacoes
            cotacoes={cotacoes}
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