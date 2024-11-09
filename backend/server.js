import express from "express";
import conexao from "../backend/banco/conexao_db.js"
import conexao_dbAzure from "../backend/banco/conexao_dbAzure.js"
import usuario from "./Controller/UsuarioController.js"
import cors from "cors";
import nome from "./Controller/UsuarioController.js"


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

app.get("/usuario", nome.listar);
app.get("/usuario/:id_usuario", usuario.selecionar);
app.post("/usuario", nome.criar);
app.put("/usuario/:id_usuario", usuario.alterar);
app.delete("/usuario/:id_usuario", usuario.excluir);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })


app.get("/", function(r){
    


})




