import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/useAPI";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      login(response);
      navigate("/");
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: { data?: { erro?: string } };
      };
      if (errorResponse.response?.data?.erro) {
        setError("root", { message: errorResponse.response.data.erro });
      } else {
        setError("root", { message: "Erro ao fazer login" });
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
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

                {errors.root && (
                  <div className="alert alert-danger">
                    {errors.root.message}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || loginMutation.isPending}
                  >
                    {isSubmitting || loginMutation.isPending ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <p>
                  Não tem uma conta? <a href="/registro">Cadastre-se</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
