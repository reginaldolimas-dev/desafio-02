const URL_API =
  "https://api.frankfurter.dev/v2/rates?base=BRL&quotes=USD,EUR,GBP";

async function buscarCotacoes() {
  const resposta = await fetch(URL_API);

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar as cotações.");
  }

  return resposta.json();
}

export default buscarCotacoes;