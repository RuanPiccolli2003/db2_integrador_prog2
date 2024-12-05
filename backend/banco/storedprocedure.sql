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
