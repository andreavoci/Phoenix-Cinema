CREATE TABLE IF NOT EXISTS contratto (
    id bigint PRIMARY KEY UNIQUE NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    mansione VARCHAR (250) NOT NULL,
    data_inizio date NOT NULL,
    data_fine date NOT NULL,
    ore bigint NOT NULL ,
    paga float NOT NULL ,
    file VARCHAR (10000)
);

CREATE TABLE IF NOT EXISTS fornitore (
    id bigint PRIMARY KEY UNIQUE NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    regione_sociale VARCHAR (250) NOT NULL,
    tipologia_prodotto VARCHAR (250) NOT NULL,
    email VARCHAR (100) NOT NULL,
    telefono VARCHAR (50)
);

CREATE TABLE IF NOT EXISTS permesso (
    id bigint PRIMARY KEY UNIQUE NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    tipo VARCHAR (250) NOT NULL,
    data_inizio date NOT NULL,
    data_fine date NOT NULL,
    nota VARCHAR (600)
);

CREATE TABLE IF NOT EXISTS pellicola (
    id bigint PRIMARY KEY UNIQUE NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    id_fornitore bigint NOT NULL,
    data_uscita date NOT NULL,
    durata VARCHAR NOT NULL,
    generi VARCHAR NOT NULL,
    pegi VARCHAR NOT NULL,
    trama VARCHAR NOT NULL,
    regista VARCHAR NOT NULL,
    attori VARCHAR NOT NULL,
    locandina VARCHAR NOT NULL,
    trailer VARCHAR NOT NULL,
    prezzo_noleggio float NOT NULL ,
    titolo VARCHAR NOT NULL,
    fine_noleggio date NOT NULL,
    FOREIGN KEY (id_fornitore)
        REFERENCES fornitore(id)
);

CREATE TABLE IF NOT EXISTS "user" (
    id bigint PRIMARY KEY UNIQUE NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    nome VARCHAR NOT NULL,
    cognome VARCHAR NOT NULL,
    data_nascita date NOT NULL,
    cf VARCHAR NOT NULL UNIQUE,
    genere VARCHAR NOT NULL,
    residenza VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE ,
    telefono VARCHAR NOT NULL UNIQUE ,
    password VARCHAR NOT NULL,
    id_contratto bigint NOT NULL,
    FOREIGN KEY (id_contratto)
        REFERENCES contratto(id)
);

