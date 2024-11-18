import { Sequelize } from "sequelize";
import ordem from "../Model/ordem.js";
import pedido from "../Model/pedido.js";
import item_cardapio from "../Model/itemCardapio.js";
import comanda from "../Model/comanda.js";
import conexao from "../banco/conexao_db.js";




async function listar(req, res) {
    await ordem
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await ordem
        .findByPk(req.params.id_ordem)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {
    await ordem
        .create({
            id_ordem: req.body.id_ordem,
            id_pedido: req.body.id_pedido,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
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
                where: {
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

async function buscarComandasProduzindoCopa(req, res) {
    const query = `
        SELECT 
            ordem.id_ordem,
            ordem.id_pedido,
            pedido.id_comanda,
            pedido.id_item,
            item_cardapio.nome AS nome_item,
            pedido.quantidade,
            pedido.status,
            pedido.destino
        FROM 
            ordem
        JOIN 
            pedido ON ordem.id_pedido = pedido.id_pedido
        JOIN 
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE 
            pedido.status = 'Produzindo'
            AND pedido.destino = 'Copa';
    `;
    
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

async function buscarComandasProduzindoCozinha(req, res) {
    const query = `
        SELECT 
            ordem.id_ordem,
            ordem.id_pedido,
            pedido.id_comanda,
            pedido.id_item,
            item_cardapio.nome AS nome_item,
            pedido.quantidade,
            pedido.status,
            pedido.destino
        FROM 
            ordem
        JOIN 
            pedido ON ordem.id_pedido = pedido.id_pedido
        JOIN 
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE 
            pedido.status = 'Produzindo'
            AND pedido.destino = 'Cozinha';
    `;
    
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

async function buscarComandasProduzindoCozinhaAgrupadaPorComanda(req, res) {
    const query = `
        SELECT 
            pedido.id_comanda,
            JSON_AGG(JSON_BUILD_OBJECT(
                'id_ordem', ordem.id_ordem,
                'id_pedido', ordem.id_pedido,
                'id_item', pedido.id_item,
                'nome_item', item_cardapio.nome,
                'quantidade', pedido.quantidade,
                'status', pedido.status,
                'destino', pedido.destino
            )) AS ordens
        FROM 
            ordem
        JOIN 
            pedido ON ordem.id_pedido = pedido.id_pedido
        JOIN 
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE 
            pedido.status = 'Produzindo'
            AND pedido.destino = 'Cozinha'
        GROUP BY 
            pedido.id_comanda;
    `;
    
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

async function buscarComandasProduzindoCopaAgrupadaPorComanda(req, res) {
    const query = `
        SELECT 
            pedido.id_comanda,
            JSON_AGG(JSON_BUILD_OBJECT(
                'id_ordem', ordem.id_ordem,
                'id_pedido', ordem.id_pedido,
                'id_item', pedido.id_item,
                'nome_item', item_cardapio.nome,
                'quantidade', pedido.quantidade,
                'status', pedido.status,
                'destino', pedido.destino
            )) AS ordens
        FROM 
            ordem
        JOIN 
            pedido ON ordem.id_pedido = pedido.id_pedido
        JOIN 
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE 
            pedido.status = 'Produzindo'
            AND pedido.destino = 'Copa'
        GROUP BY 
            pedido.id_comanda;
    `;
    
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}




export default { listar, selecionar, criar, alterar, excluir, buscarComandasProduzindoCopa, buscarComandasProduzindoCozinha, buscarComandasProduzindoCozinhaAgrupadaPorComanda, buscarComandasProduzindoCopaAgrupadaPorComanda };
