import item_cardapio from "../Model/itemCardapio.js";

async function listar(req, res) {
    await item_cardapio
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
} 

/* Insominia GET: http://localhost:3000/itemcardapio */

async function selecionar(req, res) {
    await item_cardapio
        .findByPk(req.params.id_item)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

// Insominia GET: http://localhost:3000/itemcardapio/Id do item cardapio


async function criar(req, res) {
    if (!req.body.nome)
        res.status(500).send("Parametro nome é obrigatório.");
    
    await item_cardapio
        .create({
            nome: req.body.nome,
            tipo: req.body.tipo,
            preco: req.body.preco

        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
} 

/*Insominia: Post: http://localhost:3000/itemcardapio - Body: Json: 
{
	"nome": "",
	"tipo": "", (Bebida ou Prato)
	"preco": ""
}
    */

async function alterar(req, res) {
    if (!req.body.nome)
        res.status(500).send("Parametro nome é obrigatório.");

    await item_cardapio
        .update({
            nome: req.body.nome,
            tipo: req.body.tipo,
            preco: req.body.preco
        },
            {
                where: {
                    id_item: req.params.id_item
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

/*Insominia: PUT: http://localhost:3000/itemcardapio - Body: Json: 
{
	"nome": "",
	"tipo": "",
	"preco": ""
}
    */

async function excluir(req, res) {
    await item_cardapio
        .destroy(
            {
                where: {
                    id_item: req.params.id_item
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

// Insominia Delete: http://localhost:3000/usuario/Id do item do cardapio


export default { listar, selecionar, criar, alterar, excluir };
