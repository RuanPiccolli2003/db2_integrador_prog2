import ordem from "../Model/ordem.js";

async function listar(req, res) {
    await ordem
    .findAll()
    .then(resultado => { res.status(200).json(resultado)})
    .catch(erro => { res.status(500).json(erro)});
}

async function selecionar(req, res) {
    await ordem
    .findByPk(req.params.id_ordem)
    .then(resultado => { res.status(200).json(resultado)})
    .catch(erro => { res.status(500).json(erro)});
}

async function criar(req, res) {
    await ordem
    .create({
        id_ordem: req.body.id_ordem,
        id_pedido: req.body.id_pedido,
    })
    .then(resultado => { res.status(200).json(resultado)})
    .catch(erro => { res.status(500).json(erro)});
}

async function alterar(req, res) {
    if (!req.body.id_ordem)
        res.status(500).send("Parametro Id da ordem é obrigatório.");

    await ordem
            .update({
                id_ordem: req.body.id_ordem,
                id_pedido: req.body.id_pedido
            },
                {
                    where: {
                        id_ordem: req.params.id_ordem
                    }
                })
            .then(resultado => { res.status(200).json(resultado) })
            .catch(erro => { res.status(500).json(erro) });
    }

    async function excluir(req, res) {
        await ordem
        .destroy(
            {
                where:{
                    id_ordem: req.params.id_ordem
                }
            })
            .then(resultado => { res.status(200).json(resultado) })
            .catch(erro => { res.status(500).json(erro) });
        
    }

    export async function criarOrdem(id_pedido) {
        try {
            const novaOrdem = await ordem.create({
                id_pedido: id_pedido,
            });

            return novaOrdem
        } catch (erro) {
            throw new Error('Erro ao criar ordem: ' + erro.message);
        }
    }

export default { listar, selecionar, criar, alterar, excluir};