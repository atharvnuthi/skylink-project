package com.skylink.skylinkapi.repository;

import com.skylink.skylinkapi.model.ItemCarrinho;
import com.skylink.skylinkapi.model.Usuario;
import com.skylink.skylinkapi.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    List<ItemCarrinho> findByUsuario(Usuario usuario);

    Optional<ItemCarrinho> findByUsuarioAndProduto(Usuario usuario, Produto produto);

    @Modifying
    @Query("delete from ItemCarrinho i where i.usuario = :usuario")
    void removerTodosItensDoCarrinho(@Param("usuario") Usuario usuario);

    @Modifying
    @Query("delete from ItemCarrinho i where i.produto.categoria.id = :id")
    void removerItensPorIdCategoria(@Param("id") long id);
}
