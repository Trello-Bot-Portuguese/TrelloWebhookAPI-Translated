module.exports = function(req, request, webhook, icon){
	request.post(webhook+"/slack")
	.set("User-Agent", Config.useragent)
	.send({
		"text": "",
		"attachments": [
			{
				"author_link": req.body.model.url,
		        "color": Colors.copy,
		        "author_name": "Trello: "+req.body.model.name,
		        "author_icon": icon,
		        "title": `${req.body.action.memberCreator.fullName} copiou o cartão \"${req.body.action.data.cardSource.name}\" para o cartão \"${req.body.action.data.card.name}\" na lista \"${req.body.action.data.list.name}\"`,
						"title_link": `https://trello.com/b/${req.body.action.data.board.shortLink}`,
						"thumb_url": req.body.action.memberCreator.avatarHash ? "https://trello-avatars.s3.amazonaws.com/"+req.body.action.memberCreator.avatarHash+"/170.png" : undefined,
						"text": `**Membro**: ${req.body.action.memberCreator.fullName} (${req.body.action.memberCreator.username})
**Cartão**: [${req.body.action.data.card.name}](https://trello.com/c/${req.body.action.data.card.shortLink})
**Cartão Base**: [${req.body.action.data.cardSource.name}](https://trello.com/c/${req.body.action.data.cardSource.shortLink})`
		    	}
		    ]
	})
	.end((err2, res3)=>{
		return res3;
	})
}
