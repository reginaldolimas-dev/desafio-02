import { useState } from "react";

const NOMES_MOEDAS = {
  USD: "Dólar Americano",
  EUR: "Euro",
  GBP: "Libra Esterlina",
};

export default function ConversorMoedas({ cotacoes = [] }) {
  const [valorBRL, setValorBRL] = useState("");

  const valorNumerico = parseFloat(valorBRL);
  const valorValido = !isNaN(valorNumerico) && valorNumerico > 0;

  return (
    <section className="conversor">
      <h2>Converter moedas</h2>
      <p className="descricao">
        Digite um valor em reais para ver o equivalente nas moedas disponíveis.
      </p>

      <div className="conversor-input-grupo">
        <label htmlFor="valor-brl" className="conversor-label">
          Valor em R$
        </label>
        <input
          id="valor-brl"
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 100,00"
          className="conversor-input"
          value={valorBRL}
          onChange={(e) => setValorBRL(e.target.value)}
        />
      </div>

      {valorValido && cotacoes.length > 0 && (
        <div className="conversor-resultados">
          {cotacoes.map((item) => {
            const convertido = valorNumerico * item.rate;
            const nome = NOMES_MOEDAS[item.quote] || item.quote;
            return (
              <div key={item.quote} className="conversor-resultado">
                <span className="conversor-moeda">{item.quote}</span>
                <span className="conversor-nome">{nome}</span>
                <span className="conversor-valor">
                  {convertido.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {valorValido && cotacoes.length === 0 && (
        <p className="descricao">
          Nenhuma moeda disponível para conversão.
        </p>
      )}
    </section>
  );
}
