import React from "react";
import { useFavoritos } from "../hooks/useAPI";
import { useAuth } from "../contexts/AuthContext";
import ProdutoCard from "../components/ProdutoCard";

const Favoritos: React.FC = () => {
  const { user } = useAuth();
  const { data: favoritos = [], isLoading } = useFavoritos(user?.id || 0);

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center">
          Você precisa estar logado para ver seus favoritos.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Meus Favoritos</h2>

      {favoritos.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-heart fs-1 d-block mb-3"></i>
          <h5>Nenhum produto nos favoritos</h5>
          <p>Adicione produtos aos seus favoritos para vê-los aqui!</p>
        </div>
      ) : (
        <div className="row">
          {favoritos.map((produto) => (
            <div key={produto.id} className="col-md-4 col-lg-3 mb-4">
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
