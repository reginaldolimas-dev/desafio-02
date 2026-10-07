import { useEffect, useState } from "react";
import buscarCotacoes from "../services/cotacaoService";

function useCotacoes() {
  const [cotacoes, setCotacoes] = useState([]);
  const [error, setError] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    return () => {
      async function carregar() {
        try {
          const dados = await buscarCotacoes();
          setCotacoes(dados);
        } catch (error) {
            setError("Não foi possível carregar as cotações" + error);
        } finally {
          setCarregando(false);
        }
      }
      carregar();
      };
    }, []);

  return { cotacoes, error, carregando };
}

export default useCotacoes;