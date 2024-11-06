import comanda from "../model/Controller.js"

async function listar(req, res) {
    await comanda
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await comanda
        .findByPk(req.params.idcomanda)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.comanda)
        res.status(500).send("Parametro categoria é obrigatório.");

    await comanda
        .create({
            comanda: req.body.comanda
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {
    if (!req.body.comanda)
        res.status(500).send("Parametro categoria é obrigatório.");

    await comanda
        .update({
            comanda: req.body.comanda
        },
            {
                where: {
                    idcomanda: req.params.idcomanda
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await comanda
        .destroy(
            {
                where: {
                    idcomanda: req.params.idcomanda
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };