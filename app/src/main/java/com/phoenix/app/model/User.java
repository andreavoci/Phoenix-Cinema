package com.phoenix.app.model;
//User(ID, nome, cognome, cf, genere, data_nascita, indirizzo, telefono, email, password)


import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id //primary key della tabella
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;
    private String cognome;
    private String cf;
    private String genere;
    private String data_nascita;
    private String indirizzo;
    private String telefono;
    private String email;
    private String password;

    public User() {}

    public User(Long id, String nome, String cognome, String cf, String genere, String data_nascita, String indirizzo, String telefono, String email, String password) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.cf = cf;
        this.genere = genere;
        this.data_nascita = data_nascita;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getCf() {
        return cf;
    }

    public void setCf(String cf) {
        this.cf = cf;
    }

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }

    public String getData_nascita() {
        return data_nascita;
    }

    public void setData_nascita(String data_nascita) {
        this.data_nascita = data_nascita;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cognome='" + cognome + '\'' +
                ", cf='" + cf + '\'' +
                ", genere='" + genere + '\'' +
                ", data_nascita='" + data_nascita + '\'' +
                ", indirizzo='" + indirizzo + '\'' +
                ", telefono='" + telefono + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
