import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Plans from "./pages/Plans";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Produtos from "./pages/Produtos";
import Favoritos from "./pages/Favoritos";
import Carrinho from "./pages/Carrinho";
import GerenciarCategorias from "./pages/GerenciarCategorias";
import GerenciarProdutos from "./pages/GerenciarProdutos";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/admin/categorias" element={<GerenciarCategorias />} />
            <Route path="/admin/produtos" element={<GerenciarProdutos />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
