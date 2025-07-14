import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "../hooks/useAPI";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Esquema de validação com Zod
const registroSchema = z
  .object({
    nome: z
      .string()
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    senha: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .max(50, "Senha deve ter no máximo 50 caracteres"),
    confirmarSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type RegistroFormData = z.infer<typeof registroSchema>;

const Registro: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
  });

  const onSubmit = async (data: RegistroFormData) => {
    try {
      const response = await registerMutation.mutateAsync(data);
      login(response);
      navigate("/");
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { erro?: string } };
      };
      if (errorResponse.response?.data?.erro) {
        if (errorResponse.response.data.erro.includes("Email já está em uso")) {
          setError("email", { message: "Este email já está cadastrado" });
        } else {
          setError("root", { message: errorResponse.response.data.erro });
        }
      } else {
        setError("root", { message: "Erro ao cadastrar usuário" });
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Cadastro</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.senha ? "is-invalid" : ""
                    }`}
                    id="senha"
                    {...register("senha")}
                  />
                  {errors.senha && (
                    <div className="invalid-feedback">
                      {errors.senha.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmarSenha" className="form-label">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmarSenha ? "is-invalid" : ""
                    }`}
                    id="confirmarSenha"
                    {...register("confirmarSenha")}
                  />
                  {errors.confirmarSenha && (
                    <div className="invalid-feedback">
                      {errors.confirmarSenha.message}
                    </div>
                  )}
                </div>

                {errors.root && (
                  <div className="alert alert-danger">
                    {errors.root.message}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || registerMutation.isPending}
                  >
                    {isSubmitting || registerMutation.isPending ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Cadastrando...
                      </>
                    ) : (
                      "Cadastrar"
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <p>
                  Já tem uma conta? <a href="/login">Fazer login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
