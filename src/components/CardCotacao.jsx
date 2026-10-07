const NOMES_MOEDAS = {
  USD: "Dólar Americano",
  EUR: "Euro",
  GBP: "Libra Esterlina",
};

export default function CardCotacao({ cotacao, quote: quoteProp, rate: rateProp }) {
  const quote = cotacao?.quote ?? quoteProp;
  const rate = cotacao?.rate ?? rateProp;

  const nomeMoeda = (quote && NOMES_MOEDAS[quote]) || quote || "Moeda";
  const taxaNumerica = typeof rate === "number" ? rate : Number(rate);
  const taxaFormatada = !isNaN(taxaNumerica) ? taxaNumerica.toFixed(4) : "--";

  return (
    <article className="card">
      <span className="sigla">{quote}</span>
      <h3>{nomeMoeda}</h3>
      <p className="valor">{taxaFormatada}</p>
      <p className="legenda">1 BRL = {taxaFormatada} {quote}</p>
    </article>
  );
}
