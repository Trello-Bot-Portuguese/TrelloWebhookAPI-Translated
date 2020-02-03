# TrelloWebhookAPI
API receptora de webhooks para o Trello Bot
Usada para receber os webhooks DO TRELLO

# Requirementos
* RethinkDB
* RedisDB
* NodeJS
* [TrelloBot](https://github.com/Trello-Bot-Portuguese/TrelloBot-Translated)
* [Turquoise](https://github.com/Trello-Bot-Portuguese/Turquoise-Translated)

# Instalação
* Clone o repositório
* Renomei o arquivo _config.js para config.js e edite com seus links.
* Lembre-se de preencher os campos com as informações do RedisDB e RethinkDB.
* **A recv_port precisa estar liberada publicamente. Caso você tenha um firewall, adicione esta porta na lista de exceções!**
* Finalmente, execute `npm install`

# Uso
* Após executar o comando de instalação, você pode executar o programa usando `npm start`
