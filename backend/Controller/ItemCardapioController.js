import item_cardapio from "../Model/itemCardapio.js";
import conexao from "../banco/conexao_db.js";


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

async function ItensMaisVendidos(req, res) {
    const query = `
    SELECT 
    item_cardapio.id_item AS id_do_item,
    item_cardapio.nome AS nome_do_item,
    item_cardapio.tipo AS tipo_do_item,
    SUM(pedido.quantidade) AS total_vendido,
    SUM(pedido.somaprecototal) AS valor_total_vendido
FROM 
    pedido
JOIN 
    item_cardapio ON pedido.id_item = item_cardapio.id_item
WHERE 
    pedido.status = 'Entregue'
	OR pedido.status = 'Pronto'
GROUP BY 
    item_cardapio.id_item, item_cardapio.nome, item_cardapio.tipo
ORDER BY 
    total_vendido DESC
LIMIT 50;      
    `;
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar relatório item', error: erro.message });
    }
}

async function ItensMaisVendidosDiário(req, res) {
    const query = `
    SELECT 
    item_cardapio.id_item AS id_do_item,
    item_cardapio.nome AS nome_do_item,
    item_cardapio.tipo AS tipo_do_item,
    SUM(pedido.quantidade) AS total_vendido,
    SUM(pedido.somaprecototal) AS valor_total_vendido
FROM 
    pedido
JOIN 
    item_cardapio ON pedido.id_item = item_cardapio.id_item
WHERE 
    (pedido.status = 'Entregue' OR pedido.status = 'Pronto')
    AND pedido.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' >= DATE_TRUNC('day', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo')
    AND pedido.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' < DATE_TRUNC('day', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo') + INTERVAL '1 day'
GROUP BY 
    item_cardapio.id_item, item_cardapio.nome, item_cardapio.tipo
ORDER BY 
    total_vendido DESC
LIMIT 50;      
    `;
    try {
        const [resultados] = await conexao.query(query);
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar relatório item', error: erro.message });
    }
}

async function ItensMaisVendidosPorIntervalo(req, res) {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
        return res.status(400).json({ message: 'É necessário fornecer as datas de início e fim.' });
    }

    const dataInicioFormatada = new Date(dataInicio).toISOString();
    const dataFimFormatada = new Date(dataFim).toISOString();

    const query = `
    SELECT 
        item_cardapio.id_item AS id_do_item,
        item_cardapio.nome AS nome_do_item,
        item_cardapio.tipo AS tipo_do_item,
        SUM(pedido.quantidade) AS total_vendido,
        SUM(pedido.somaprecototal) AS valor_total_vendido
    FROM 
        pedido
    JOIN 
        item_cardapio ON pedido.id_item = item_cardapio.id_item
    WHERE 
        (pedido.status = 'Entregue' OR pedido.status = 'Pronto')
        AND pedido.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' >= $1
        AND pedido.data_abertura_pedido AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' < $2
    GROUP BY 
        item_cardapio.id_item, item_cardapio.nome, item_cardapio.tipo
    ORDER BY 
        total_vendido DESC
    LIMIT 50;
    `;

    try {
        const [resultados] = await conexao.query(query, {
            bind: [dataInicioFormatada, dataFimFormatada]
        });
        res.status(200).json(resultados);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao buscar relatório de itens mais vendidos', error: erro.message });
    }
}




export default { listar, selecionar, criar, alterar, excluir, ItensMaisVendidos, ItensMaisVendidosDiário, ItensMaisVendidosPorIntervalo };
