import React, { useState, useEffect } from "react";
import { useProdutosInfinite } from "../hooks/useAPI";
import ProdutoCard from "../components/ProdutoCard";

const Produtos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useProdutosInfinite(debouncedSearchTerm || undefined);

  const produtos = data?.pages.flatMap((page) => page.content) || [];

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Erro ao carregar produtos. Tente novamente.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 mb-3">Nossos Produtos</h1>
          <p className="lead">Explore nossa seleção de produtos de qualidade</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="mb-4">
            {debouncedSearchTerm
              ? `Resultados para "${debouncedSearchTerm}"`
              : "Todos os Produtos"}
          </h2>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : produtos.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
          <h5>Nenhum produto encontrado</h5>
          <p>
            Tente buscar por outros termos ou explore nossa seleção completa.
          </p>
        </div>
      ) : (
        <>
          <div className="row">
            {produtos.map((produto) => (
              <div key={produto.id} className="col-md-4 col-lg-3 mb-4">
                <ProdutoCard produto={produto} />
              </div>
            ))}
          </div>

          {/* Loading indicator for infinite scroll */}
          {isFetchingNextPage && (
            <div className="text-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">
                  Carregando mais produtos...
                </span>
              </div>
            </div>
          )}

          {/* End of list indicator */}
          {!hasNextPage && produtos.length > 0 && (
            <div className="text-center my-4">
              <p className="text-muted">
                Você viu todos os produtos disponíveis!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Produtos;
