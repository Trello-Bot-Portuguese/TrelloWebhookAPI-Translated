/*
 This file is part of Turquoise.
 Copyright © Snazzah 2016 - 2019
 Copyright © Yamboy1 (and contributors) 2019 - 2020
 Copyright © Lobo Metalurgico 2019 - 2020
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

module.exports = function(req, request, webhook, icon){
	let jso = {}
	if(req.body.action.data.listBefore){
		jso = {
			"text": "",
			"attachments": [
				{
					"author_link": req.body.model.url,
					"color": Colors.edit,
	        "author_name": "Trello: "+req.body.model.name,
					"author_icon": icon,
					"title": `${req.body.action.memberCreator.fullName} moveu o cartão \"${req.body.action.data.card.name}\" da lista \"${req.body.action.data.listBefore.name}\" para \"${req.body.action.data.listAfter.name}\"`,
					"title_link": `https://trello.com/c/${req.body.action.data.card.shortLink}`,
					"thumb_url": req.body.action.memberCreator.avatarHash ? "https://trello-avatars.s3.amazonaws.com/"+req.body.action.memberCreator.avatarHash+"/170.png" : undefined,
					"text": `**Membro**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Cartão movido para a lista**: ${req.body.action.data.listBefore.name}
**Lista Atual**: ${req.body.action.data.listAfter.name}
**Cartão**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`
				}
			]
		}
	}else if(req.body.action.data.old.name){
		jso = {
			"text": "",
			"attachments": [
				{
					"author_link": req.body.model.url,
					"color": Colors.edit,
	        "author_name": "Trello: "+req.body.model.name,
					"author_icon": icon,
					"title": `${req.body.action.memberCreator.fullName} renomeu o cartão \"${req.body.action.data.old.name}\" para \"${req.body.action.data.card.name}\"`,
					"title_link": `https://trello.com/c/${req.body.action.data.card.shortLink}`,
					"thumb_url": req.body.action.memberCreator.avatarHash ? "https://trello-avatars.s3.amazonaws.com/"+req.body.action.memberCreator.avatarHash+"/170.png" : undefined,
					"text": `**Membro**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Nome Anterior**: ${req.body.action.data.old.name}
**Cartão**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`
				}
			]
		}
	}else if(!req.body.action.data.old.desc&&req.body.action.data.card.desc){
		jso = {
			"text": "",
			"attachments": [
				{
					"author_link": req.body.model.url,
					"color": Colors.add,
	        "author_name": "Trello: "+req.body.model.name,
					"author_icon": icon,
					"title": `${req.body.action.memberCreator.fullName} adicionou uma descrição no cartão \"${req.body.action.data.card.name}\"`,
					"title_link": `https://trello.com/c/${req.body.action.data.card.shortLink}`,
					"thumb_url": req.body.action.memberCreator.avatarHash ? "https://trello-avatars.s3.amazonaws.com/"+req.body.action.memberCreator.avatarHash+"/170.png" : undefined,
					"text": `**Membro**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Descrição**: ${req.body.action.data.card.desc}
**Cartão**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`
				}
			]
		}
	}else if(req.body.action.data.old.desc){
		jso = {
			"text": "",
			"attachments": [
				{
					"author_link": req.body.model.url,
					"color": Colors.edit,
	        "author_name": "Trello: "+req.body.model.name,
					"author_icon": icon,
					"title": `${req.body.action.memberCreator.fullName} editou a descrição do cartão \"${req.body.action.data.card.name}\"`,
					"title_link": `https://trello.com/c/${req.body.action.data.card.shortLink}`,
					"thumb_url": req.body.action.memberCreator.avatarHash ? "https://trello-avatars.s3.amazonaws.com/"+req.body.action.memberCreator.avatarHash+"/170.png" : undefined,
					"text": `**Membro**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Antiga Descrição**: ${req.body.action.data.old.desc}
**Nova Descrição**: ${req.body.action.data.card.desc}
**Cartão**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`
				}
			]
		}
	}else if(req.body.action.data.old.closed!=undefined){
		jso = {
			"text": "",
			"attachments": [
				{
					"author_link": req.body.model.url,
					"color": Colors.edit,
	        "author_name": "Trello: "+req.body.model.name,
					"author_icon": icon,
					"title": `${req.body.action.memberCreator.fullName} ${req.body.action.data.card.closed ? "arquivou" : "desarquivou"} o cartão \"${req.body.action.data.card.name}\"`,
					"title_link": `https://trello.com/c/${req.body.action.data.card.shortLink}`,
					"thumb_url": req.body.action.memberCreator.avatarHash ? "https://trello-avatars.s3.amazonaws.com/"+req.body.action.memberCreator.avatarHash+"/170.png" : undefined,
					"text": `**Membro**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Cartão**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`
					/*"fields": [{
							"title": "```Member```",
							"value": req.body.action.memberCreator.fullName+" ("+req.body.action.memberCreator.username+")",
							"inline": true
					},{
							"title": "```Card```",
							"value": `[${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`,
							"inline": true
					}]*/
				}
			]
		}
	}
	request.post(webhook+"/slack")
	.set("User-Agent", Config.useragent)
	.send(jso)
	.end((err2, res3)=>{
		return res3;
	})
}
