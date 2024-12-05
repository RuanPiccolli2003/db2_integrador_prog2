CREATE TRIGGER trigger_log_status_pedido
AFTER UPDATE ON pedido
FOR EACH ROW
EXECUTE FUNCTION log_alteracao_status_pedido();
