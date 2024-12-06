const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION log_alteracao_status_pedido()
      RETURNS TRIGGER AS $$
      BEGIN
          IF NEW.status IS DISTINCT FROM OLD.status THEN
              INSERT INTO log_pedido_status (id_pedido, status_anterior, status_novo, data_alteracao)
              VALUES (OLD.id_pedido, OLD.status, NEW.status, CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo');
          END IF;

          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE PROCEDURE fechar_comanda(
          pedido_id_comanda INT
      )
      LANGUAGE plpgsql
      AS
      $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM comanda WHERE id_comanda = pedido_id_comanda AND status = 'Aberta') THEN
              RAISE EXCEPTION 'Comanda não encontrada ou já fechada';
          END IF;
          UPDATE pedido
          SET status = 'Cancelado'
          WHERE id_comanda = pedido_id_comanda 
            AND status IN ('Registrado', 'Produzindo');
          INSERT INTO log_pedido_status(id_pedido, status_anterior, status_novo)
          SELECT id_pedido, status, 'Cancelado'
          FROM pedido
          WHERE id_comanda = pedido_id_comanda 
            AND status IN ('Registrado', 'Produzindo');
          UPDATE pedido
          SET status = 'Entregue'
          WHERE id_comanda = pedido_id_comanda 
            AND status = 'Pronto';
          INSERT INTO log_pedido_status(id_pedido, status_anterior, status_novo)
          SELECT id_pedido, status, 'Entregue'
          FROM pedido
          WHERE id_comanda = pedido_id_comanda 
            AND status = 'Pronto';
          UPDATE comanda
          SET status = 'Fechada', data_fechamento = CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo'
          WHERE id_comanda = pedido_id_comanda;
          COMMIT;
      END;
      $$;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_log_status_pedido
      AFTER UPDATE ON pedido
      FOR EACH ROW
      EXECUTE FUNCTION log_alteracao_status_pedido();
    `);

    await queryInterface.sequelize.query(`CREATE INDEX idx_usuario_nome ON usuario (nome);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_comanda_usuario ON comanda (id_usuario);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_comanda_status ON comanda (status);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_comanda_abertura_status ON comanda (data_abertura, status);`);

    await queryInterface.sequelize.query(`CREATE INDEX idx_item_nome ON item_cardapio (nome);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_item_tipo ON item_cardapio (tipo);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_item_preco ON item_cardapio (preco);`);

    await queryInterface.sequelize.query(`CREATE INDEX idx_pedido_comanda ON pedido (id_comanda);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_pedido_status ON pedido (status);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_pedido_destino ON pedido (destino);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_pedido_comanda_status ON pedido (id_comanda, status);`);

    await queryInterface.sequelize.query(`CREATE INDEX idx_log_pedido ON log_pedido_status (id_pedido);`);
    await queryInterface.sequelize.query(`CREATE INDEX idx_log_data ON log_pedido_status (data_alteracao);`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_log_status_pedido ON pedido;`);

    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS log_alteracao_status_pedido;`);

    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS fechar_comanda;`);

    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_usuario_nome;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_comanda_usuario;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_comanda_status;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_comanda_abertura_status;`);

    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_item_nome;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_item_tipo;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_item_preco;`);

    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_pedido_comanda;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_pedido_status;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_pedido_destino;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_pedido_comanda_status;`);

    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_log_pedido;`);
    await queryInterface.sequelize.query(`DROP INDEX IF EXISTS idx_log_data;`);
  }
};
