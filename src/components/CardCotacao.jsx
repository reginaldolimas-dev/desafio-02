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

  const taxaInvertida = taxaNumerica > 0 ? (1 / taxaNumerica) : 0;
  const valorFormatado = taxaInvertida > 0
    ? taxaInvertida.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "--";

  return (
    <article className="card">
      <span className="sigla">{quote}</span>
      <h3>{nomeMoeda}</h3>
      <p className="valor">R$ {valorFormatado}</p>
      <p className="legenda">1 {quote} = R$ {valorFormatado}</p>
    </article>
  );
}
