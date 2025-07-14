import React, { useState } from "react";
import {
  useCarrinho,
  useRemoverDoCarrinho,
  useLimparCarrinho,
} from "../hooks/useAPI";
import { useAuth } from "../contexts/AuthContext";

const Carrinho: React.FC = () => {
  const { user } = useAuth();
  const [showCarrinho, setShowCarrinho] = useState(false);

  const { data: itensCarrinho = [], isLoading } = useCarrinho(user?.id || 0);
  const removerDoCarrinho = useRemoverDoCarrinho();
  const limparCarrinho = useLimparCarrinho();

  const total = itensCarrinho.reduce(
    (acc, item) => acc + item.precoUnitario * item.quantidade,
    0
  );
  const quantidadeTotal = itensCarrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  const handleRemoverItem = (itemId: number) => {
    removerDoCarrinho.mutate(itemId);
  };

  const handleLimparCarrinho = () => {
    if (user && window.confirm("Deseja limpar todo o carrinho?")) {
      limparCarrinho.mutate(user.id);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Botão do carrinho na navbar */}
      <div className="position-relative">
        <button
          className="btn btn-outline-primary position-relative"
          onClick={() => setShowCarrinho(!showCarrinho)}
        >
          <i className="bi bi-cart3"></i>
          {quantidadeTotal > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {quantidadeTotal}
            </span>
          )}
        </button>
      </div>

      {/* Modal/Dropdown do carrinho */}
      {showCarrinho && (
        <div
          className="position-absolute top-100 end-0 bg-white border rounded shadow-lg p-3"
          style={{ width: "400px", zIndex: 1000 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Carrinho de Compras</h5>
            <button
              className="btn-close"
              onClick={() => setShowCarrinho(false)}
            ></button>
          </div>

          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : itensCarrinho.length === 0 ? (
            <p className="text-muted text-center">Carrinho vazio</p>
          ) : (
            <>
              <div
                className="mb-3"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {itensCarrinho.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom"
                  >
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.produto.nome}</h6>
                      <small className="text-muted">
                        R$ {item.precoUnitario.toFixed(2)} x {item.quantidade}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2">
                        R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoverItem(item.id)}
                        disabled={removerDoCarrinho.isPending}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <strong>Total: R$ {total.toFixed(2)}</strong>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Finalizar Compra</button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleLimparCarrinho}
                    disabled={limparCarrinho.isPending}
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Carrinho;
