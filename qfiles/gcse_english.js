"use strict";
var resources_gcse_eng_lit = {
	wordFreq:function(str){
		let out = {}
		for (let i of stringSimplify(str).split("")) {
			if (out[i]===undefined) out[i]=0
			out[i]++
		}
		return out
	},
	checkTypo:function(str1,str2){
		let diff = 0
		let f1 = this.wordFreq(str1)
		let f2 = this.wordFreq(str2)
		for (let i of Array.removeDuplicates([Object.keys(f1),Object.keys(f2)].flat())) diff += Math.abs((f1[i]??0)-(f2[i]??0))
		return diff
	},
	mcbQuotes:[
		{
			text:"With his brandish'd steel, which smoked with bloody execution, like valour's minion carved out his passage",
			character:"Sergeant",
			location:"1:2"
		},
		{
			text:"Unseam'd him from the nave to the chaps, and fix'd his head upon our battlements.",
			character:"Sergeant",
			location:"1:2"
		},
		{
			text:"The instruments of darkness tell us truths, win us with honest trifles, to betray's in deepest consequence",
			character:"Banquo",
			location:"1:3"
		},
		{
			text:"Look like the innocent flower, but be the serpent under't",
			character:"Lady Macbeth",
			location:"1:5",
		},
		{
			text:"By the pricking of my thumbs, something wicked this way comes.",
			character:"Second Witch",
			location:"4:1"
		},
		{
			text:"Be bloody, bold, and resolute; laugh to scorn the power of man, for none of woman born shall harm Macbeth.",
			character:"Second Apparition",
			location:"4:1"
		},		
		{
			text:"Macbeth shall never vanquish'd be until great Birnam wood to high Dunsinane hill",
			character:"Third Apparition",
			location:"4:1"
		},
		{
			text:"I hope, in no place so unsanctified where such as thou mayst find him.",
			character:"Lady Macduff",
			location:"4:2"
		},
		{
			text:"She has light by her continually; 'tis her command.",
			character:"Gentlewoman",
			location:"5:1"
		},
		{
			text:"I have known her continue in this a quarter of an hour.",
			character:"Gentlewoman",
			location:"5:1"
		},
		{
			text:"Out, damned spot! out, I say! One: two: why, then, 'tis time to do't. Hell is murky!",
			character:"Lady Macbeth",
			location:"5:1"
		},
		{
			text:"Who would have thought the old man to have had so much blood in him.",
			character:"Lady Macbeth",
			location:"5:1"
		},
		{
			text:"All the perfumes of Arabia will not sweeten this little hand.",
			character:"Lady Macbeth",
			location:"5:1"
		},
		{
			text:"She should have died hereafter",
			character:"Macbeth",
			location:"5:5"
		},
	]
}
var question_file_at_gcse_eng_lit = [
	{
		text:"Here is a list of the key events of <i>Macbeth</i>.<br>Put them in order:",
		type:"order",
		topic:"Macbeth",
		answers:orderGenerator([
			"The witches tell Macbeth that he will be "+Array.random(["Thane of Cawdor","king hereafter"]),
			"Macbeth murders King Duncan",
			"Banquo is murdered",
			"Macbeth sees the ghost of Banquo",
			"The witches tell Macbeth that "+Array.random(["none born of woman can kill him","he shall never be killed until Birnam Wood comes to Dunsinane"]),
			"Macduff's family is killed",
			"Lady Macbeth sleepwalks",
			"Lady Macbeth commits suicide",
			"Macbeth is killed"
		],10),
		markTransform:x=>"12345".slice(0,x),
		par:40
	},
	...(()=>{
		let out = []
		for (let q of resources_gcse_eng_lit.mcbQuotes) {
			let location = q.location.split(":")
			let words = q.text.split(" ")
			let numGaps = Math.floor(Math.random()+words.length*(2+Math.random())/6)
			let numMarks1 = Math.ceil(numGaps*(Math.random()+1)/3)
			let markString1 = "123456789".repeat(Math.ceil(numMarks/9)).split("").map(x=>Number(x)).sort((a,b)=>Math.sqrt(a)*Math.random()-Math.sqrt(b)*Math.random()).join("") 
			let next = [{
				text:"Complete the quote:",
				type:"gapfill",
				topic:["Macbeth","Macbeth Act "+location[0],q.character],
				words:gapfillGenerator(words.map(x=>[x,function(answer){let diff = resources_gcse_eng_lit.checkTypo(x,answer);return 10/Math.max(Math.exp(diff),10)}]).map((x,i)=>(words.length===(i+1))?[x]:[x," "]).flat(),numGaps),
				markTransform:x=>markString1.slice(0,x*numMarks1/numGaps),
				par:5+q.text.length/20+numGaps*2
			}]
			if (Math.random()<numGaps/16) {
				let proportion = resources_gcse_eng_lit.mcbQuotes.filter(x=>x.character===q.character).length/resources_gcse_eng_lit.mcbQuotes.length
				let level2 = Math.min(9,Math.floor(Math.sqrt(0.25+Math.min(numGaps,30)*0.4)+Math.max(1-Math.log10(proportion),0)))
				next.push({
					text:"Which character says this quote?",
					type:"open",
					topic:["Macbeth","Macbeth Act "+location[0],q.character],
					modelAnswer:q.character,
					mark:function(answer){return (stringSimplify(answer)===stringSimplify(q.character).replaceAll("the",""))?String(level2):{}},
					par:5
				})
			}
			if (Math.random()<numGaps/32) {
				let level31 = (numGaps>10)?2:1
				let level32 = (numGaps>20)?4:3
				next.push({
					text:"Where in the play is this quote found?",
					type:"gapfill",
					topic:["Macbeth","Macbeth Act "+location[0],q.character],
					words:gapfillGenerator(["Act ",gapfillExact(location[0])," Scene ",gapfillExact(location[1])]),
					markTransform:x=>(String(level31)+String(level32)).slice(0,x),
					par:5
				})
			}
			out.push(blankComposite(next))
		}
		return out
	})()
]