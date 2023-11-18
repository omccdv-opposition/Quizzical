"use strict";
Object.defineProperty(Array.prototype,"sum",{value:function sum() {
	return this.reduce((x,y)=>x+y,0)
}})
Object.defineProperty(Array.prototype,"product",{value:function product() {
	return this.reduce((x,y)=>x*y,1)
}})
Object.defineProperty(Array.prototype,"shuffle",{
	value:function shuffle() {
		let numbers = countTo(this.length,true)
		let out = []
		while (numbers.length>0) {out.push(this[numbers.splice(Math.floor(Math.random()*numbers.length),1)])}
		return out
	}
})
Object.defineProperty(Array.prototype,"select",{
	value:function select(num=1){
		return this.shuffle().slice(0,num)
	}
})
Object.defineProperty(Array.prototype,"joinWithAnd",{
	value: function joinWithAnd(delimiter=", ") {
		if (this.length<3) return this.join(" and ");
		let arr = structuredClone(this)
		let out = arr.splice(0,1);
		while (arr.length>1) out+=delimiter+arr.splice(0,1);
		out+=" and "+arr[0];
		return out;
	}
})
Object.defineProperty(Array.prototype,"qSort",{
	value:function qSort(){
		return this.sort((a,b)=>questionPositionFactor(a)-questionPositionFactor(b))
	}
})
Object.defineProperty(Array,"removeDuplicates",{value:function removeDuplicates(x) {
	return Array.from(new Set(x))
}})
Object.defineProperty(Array,"random",{value:function random(array){return array[Math.floor(Math.random()*array.length)]}})
Object.defineProperty(Array,"weightedRandom",{value:function weightedRandom(array) {
	let out = []
	let max = array.map(x=>x[1]).reduce((x,y)=>Math.max(x,y))
	for (let i of array) if (Math.random()*max>i[1]) out.push(i[0])
	return Array.random(out)
}})

var questions = []
var currentQuestion
const scoreTypes = "123456789ACS".split("")
const scoreTypeNames = Object.fromEntries(scoreTypes.map(x=>[x,isNaN(x)?dictionary(x,[["A","Alpha "],["C","Confidence "],["S","Specialism "]]):(x+"-")]))
const scoreTypeRequirements = Object.fromEntries(scoreTypes.map(x=>[x,isNaN(x)?dictionary(x,[["A","Get these by answering questions judged to be above difficulty level 9"],["C","Get one for every unused spell card"],["S","Get one by answering questions worth <span style=\"color:inherit\" data-i=\"formatNum(specialismThreshold)\"></span> or more marks perfectly"]]):("Get these by answering questions judged to be difficulty level "+x)]))
var scores = Object.fromEntries(scoreTypes.map(x=>[x,{score:0,max:0}])) // for all types: {score:0,max:0}
var timestamp					// This variable serves many purposes, but only one at a time is ever used.
var specialismThreshold     	// The average number of marks per question varies, so the same must apply to the specialism point threshold.
var spellDivisor = 1							// How hard it is to gain spell cards
var spellPoints = 0
var spellCards = 0
var maxSpellCards									// Maximum number of spell cards that can be gained
// The maximum number of layers of a composite question
var fileDepth = Math.max(...questions.map(x=>(question.type==="composite") ? Math.max(...question.components.map(x=>depth(x))) + 1 : 0))
// The parts of a composite question (if composite)
var compositeParts
// The marks scored in each "topic" of a Quizzical
var topicMarks = {}
function questionTopics(question) {return (typeof question.topic === "undefined")?[]:(question.topic instanceof Array)?question.topic:[question.topic]}
function mapQuestion(question,includeComposite=false,id=[]) {
	if (question.type === "composite") {
		let out = includeComposite?[id]:[]
		for (let i=0;i<question.components.length;i++) out.push(mapQuestion(question.components[i],includeComposite,(id.length===0)?String(i+1):id+"."+(i+1)))
		return out.flat()
	} else {
		return id.length===0?["r"]:id
	}
}
// Acts as a "weak min" - a value that exceeds the limit is not reduced to the limit but instead increases much slower past the limit.
function converge(value,limit) {
	if (value<=limit) return value
	return limit*(2-1/(1+Math.log(value/limit)/10))
}

function modulo(number,modulus) {
	return number-modulus*Math.floor(number/modulus)
}

function capitalize(str) {return str.charAt(0).toUpperCase()+str.substring(1)}
function toTitleCase(str) {return str.split(" ").map(x=>capitalize(x)).join(" ")}

// If a variable is a function, returns the result of the function. Otherwise, returns the value of the variable.
var maxIotas = Object.fromEntries(scoreTypes.map(x=>[x,0]))
var maxIotaSeed = Object.fromEntries(scoreTypes.map(x=>[x,Math.exp(Math.random()/5-0.1)]))
function maxIota() {
	let total = converge(allQuestionParts().map(x=>x.par).sum()**0.5/0.06,1000)
	let weight = Object.fromEntries(scoreTypes.map(x=>[x,null]))
	let totalBaseWeight = 0
	for (let i=1;i<=9;i++) {
		let diff = scores[i].max*1.25**i
		weight[i] = diff
		totalBaseWeight += diff
	}
	weight.A = converge(scores.A.max/10,totalBaseWeight/20)
	weight.C = totalBaseWeight*0.01*converge(maxSpellCards,5)
	weight.S = totalBaseWeight*0.005*converge(scores.S.max,10)
	for (let i of scoreTypes) weight[i] = isNaN(weight[i])?0:weight[i]
	let iotas = Object.fromEntries(scoreTypes.map(x=>[x,total*weight[x]/Object.values(weight).sum()]))
	let roundFactor = Math.max(1,[2,5,10][Math.floor(3*(Math.log10(total)%1))]*10**Math.floor(Math.log10(total)-2))
	for (let i of scoreTypes) iotas[i] = Math.ceil(iotas[i]/roundFactor)*roundFactor
	return iotas
}

var iotas = Object.fromEntries(scoreTypes.map(x=>[x,null]))
function iota(category) {
	if (scores[category].max===0) return 0
	let ratio = scores[category].score/scores[category].max
	ratio = 1.5*ratio-0.5*ratio**2
	return Math.floor(ratio*maxIotas[category])
}

function overallIota() {
	return iota("recall")+iota("speed")+iota("depth")+iota("specialism")
}

var levelBoundaries = Array(11)
function levelBoundaryCurve(x) {
	return (x===0)?0.8:(x>0)?(1-0.2/2**x):(x<0)?(0.8**(Math.abs(x)+1)**2):NaN
}
function levelBoundary(x) {
	if (![0,1,2,3,4,5,6,7,8,9,10].includes(x)) functionCrash("levelBoundary",arguments)
	if (x===10) return Infinity
	if (x===0) return 0
	let total = 0
	for (let i=1;i<=9;i++) total += maxIotas[i]*levelBoundaryCurve(x-i)	// base points
	total += (maxIotas.A+maxIotas.C+maxIotas.S)*x**4/8748			// extra points
	return Math.round(total)
}

