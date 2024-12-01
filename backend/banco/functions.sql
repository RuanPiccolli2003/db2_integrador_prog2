CREATE OR REPLACE FUNCTION verificar_data_fechamento()
RETURNS TRIGGER AS $$
BEGIN
    -- Checar se a data_fechamento é maior que a data_abertura, caso a data_fechamento seja alterada
    IF NEW.data_fechamento IS NOT NULL AND NEW.data_fechamento <= NEW.data_abertura THEN
        RAISE EXCEPTION 'A data de fechamento deve ser maior que a data de abertura.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;