import express from "express";
import cors from "cors";

import conexao from "./banco/conexao_db.js"

import usuario from "./Controller/UsuarioController.js"
import nome from "./Controller/UsuarioController.js"

import item_cardapio from "./Controller/ItemCardapioController.js";

import comanda from "./Controller/ComandaController.js"

import pedido from "./Controller/PedidoController.js"

import log_pedido_status from "./Controller/LogPedidoStatusController.js";


import dotenv from 'dotenv';
dotenv.config();


try {
    await conexao.authenticate();
    if (process.env.USAR_BD_AZURE === 'true') {
        console.log('Conectado ao banco de dados Azure.');
    } else {
        console.log('Conectado ao banco de dados local.');
    }
} catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
}


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;



app.get('/teste', (request, response) => {
    response.status(200).send('Requisição recebida.');
});

app.post("/teste-parametros/:rp1/:rp2", (request, response) => {
    console.log('Route Params');
    console.log(request.params);

    console.log('Query Params');
    console.log(request.query);

    console.log('Body Params');
    console.log(request.body);

    console.log('Headers Params');
    console.log(request.headers);

    response.status(200).send(request.body.titulo);
});

app.get("/usuario", usuario.listar);
app.get("/usuario/:id_usuario", usuario.selecionar);
app.post("/usuario", usuario.criar);
app.put("/usuario/:id_usuario", usuario.alterar);
app.delete("/usuario/:id_usuario", usuario.excluir);

app.post("/login", usuario.login);

app.get("/itemcardapio", item_cardapio.listar);
app.get("/itemcardapio/:id_item", item_cardapio.selecionar);
app.post("/itemcardapio", item_cardapio.criar);
app.put("/itemcardapio/:id_item", item_cardapio.alterar);
app.delete("/itemcardapio/:id_item", item_cardapio.excluir);
app.get("/itemcardapioItensMaisVendido", item_cardapio.ItensMaisVendidos);
app.get("/itemcardapioItensMaisVendidosDiario", item_cardapio.ItensMaisVendidosDiário);
app.get("/itemcardapioItensMaisVendidosPorIntervalo", item_cardapio.ItensMaisVendidosPorIntervalo);

app.get("/comanda", comanda.listar);
app.get("/comanda/:id_comanda", comanda.selecionar);
app.post("/comanda", comanda.criar);
app.put("/comanda/:id_comanda", comanda.alterar);
app.delete("/comanda/:id_comanda", comanda.excluir);
app.put("/comanda/fecharcomanda/:id_comanda", comanda.fecharComanda);
app.get("/comandadetalhes/:id_comanda", comanda.listarComandaDetalhada);
app.get("/comandaBuscarAbertaFechadaHoje", comanda.BuscarTotalComandasAbertasFechadas);
app.get("/comandaBuscarTotalValorComanda", comanda.BuscarTotalValorComanda);


app.get("/pedido", pedido.listar);
app.get("/pedido/:id_pedido", pedido.selecionar);
app.post("/pedido", pedido.criar);
app.put("/pedido/:id_pedido", pedido.alterar);
app.delete("/pedido/:id_pedido", pedido.excluir);
app.get("/pedidoOrdenCopa", pedido.buscarPedidosProduzindoCopa);
app.get("/pedidoOrdenCozinha", pedido.buscarPedidosProduzindoCozinha);
app.get("/pedidoBuscarAtrasado", pedido.BuscarPedidosAtrasados);
app.get("/pedidoBuscarTotalVendidoQuantidade", pedido.BuscarTotalVendidoQuantidade);

app.get("/logpedidostatus", log_pedido_status.listar);
app.get("/logpedidostatus/:id_log", log_pedido_status.selecionar);
app.get("/logpedidostatusPedido/:id_pedido", log_pedido_status.BuscarPorIdPedido);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })


  app.get("/", (request, response) => {
    response.status(200).send("Esta é a mensagem na tela!");
});