function level(x) {
	let out = 0
	while (x>=levelBoundaries[out+1]) out++
	return out
}

function timeFormat(seconds) {
	if (seconds<100) return seconds.toPrecision(2)+" seconds"
	if (seconds<6000) return (seconds/60).toPrecision(2)+" minutes"
	if (seconds<36000) return Math.floor(seconds/3600)+" hours "+Math.round(seconds/60%60)+" minutes"
	if (seconds<360000) return Math.round(seconds/3600)+" hours"
}

function tab(x) {
	for (let i=0;i<document.getElementsByClassName("tab").length;i++) document.getElementsByClassName("tab")[i].style.display="none"
	document.getElementById(x).style.display="inline-block"
}

function allQuestionFiles() {
	let out = []
	for (let i=0;i<Object.keys(globalThis).length;i++) if (Object.keys(globalThis)[i].substring(0,17)==="question_file_at_") out.push(Object.keys(globalThis)[i])
	return out
}

// Returns an array with the integers from 1 to x: for example, countTo(4) = [1,2,3,4]
function countTo(x,from0=false) {
	return Array(x).fill(0).map((a,i)=>from0?i:i+1)
}

function deflateQuestion(question) {
	if (question.type === "composite") {
		if (question.components.length === 0) {
			return null
		} else if (question.components.length === 1) {
			let out = question.components[0]
			if (question.text !== "") Object.defineProperty(out,"text",{value:question.text+"<br>"+out.text})
			return deflateQuestion(out)
		} else {
			let out = question
			for (let i=0;i<out.components.length;i++) out.components[i] = deflateQuestion(out.components[i])
			out.components = out.components.filter(x=>x!==null)
			return out
		}
	} else {
		return question
	}
}

var questionListLength = 0
var splitListLength = 0
var questionsAnswered = 0
function questionPositionFactor(q) {
	let list = allQuestionParts(q)
	return list.map(x => Object.entries(maxMarksByType(q)).map(x=>(x[0]==="A"?10:x[0])*x[1]).sum()*ranint(10,100,true)*dictionary(x.type,[["open",1],["gapfill",0.8],["order",0.65],["multiplechoice",0.5]])).sum()/list.length
}
function allQuestionParts(q=questions,includeComposite=false) {
	if (!(q instanceof Array)) q=[q]
	let out = []
	for (let i of q) if (i.type === "composite") {
		if (includeComposite) out.push(i)
		out.push(...i.components.map(x=>allQuestionParts(x,includeComposite)).flat())} else {out.push(i)
	}
	return out
}
function loadTopic() {
	let topics = document.getElementById("topicSelector").value.split(",").map(x => "question_file_at_"+x)
	let question_list = []
	for (let i of topics) {
		for (let j=0;j<globalThis[i].length;j++) {
			if (globalThis[i][j]===undefined) {crash("Question #"+j+" of "+i+" is undefined")}
			else {question_list.push(globalThis[i][j])}
		}
	}
	question_list = question_list.filter(x=>x!==null)
	question_list=question_list.flat()
	let splitList = allQuestionParts(question_list)
	questionListLength = question_list.length
	splitListLength = splitList.length
	for (let i of splitList) {
		if (typeof i === "function") crash("A question of this file has an uncalled generator function.")
		if (typeof i !== "object") crash("A question of this file has an incorrect data type.")
		if (typeof i.type === "undefined") crash("Question \""+i.text+"\" of this file has no <code>type</code>")
		if (!["open","gapfill","multiplechoice","order","composite"].includes(i.type)) crash("Question \""+i.text+"\" of this file has an invalid <code>type</code>")
		if (typeof i.par !== "number") crash("Question \""+i.text+"\" of this file has an invalid <code>par</code>")
		let properties = dictionary(i.type,[["open",["modelAnswer","mark"]],["multiplechoice",["answers","markTransform"]],["gapfill",["words"]],["order",["answers","markTransform"]]])
		for (let j of properties) {
			if (i[j] === undefined) crash("Question \""+i.text+"\" of this file is missing type-specific property <code>"+j+"</code>.")
		}
		if (i.type === "open") try {i.mark(i.modelAnswer)} catch {crash("Question \""+i.text+"\" of this file has an invalid <code>mark</code>")}
		if (i.type === "gapfill") {
			if (typeof i.words !== "object") crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix.")
			if ((i.markTransform===undefined)&&(i.noTransform===undefined)) crash("Question \""+i.text+"\" of this file is missing type-specific property <code>markTransform</code> or <code>noTransform</code>.")
			for (let j of i.words) {
				if (typeof j !== "object") crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix.")
				if (j.length === 3) if ((typeof j[0] !== "string") || (typeof j[1] !== "function")) crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix entry. ("+j+")")
				if (j.length === 2) if (typeof j[0] !== "string") crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix entry. ("+j+")")
			}
		}
		try {
			if (typeof maxMark(i) !== "number") crash("Question \""+i.text+"\" of this file is worth "+maxMark(i)+" marks.")
			if (maxMark(i)===0) crash("Question \""+i.text+"\" of this file is worth 0 marks.")
		} catch {
			crash("Question \""+i.text+"\" of this file has undefined marks.")
		}
	}
	while (true) {
		if (question_list.length === 0) break
		let next = question_list.splice(0,1)[0]
		if (questions.length>0) if (questions.map(x => questionPar(x)).sum()>(document.getElementById("lengthSelector").value*60+questionPar(next)/2)) break
		questions.push(next)
	}
	if (document.getElementById("OCRMode").checked) {
		let topics = Array.removeDuplicates(allQuestionParts().map(x=>questionTopics(x)).flat()).shuffle()
		function mainQuestionTopic(question) {return allQuestionParts(question).map(x=>x.topic===undefined).includes(false)?topics.map(x=>[x,allQuestionParts(question).filter(y=>questionTopics(y).includes(x)).map(y=>maxMark(y)).sum()]).sort((a,b)=>Math.random()+b[1]-a[1])[0][0]:""}
		for (let topic of topics) {
			let out = []
			for (let i=questions.length-1;i>=0;i--) if (mainQuestionTopic(questions[i])===topic) out.push(questions.splice(i,1)[0])
			if (out.length>0) questions.push({text:(out.length>1)?("This question is about "+topic+"."):"",type:"composite",components:out.qSort()})
		}
	}
	questions = questions.qSort()
	for (let i=0;i<questions.length;i++) questions[i] = deflateQuestion(questions[i])
	questions = questions.filter(x=>x!==null)
	specialismThreshold = Math.min(allQuestionParts().map(x => maxMark(x)).sort(function(a,b) {return a-b})[Math.ceil(allQuestionParts().length*0.8)-1]+1,allQuestionParts().map(x => maxMark(x)).reduce((x,y) => Math.max(x,y)))
	spellDivisor = Math.min(Math.max(questions.length,1)*500/questions.map(x=>getMaxSpellPoints(x)).sum(),questions.map(x=>getMaxSpellPoints(x)).sum()/100)
	maxSpellCards = Math.floor(questions.map(x=>getMaxSpellPoints(x)).sum()/100)
	for (let i of questions) {
		let marks = maxMarksByType(i)
		for (let j of Object.keys(marks)) scores[j].max += marks[j]
	}
	scores.C.max = maxSpellCards
	scores.S.max = allQuestionParts().map(x => maxMark(x)>=specialismThreshold?1:0).sum()
	document.getElementsByTagName("title")[0].innerHTML = "\"Quizzical\" by alemaninc: "+document.getElementById("topicSelector")[document.getElementById("topicSelector").selectedIndex].innerHTML
	maxIotas = maxIota()
	let levelBoundaryArray = []
	for (let i=0;i<11;i++) levelBoundaryArray.push(levelBoundary(i))
	levelBoundaries = levelBoundaryArray
	document.getElementById("allScoreTypes_pre").innerHTML = scoreTypes.map(x=>"<div class=\"pointType\" style=\"color:var(--point"+x+");border-color:var(--point"+x+")\"><h3>"+scoreTypeNames[x]+"points</h3><p>"+scoreTypeRequirements[x]+"</p><p><span style=\"color:inherit\">"+scores[x].max+"</span> points worth <span style=\"color:inherit\">"+maxIotas[x]+"</span> iotas</p></div>").join("")
	document.getElementById("levelBoundaryTable").innerHTML = "<tr><colgroup span=\"11\" style=\"width:calc(9vw - 9px)\">"+["MAX",...countTo(10).map(x=>10-x)].map(x=>"<th>"+x+"</th>").join("")+"</tr><tr><td><span>"+formatNum(Object.values(maxIotas).sum())+"</span></td>"+countTo(10).map(x=>"<td><span>"+formatNum(levelBoundaries[10-x])+"</span></td>").join("")+"</tr>"
	updateHTML()
	tab("howToPlay")
}

