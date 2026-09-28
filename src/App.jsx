import { useEffect, useState } from "react";
import "./App.css";
import buscarCotacoes from "./services/cotacaoService";

const MOEDAS = {
  USD: { nome: "Dólar americano", simbolo: "US$" },
  EUR: { nome: "Euro", simbolo: "€" },
  GBP: { nome: "Libra esterlina", simbolo: "£" },
};

function App() {
  const [cotacoes, setCotacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarCotacoes() {
      try {
        const dados = await buscarCotacoes();
        setCotacoes(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarCotacoes();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>💱 Câmbio Fácil</h1>
          <p>Consulte cotações e acompanhe o mercado de moedas.</p>
        </div>
      </header>

      <main className="container">
        <section className="cotacoes">
          <h2>Cotações de hoje</h2>
          <p className="descricao">
            Valores de referência em relação ao real brasileiro.
          </p>

          {carregando && <p>Carregando cotações...</p>}

          {erro && <p className="erro">{erro}</p>}

          {!carregando && !erro && (
            <div className="grid-cotacoes">
              {cotacoes.map((cotacao) => (
                <div className="card" key={cotacao.quote}>
                  <span className="sigla">{cotacao.quote}</span>

                  <h3>{MOEDAS[cotacao.quote]?.nome}</h3>

                  <p className="valor">
                    {cotacao.rate.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <span className="legenda">
                    1 {cotacao.quote} em reais
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Projeto acadêmico • Dados: Frankfurter API</p>
      </footer>
    </div>
  );
}

export default App;