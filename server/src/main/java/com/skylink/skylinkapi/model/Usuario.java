package com.skylink.skylinkapi.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String nome;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ItemCarrinho> itensCarrinho;

    @ManyToMany
    @JoinTable(name = "usuario_favoritos", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "produto_id"))
    private Set<Produto> favoritos;

    public Usuario() {
    }

    public Usuario(String email, String senha, String nome) {
        this.email = email;
        this.senha = senha;
        this.nome = nome;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<ItemCarrinho> getItensCarrinho() {
        return itensCarrinho;
    }

    public void setItensCarrinho(Set<ItemCarrinho> itensCarrinho) {
        this.itensCarrinho = itensCarrinho;
    }

    public Set<Produto> getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(Set<Produto> favoritos) {
        this.favoritos = favoritos;
    }
}