function questionHTML() {
	return "<p>"+currentQuestion.text+" ("+maxMark(currentQuestion)+" mark"+(maxMark(currentQuestion)===1?"":"s")+")</p>"
}

function approximateEqual(x,y) {
	return Math.abs(Math.log10(x)-Math.log10(y))<0.0001
}
function questionPar(question) {
	if (question.type === "composite") {
		return question.components.map(x => questionPar(x)).sum()
	} else {
		return question.par
	}
}

function markQuestionPart(id) {
	id=String(id)
	if (id==="") id="r"
	let question = accessQuestion(id)
	if (spellCardActive) return maxMarksByType(question)
	let marks
	if (question.type === "open") {
		let answer = document.getElementById("answerLine_"+id).value
		marks = question.mark(answer)
	} else if (question.type === "gapfill") {
		if (question.noTransform) {
			marks = {}
			for (let i=0;i<currentQuestionData[id].gapFillArray.length;i++) {if (currentQuestionData[id].gapFillArray[i][1]!==null) {
				let next = currentQuestionData[id].gapFillArray[i][1](document.getElementById("gapFillAnswer_"+id+"_"+currentQuestionData[id].gapFillArray[i][2]).value)
				for (let i of Object.keys(next)) {
					if (marks[i]===undefined) marks[i]=0
					marks[i] += next[i]
				}
			}}
		} else {
			marks = 0
			for (let i=0;i<currentQuestionData[id].gapFillArray.length;i++) {if (currentQuestionData[id].gapFillArray[i][1]!==null) {marks += currentQuestionData[id].gapFillArray[i][1](document.getElementById("gapFillAnswer_"+id+"_"+currentQuestionData[id].gapFillArray[i][2]).value)}}
			marks = question.markTransform(marks)
		}
	} else if (question.type === "multiplechoice") {
		let correctChosen = currentQuestionData[id].multipleChoiceChosen.map((x,index) => x & question.answers[index][1]).sum()
		let totalChosen = currentQuestionData[id].multipleChoiceChosen.sum()
		let totalCorrect = question.answers.map(x => x[1]).sum()
		marks = question.markTransform(correctChosen-Math.max(0,totalChosen-totalCorrect))
	} else if (question.type === "order") {
		let order = currentQuestionData[id].order
		let orderLength = order.length
		marks = order[0][1]<order[orderLength-1][1]?1:0
		for (let i=0;i<orderLength-1;i++) if (order[i][1]<order[i+1][1]) marks++
		marks = Math.max(marks-Math.ceil(order.length/2),Math.floor(order.length/2)-marks) // if descending used instead of ascending or vice versa, still give marks
		marks = question.markTransform(marks)
	} else if (question.type === "composite") {
		let components = countTo(question.components.length).map(x=>(id==="r")?x:(id+"."+x))
		marks = addMarks(components.map(x=>markQuestionPart(x)))
	}
	marks = standardisePoints(marks)
	let max = maxMarksByType(question)
	for (let i of Object.keys(marks)) marks[i] = Math.min(marks[i],max[i])
	if (numMarks(marks)===Math.max(maxMark(accessQuestion(id)),specialismThreshold)) marks.S = 1
	return marks
}
function standardisePoints(points) {
	if (typeof points === "string") {
		let out = {}
		for (let i of points.split("")) {
			if (out[i] === undefined) out[i] = 0
			out[i]++
		}
		points = out
	}
	for (let i of Object.keys(points)) {
		if (scoreTypes.includes(i)) {points[i] = Math.max(Math.floor(points[i]))}
		else {delete points[i]}
	}
	return points
}
function addMarks(array) {
	let out = {}
	for (let i of array) for (let j of Object.entries(standardisePoints(i))) {
		if (out[j[0]] === undefined) out[j[0]] = 0
		out[j[0]] += j[1]
	}
	return out
}
function subMarks(array,sub) { // if cheating is detected subtract the 'sub' highest marks from array
	array = standardisePoints(array)
	for (let i of "A987654321".split("")) {
		if (array[i]===undefined) continue
		let diff = Math.min(array[i],sub)
		array[i] -= diff
		sub -= diff
		if (sub===0) break
	}
	return array
}
function numMarks(points) {
	return Object.entries(points).filter(x=>x[0]!=="S").map(x=>x[1]).sum()
}
function reviewQuestionPart(id,question=currentQuestion) {
	id=String(id)
	if (id==="") id="r"
	let yourAnswer
	let modelAnswer
	if (question.type === "open") {
		yourAnswer = document.getElementById("answerLine_"+id).value
		modelAnswer = question.modelAnswer
	} else if (question.type === "gapfill") {
		yourAnswer = currentQuestionData[id].gapFillArray.map(x => x.length==3?document.getElementById("gapFillAnswer_"+id+"_"+x[2]).value:x[0]).join("")
		modelAnswer = currentQuestionData[id].gapFillArray.map(x => x[0]).join("")
	} else if (question.type === "multiplechoice") {
		yourAnswer = question.answers.map((x,index) => currentQuestionData[id].multipleChoiceChosen[index]==1?question.answers[index]:null).filter(x => x!==null).map(x => x[0]).join("<br>")
		modelAnswer = question.answers.filter(x => x[1]).map(x => x[0]).join("<br>")
		let blankMessage = "<span style=\"color:#ff9900\">[No answers selected.]</span>"
		if (yourAnswer==="") yourAnswer = blankMessage
		if (modelAnswer==="") modelAnswer = blankMessage
	} else if (question.type === "order") {
		yourAnswer = currentQuestionData[id].order.map(x=>x[0]).join("<br>")
		modelAnswer = question.answers.join("<br>")
	}
	return question.text+reviewMarkHTML(markQuestionPart(id),maxMark(question))+"<table style=\"table-layout:fixed;width:98%\"><tr><td><u>Your answer:</u><br><span id=\"playerAnswer_"+id+"\">"+yourAnswer+"</span></td><td><u>Model answer:</u><br><span>"+modelAnswer+"</span></td></tr></table>"
}
const markTemplate = {
	number:function(model,type=null){return function(answer){return answer.replaceAll(" ","")===String(model)?(type===null?1:String(type)):""}}
}
function questionTable(mode,question=currentQuestion) {
	let parts = mapQuestion(question,true)
	if (parts[0]==="r") {
		return [[String(questionsAnswered+1),(mode==="answer")?questionPartHTML("r",question):(mode==="review")?reviewQuestionPart("r",question):functionCrash("questionTable",arguments)]]
	}
	let out = [[String(questionsAnswered+1)]]
	let row = 0
	let col = 0
	function write(text) {
		while (out[row]===undefined) out.push([""])
		while (out[row][col]===undefined) out[row].push("")
		out[row][col] = text
	}
	if (accessQuestion("r",question).text!=="") {
		col = 1
		write(accessQuestion("r",question).text)
		row++
	}
	for (let i of parts) {
		let part = accessQuestion(i,question)
		col = i.split(".").length
		write(questionPartName(i.split(".").length,Number(i.split(".")[i.split(".").length-1])))
		if (part.type === "composite") {
			if (part.text !== "") {
				col = i.split(".").length+1
				write(part.text)
				row++
			}
		} else {
			col = i.split(".").length+1
			write((mode==="answer")?questionPartHTML(i,part):(mode==="review")?reviewQuestionPart(i,part):functionCrash("questionTable",arguments))
			row++
		}
	}
	return out
}
function questionTableGenerator(table) {
	let columns = table.map(x=>x.length).reduce((x,y)=>Math.max(x,y))
	return "<table><colgroup><col span=\""+(columns-1)+"\" style=\"width:32px\"><col style=\"width:calc(100vw - "+(32*columns-20)+"px)\"></colgroup><tbody>"+table.map(row=>"<tr>"+row.slice(0,row.length-1).map(x=>"<td>"+x+"</td>").join("")+"<td colspan=\""+(columns-row.length+1)+"\">"+row[row.length-1]+"</td></tr>").join("")+"</tbody></table>"
}
function questionPartHTML(id,q=currentQuestion) {
	return q.text+maxMarkHTML(q)+"<br>"+questionAnswerHTML(q,id)
}
function baseSpellPoints(marks) {return Object.entries(marks).map(i=>((i[0]==="S")?0:(i[0]==="A")?10:Number(i[0]))*i[1]).sum()}
var spellCardActive=false
function useSpellCard() {
	if (spellCards>0) {
		spellCardActive=true
		check()
		spellCardActive=false
		spellCards--
	}
}
function check() {
	// Speed point factor is calculated first to minimize the impact of lag on it
	let timeTaken = (Date.now()-timestamp)/1000
	let parTime = questionPar(currentQuestion)
	let ratio = timeTaken/parTime
	let speedFactor = (ratio<1)?1
									 :(ratio<1.5)?1+0.5*Math.sin(Math.PI*ratio)
									 :(ratio<2)?0.5*Math.sin(Math.PI*(ratio-1))
									 :0

	let points = Object.fromEntries(scoreTypes.map(x=>[x,0]))
	for (let i of compositeParts) {
		let question = accessQuestion(i)
		let marks = markQuestionPart(i)
		for (let i of Object.entries(marks)) points[i[0]] += i[1]
		let topics = questionTopics(question)
		for (let topic of topics) {
			if (typeof topicMarks[topic] === "undefined") {topicMarks[topic] = [0,0]}
			topicMarks[topic][0] += numMarks(marks)
			topicMarks[topic][1] += maxMark(question)
		}
	}
	let newSpell = spellCardActive?spellPoints:(spellPoints+Math.floor(getMaxSpellPoints(currentQuestion)*speedFactor*baseSpellPoints(markQuestionPart(""))/baseSpellPoints(maxMarksByType(currentQuestion))))
	let out = questionTableGenerator(questionTable("review"))
	if (allQuestionParts(currentQuestion).length>1) out += (currentQuestion.type==="composite")?("<span style=\"float:right;color:hsl("+(120*formatNum(numMarks(markQuestionPart("")))/maxMark(currentQuestion))+" 100% 33%)\">(Total = "+formatNum(numMarks(markQuestionPart("")))+" / "+formatNum(maxMark(currentQuestion))+")</span>"):""
	document.getElementById("reviewQuestion").innerHTML = out

	let categories = Object.keys(scores)
	state = "sleeping"
	tab("checkAnswers")
	for (let i of scoreTypes) scores[i].score+=points[i]
	let pointText = (currentQuestion.type==="composite")?[categories.filter(x=>points[x]!==0).map(i=>"<span style=\"color:var(--point"+i+")\">[+"+formatNum(points[i])+"<sub>"+i+"</sub>]</span>").join(" ")]:[]
	if (newSpell!==spellPoints) {
		if (newSpell>99) pointText.push("<span style=\"color:var(--pointC)\">[Get Spell Card!"+((newSpell>199)?("×"+Math.floor(newSpell/100)):"")+"]</span>")
		pointText.push("<span style=\"color:var(--pointC)\">[Spell Points: "+spellPoints+" → "+(newSpell%100)+"]</span>")
	}
	spellCards += Math.floor(newSpell/100)
	spellPoints = newSpell%100
	document.getElementById("pointsObtained").innerHTML = pointText.join("<br>")
	questionsAnswered++
}

