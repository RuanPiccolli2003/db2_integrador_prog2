import pedido from "../Model/pedido.js"
import item_cardapio from "../Model/itemCardapio.js";
import ItemCardapioController from "./ItemCardapioController.js";
import comanda from "../Model/comanda.js";
import { criarOrdem } from "../Controller/OrdemController.js";


async function listar(req, res) {
    await pedido
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

//Insominia GET: http://localhost:3000/pedido

async function selecionar(req, res) {
    await pedido
        .findByPk(req.params.id_pedido)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

// Insominia GET: http://localhost:3000/pedido/Id da pedido

async function criar(req, res) {
    try {
        const item = await item_cardapio.findByPk(req.body.id_item);
        if (!item) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        if (!req.body.status) {
            req.body.status = 'Produzindo';
        }

        const comandaAberta = await comanda.findByPk(req.body.id_comanda);
    
        if (!comandaAberta) {
            return res.status(404).send("Comanda não encontrada.");
        }

        if (comandaAberta.status === 'Fechada') {
            return res.status(400).send("Não é possível adicionar itens a uma comanda fechada.");
        }

        if (!req.body.destino) {
            if (item.tipo === 'Bebida') {
                req.body.destino = 'Copa';
            } else if (item.tipo === 'Prato') {
                req.body.destino = 'Cozinha';
            }
        }    

        const totalPedido = item.preco * req.body.quantidade;

        const novoPedido = await pedido.create({
            id_comanda: req.body.id_comanda,
            id_item: req.body.id_item,
            quantidade: req.body.quantidade,
            somaprecototal: totalPedido,
            status: req.body.status,
            destino: req.body.destino,
        });

        const novaOrdem = await criarOrdem(novoPedido.id_pedido);

        res.status(200).json({
            pedido: novoPedido,
            ordem: novaOrdem
        });
    } catch (erro) {
        res.status(500).json({ error: 'Erro ao criar pedido', details: erro.message });
    }
}


//Insominia POST: http://localhost:3000/pedido

/*
{
  "id_usuario": "1",
  "status": "Aberta",
  "data_abertura": "2024-11-14 15:30:00",
  "data_fechamento": "2024-11-14 15:30:00",
  "id_item": ""
}
*/



async function alterar(req, res) {
    if (!req.body.id_comanda)
        res.status(500).send("Parametro Id da comanda é obrigatório.");

    await pedido
        .update({
            id_comanda: req.body.id_comanda,
            id_item: req.body.id_item,
            quantidade: req.body.quantidade,
            somaprecototal: req.body.somaprecototal,
            status: req.body.status,
            destino: req.body.destino,
        },
            {
                where: {
                    id_pedido: req.params.id_pedido
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await pedido
        .destroy(
            {
                where: {
                    id_pedido: req.params.id_pedido
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}


export default { listar, selecionar, criar, alterar, excluir };