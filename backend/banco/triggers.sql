CREATE TRIGGER trigger_verificar_data_fechamento
BEFORE UPDATE ON comanda
FOR EACH ROW
WHEN (NEW.data_fechamento IS NOT NULL)  -- Checa apenas quando a data de fechamento é atualizada
EXECUTE FUNCTION verificar_data_fechamento();