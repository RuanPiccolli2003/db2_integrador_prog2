import express from "express";
import cors from "cors";

import conexao from "../backend/banco/conexao_db.js"
import conexao_dbAzure from "../backend/banco/conexao_dbAzure.js"

import usuario from "./Controller/UsuarioController.js"
import nome from "./Controller/UsuarioController.js"

import item_cardapio from "./Controller/ItemCardapioController.js";

import comanda from "./Controller/ComandaController.js"

try {
    await conexao.authenticate();
    console.log('Conectado ao banco de dados Local:');
} catch (error) {
    console.error('Indisponivel a conexao com o banco de dados local:', error);
}

/*try {
    await conexao_dbAzure.authenticate();
    console.log('Conectado ao banco de dados Azure:');
} catch (error) {
    console.error('Indisponivel a conexao com o banco de dados Azure:', error);
}
*/
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;



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

app.get("/comanda", comanda.listar);
app.get("/comanda/:id_comanda", comanda.selecionar);
app.post("/comanda", comanda.criar);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })


app.get("/", function(r){
    


})