function stringSimplify(x) {
	if (x==="") return ""
	return deHTML(String(x)).replace(/[^A-Za-z0-9]/g,"").toLowerCase();
}
/*
	Finds keywords within an answer.
	answer			the answer to check for keywords
	array			 an array containing the keywords to look for
	max				 the maximum number of keywords to give marks to (eg. for "nucleus" and "nuclei" set this to 1). Can set this to "u" for unlimited.
	marks			 the number of marks to award per keyword (can be negative to prevent spam-scumming)
*/
function keyword(answer,array,max="u",marks=1) {
	let count = 0

	for (let i=0;i<array.length;i++) if (String(answer).toLowerCase().length !== answer.toString().toLowerCase().replace(array[i].toString().toLowerCase(),"").length) count++
	return Math.min(count,(max==="u"?Infinity:max))*marks
}

function bestMarks(array,amount,transform) {
	return (transform===undefined)?array.sort(function(a,b){return b-a}).slice(0,amount).map(x=>Math.floor(x)).sum():addMarks(array.sort(function(a,b){return b-a}).slice(0,amount).map(x=>transform.slice(0,x)))
}

function numberInRange(answer,min,max,step) {
	for (let i=min;i<=max;i+=step) if (keyword(answer,[String(i)],1,1)===1) return 1
	return 0
}

