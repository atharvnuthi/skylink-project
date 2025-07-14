import React from "react";
import type { Produto } from "../hooks/useAPI";
import {
  useAdicionarAoCarrinho,
  useAdicionarFavorito,
  useRemoverFavorito,
  useVerificarFavorito,
} from "../hooks/useAPI";
import { useAuth } from "../contexts/AuthContext";

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  const { user } = useAuth();
  const adicionarAoCarrinho = useAdicionarAoCarrinho();
  const adicionarFavorito = useAdicionarFavorito();
  const removerFavorito = useRemoverFavorito();

  const { data: isFavorito = false } = useVerificarFavorito(
    user?.id || 0,
    produto.id
  );

  const handleAdicionarCarrinho = () => {
    if (user) {
      adicionarAoCarrinho.mutate({
        usuarioId: user.id,
        produtoId: produto.id,
        quantidade: 1,
      });
    } else {
      alert("Você precisa estar logado para adicionar ao carrinho");
    }
  };

  const handleToggleFavorito = () => {
    if (user) {
      if (isFavorito) {
        removerFavorito.mutate({
          usuarioId: user.id,
          produtoId: produto.id,
        });
      } else {
        adicionarFavorito.mutate({
          usuarioId: user.id,
          produtoId: produto.id,
        });
      }
    } else {
      alert("Você precisa estar logado para favoritar produtos");
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{produto.nome}</h5>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleToggleFavorito();
            }}
            className="text-decoration-none"
          >
            {isFavorito ? (
              <img
                src="/heart-fill.svg"
                alt="Remover dos favoritos"
                width="20"
                height="20"
                className="text-danger"
              />
            ) : (
              <img
                src="/heart.svg"
                alt="Adicionar aos favoritos"
                width="20"
                height="20"
              />
            )}
          </a>
        </div>

        <p className="card-text text-muted">{produto.descricao}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0 text-primary">
              R$ {produto.preco.toFixed(2)}
            </span>
            <small className="text-muted">{produto.categoria.nome}</small>
          </div>
          <button
            className="btn btn-primary w-100 mt-2"
            onClick={handleAdicionarCarrinho}
            disabled={adicionarAoCarrinho.isPending}
          >
            {adicionarAoCarrinho.isPending ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Adicionando...
              </>
            ) : (
              <>
                <i className="bi bi-cart-plus me-2"></i>
                Adicionar ao Carrinho
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoCard;
