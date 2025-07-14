package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.Usuario;
import com.skylink.skylinkapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Map<String, String> dados) {
        try {
            String email = dados.get("email");
            String senha = dados.get("senha");
            String confirmarSenha = dados.get("confirmarSenha");
            String nome = dados.get("nome");

            // Validações
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Email é obrigatório"));
            }

            if (senha == null || senha.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Senha é obrigatória"));
            }

            if (!senha.equals(confirmarSenha)) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Senhas não coincidem"));
            }

            if (nome == null || nome.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Nome é obrigatório"));
            }

            // Verificar se email já existe
            if (usuarioRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Email já está em uso"));
            }

            // Criar usuário
            Usuario usuario = new Usuario(email, senha, nome);
            Usuario usuarioSalvo = usuarioRepository.save(usuario);

            Map<String, Object> resposta = new HashMap<>();
            resposta.put("id", usuarioSalvo.getId());
            resposta.put("email", usuarioSalvo.getEmail());
            resposta.put("nome", usuarioSalvo.getNome());
            resposta.put("mensagem", "Usuário cadastrado com sucesso");

            return ResponseEntity.status(HttpStatus.CREATED).body(resposta);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro interno do servidor"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        try {
            String email = dados.get("email");
            String senha = dados.get("senha");

            Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

            if (usuarioOpt.isPresent() && usuarioOpt.get().getSenha().equals(senha)) {
                Usuario usuario = usuarioOpt.get();
                Map<String, Object> resposta = new HashMap<>();
                resposta.put("id", usuario.getId());
                resposta.put("email", usuario.getEmail());
                resposta.put("nome", usuario.getNome());
                return ResponseEntity.ok(resposta);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("erro", "Credenciais inválidas"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("erro", "Erro interno do servidor"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> recuperarPorId(@PathVariable Long id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            Map<String, Object> resposta = new HashMap<>();
            resposta.put("id", usuario.getId());
            resposta.put("email", usuario.getEmail());
            resposta.put("nome", usuario.getNome());
            return ResponseEntity.ok(resposta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody Map<String, String> dados) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (dados.containsKey("nome")) {
                usuario.setNome(dados.get("nome"));
            }
            if (dados.containsKey("email")) {
                String novoEmail = dados.get("email");
                if (!novoEmail.equals(usuario.getEmail()) && usuarioRepository.existsByEmail(novoEmail)) {
                    return ResponseEntity.badRequest().body(Map.of("erro", "Email já está em uso"));
                }
                usuario.setEmail(novoEmail);
            }
            if (dados.containsKey("senha")) {
                usuario.setSenha(dados.get("senha"));
            }

            Usuario usuarioSalvo = usuarioRepository.save(usuario);
            Map<String, Object> resposta = new HashMap<>();
            resposta.put("id", usuarioSalvo.getId());
            resposta.put("email", usuarioSalvo.getEmail());
            resposta.put("nome", usuarioSalvo.getNome());
            return ResponseEntity.ok(resposta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerPorId(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
