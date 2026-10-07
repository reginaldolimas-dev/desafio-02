export default function FiltroCotacoes({
  moedasDisponiveis = ["USD", "EUR", "GBP"],
  moedasSelecionadas = [],
  onToggle,
}) {
  return (
    <div className="filtro-container">
      <span className="filtro-titulo">Filtrar moedas:</span>
      <div className="filtro-opcoes">
        {moedasDisponiveis.map((moeda) => {
          const selecionada = moedasSelecionadas.includes(moeda);
          return (
            <label key={moeda} className="filtro-opcao">
              <input
                type="checkbox"
                checked={selecionada}
                onChange={() => onToggle && onToggle(moeda)}
              />
              <span>{moeda}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
