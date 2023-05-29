"use strict";
var resources_gcse_christianity = {
	quotes:[
		{
			text:["As soon as Jesus was baptized, ","he went up out of the water. ","At that moment heaven was opened, ","and he saw the Spirit of God ","descending like a dove ","and alighting on him. ","And a voice from heaven said, ","\"This is my Son, whom I love; ","with him I am well pleased.\""],
			reference:["Matthew",3],
			themes:["Jesus's baptism"]
		},
		{
			text:["In the beginning was the Word, ","and the Word was with God, ","and the Word was God. [...] ","Through him all things were made; ","without him nothing was made ","that has been made."],
			reference:["John",1],
			themes:["creation"]
		},
		{
			text:["Beyond all question, ","the mystery from which true godliness springs is great: ","He appeared in the flesh, ","was vindicated by the Spirit, ","was seen by angels, ","was preached among the nations, ","was believed on in the world, ","was taken up in glory."],
			reference:["1 Timothy",3],
			themes:["the Incarnation"]
		},
		{
			text:["For God so loved the world ","that he gave his one and only Son, ","that whoever believes in him ","shall not perish ","but have eternal life."],
			reference:["John",3],
			themes:["the Incarnation","the death of Jesus"]
		},
		{
			text:["It is by the name ","of Jesus Christ of Nazareth, ","whom you crucified but ","whom God raised from the dead, ","that this man stands before you healed."],
			reference:["Acts",4],
			themes:["the role of Jesus in salvation"]
		},
		{
			text:["The Lord is ","compassionate and gracious, ","slow to anger, abounding in love. ","He will not always accuse, ","nor will he harbor ","his anger forever;"],
			reference:["Psalm",103],
			themes:["the problem of evil"]
		}
	],
	markQuote:function(quote,answer) {
		function standardize(string){return string.replace(/[^a-z]/gi,"").toLowerCase().replaceAll("ise","ize")}
		return keyword(standardize(answer),quote.text.map(x=>standardize(x)),4,0.75)+keyword(answer,[quote.reference[0],quote.reference.join(" ")],2,0.5)
	},
	get quoteThemeList() {return Array.from(new Set(resources_gcse_christianity.quotes.map(x=>x.themes).flat()))}
}
var question_file_at_gcse_christianity = [
	// 1.1 The Trinity
	{
		text:"Name the three persons of the Trinity.",
		type:"open",
		level:2,
		modelAnswer:"The Father; the Son; the Holy Spirit",
		mark:function(answer){return keyword(answer,["father","son"])+keyword(answer,["spirit","ghost"])},
		par:15
	},
	// 1.6 Christian eschatology
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"What do the Articles of Religion form the basis of?",
				type:"open",
				level:4,
				modelAnswer:"The Church of England",
				mark:function(answer){return keyword(answer,["Church","of","England"],3,1/3)},
				par:15
			},
			{
				text:"How many Articles of Religion are there?",
				type:"open",
				level:5,
				modelAnswer:"Thirty-nine",
				mark:function(answer){return keyword(answer,["39","thirty-nine","thirty nine","thirtynine"],1)},
				par:10
			}
		]
	},
	// Miscellaneous
	...(()=>{
		let out = []
		for (let theme of resources_gcse_christianity.quoteThemeList.select(Math.floor(Math.random()+resources_gcse_christianity.quotes.length**0.5))) {
			let relevant = resources_gcse_christianity.quotes.filter(x=>x.themes.includes(theme))
			let amount = countTo(relevant.length).filter(x=>Math.random()<converge(Math.log2(relevant.length+1)/10,0.25)**Math.log2(x)**2).select(1)[0]
			out.push({
				text:"Give "+pluralize(amount,"Bible quote")+" referencing "+theme,
				type:"open",
				level:(()=>{
					return Math.floor(Math.min(Math.max(Math.log2(relevant.map(x=>x.text.join("").length).sum()*amount/relevant.length**2)*2-9,1),9))
				})(),
				get modelAnswer() {
					if (document.getElementById("answerLine_") == null) return relevant.select(amount).map(x=>x.text.join("")+" ("+x.reference.join(" ")+")").join("<br><br>")
					let marks = relevant.map(x=>resources_gcse_christianity.markQuote(x,document.getElementById("answerLine_").value))
					return (x=>x.map(y=>y.text.join("")+" ("+y.reference.join(" ")+")"))(relevant.sort((a,b)=>b-a).slice(0,amount)).join("<br><br>")
				},
				mark:function(answer){return bestMarks(relevant.map(x=>resources_gcse_christianity.markQuote(x,answer)),amount)},
				par:5+0.2*relevant.map(x=>x.text.join("").length).sum()*amount/relevant.length
			})
		}
		return out
	})()
]