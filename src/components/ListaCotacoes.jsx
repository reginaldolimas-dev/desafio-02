import CardCotacao from "./CardCotacao";

export default function ListaCotacoes({
  cotacoes = [],
  carregando = false,
  erro = "",
  error = "",
}) {
  const mensagemErro = erro || error;

  if (carregando) {
    return <p className="descricao">Carregando cotações...</p>;
  }

  if (mensagemErro) {
    return <p className="erro">{mensagemErro}</p>;
  }

  if (!cotacoes || cotacoes.length === 0) {
    return <p className="descricao">Nenhuma cotação disponível no momento.</p>;
  }

  return (
    <div className="grid-cotacoes">
      {cotacoes.map((item) => (
        <CardCotacao key={item.quote} cotacao={item} />
      ))}
    </div>
  );
}
