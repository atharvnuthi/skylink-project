import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCategorias,
  useCreateCategoria,
  useUpdateCategoria,
  useDeleteCategoria,
} from "../hooks/useAPI";
import type { Categoria } from "../hooks/useAPI";

const categoriaSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
});

type CategoriaFormData = z.infer<typeof categoriaSchema>;

const GerenciarCategorias: React.FC = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: categorias = [], isLoading } = useCategorias();
  const createCategoria = useCreateCategoria();
  const updateCategoria = useUpdateCategoria();
  const deleteCategoria = useDeleteCategoria();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
  });

  const onSubmit = async (data: CategoriaFormData) => {
    try {
      if (editingId) {
        await updateCategoria.mutateAsync({ id: editingId, categoria: data });
      } else {
        await createCategoria.mutateAsync(data);
      }
      reset();
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingId(categoria.id);
    setValue("nome", categoria.nome);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta categoria? Todos os produtos desta categoria também serão removidos."
      )
    ) {
      try {
        await deleteCategoria.mutateAsync(id);
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        alert("Erro ao excluir categoria");
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
        <h2>Gerenciar Categorias</h2>
        <button
          className="btn btn-primary"
          onClick={handleNew}
          disabled={showForm}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nova Categoria
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              {editingId ? "Editar Categoria" : "Nova Categoria"}
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-8">
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
                <div className="col-md-4 d-flex align-items-end">
                  <div className="mb-3 d-flex gap-2 w-100">
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
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de categorias */}
      <div className="card">
        <div className="card-body">
          {categorias.length === 0 ? (
            <div className="alert alert-info text-center">
              <i className="bi bi-folder-x fs-1 d-block mb-3"></i>
              <h5>Nenhuma categoria cadastrada</h5>
              <p>Clique em "Nova Categoria" para começar.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th style={{ width: "150px" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nome}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(categoria)}
                            disabled={showForm}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(categoria.id)}
                            disabled={deleteCategoria.isPending}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarCategorias;
