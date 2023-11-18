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
			themes:["the Incarnation","the death of Jesus","the role of Jesus in salvation"]
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
		topic:"the Trinity",
		modelAnswer:"The Father; the Son; the Holy Spirit",
		mark:function(answer){return "123".slice(0,keyword(answer,["father","son"])+keyword(answer,["spirit","ghost"]))},
		par:15
	},
	{
		text:"Complete the statements using \"is\" and \"is not\".",
		type:"gapfill",
		topic:"the Trinity",
		words:(()=>{
			let combinations = [["the Father","the Son","is not"],["the Father","the Holy Spirit","is not"],["the Son","the Holy Spirit","is not"],["the Father","God","is"],["the Son","God","is"],["the Holy Spirit","God","is"]]
			let out = combinations.shuffle().map((x,i)=>[capitalize(x[0])+" ",[x[2],function(answer){return stringSimplify(answer)==stringSimplify(x[2])?1:0}]," "+x[1]+(i===5?"":"<br>")])
			return gapfillGenerator(out.flat(),6)
		})(),
		markTransform:x=>"111223".slice(0,x),
		par:25
	},
	multipleChoiceComposite("Pick a phrase to complete each gap:",[
		["The Father ___ God","is","1"],
		["The Son ___ God","is","1"],
		["The Holy Spirit ___ God","is","1"],
		["The Father ___ the Son","is","1"],
		["The Father ___ the Holy Spirit","is","1"],
		["The Son ___ the Holy Spirit","is","1"]
	]),
	// 1.2 The creation of the universe
	blankComposite([
		{
			text:"Which book of the Bible details the creation of the universe?",
			type:"open",
			topic:["the Bible","creation"],
			modelAnswer:"Genesis",
			mark:function(answer){return {2:keyword(answer,["genesis"])-keyword(answer,["deuteronomy","exodus","numbers","leviticus"])}},
			par:10
		},
		{
			text:"Which testament is this book found in?",
			type:"multiplechoice",
			topic:["the Bible","creation"],
			level:1,
			answers:multipleChoiceGenerator(["Old"],1,["New"],1),
			markTransform:x=>x?"1":"",
			par:5
		}
	].slice(0,ranint(1,2))),
	{
		text:"In Genesis 1, creation is described as having taken place over six days.",
		type:"composite",
		components:[
			multipleChoiceComposite("Select what was created on:",[
				["day 1","Light","5"],
				["day 2","The sky","5"],
				["day 3",["Dry land","The seas","Plants","Trees"],"7",x=>x/4],
				["day 4",["The sun","The moon","Stars"],"6",x=>x/3],
				["day 5",["Creatures that live in the sea","Creatures that fly"],"5",x=>x/2],
				["day 6",["Animals that live on land"],"5"]
			],ranint(2,6,true),["creation"]),
			{
				text:"What happened on the seventh day?",
				type:"open",
				topic:"creation",
				modelAnswer:"God rested",
				mark:function(answer){return {3:keyword(answer,["rest"])}},
				par:5
			}
		].slice(0,ranint(1,2))
	},
	// 1.6 Christian eschatology
	blankComposite([
		{
			text:"What do the Articles of Religion form the basis of?",
			type:"open",
			topic:"the Church of England",
			modelAnswer:"The Church of England",
			mark:function(answer){return {4:keyword(answer,["Church","of","England"],3,1/3)}},
			par:15
		},
		{
			text:"How many Articles of Religion are there?",
			type:"open",
			topic:"the Church of England",
			modelAnswer:"Thirty-nine",
			mark:function(answer){return {5:keyword(answer,["39","thirty-nine","thirty nine","thirtynine"],1)}},
			par:10
		}
	]),
	// Miscellaneous
	...(()=>{
		let out = []
		for (let theme of resources_gcse_christianity.quoteThemeList.select(Math.floor(Math.random()+resources_gcse_christianity.quotes.length**0.5))) {
			let relevant = resources_gcse_christianity.quotes.filter(x=>x.themes.includes(theme))
			let amount = countTo(relevant.length).filter(x=>Math.random()<converge(Math.log2(relevant.length+1)/10,0.25)**Math.log2(x)**2).select(1)[0]
			out.push({
				text:"Give "+pluralize(amount,"Bible quote")+" referencing "+theme,
				type:"open",
				level:Math.min(Math.max(Math.log2(relevant.map(x=>x.text.join("").length).sum()*amount/relevant.length**2)*2-6,1),9),
				topic:["Bible quotations",theme],
				get modelAnswer() {
					if (document.getElementById("answerLine_") == null) return relevant.select(amount).map(x=>x.text.join("")+" ("+x.reference.join(" ")+")").join("<br><br>")
					let marks = relevant.map(x=>resources_gcse_christianity.markQuote(x,document.getElementById("answerLine_").value))
					return (x=>x.map(y=>y.text.join("")+" ("+y.reference.join(" ")+")"))(relevant.sort((a,b)=>b-a).slice(0,amount)).join("<br><br>")
				},
				mark:function(answer){
					let marks = bestMarks(relevant.map(x=>resources_gcse_christianity.markQuote(x,answer)),amount)
					let out = ""
					for (let i=0;i<marks;i++) out += String(Math.max(1,Math.floor(this.level-out.length/amount)))
					return out
				},
				par:5+0.2*relevant.map(x=>x.text.join("").length).sum()*amount/relevant.length
			})
		}
		return out
	})(),
	{
		text:"How many denominations of Christianity are there?",
		type:"multiplechoice",
		topic:"denominations",
		answers:multipleChoiceGenerator(["45 000"],1,["3","7","15","45","150","450","1 500","4 500","15 000","150 000","450 000"],7),
		markTransform:x=>x?"A":"",
		par:10
	}
]