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
    await usuario
        .findByPk(req.params.id_usuario)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

// Insominia GET: http://localhost:3000/usuario/Id do usuario

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
        res.status(500).send("Parametro nome é obrigatório.");

    await usuario
        .update({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        },
            {
                where: {
                    id_usuario: req.params.id_usuario
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

/*Insominia PUT: http://localhost:3000/usuario/Id do usuario
Body Json: 
{
	"nome": "",
	"email": "",
	"senha": ""
}
*/

async function excluir(req, res) {
    await usuario
        .destroy(
            {
                where: {
                    id_usuario: req.params.id_usuario
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

// Insominia Delete: http://localhost:3000/usuario/Id do usuario

export default { listar, selecionar, criar, alterar, excluir };