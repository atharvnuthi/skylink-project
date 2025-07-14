package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.Produto;
import com.skylink.skylinkapi.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Page<Produto> listar(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String nome) {
        if (nome != null && !nome.trim().isEmpty()) {
            return repository.findByNomeContainingIgnoreCase(nome, PageRequest.of(page, size));
        }
        return repository.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> recuperarPorId(@PathVariable Long id) {
        Optional<Produto> produto = repository.findById(id);
        return produto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoriaId}")
    public Page<Produto> listarPorCategoria(@PathVariable Long categoriaId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return repository.findByCategoriaId(categoriaId, PageRequest.of(page, size));
    }

    @PostMapping
    public Produto criar(@RequestBody Produto produto) {
        return repository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> alterar(@PathVariable Long id, @RequestBody Produto novo) {
        return repository.findById(id).map(produto -> {
            novo.setId(produto.getId());
            return ResponseEntity.ok(repository.save(novo));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerPorId(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
