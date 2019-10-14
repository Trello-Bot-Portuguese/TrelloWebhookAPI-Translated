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
					"text": `**Member**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Old Card Name**: ${req.body.action.data.old.name}
**Card**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})`
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
