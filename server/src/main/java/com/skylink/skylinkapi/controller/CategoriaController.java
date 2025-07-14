package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.Categoria;
import com.skylink.skylinkapi.repository.CategoriaRepository;
import com.skylink.skylinkapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaRepository repository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Categoria> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> recuperarPorId(@PathVariable Long id) {
        Optional<Categoria> categoria = repository.findById(id);
        return categoria.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Categoria criar(@RequestBody Categoria categoria) {
        return repository.save(categoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> alterar(@PathVariable Long id, @RequestBody Categoria nova) {
        return repository.findById(id).map(cat -> {
            cat.setNome(nova.getNome());
            return ResponseEntity.ok(repository.save(cat));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> removerPorId(@PathVariable Long id) {
        if (repository.existsById(id)) {
            // Primeiro remove os produtos da categoria
            produtoRepository.removerProdutosPorIdCategoria(id);
            // Depois remove a categoria
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
