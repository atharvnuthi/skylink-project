package com.skylink.skylinkapi.repository;

import com.skylink.skylinkapi.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Page<Produto> findByCategoriaId(Long categoriaId, Pageable pageable);

    Page<Produto> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

    @Modifying
    @Query("delete from Produto p where p.categoria.id = :id")
    void removerProdutosPorIdCategoria(@Param("id") long id);
}