function clamp(value,max) {
	if (max === undefined) max = Infinity
	return Math.floor(Math.min(max,Math.max(0,value+1e-11)))
}

function gestep(value,steps) {
	let out = 0
	for (let i of steps) if (value>=i) out++
	return out
}

function updateHTML() {
	let tags = document.querySelectorAll('[data-i]')
	for (let num=0;num<tags.length;num++) tags[num].innerHTML = eval(tags[num].dataset.i)
}

function ranint(x,y,geo=false) {
	if (geo) return Math.round(x*(y/x)**Math.random())
	else return Math.round(x+(y-x)*Math.random())
}

function maxMarksByType(question) {
	let marks
	if (question.type === "open") {
		let model = question.modelAnswer
		marks = question.mark(model)
	} else if (question.type === "multiplechoice") {
		marks = question.markTransform(question.answers.map(x => x[1]?1:0).sum())
	} else if (question.type === "gapfill") {
		if (question.noTransform) {
			marks = {}
			for (let i of question.words) if (i.length === 3) {
				let next = standardisePoints(i[1](i[0]))
				for (let j of Object.keys(next)) {
					if (marks[j]===undefined) marks[j]=0
					marks[j] += next[j]
				}
			}
		} else {
			marks = question.markTransform(question.words.map(x => (x.length === 3)?x[1](x[0]):0).sum())
		}
	} else if (question.type === "order") {
		marks = question.markTransform(Math.floor(question.answers.length/2))
	} else if (question.type === "composite") {
		marks = {}
		for (let i of question.components) for (let j of Object.entries(maxMarksByType(i))) {
			if (marks[j[0]] === undefined) marks[j[0]] = 0
			marks[j[0]] += j[1]
		}
	}
	return standardisePoints(marks)
}
function maxMark(question) {
	return Object.values(maxMarksByType(question)).sum()
}
function getMaxSpellPoints(question) {return Math.ceil(baseSpellPoints(maxMarksByType(question))/spellDivisor)}

/*
Valid states are:
sleeping												This does nothing until the user inputs something.
nextQuestion										This picks a question and outputs it before entering the "answering" state.
answering											 This waits for the user to answer the current question.
terminus												This facilitates the iota animation.
*/
var state = "sleeping"

