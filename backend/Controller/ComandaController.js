import comanda from "../Model/comanda.js"
import conexao from "../banco/conexao_db.js";
import { Sequelize } from "sequelize";

async function listar(req, res) {
    const status = req.query.status;
    const filter = status ? { status } : {};
    await comanda
        .findAll({ where: filter })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

//Insominia GET: http://localhost:3000/comanda

async function selecionar(req, res) {
    await comanda
        .findByPk(req.params.id_comanda)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

// Insominia GET: http://localhost:3000/comanda/Id da comanda

async function criar(req, res) {

    if (!req.body.status) {
        req.body.status = 'Aberta';
    }

    if (!req.body.data_abertura) {
        req.body.data_abertura = new Date();
    }

    if (!req.body.data_fechamento) {
        req.body.data_fechamento = null;
    }

    await comanda
        .create({
            id_usuario: req.body.id_usuario,
            status: req.body.status,
            data_abertura: req.body.data_abertura,
            data_fechamento: req.body.data_fechamento,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

//Insominia POST: http://localhost:3000/comanda

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
    if (!req.body.id_usuario)
        res.status(500).send("Parametro Id do usuario é obrigatório.");

    await comanda
        .update({
            id_usuario: req.body.id_usuario,
            status: req.body.status,
            data_abertura: req.body.data_abertura,
            data_fechamento: req.body.data_fechamento,
        },
            {
                where: {
                    id_comanda: req.params.id_comanda
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
                    id_comanda: req.params.id_comanda
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function fecharComanda(req, res) {
    if (!req.body.id_usuario) {
        return res.status(500).send("Parametro Id comanda é obrigatório.");
    }
    if (!req.body.data_fechamento) {
        req.body.data_fechamento = new Date();
    }

    try {
        await conexao.query('CALL fechar_comanda(:id_comanda)', {
            replacements: { id_comanda: req.params.id_comanda },
            type: Sequelize.QueryTypes.RAW
        });
        res.status(200).json({ message: 'Comanda fechada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fechar a comanda', details: error.message });
    }
}
async function listarComandaDetalhada(req, res) {
    const id_comanda = req.params.id_comanda;

    if (!id_comanda) {
        return res.status(400).send("ID da comanda é obrigatório.");
    }

    const query = `
            SELECT 
                comanda.id_comanda,
                comanda.status AS status_comanda,
                pedido.id_pedido,
                pedido.status AS status_pedido,
                pedido.destino,
                item.nome AS nome_item,
                item.tipo AS tipo_item,
                pedido.quantidade,
                pedido.somaprecototal
            FROM 
                comanda
            JOIN 
                pedido ON comanda.id_comanda = pedido.id_comanda
            JOIN 
                item_cardapio item ON pedido.id_item = item.id_item
            WHERE 
                comanda.id_comanda = :id_comanda;
        `;

    try {
        const resultados = await conexao.query(query, {
            replacements: { id_comanda },
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

async function BuscarTotalComandasAbertasFechadas(req, res) {
    const query = `
    SELECT
	COUNT(*) FILTER (
		WHERE data_abertura AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' >= DATE_TRUNC('day', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo') 
        AND data_abertura AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' < DATE_TRUNC('day', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo' + INTERVAL '1 day')
	) AS comandas_abertura,
	COUNT(*) FILTER (
		WHERE data_fechamento AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' >= DATE_TRUNC('day', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo') 
        AND data_fechamento AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' < DATE_TRUNC('day', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo' + INTERVAL '1 day')
	) AS comandas_fechadas
from comanda;       
    `;
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

async function BuscarTotalValorComanda(req, res) {
    const { id_comanda } = req.query;

    const query = `
        SELECT
            comanda.id_comanda AS id_da_comanda, 
            pedido.id_pedido, 
            item_cardapio.nome AS nome_do_item, 
            pedido.quantidade, 
            pedido.somaprecototal AS total_do_pedido, 
            SUM(pedido.somaprecototal) OVER (PARTITION BY comanda.id_comanda) AS total_da_comanda 
        FROM
            comanda
        JOIN
            pedido ON comanda.id_comanda = pedido.id_comanda
        JOIN
            item_cardapio ON pedido.id_item = item_cardapio.id_item
        WHERE
            pedido.status IN ('Produzindo', 'Pronto', 'Entregue') 
            AND comanda.id_comanda = $1
        ORDER BY
            pedido.id_pedido;
    `;

    try {
        const [resultados] = await conexao.query(query, {bind: [id_comanda]});
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar comandas', error: erro.message });
    }
}

export default { listarComandaDetalhada, listar, selecionar, criar, alterar, excluir, fecharComanda, BuscarTotalComandasAbertasFechadas, BuscarTotalValorComanda };
