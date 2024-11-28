import pedido from "../Model/pedido.js"
import item_cardapio from "../Model/itemCardapio.js";
import ItemCardapioController from "./ItemCardapioController.js";
import comanda from "../Model/comanda.js";
import conexao from "../banco/conexao_db.js";


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
            req.body.status = 'Registrado';
        }

        const comandaAberta = await comanda.findByPk(req.body.id_comanda);
        if (!comandaAberta) {
            return res.status(404).send("Comanda não encontrada.");
        }

        if (comandaAberta.status === 'Fechada') {
            return res.status(400).send("Não é possível adicionar itens a uma comanda fechada.");
        }

        if (!req.body.data_abertura_pedido) {
            req.body.data_abertura_pedido = new Date();
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
            data_abertura_pedido: req.body.data_abertura_pedido,
            somaprecototal: totalPedido,
            status: req.body.status,
            destino: req.body.destino,
        });

        res.status(200).json(novoPedido);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
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
    if (!req.body.id_comanda) {
        return res.status(500).send("Parametro Id da comanda é obrigatório.");
    }

    await pedido
        .update({
            id_comanda: req.body.id_comanda,
            id_item: req.body.id_item,
            quantidade: req.body.quantidade,
            somaprecototal: req.body.somaprecototal,
            status: req.body.status,
            destino: req.body.destino,
            data_abertura_pedido: req.body.data_abertura_pedido,
        },
            {
                where: {
                    id_pedido: req.params.id_pedido
                }
            })
        .then(resultado => { res.status(200).json(resultado); })
        .catch(erro => { res.status(500).json(erro); });
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

async function buscarPedidosProduzindoCopa(req, res) {
    const query = `
        SELECT 
            pedido.id_comanda,
            pedido.id_pedido,
            pedido.id_item,
            item_cardapio.nome AS nome_item,
            pedido.quantidade,
            pedido.status,
            pedido.destino,
            pedido.somaprecototal,			
            pedido.data_abertura_pedido
        FROM 
            pedido
        JOIN 
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE 
            pedido.status IN ('Registrado', 'Produzindo', 'Pronto')
            AND pedido.destino = 'Copa';
    `;

    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

async function buscarPedidosProduzindoCozinha(req, res) {
    const query = `
         SELECT
            pedido.id_pedido, 
            pedido.id_comanda,
            pedido.id_item,
            item_cardapio.nome AS nome_item,
            pedido.quantidade,
            pedido.status,
            somaprecototal,
            pedido.destino,
            pedido.data_abertura_pedido
        FROM 
            pedido
        JOIN 
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE 
            pedido.status IN ('Registrado', 'Produzindo', 'Pronto')
            AND pedido.destino = 'Cozinha';
    `;

    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}



async function BuscarPedidosAtrasados(req, res) {
    const query = `
    SELECT 
    p.id_pedido, 
    p.id_item,
    i.nome AS nome_item,
    p.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' AS data_abertura_pedido_br,
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' - 
        (p.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') AS tempo_aberto_br
FROM pedido p
JOIN item_cardapio i ON p.id_item = i.id_item 
WHERE 
    p.status = 'Produzindo' 
    AND CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' - 
        (p.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') > INTERVAL '30 minutes';
`;
try {
    const [resultados] = await conexao.query(query);
    res.status(200).json(resultados);
} catch (erro) {
    res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
}
}

async function BuscarPedidosRejeitados(req, res) {
    const query = `
    SELECT COUNT(*) AS pedidos_rejeitados
FROM pedido
WHERE status = 'Rejeitado' 
  AND DATE(data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo') = 
      DATE(CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo');
`;
try {
    const [resultados] = await conexao.query(query);
    res.status(200).json(resultados);
} catch (erro) {
    res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
}
}

export default { listar, selecionar, criar, alterar, excluir, buscarPedidosProduzindoCopa, buscarPedidosProduzindoCozinha, BuscarPedidosAtrasados };