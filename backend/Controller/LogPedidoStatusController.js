import log_pedido_status from "../Model/log_pedido_status.js";

async function listar(req, res) {
    const status = req.query.status;
    const filter = status ? { status } : {};
    await log_pedido_status
        .findAll({ where: filter })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await log_pedido_status
        .findByPk(req.params.id_log)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function BuscarPorIdPedido(req, res) {
    try {
        const resultado = await log_pedido_status.findAll({
            where: {
                id_pedido: req.params.id_pedido 
            }
        });

        if (resultado.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum log encontrado para o ID do pedido fornecido.' });
        }

        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao buscar logs.', erro });
    }
}

export default { listar, selecionar, BuscarPorIdPedido};