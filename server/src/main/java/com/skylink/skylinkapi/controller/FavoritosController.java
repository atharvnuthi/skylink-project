package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.Usuario;
import com.skylink.skylinkapi.model.Produto;
import com.skylink.skylinkapi.repository.UsuarioRepository;
import com.skylink.skylinkapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "*")
public class FavoritosController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Set<Produto>> listarFavoritos(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get().getFavoritos());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarFavorito(@RequestBody Map<String, Long> dados) {
        Long usuarioId = dados.get("usuarioId");
        Long produtoId = dados.get("produtoId");

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);

        if (usuarioOpt.isPresent() && produtoOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Produto produto = produtoOpt.get();

            usuario.getFavoritos().add(produto);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok(Map.of("mensagem", "Produto adicionado aos favoritos"));
        }
        return ResponseEntity.badRequest().body(Map.of("erro", "Usuário ou produto não encontrado"));
    }

    @DeleteMapping("/remover")
    public ResponseEntity<?> removerFavorito(@RequestBody Map<String, Long> dados) {
        Long usuarioId = dados.get("usuarioId");
        Long produtoId = dados.get("produtoId");

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);

        if (usuarioOpt.isPresent() && produtoOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Produto produto = produtoOpt.get();

            usuario.getFavoritos().remove(produto);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok(Map.of("mensagem", "Produto removido dos favoritos"));
        }
        return ResponseEntity.badRequest().body(Map.of("erro", "Usuário ou produto não encontrado"));
    }

    @GetMapping("/verificar/{usuarioId}/{produtoId}")
    public ResponseEntity<?> verificarFavorito(@PathVariable Long usuarioId, @PathVariable Long produtoId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);

        if (usuarioOpt.isPresent() && produtoOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Produto produto = produtoOpt.get();
            boolean isFavorito = usuario.getFavoritos().contains(produto);
            return ResponseEntity.ok(Map.of("isFavorito", isFavorito));
        }
        return ResponseEntity.badRequest().body(Map.of("erro", "Usuário ou produto não encontrado"));
    }
}
