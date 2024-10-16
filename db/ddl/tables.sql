-- Criação da tabela de usuários
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela de comandas
CREATE TABLE comanda (
    id_comanda SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Aberta', 'Fechada')),
    data_abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Criação da tabela de itens do cardápio
CREATE TABLE item_cardapio (
    id_item SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Bebida', 'Prato')),
    preco DECIMAL(10, 2) NOT NULL
);

-- Criação da tabela de pedidos
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_comanda INT NOT NULL,
    id_item INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Produzido', 'Entregue')),
    destino VARCHAR(50) NOT NULL CHECK (destino IN ('Copa', 'Cozinha')),
    CONSTRAINT fk_comanda FOREIGN KEY (id_comanda) REFERENCES comanda(id_comanda) ON DELETE CASCADE,
    CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES item_cardapio(id_item) ON DELETE CASCADE
);

-- Índices para otimização
CREATE INDEX idx_comanda_status ON comanda (status);
CREATE INDEX idx_pedido_status ON pedido (status);
CREATE INDEX idx_item_tipo ON item_cardapio (tipo);
