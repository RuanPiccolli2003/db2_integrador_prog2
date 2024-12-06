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
NODE_ENV=production ou development para indicar qual banco vai ser utilizado a migração.

PORT = 

3 - No diretório frontend em app/index.jsx configurar a variável dominioAzure para o localhost: http://localhost:portabackend ou link do servidor:

4 - Para o app do expo no celular funcionar as requisições tem que estar na mesma rede o celular e o desktop junto com o Ipv4 para as requisições http://ipv4:3000

5 - Inicializar o servidor cd backend e node server.js (CTRL C para parar o servidor e iniciar novamente para aplicar alterações)

6 - Inicializar o frontend cd frontend e npm run web (CTRL S para salvar e atualizar imediatamente a página no frontend)

7 - Gerar arquivo APK através uma build no expo: Logar no expo pelo console e utilizar o comando: eas build --platform android --profile production. No site do expo é possível acompanhar e verificar se funciounou ou houve falhas, o APK estará disponível nessa página para o download.

8 - Ao gerar a BUILD deve ter certeza que em app/index.jsx está definido a URL do servidor para conseguir fazer as requisiçoes do frontend para o backend.

8 - Para verificar as requisições através do insominia para o backend, no caminho backend>ImportarRequisicaoInsominia.json e importar para o insominia para realizar os testes. Está definido em localhost basta alterar para a URL-DOMINIO/Requisição.

9 - No diretório backend de o comando npm run migrate para criar as tabelas e demais funções por migração.

10 - Na pasta raiz possui o arquivo integrador_restaurante.apk para instalar no emulador ou celular android para testar basta habilitar instalação de aplicativos de fora da Play Store. Ativado até 15/12/2024 o servidor.


