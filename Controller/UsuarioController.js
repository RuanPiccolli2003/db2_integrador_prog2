import nome from "../Model/usuario.js";
import usuario from "../Model/usuario.js";


async function listar(req, res) {
    await usuario
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
} 

/* Insominia GET: http://localhost:3000/usuario */

async function selecionar(req, res) {
    await nome
        .findByPk(req.params.id_usuario)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    if (!req.body.nome)
        res.status(500).send("Parametro nome é obrigatório.");

    await usuario
        .create({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha

        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
} 

/*Insominia: Post: http://localhost:3000/usuario - Body: Json: 
{
    "nome": "",
    "email": "",
    "senha": ""
}
    */

async function alterar(req, res) {
    if (!req.body.nome)
        res.status(500).send("Parametro categoria é obrigatório.");

    await nome
        .update({
            nome: req.body.nome
        },
            {
                where: {
                    id_usuario: req.params.id_usuario
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await nome
        .destroy(
            {
                where: {
                    id_usuario: req.params.id_usuario
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };