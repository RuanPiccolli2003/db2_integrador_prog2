Para verificar as requisições através do insominia para o backend, valida na pasta backend>ImportarRequisicaoInsominia.json e importar
para o insominia para realizar os testes. 

Para testar no servidor basta trocar a URL pelo dominio ou pegar o dominio completo na index.jsx

Para instalar as dependências utilizar npm install --force nos dois diretorios

Iniciar o expo: Entrar no diretorio do frontend e utilizar o comando npm run web

Iniciar o backend: Entrar no diretorio do backend e utilizar o comando node server.js

Para funcionar requisições para o node server via app do expo no celular tem que colocar o endereço ipv4 ao invés do localhost 
e também tem que estar na mesma rede, cuidar com o Wifi 5g e Wifi normal. Mudar no frontend .jsx variavel definida na pagina index.jsx

eas build --platform android --profile production para fazer um APK no Expo

_______________________________________________________________________________________________________________________________________________

Guia de instalação e testes locais.

1 - Instalar dependências em ambos os diretórios backend e frontend com o comanda de npm install --force.

2 - Configurar arquivo .env no diretório backend: 

DB_USERNAME = ''
DB_PASSWORD = ''
DB_HOST = ''
DB_NAME = ''
PGPORT = 
DB_DIALECT = 'postgres'

DB_AZURE_USERNAME = ''
DB_AZURE_HOST = ''
DB_AZURE_DATABASE = ''
DB_AZURE_PASSWORD = ''
DB_AZURE_PORT = '5432'
DB_AZURE_DIALECT = 'postgres'
DB_AZURE_SSL = 'true'

USAR_BD_AZURE='false' // ou true se tiver o BD Azure Postgres

PORT = 

3 - No diretório frontend em app/index.jsx configurar a variável dominioAzure para o localhost: http://localhost:portabackend ou link do servidor:

4 - Para o app do expo no celular funcionar as requisições tem que estar na mesma rede o celular e o desktop junto com o Ipv4 para as requisições http://ipv4:3000

5 - Inicializar o servidor cd backend e node server.js (CTRL C para parar o servidor e iniciar novamente para aplicar alterações)

6 - Inicializar o frontend cd frontend e npm run web (CTRL S para salvar e atualizar imediatamente a página no frontend)

7 - Gerar arquivo APK através uma build no expo: Logar no expo pelo console e utilizar o comando: eas build --platform android --profile production. No site do expo é possível acompanhar e verificar se funciounou ou houve falhas, o APK estará disponível nessa página para o download.

8 - Para verificar as requisições através do insominia para o backend, no caminho backend>ImportarRequisicaoInsominia.json e importar para o insominia para realizar os testes.
