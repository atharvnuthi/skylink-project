import React from "react";
import {
  useCarrinho,
  useRemoverDoCarrinho,
  useLimparCarrinho,
  useAtualizarQuantidadeCarrinho,
} from "../hooks/useAPI";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Carrinho: React.FC = () => {
  const { user } = useAuth();
  const { data: itensCarrinho = [], isLoading } = useCarrinho(user?.id || 0);
  const removerDoCarrinho = useRemoverDoCarrinho();
  const limparCarrinho = useLimparCarrinho();
  const atualizarQuantidade = useAtualizarQuantidadeCarrinho();

  // Filter out items without produto for calculations
  const validItems = itensCarrinho.filter((item) => item.produto);

  const total = validItems.reduce(
    (acc, item) => acc + item.precoUnitario * item.quantidade,
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

  const handleAtualizarQuantidade = (
    itemId: number,
    novaQuantidade: number
  ) => {
    if (novaQuantidade >= 1) {
      atualizarQuantidade.mutate({ itemId, quantidade: novaQuantidade });
    }
  };

  const handleIncrementarQuantidade = (
    itemId: number,
    quantidadeAtual: number
  ) => {
    handleAtualizarQuantidade(itemId, quantidadeAtual + 1);
  };

  const handleDecrementarQuantidade = (
    itemId: number,
    quantidadeAtual: number
  ) => {
    if (quantidadeAtual > 1) {
      handleAtualizarQuantidade(itemId, quantidadeAtual - 1);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          <i className="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
          <h5>Login Necessário</h5>
          <p>Você precisa estar logado para ver seu carrinho.</p>
          <Link to="/login" className="btn btn-primary">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-3">Carregando seu carrinho...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <i className="bi bi-cart3 me-2 text-primary"></i>
              Meu Carrinho
            </h2>
            <Link to="/produtos" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Continuar Comprando
            </Link>
          </div>

          {validItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
              <h4 className="text-muted mb-3">Seu carrinho está vazio</h4>
              <p className="text-muted mb-4">
                Adicione alguns produtos ao seu carrinho para continuar.
              </p>
              <Link to="/produtos" className="btn btn-primary btn-lg">
                <i className="bi bi-shop me-2"></i>
                Explorar Produtos
              </Link>
            </div>
          ) : (
            <div className="row">
              {/* Lista de Produtos */}
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-list-ul me-2"></i>
                      Produtos no Carrinho
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Produto</th>
                            <th scope="col" className="text-center">
                              Preço Unitário
                            </th>
                            <th scope="col" className="text-center">
                              Quantidade
                            </th>
                            <th scope="col" className="text-center">
                              Preço Total
                            </th>
                            <th scope="col" className="text-center">
                              Remover
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {validItems.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-light rounded p-2 me-3">
                                    <i className="bi bi-box-seam text-primary fs-4"></i>
                                  </div>
                                  <div>
                                    <h6 className="mb-1">
                                      {item.produto.nome}
                                    </h6>
                                    <small className="text-muted">
                                      {item.produto.descricao?.length > 50
                                        ? `${item.produto.descricao.substring(
                                            0,
                                            50
                                          )}...`
                                        : item.produto.descricao}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                <span className="fw-bold text-primary">
                                  R$ {item.precoUnitario.toFixed(2)}
                                </span>
                              </td>
                              <td className="text-center align-middle">
                                <div className="d-flex align-items-center justify-content-center">
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() =>
                                      handleDecrementarQuantidade(
                                        item.id,
                                        item.quantidade
                                      )
                                    }
                                    disabled={
                                      item.quantidade <= 1 ||
                                      atualizarQuantidade.isPending
                                    }
                                    title="Diminuir quantidade"
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <span className="mx-3 fw-bold">
                                    {item.quantidade}
                                  </span>
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() =>
                                      handleIncrementarQuantidade(
                                        item.id,
                                        item.quantidade
                                      )
                                    }
                                    disabled={atualizarQuantidade.isPending}
                                    title="Aumentar quantidade"
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                <span className="fw-bold text-primary">
                                  R${" "}
                                  {(
                                    item.precoUnitario * item.quantidade
                                  ).toFixed(2)}
                                </span>
                              </td>
                              <td className="text-center align-middle">
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleRemoverItem(item.id)}
                                  disabled={removerDoCarrinho.isPending}
                                  title="Remover item"
                                >
                                  {removerDoCarrinho.isPending ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <i className="bi bi-trash"></i>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Ações do Carrinho */}
                <div className="mt-3">
                  <button
                    className="btn btn-outline-warning"
                    onClick={handleLimparCarrinho}
                    disabled={limparCarrinho.isPending}
                  >
                    {limparCarrinho.isPending ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Limpando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-trash me-2"></i>
                        Limpar Carrinho
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="col-lg-4">
                <div className="card sticky-top" style={{ top: "2rem" }}>
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-calculator me-2"></i>
                      Total do Carrinho
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span>Subtotal:</span>
                      <span className="fw-bold">R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Frete:</span>
                      <span className="text-success fw-bold">Grátis</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                      <span className="fs-5 fw-bold">Total:</span>
                      <span className="fs-4 fw-bold text-primary">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>

                    <div className="d-grid gap-2">
                      <button className="btn btn-success btn-lg">
                        <i className="bi bi-credit-card me-2"></i>
                        Fechar Compra
                      </button>
                      <Link to="/produtos" className="btn btn-outline-primary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Continuar Comprando
                      </Link>
                    </div>

                    <div className="mt-3 text-center">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        Compra 100% segura
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
