package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.Categoria;
import com.skylink.skylinkapi.repository.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaRepository repository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Categoria> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Categoria criar(@RequestBody Categoria categoria) {
        return repository.save(categoria);
    }

    @PutMapping("/{id}")
    public Categoria atualizar(@PathVariable Long id, @RequestBody Categoria nova) {
        return repository.findById(id).map(cat -> {
            cat.setNome(nova.getNome());
            return repository.save(cat);
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
