import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useProdutos,
  useCategorias,
  useCreateProduto,
  useUpdateProduto,
  useDeleteProduto,
} from "../hooks/useAPI";
import type { Produto } from "../hooks/useAPI";

const produtoSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  descricao: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  preco: z
    .number()
    .min(0.01, "Preço deve ser maior que 0")
    .max(999999.99, "Preço muito alto"),
  categoriaId: z.number().min(1, "Categoria é obrigatória"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

const GerenciarProdutos: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: produtosPage, isLoading } = useProdutos(
    currentPage,
    10,
    searchTerm
  );
  const { data: categorias = [] } = useCategorias();
  const createProduto = useCreateProduto();
  const updateProduto = useUpdateProduto();
  const deleteProduto = useDeleteProduto();

  const produtos = produtosPage?.content || [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
  });

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      const categoria = categorias.find((c) => c.id === data.categoriaId);
      if (!categoria) throw new Error("Categoria não encontrada");

      const produtoData = {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        categoria: categoria,
      };

      if (editingId) {
        await updateProduto.mutateAsync({
          id: editingId,
          produto: produtoData,
        });
      } else {
        await createProduto.mutateAsync(produtoData);
      }
      reset();
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleEdit = (produto: Produto) => {
    setEditingId(produto.id);
    setValue("nome", produto.nome);
    setValue("descricao", produto.descricao);
    setValue("preco", produto.preco);
    setValue("categoriaId", produto.categoria.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduto.mutateAsync(id);
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto");
      }
    }
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleNew = () => {
    reset();
    setEditingId(null);
    setShowForm(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gerenciar Produtos</h2>
        <button
          className="btn btn-primary"
          onClick={handleNew}
          disabled={showForm}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Novo Produto
        </button>
      </div>

      {/* Busca */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar produtos por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-outline-secondary w-100"
                >
                  <i className="bi bi-search"></i> Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              {editingId ? "Editar Produto" : "Novo Produto"}
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.nome ? "is-invalid" : ""
                      }`}
                      id="nome"
                      {...register("nome")}
                    />
                    {errors.nome && (
                      <div className="invalid-feedback">
                        {errors.nome.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="preco" className="form-label">
                      Preço
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${
                        errors.preco ? "is-invalid" : ""
                      }`}
                      id="preco"
                      {...register("preco", { valueAsNumber: true })}
                    />
                    {errors.preco && (
                      <div className="invalid-feedback">
                        {errors.preco.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="categoriaId" className="form-label">
                      Categoria
                    </label>
                    <select
                      className={`form-select ${
                        errors.categoriaId ? "is-invalid" : ""
                      }`}
                      id="categoriaId"
                      {...register("categoriaId", { valueAsNumber: true })}
                    >
                      <option value="">Selecione uma categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                    {errors.categoriaId && (
                      <div className="invalid-feedback">
                        {errors.categoriaId.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">
                      Descrição
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.descricao ? "is-invalid" : ""
                      }`}
                      id="descricao"
                      rows={3}
                      {...register("descricao")}
                    ></textarea>
                    {errors.descricao && (
                      <div className="invalid-feedback">
                        {errors.descricao.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Salvar
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de produtos */}
      <div className="card">
        <div className="card-body">
          {produtos.length === 0 ? (
            <div className="alert alert-info text-center">
              <i className="bi bi-box-seam-x fs-1 d-block mb-3"></i>
              <h5>Nenhum produto cadastrado</h5>
              <p>Clique em "Novo Produto" para começar.</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th style={{ width: "150px" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.map((produto) => (
                      <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.categoria.nome}</td>
                        <td>R$ {produto.preco.toFixed(2)}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(produto)}
                              disabled={showForm}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(produto.id)}
                              disabled={deleteProduto.isPending}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {produtosPage && produtosPage.totalPages > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        produtosPage.first ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={produtosPage.first}
                      >
                        Anterior
                      </button>
                    </li>

                    {Array.from({ length: produtosPage.totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          i === currentPage ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        produtosPage.last ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={produtosPage.last}
                      >
                        Próximo
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarProdutos;