const answerdivs = document.getElementsByClassName("answerdiv")
var currentQuestionData = {}
function gapfillGenerator(array,amount="u") {
	let possibleGaps = array.map((x,index) => (typeof x === "object")?index:null).filter(x => x!==null)
	let gaps = (typeof amount === "number")?possibleGaps.select(amount):possibleGaps
	return array.map((x,index) => gaps.includes(index)?[x[0],x[1],gaps.indexOf(index)]:(typeof x === "string")?[x,null]:[x[0],null])
}
function gapfillExact(text,level){return [text,function(answer){return stringSimplify(text)===stringSimplify(answer)?(level??1):((level===undefined)?0:{})}]}
function multipleChoiceArray(q) {
	let indices = currentQuestion.answers.map((x,i) => x[1]===1?i:0).filter(x => x!==0).select(currentQuestion.gapTotal)
	let out = []
	for (let i=0;i<currentQuestion.answers.length;i++) if (indices.includes(i)) out.push([currentQuestion.answers[i][0],indices.includes(i)?indices.indexOf(i):0])
	return out
}
function multipleChoiceGenerator(correctArray,correctAmount,incorrectArray,incorrectAmount) {
	return [Array.removeDuplicates(correctArray).select(correctAmount).map(x => [String(x),true]),Array.removeDuplicates(incorrectArray).filter(x=>!correctArray.includes(x)).select(incorrectAmount).map(x => [String(x),false])].flat().sort((a,b)=>a[0].localeCompare(b[0]))
}
/*
arrayQuestions:
0   the question
1   the correct answer
2		the level string
3   the mark transform, x=>x if undefined
*/
function multipleChoiceComposite(text,arrayQuestions,numParts=arrayQuestions.length,topic=undefined) {
	let out = []
	let answerArray = Array.from(new Set(arrayQuestions.map(x=>x[1]))).flat()
	for (let i of arrayQuestions.select(numParts)) {
		let correct = (i[1] instanceof Array)?i[1]:[i[1]]
		let next = {text:i[0],type:"multiplechoice",answers:multipleChoiceGenerator(correct,correct.length,answerArray.filter(x=>!correct.includes(x)),Math.min(answerArray.length,8)-correct.length),markTransform:x=>i[2].slice(0,x),par:Math.max(10,answerArray.length+6)}
		if (topic!==undefined) next.topic=topic
		out.push(next)
	}
	out.qSort()
	return {text:text,type:"composite",components:out}
}
function orderGenerator(array,numParts=array.length) {
	let out = array
	while (out.length>numParts) out.splice(Math.floor(Math.random()*out.length),1)
	return out
}
function orderToggle(id,num) {
	if (currentQuestionData[id].toggled===null) {
		currentQuestionData[id].toggled=num
	} else {
		currentQuestionData[id].order.splice(num,0,...currentQuestionData[id].order.splice(currentQuestionData[id].toggled,1))
		currentQuestionData[id].toggled=null
	}
	for (let i=0;i<currentQuestionData[id].order.length;i++) {
		let element = document.getElementById("orderAnswer_"+id+"_"+i)
		element.style["background-color"] = (currentQuestionData[id].toggled===i)?"#990099":"#999999"
		element.innerHTML = currentQuestionData[id].order[i][0]
	}
}
function blankComposite(components) {return {text:"",type:"composite",components:components}}
function roman(number) { // generates a roman numeral. Monospace fonts are recommended for implementations involving numbers greater than 4999.
	if (number>=5e9) throw "roman() does not support inputs greater than 5,000,000,000";
	if (number<=0) throw "roman() does not support 0 or negative inputs";
	if (number%1!==0) throw "roman() does not support fractional inputs";
	let symbols = [
		["","I","II","III","IV","V","VI","VII","VIII","IX"],	 // e0 unit
		["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],	 // e1 unit
		["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],	 // e2 unit
		["","M","MM","MMM","MMMM","V̅","V̅I̅","V̅I̅I̅","V̅I̅I̅I̅","I̅X̅"], // e3 unit
		["","X̅","X̅X̅","X̅X̅X̅","X̅L̅","L̅","L̅X̅","L̅X̅X̅","L̅X̅X̅X̅","X̅C̅"],	 // e4 unit
		["","C̅","C̅C̅","C̅C̅C̅","C̅D̅","D̅","D̅C̅","D̅C̅C̅","D̅C̅C̅C̅","C̅M̅"],	 // e5 unit
		["","M̅","M̅M̅","M̅M̅M̅","M̅M̅M̅M̅","V̅̅","V̅̅I̅̅","V̅̅I̅̅I̅̅","V̅̅I̅̅I̅̅I̅̅","I̅̅X̅̅"], // e6 unit
		["","X̅̅","X̅̅X̅̅","X̅̅X̅̅X̅̅","X̅̅L̅̅","L̅̅","L̅̅X̅̅","L̅̅X̅̅X̅̅","L̅̅X̅̅X̅̅X̅̅","X̅̅C̅̅"],	 // e7 unit
		["","C̅̅","C̅̅C̅̅","C̅̅C̅̅C̅̅","C̅̅D̅̅","D̅̅","D̅̅C̅̅","D̅̅C̅̅C̅̅","D̅̅C̅̅C̅̅C̅̅","C̅̅M̅̅"],	 // e8 unit
		["","M̅̅","M̅̅M̅̅","M̅̅M̅̅M̅̅","M̅̅M̅̅M̅̅M̅̅"]														 // e9 unit
	];
	let out = "";
	for (let i=Math.floor(Math.log10(number));i>=0;i--) {
		out+=symbols[i][Math.floor(number/10**i)];
		number-=10**i*Math.floor(number/10**i);
	}
	return out;
}
const numwordIllionsDictionary = ["thousand",...["m","b","tr","quadr","quint","sext","sept","oct","non"].map(x=>x+"illion"),...(()=>{
	let out = []
	for (let i=0;i<92;i++) out.push(["","un","duo","tre","quattuor","quin","sex","septem","octo","novem"][i%10]+["dec","vigint","trigint","quadragint","quinquagint","sexagint","septuagint","octogint","nonagint","cent"][Math.floor(i/10)]+"illion")
	return out
})()]
function numword(num,precision=3) {
	if (num===0) return "zero"
	let out = (num>0?"":"minus ")
	num=Math.abs(num)
	// for 1-999
	function smallInteger(x) {
		let smallIntOutput = ""
		if (x>99) {
			smallIntOutput = ["one","two","three","four","five","six","seven","eight","nine"][Math.floor(x/100-1)]+" hundred"+(x%100===0?"":" and ")
			x=x%100
		}
		if (x>19) {
			smallIntOutput += ["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"][Math.floor(x/10)-2]
			if (x%10>0) smallIntOutput += "-"+["one","two","three","four","five","six","seven","eight","nine"][x%10-1]
		} else if (x>0) {
			smallIntOutput += ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"][x-1]
		}
		return smallIntOutput
	}
	let illionOut = []
	for (let illion=101;illion>-2;illion--) {
		let illionValue = 1e3**(illion+1)
		let amount = Math.floor(num/illionValue)
		if (amount>0) {
			illionOut.push(smallInteger(amount)+(illion===-1?"":(" "+numwordIllionsDictionary[illion])))
			num -= amount*illionValue
		}
	}
	out += illionOut.joinWithAnd()
	if (num%1!==0&&precision>0) {
		let decimals = String(num.toFixed(precision)).slice(2).split("")
		while (decimals[decimals.length-1]==="0") decimals.splice(decimals.length-1)
		out+=" point "+decimals.map(x=>["zero","one","two","three","four","five","six","seven","eight","nine"][x]).join(" ")
	}
	return out
}
function formatNum(num) {
	if (typeof num !== "number") functionCrash("formatNum",arguments)
	if ([NaN,Infinity,-Infinity].includes(num)) return String(num)
	function formatSmallNum(x,out="") {
		out += String(x).substring(0,4)
		if (out.substring(out.length-1)==".") out = out.substring(0,out.length-1)
		return out
	}
	let out = ""
	if (num<0) {
		out = "-"
		num = -num
	}
	if (num<1000) return formatSmallNum(num,out)
	if (num<1e6) return out+String(Math.floor(num/1e3))+","+String(num%1e3).padStart(3,"0")
	out += formatSmallNum(10**(Math.log10(num)%3))
	let exponent = Math.floor(Math.log10(num)/3-1)
	let exponentText = (exponent<10)?["K","M","B","T","Qa","Qt","Sx","Sp","Oc","No"][exponent]:(["","U","B","T","Qa","Qt","Sx","Sp","Oc","No"][exponent%10]+[null,"Dc","Vg","Tg","Qd","Qi","Se","St","Og","Nn","Ce"][Math.floor(exponent/10)])
	return out+" "+exponentText
}
function pluralize(num,word,uniquePlural) {
	if (num===1) return "one "+word
	return numword(num)+" "+((uniquePlural===undefined)?(word+"s"):uniquePlural)
}
function symbolBase(symbols,num) {
	let out = "";
	while (num > 0) {
		let i = (num-1) % symbols.length
		out = symbols[i] + out
		num = Math.floor((num-1)/symbols.length)
	}
	return out
}
function questionPartName(layer,num) {
	if (typeof num !== "number") functionCrash("questionPartName",arguments)
	let exponent = layer>4?("<sup>"+Math.floor((layer+3)/4)+"</sup>"):""
	if (layer%4===1) return "("+symbolBase(countTo(26,true).map(x=>String.fromCharCode(x+97)),num)+exponent+")"
	if (layer%4===2) return "("+roman(num).toLowerCase()+exponent+")"
	if (layer%4===3) return "("+["ϟ","Ϙ","🔗","⌬","𖤓","ᛝ","♅"][(num-1)%7]+"<span class=\"xscript\" style=\"font-family:inherit;font-size:inherit;color:inherit\">"+exponent+"<sub>"+(num>7?Math.floor((num+6)/7):"")+"</sub></span>)"
	if (layer%4===0) return "("+symbolBase(countTo(24,true).map(x=>String.fromCharCode((x>18?946:945)+x)),num)+exponent+")"
}
function getQuestionPartNameFromLabel(label) {
	if (typeof currentQuestion !== "object") return "(?)"
	for (let i of mapQuestion(currentQuestion,true)) if (accessQuestion(i).label===label) return i.split(".").map((x,i)=>questionPartName(i+1,Number(x))).join("")
	return "(?)"
}
function questionData(question) {
	if (question.type === "gapfill") return {gapFillArray:question.words,gapFillLength:null}
	if (question.type === "multiplechoice") return {multipleChoiceChosen:Array(question.answers.length).fill(0)}
	if (question.type === "order") return {order:[...question.answers].map((x,i)=>[x,i]).sort(),toggled:null}
	return {}
}
function questionAnswerHTML(question,id) {
	id=String(id)
	if (id==="") id="r"
	if (question.type === "open") {
		return "<textarea id=\"answerLine_"+id+"\" style=\"width:calc(100% - 12px)\"></textarea><br><br>"
	} else if (question.type === "gapfill") {
		let out = ""
		for (let i=0;i<question.words.length;i++) {
			out += question.words[i][1]==null?(question.words[i][0]):("<input class=\"gapfillAnswer\" type=\"text\" id=\"gapFillAnswer_"+id+"_"+currentQuestionData[id].gapFillArray[i][2]+"\" style=\"font-family:'Verdana';width:"+Math.min(1000,currentQuestionData[id].gapFillArray[i][0].length*20)+"px\"></input>")
		}
		return "<div id=\"answerLine_"+id+"\">"+out+"</div><br><br>"
	} else if (question.type === "multiplechoice") {
		let out = ""
		let locationOfOptions = "currentQuestionData['"+id+"'].multipleChoiceChosen"
		for (let i=0;i<question.answers.length;i++) out += "<button id=\"multipleChoiceAnswer_"+id+"_"+i+"\" onClick=\""+locationOfOptions+"["+i+"]=1-"+locationOfOptions+"["+i+"]\">"+question.answers[i][0]+"</button>"
		return out+"<br><br>"
	} else if (question.type === "order") {
		let out = ""
		let location = "currentQuestionData['"+id+"'].order"
		for (let i=0;i<question.answers.length;i++) out += "<button id=\"orderAnswer_"+id+"_"+i+"\" style=\"background-color:#999999;width:calc(100% - 8px);height:40px\" onClick=\"orderToggle('"+id+"',"+i+")\">"+currentQuestionData[id].order[i][0]+"</button>"
		return out+"<br><br>"
	} else {
		crash("Question \""+question.text+"\" has no type.")
	}
}
function maxMarkHTML(q) {
	let alphaFactor = (maxMarksByType(q).A??0)/maxMark(q)
	return "<span style=\"float:right;color:rgba("+(255*(1-alphaFactor))+",255,"+(204*(1-alphaFactor))+")\">("+formatNum(maxMark(q))+")</span>"
}
function reviewMarkHTML(earned,max) {
	return "<span style=\"float:right;text-align:right;\"><span style=\"color:hsl("+(120*numMarks(earned)/max)+" 100% 30%)\">("+formatNum(numMarks(earned))+" / "+formatNum(max)+")</span><br>"+Object.entries(earned).map(x=>"<span style=\"color:var(--point"+x[0]+")\">[+"+formatNum(x[1])+"<sub>"+x[0]+"</sub>]</span>").join("")+"</span>"
}
function accessQuestion(id,question=currentQuestion) {
	if (["r",""].includes(id)) return question
	let out = [question]
	for (let i of id.split(".")) out.push(out[out.length-1].components[i-1])
	return out[out.length-1]
}
function generateQuestion() {
	let out = questionTableGenerator(questionTable("answer"))
	if (allQuestionParts(currentQuestion).length>1) out += "<span style=\"float:right\">(Total = "+maxMark(currentQuestion)+")</span>"
	document.getElementById("currentQuestion").innerHTML = out
}
const end = {
	anim:{
		type:"1",
		current:0,
		total:0,
	}
}
function loop() {
	if (state === "sleeping") {
		// do nothing in this stage
	} else if (state === "nextQuestion") {
		if (questions.length===questionsAnswered) {
			scores.C.score = spellCards
			tab("end")
			state="terminus"
			document.getElementById("allScoreTypes_post").innerHTML = scoreTypes.map(x=>"<div class=\"pointType\" style=\"height:60px;color:var(--point"+x+");border-color:var(--point"+x+")\"><span style=\"color:inherit\">"+formatNum(scores[x].score)+"</span> / <span style=\"color:inherit\">"+formatNum(scores[x].max)+"</span> "+scoreTypeNames[x]+"points<br><span style=\"color:inherit\" id=\"terminus_"+x+"iotas\">0</span> / <span style=\"color:inherit\">"+formatNum(maxIotas[x])+"</span> iotas</div>").join("")
			timestamp=Date.now()
		} else {
			currentQuestion = questions[questionsAnswered]
			compositeParts = mapQuestion(currentQuestion)
			for (let i of compositeParts) currentQuestionData[i] = questionData(accessQuestion(i))
			generateQuestion()
			for (let i of compositeParts) if (accessQuestion(i).type === "open") {
				document.getElementById("textareaReplicator").value = accessQuestion(i).modelAnswer
				document.getElementById("answerLine_"+i).style.height = document.getElementById("textareaReplicator").scrollHeight+"px"
			}
			state = "answering"
			for (let i=0;i<answerdivs.length;i++) answerdivs[i].style.display = "none"
			timestamp = Date.now()			// The time when the question was started. Used to calculate Speed score.
			if (spellCards===0) {document.getElementById("spellCard").style.display = "none"}
			else {
				document.getElementById("spellCard").style.display = "inline-block"
				document.getElementById("spellCards").innerHTML = spellCards
			}
		}
	} else if (state === "answering") {
		tab("quiz")
		let timePassed = (Date.now()-timestamp)/1000
		document.getElementById("time").innerHTML = (timePassed<questionPar(currentQuestion))?("<span style=\"color:#ffff00\">"+(questionPar(currentQuestion)-timePassed).toFixed(1)+" seconds to par time</span>"):("<span style=\"color:#ff0000\">"+(questionPar(currentQuestion)*2-timePassed).toFixed(1)+" seconds left</span>")
		if (timePassed/questionPar(currentQuestion)>2) check()
		for (let id of compositeParts) if (accessQuestion(id).type==="multiplechoice") for (let i=0;i<accessQuestion(id).answers.length;i++) document.getElementById("multipleChoiceAnswer_"+id+"_"+i).style["background-color"] = (currentQuestionData[id].multipleChoiceChosen[i]===1?"#990099":"#999999")
	} else if (state === "terminus") {
		let desiredTotal = Math.round((Date.now()-timestamp)/50)
		let iterations = 0
		while (end.anim.total<desiredTotal) {
			if (iterations>100) {
				crash("Too much recursion during final animation")
				return
			}
			iterations++
			if (end.anim.current===iota(end.anim.type)) {
				if (end.anim.type==="S") {
					if (end.anim.total===Object.values(maxIotas).sum()) document.getElementById("overallLevel").className = "shiny9"
					let WWWandEBIItems = Math.min(Math.floor(Object.keys(topicMarks).length/2),3)
					if (WWWandEBIItems>0) {
						let topicsAssessed = Object.keys(topicMarks).sort((a,b)=>(topicMarks[a][0]/topicMarks[a][1])-(topicMarks[b][0]/topicMarks[b][1])+(Math.random()/1e8))
						document.getElementById("WWWandEBI").innerHTML = "<tr><td>What went well:<ul>"+topicsAssessed.filter(x=>(topicMarks[x][0]/topicMarks[x][1])>0.25).slice(0,WWWandEBIItems).map(x=>"<li>"+x+"</li>").join("")+"</ul></td><td>Room for improvement:<ul>"+topicsAssessed.filter(x=>topicMarks[x][0]!==topicMarks[x][1]).reverse().slice(0,WWWandEBIItems).map(x=>"<li>"+x+"</li>").join("")+"</ul></td></tr>"
					}
					document.getElementById("endButtons").style.display = "inline-block"
					state = "sleeping"
					break
				} else {
					end.anim.type = scoreTypes[scoreTypes.indexOf(end.anim.type)+1]
					end.anim.current = 0
				}
			} else {
				let diff = Math.min(desiredTotal-end.anim.total,iota(end.anim.type)-end.anim.current)
				end.anim.current += diff
				end.anim.total += diff
				document.getElementById("terminus_"+end.anim.type+"iotas").innerHTML = formatNum(end.anim.current)
			}
		}
		let shownLevels = []
		for (let i=1;i<10;i++) {
			let p = levelBoundaries[i]*100/Object.values(maxIotas).sum()
			if ((p>0.1)&&(p<99.9)&&(Math.abs(p-(shownLevels[shownLevels.length-1]??0))>0.1)) {shownLevels.push(p)}
		}
		if (shownLevels.length!==0) document.getElementById("iotaProgressBar").style.background = "linear-gradient(90deg,rgba(0,0,0,0),"+shownLevels.map(p=>"rgba(0,0,0,0) calc("+p+"% - 1px),#000000 calc("+p+"% - 1px),#000000 calc("+p+"% + 1px),rgba(0,0,0,0) calc("+p+"% + 1px)").join()+"),linear-gradient(90deg,#009900,#009900 "+(end.anim.total*100/Object.values(maxIotas).sum())+"%,#666666 "+(end.anim.total*100/Object.values(maxIotas).sum())+"%,#666666)"
		document.getElementById("overallLevel").innerHTML = level(end.anim.total)
		document.getElementById("overallLevel").className = "level"+level(end.anim.total)
		document.getElementById("iotaProgressToLevel").innerHTML = formatNum(end.anim.total)+" / "+formatNum(levelBoundaries[level(end.anim.total)+1])
		updateHTML()
	} else {
		crash(state+" is not a valid game state.")
	}
}

var loopvar = window.setInterval(loop,50)

var crashed = false
function crash(message) {
	if (!crashed) {
		crashed = true
		document.getElementById("quizzical").style.display="none"
		document.getElementById("crash").style.display="inline-block"
		let name = document.getElementsByTagName("title")[0].innerHTML
		document.getElementById("crash").innerHTML = "<!DOCTYPE html><body style=\"background-color:#190033\"><p style=\"color:#ff3333;font-family:'Verdana'\">"+name+" has stopped working.<br>Details: "+message+"</p></body>"
		clearInterval(loopvar)
		thisWillMakeAChainShowInConsole()
	}
}
function functionCrash(functionName,argumentList) {
	crash("Cannot access "+functionName+"("+Object.values(argumentList).map(x=>JSON.stringify(x)).join(",")+")")
}

const devtools = {
	// Returns the amount of each question worth each amount of marks.
	mode: function(split=true) {
		let array = split?allQuestionParts():questions
		let out = {}
		for (let i of array) {
			let mark = maxMark(i)
			if (out[mark]===undefined) out[mark]=1
			else out[mark]++ 
		}
		return out
	},
	// Finds a question by text.
	findByText: function(file,key) {
		return file[file.map(x => x.text.search(key)===-1).indexOf(false)]
	}
}
function dictionary(key,array) {
	if (!(array instanceof Array)) crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid array")
	if (array.map(x=>x instanceof Array).includes(false)) crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid array")
	if (array.map(x=>x.length===2).includes(false)) crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid array")
	try {return array[array.map(x => x[0]).indexOf(key)][1];} catch {crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid key")}
}
function ordinal(num){return num+(((num%10===1)&&(num%100!==11))?"st":((num%10===2)&&(num%100!==12))?"nd":((num%10===3)&&(num%100!==13))?"rd":"th")}
function deHTML(str) {
	if ((str===null) || (str===''))
			return false;
	else
			str = str.toString();
				
	// Regular expression to identify HTML tags in
	// the input string. Replacing the identified
	// HTML tag with a null string.
	return str.replace( /(<([^>]+)>)/ig, '');
}
function expandListOfAbbreviations(list) {
	let out = []
	for (let i of list.select(list.length**0.75)) out.push({text:i[0],type:"open",modelAnswer:i[1],mark:function(answer){let modelKeywords=i[1].split(/[- ]+/).flat();let counter=0;for(let word of modelKeywords){if(answer.includes(word)){counter++}};return String(i[2]).repeat(Math.floor(modelKeywords.length*0.4+0.6)*(counter/modelKeywords.length)**2)},par:10})
	return {text:"State the full form of the following abbreviations:",type:"composite",components:out.qSort()}
}

/* Collapsible how-to-play */
var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.maxHeight){
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		} 
	});
}