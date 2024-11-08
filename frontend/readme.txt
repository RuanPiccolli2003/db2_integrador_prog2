Listar usuários registrados no banco de dados atraves da URL: 

Insominia GET: http://localhost:3000/usuario

Criar usuário via Insominia através da URL:

Insominia: Post: http://localhost:3000/usuario - 
Body: Json: 
{
    "nome": "",
    "email": "",
    "senha": ""
}

Selecionar usuário via Insominia através da URL:
Insominia GET: http://localhost:3000/usuario/Id do usuario

Deletar um usuário via Insominia através da URL:
Insominia Delete: http://localhost:3000/usuario/Id do usuario

Alterar informações de um usuário através da URL:
Insominia PUT: http://localhost:3000/usuario/Id do usuario
Body Json: 
{
	"nome": "",
	"email": "",
	"senha": ""
}
*/


Iniciar o expo: Entrar no diretorio do frontend e utilizar o comando npm run web
Iniciar o backend: Entrar no diretorio do backend e utilizar o comando node server.js