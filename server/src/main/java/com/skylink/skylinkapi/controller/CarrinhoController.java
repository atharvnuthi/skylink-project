package com.skylink.skylinkapi.controller;

import com.skylink.skylinkapi.model.ItemCarrinho;
import com.skylink.skylinkapi.model.Usuario;
import com.skylink.skylinkapi.model.Produto;
import com.skylink.skylinkapi.repository.ItemCarrinhoRepository;
import com.skylink.skylinkapi.repository.UsuarioRepository;
import com.skylink.skylinkapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrinho")
@CrossOrigin(origins = "*")
public class CarrinhoController {

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ItemCarrinho>> listarItensCarrinho(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isPresent()) {
            List<ItemCarrinho> itens = itemCarrinhoRepository.findByUsuario(usuarioOpt.get());
            return ResponseEntity.ok(itens);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarItem(@RequestBody Map<String, Object> dados) {
        try {
            Long usuarioId = Long.valueOf(dados.get("usuarioId").toString());
            Long produtoId = Long.valueOf(dados.get("produtoId").toString());
            Integer quantidade = Integer.valueOf(dados.get("quantidade").toString());

            Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
            Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);

            if (usuarioOpt.isPresent() && produtoOpt.isPresent()) {
                Usuario usuario = usuarioOpt.get();
                Produto produto = produtoOpt.get();

                // Verificar se item já existe no carrinho
                Optional<ItemCarrinho> itemExistente = itemCarrinhoRepository.findByUsuarioAndProduto(usuario, produto);

                ItemCarrinho item;
                if (itemExistente.isPresent()) {
                    // Atualizar quantidade
                    item = itemExistente.get();
                    item.setQuantidade(item.getQuantidade() + quantidade);
                } else {
                    // Criar novo item
                    item = new ItemCarrinho(usuario, produto, quantidade, produto.getPreco());
                }

                ItemCarrinho itemSalvo = itemCarrinhoRepository.save(item);
                return ResponseEntity.ok(itemSalvo);
            }
            return ResponseEntity.badRequest().body(Map.of("erro", "Usuário ou produto não encontrado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Dados inválidos"));
        }
    }

    @PutMapping("/atualizar/{itemId}")
    public ResponseEntity<?> atualizarQuantidade(@PathVariable Long itemId, @RequestBody Map<String, Integer> dados) {
        Optional<ItemCarrinho> itemOpt = itemCarrinhoRepository.findById(itemId);
        if (itemOpt.isPresent()) {
            ItemCarrinho item = itemOpt.get();
            item.setQuantidade(dados.get("quantidade"));
            ItemCarrinho itemSalvo = itemCarrinhoRepository.save(item);
            return ResponseEntity.ok(itemSalvo);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/remover/{itemId}")
    public ResponseEntity<?> removerItem(@PathVariable Long itemId) {
        if (itemCarrinhoRepository.existsById(itemId)) {
            itemCarrinhoRepository.deleteById(itemId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/limpar/{usuarioId}")
    public ResponseEntity<?> limparCarrinho(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isPresent()) {
            itemCarrinhoRepository.removerTodosItensDoCarrinho(usuarioOpt.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/total/{usuarioId}")
    public ResponseEntity<?> calcularTotal(@PathVariable Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isPresent()) {
            List<ItemCarrinho> itens = itemCarrinhoRepository.findByUsuario(usuarioOpt.get());
            BigDecimal total = itens.stream()
                    .map(ItemCarrinho::getSubtotal)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            Map<String, Object> resposta = new HashMap<>();
            resposta.put("total", total);
            resposta.put("quantidadeItens", itens.size());
            return ResponseEntity.ok(resposta);
        }
        return ResponseEntity.notFound().build();
    }
}
