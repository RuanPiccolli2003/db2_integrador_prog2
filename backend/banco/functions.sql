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
