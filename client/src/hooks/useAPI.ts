import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Types
export interface Usuario {
  id: number;
  email: string;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categoria;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Auth
export const useLogin = () => {
  return useMutation({
    mutationFn: async (dados: { email: string; senha: string }) => {
      const response = await api.post("/usuarios/login", dados);
      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (dados: {
      email: string;
      senha: string;
      confirmarSenha: string;
      nome: string;
    }) => {
      const response = await api.post("/usuarios/cadastrar", dados);
      return response.data;
    },
  });
};

// Produtos
export const useProdutos = (page = 0, size = 10, nome?: string) => {
  return useQuery({
    queryKey: ["produtos", page, size, nome],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });
      if (nome) params.append("nome", nome);

      const response = await api.get(`/produtos?${params}`);
      return response.data as PageResponse<Produto>;
    },
  });
};

export const useProdutosInfinite = (nome?: string) => {
  return useInfiniteQuery({
    queryKey: ["produtos-infinite", nome],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        size: "10",
      });
      if (nome) params.append("nome", nome);

      const response = await api.get(`/produtos?${params}`);
      return response.data as PageResponse<Produto>;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};

export const useProdutoPorId = (id: number) => {
  return useQuery({
    queryKey: ["produto", id],
    queryFn: async () => {
      const response = await api.get(`/produtos/${id}`);
      return response.data as Produto;
    },
    enabled: !!id,
  });
};

export const useCreateProduto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (produto: Omit<Produto, "id">) => {
      const response = await api.post("/produtos", produto);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
};

export const useUpdateProduto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      produto,
    }: {
      id: number;
      produto: Omit<Produto, "id">;
    }) => {
      const response = await api.put(`/produtos/${id}`, produto);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
};

export const useDeleteProduto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/produtos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
};

// Categorias
export const useCategorias = () => {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await api.get("/categorias");
      return response.data as Categoria[];
    },
  });
};

export const useCreateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoria: Omit<Categoria, "id">) => {
      const response = await api.post("/categorias", categoria);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

export const useUpdateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      categoria,
    }: {
      id: number;
      categoria: Omit<Categoria, "id">;
    }) => {
      const response = await api.put(`/categorias/${id}`, categoria);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

export const useDeleteCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/categorias/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

// Carrinho
export const useCarrinho = (usuarioId: number) => {
  return useQuery({
    queryKey: ["carrinho", usuarioId],
    queryFn: async () => {
      const response = await api.get(`/carrinho/usuario/${usuarioId}`);
      return response.data as ItemCarrinho[];
    },
    enabled: !!usuarioId,
  });
};

export const useAdicionarAoCarrinho = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dados: {
      usuarioId: number;
      produtoId: number;
      quantidade: number;
    }) => {
      const response = await api.post("/carrinho/adicionar", dados);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", variables.usuarioId],
      });
    },
  });
};

export const useRemoverDoCarrinho = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: number) => {
      await api.delete(`/carrinho/remover/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carrinho"] });
    },
  });
};

export const useLimparCarrinho = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (usuarioId: number) => {
      await api.delete(`/carrinho/limpar/${usuarioId}`);
    },
    onSuccess: (_, usuarioId) => {
      queryClient.invalidateQueries({ queryKey: ["carrinho", usuarioId] });
    },
  });
};

// Favoritos
export const useFavoritos = (usuarioId: number) => {
  return useQuery({
    queryKey: ["favoritos", usuarioId],
    queryFn: async () => {
      const response = await api.get(`/favoritos/usuario/${usuarioId}`);
      return response.data as Produto[];
    },
    enabled: !!usuarioId,
  });
};

export const useAdicionarFavorito = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dados: { usuarioId: number; produtoId: number }) => {
      const response = await api.post("/favoritos/adicionar", dados);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favoritos", variables.usuarioId],
      });
    },
  });
};

export const useRemoverFavorito = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dados: { usuarioId: number; produtoId: number }) => {
      const response = await api.delete("/favoritos/remover", { data: dados });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favoritos", variables.usuarioId],
      });
    },
  });
};

export const useVerificarFavorito = (usuarioId: number, produtoId: number) => {
  return useQuery({
    queryKey: ["favorito-status", usuarioId, produtoId],
    queryFn: async () => {
      const response = await api.get(
        `/favoritos/verificar/${usuarioId}/${produtoId}`
      );
      return response.data.isFavorito as boolean;
    },
    enabled: !!usuarioId && !!produtoId,
  });
};

export const useCategoriaPorId = (id: number) => {
  return useQuery({
    queryKey: ["categoria", id],
    queryFn: async () => {
      const response = await api.get(`/categorias/${id}`);
      return response.data as Categoria;
    },
    enabled: !!id,
  });
};

// Helper functions para useAPI pattern
export const useAPI = () => {
  const updateProduto = useUpdateProduto();
  const deleteProduto = useDeleteProduto();
  const updateCategoria = useUpdateCategoria();
  const deleteCategoria = useDeleteCategoria();

  return {
    // Métodos para Produto
    recuperarPorId: useProdutoPorId,
    alterar: () => updateProduto,
    removerPorId: () => deleteProduto,

    // Métodos para Categoria
    recuperarCategoriaPorId: useCategoriaPorId,
    alterarCategoria: () => updateCategoria,
    removerCategoriaPorId: () => deleteCategoria,
  };
};
