package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.Produto;
import com.skylink.skylinkapi.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Page<Produto> listar(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public Produto buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
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
    public Produto atualizar(@PathVariable Long id, @RequestBody Produto novo) {
        return repository.findById(id).map(produto -> {
            novo.setId(produto.getId());
            return repository.save(novo);
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
