"use strict"

Object.defineProperty(Array.prototype,"sum",{value:function sum() {
	return this.reduce((x,y)=>x+y)
}})
Object.defineProperty(Array.prototype,"product",{value:function product() {
	return this.reduce((x,y)=>x*y)
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
	value: function joinWithAnd(delimiter=",") {
		if (this.length<3) return this.join(" and ");
		let arr = structuredClone(this)
		let out = arr.splice(0,1);
		while (arr.length>1) out+=delimiter+" "+arr.splice(0,1);
		out+=" and "+arr[0];
		return out;
	}
})

var questions = []

var currentQuestion

var scores = {
	recall: {
		score: 0,
		max: 0
	},
	speed: {
		score: 0,
		max: 0
	},
	depth: {
		score: 0,
		max: 0
	},
	specialization: {
		score: 0,
		max: 0
	}
}

var timestamp					// This variable serves many purposes, but only one at a time is ever used.

// The average number of marks per question varies, so the same must apply to the specialization point threshold.
var specializationThreshold
// The maximum number of layers of a composite question
var fileDepth = Math.max(...questions.map(x=>(question.type=="composite") ? Math.max(...question.components.map(x=>depth(x))) + 1 : 0))
// The parts of a composite question (if composite)
var compositeParts
function mapQuestion(question,includeComposite=false,id=[]) {
	if (question.type == "composite") {
		let out = includeComposite?[id]:[]
		for (let i=0;i<question.components.length;i++) out.push(mapQuestion(question.components[i],includeComposite,id==""?String(i+1):id+"."+(i+1)))
		return out.flat()
	} else {
		return id.length==0?["r"]:id
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

function toTitleCase(str) {
	if (str == undefined) crash("toTitleCase() input \""+str+"\" is undefined.")
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
		}
	);
}

// If a variable is a function, returns the result of the function. Otherwise, returns the value of the variable.
var maxIotas = Array(4)
var maxIotaSeed = Array(4).fill(0).map(x => Math.exp(Math.random()/5-0.1)) 
function maxIota() {
	let total = allQuestionParts().map(x=>x.par).sum()/3.6
	let weight = Array(4)
	weight[0] = scores.recall.max
	weight[2] = converge(scores.depth.max*0.5,scores.recall.max)*0.5
	weight[1] = scores.recall.max*1.5+scores.depth.max*0.5
	weight[3] = converge(scores.specialization.max*specializationThreshold,weight[0]+weight[1]+weight[2])/24
	weight = weight.map(x => isNaN(x)?0:x)
	let iotas = countTo(4,true).map(x=>total*weight[x]/weight.sum())
	let roundFactor = Math.max(1,[2,5,10][Math.floor(3*(Math.log10(total)%1))]*10**Math.floor(Math.log10(total)-2))
	iotas = iotas.map(x=>Math.ceil(x/roundFactor)*roundFactor)
	return iotas
}

var iotas = [null,null,null,null]
function iota(category) {
	if (scores[category].max==0) return 0
	let ratio = scores[category].score/scores[category].max
	ratio = 1.5*ratio-0.5*ratio**2
	return Math.floor(ratio*maxIotas[["recall","speed","depth","specialization"].indexOf(category)])
}

function overallIota() {
	return iota("recall")+iota("speed")+iota("depth")+iota("specialization")
}

var levelBoundaries = Array(11)
function levelBoundaryCurve(x) {
	return (x==0)?0.9:(x>0)?(1-0.1/2**x):(x<0)?(0.9*3**x):NaN
}
function levelBoundary(x) {
	if (![0,1,2,3,4,5,6,7,8,9,10].includes(x)) functionCrash("levelBoundary",arguments)
	if (x==10) return Infinity
	if (x==0) return 0
	let Qs = allQuestionParts()
	let variables = [[0,0],[0,0],[0,0],[0,0]]
	for (let i=0;i<Qs.length;i++) {
		let level = Qs[i].level
		let max = maxMark(Qs[i])
		if (level == "A") {
			let factor = levelBoundaryCurve(x-10)
			variables[2][0]+=max*factor
			variables[2][1]+=max
			variables[1][0]+=max*10*factor
			variables[1][1]+=max*10
		} else {
			let factor = levelBoundaryCurve(x-level)
			variables[0][0]+=max*factor
			variables[0][1]+=max
			variables[1][0]+=max*10*factor
			variables[1][1]+=max*10
		}
		if (max>=specializationThreshold) {
			variables[3][0]+=1/(11-x)
			variables[3][1]++
		}
	}
	let out = Math.ceil([0,1,2,3].map(x => variables[x][1]==0?0:maxIotas[x]*variables[x][0]/variables[x][1]).sum())
	if (x==9) return out
	return Math.min(out,levelBoundary(x+1)-1)
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
	for (let i=0;i<Object.keys(globalThis).length;i++) if (Object.keys(globalThis)[i].substring(0,17)=="question_file_at_") out.push(Object.keys(globalThis)[i])
	return out
}

// Returns an array with the integers from 1 to x: for example, countTo(4) = [1,2,3,4]
function countTo(x,from0=false) {
	return Array(x).fill(0).map((a,i)=>from0?i:i+1)
}

function deflateQuestion(question) {
	if (question.type == "composite") {
		if (question.components.length == 0) {
			return null
		} else if (question.components.length == 1) {
			let out = question.components[0]
			if (question.text !== "") out.text = question.text+"<br>"+out.text
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
	while (list.map(x=>x.type=="composite").includes(true)) list=list.map(x=>x.type=="composite"?x.components:x).flat()
	return allQuestionParts(q).map(x => maxMark(x)*((x.level=="A"?10:x.level)+5)*ranint(10,100,true)*dictionary(x.type,[["open",1],["gapfill",0.8],["multiplechoice",0.5]])).sum()/allQuestionParts(q).length
}
function allQuestionParts(q=questions,includeComposite=false) {
	if (!(q instanceof Array)) q=[q]
	let out = []
	for (let i of q) if (i.type == "composite") {
		if (includeComposite) out.push(i)
		out.push(...i.components.map(x=>allQuestionParts(x,includeComposite)).flat())} else {out.push(i)
	}
	return out
}
function loadTopic() {
	let topics = document.getElementById("topicSelector").value.split(",").map(x => "question_file_at_"+x)
	let question_list = []
	for (let i of topics) question_list.push(globalThis[i])
	question_list = question_list.filter(x=>x!==null)
	question_list=question_list.flat()
	let splitList = allQuestionParts(question_list)
	questionListLength = question_list.length
	splitListLength = splitList.length
	for (let i of splitList) {
		if (typeof i == "function") crash("A question of this file has an uncalled generator function.")
		if (typeof i !== "object") crash("A question of this file has an incorrect data type.")
		if (typeof i.type == "undefined") crash("Question \""+i.text+"\" of this file has no <code>type</code>")
		if (!["open","gapfill","multiplechoice","composite"].includes(i.type)) crash("Question \""+i.text+"\" of this file has an invalid <code>type</code>")
		if ((typeof i.text !== "string") && (i.type !== "composite")) crash("A question of this file has no text. (Seriously, who even <i>made</i> this?)")
		if (![1,2,3,4,5,6,7,8,9,"A"].includes(i.level)) crash("Question \""+i.text+"\" of this file has an invalid <code>level</code>")
		if (typeof i.par !== "number") crash("Question \""+i.text+"\" of this file has an invalid <code>par</code>")
		let properties = dictionary(i.type,[["open",["modelAnswer","mark"]],["multiplechoice",["answers","markTransform"]],["gapfill",["words","markTransform"]]])
		for (let j of properties) {
			if (i[j] == undefined) crash("Question \""+i.text+"\" of this file is missing type-specific property <code>"+j+"</code>.")
		}
		if (i.type == "open") try {i.mark(i.modelAnswer)} catch {crash("Question \""+i.text+"\" of this file has an invalid <code>mark</code>")}
		if (i.type == "gapfill") if (typeof i.words !== "object") crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix.")
		if (i.type == "gapfill") for (let j of i.words) {
			if (typeof j !== "object") crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix.")
			if (j.length == 3) if ((typeof j[0] !== "string") || (typeof j[1] !== "function")) crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix entry. ("+j+")")
			if (j.length == 2) if (typeof j[0] !== "string") crash("Question \""+i.text+"\" of this file has an invalid gapfill matrix entry. ("+j+")")
		}
		if (typeof maxMark(i) !== "number") crash("Question \""+i.text+"\" of this file is worth "+maxMark(i)+" marks.")
		if (maxMark(i)==0) crash("Question \""+i.text+"\" of this file is worth 0 marks.")
	}
	question_list = question_list.sort(function(a,b){return questionPositionFactor(a)-questionPositionFactor(b)})
	while (true) {
		if (question_list.length == 0) break
		let next = question_list.splice(0,1)[0]
		if (questions.length>0) if (questions.map(x => questionPar(x)).reduce((x,y) => x+y)>(document.getElementById("lengthSelector").value*60+questionPar(next)/2)) break
		questions.push(next)
	}
	for (let i=0;i<questions.length;i++) questions[i] = deflateQuestion(questions[i])
	specializationThreshold = Math.min(allQuestionParts().map(x => maxMark(x)).sort(function(a,b) {return a-b})[Math.ceil(allQuestionParts().length*0.8)-1]+1,allQuestionParts().map(x => maxMark(x)).reduce((x,y) => Math.max(x,y)))
	scores.recall.max = allQuestionParts().map(x => x.level!=="A"?maxMark(x):0).sum()
	scores.depth.max = allQuestionParts().map(x => x.level=="A"?maxMark(x):0).sum()
	scores.speed.max = (scores.recall.max+scores.depth.max)*10
	scores.specialization.max = allQuestionParts().map(x => maxMark(x)>=specializationThreshold?1:0).reduce((x,y) => x+y)
	document.getElementsByTagName("title")[0].innerHTML = "\"Quizzical\" by AleManInc: "+document.getElementById("topicSelector")[document.getElementById("topicSelector").selectedIndex].innerHTML
	maxIotas = maxIota()
	let levelBoundaryArray = []
	for (let i=0;i<11;i++) levelBoundaryArray.push(levelBoundary(i))
	levelBoundaries = levelBoundaryArray
	updateHTML()
	tab("howToPlay")
}

function questionHTML() {
	let color = currentQuestion.level=="A"?"#00ff00":"#ffffff"
	let out = "<p style=\"color:"+color+"\">"+currentQuestion.text
	out += " ("+maxMark(currentQuestion)+" mark"+(maxMark(currentQuestion)==1?"":"s")+")</p>"
	return out
}

function approximateEqual(x,y) {
	return Math.abs(Math.log10(x)-Math.log10(y))<0.0001
}
function questionPar(question) {
	if (question.type == "composite") {
		return question.components.map(x => questionPar(x)).sum()
	} else {
		return question.par
	}
}

function markQuestionPart(id) {
	id=String(id)
	if (id=="") id="r"
	let question = accessQuestion(id)
	let marks
	if (question.type == "open") {
		let answer = document.getElementById("answerLine_"+id).value
		marks = question.mark(answer)
	} else if (question.type == "gapfill") {
		marks = 0
		for (let i=0;i<currentQuestionData[id].gapFillArray.length;i++) {
			if (currentQuestionData[id].gapFillArray[i][1]!==null) marks += currentQuestionData[id].gapFillArray[i][1](document.getElementById("gapFillAnswer_"+id+"_"+currentQuestionData[id].gapFillArray[i][2]).value)
		}
		marks = question.markTransform(marks)
	} else if (question.type == "multiplechoice") {
		let correctChosen = currentQuestionData[id].multipleChoiceChosen.map((x,index) => x & question.answers[index][1]).sum()
		let totalChosen = currentQuestionData[id].multipleChoiceChosen.sum()
		let totalCorrect = question.answers.map(x => x[1]).sum()
		marks = Math.floor(Math.max(0,question.markTransform(correctChosen-Math.max(0,totalChosen-totalCorrect))))
	}
	return Math.floor(Math.min(marks,maxMark(question)))
}
function reviewQuestionPart(id,question=currentQuestion) {
	id=String(id)
	if (id=="") id="r"
	let yourAnswer
	let modelAnswer
	if (question.type == "open") {
		yourAnswer = document.getElementById("answerLine_"+id).value
		modelAnswer = question.modelAnswer
	} else if (question.type == "gapfill") {
		yourAnswer = currentQuestionData[id].gapFillArray.map(x => x.length==3?document.getElementById("gapFillAnswer_"+id+"_"+x[2]).value:x[0]).join("")
		modelAnswer = currentQuestionData[id].gapFillArray.map(x => x[0]).join("")
	} else if (question.type == "multiplechoice") {
		yourAnswer = question.answers.map((x,index) => currentQuestionData[id].multipleChoiceChosen[index]==1?question.answers[index]:null).filter(x => x!==null).map(x => x[0]).join("<br>")
		modelAnswer = question.answers.filter(x => x[1]).map(x => x[0]).join("<br>")
		let blankMessage = "<span style=\"color:#ff9900\">[No answers selected.]</span>"
		if (yourAnswer=="") yourAnswer = blankMessage
		if (modelAnswer=="") modelAnswer = blankMessage
	}
	return colorQuestionPart(question.text+reviewMarkHTML(markQuestionPart(id),maxMark(question))+"<table style=\"table-layout:fixed;width:98%\"><tr><td><u>Your answer:</u><br><span id=\"playerAnswer_"+id+"\">"+yourAnswer+"</span></td><td><u>Model answer:</u><br><span>"+modelAnswer+"</span></td></tr></table>",question)
}
const markTemplate = {
	number:function(model){return function(answer){return answer.replaceAll(" ","")==model?1:0}}
}
function questionTable(mode,question=currentQuestion) {
	let parts = mapQuestion(question,true)
	if (parts[0]=="r") {
		return [[colorQuestionPart(String(questionsAnswered+1),currentQuestion),(mode=="answer")?questionPartHTML("r",question):(mode=="review")?reviewQuestionPart("r",question):functionCrash("questionTable",arguments)]]
	}
	let out = [[colorQuestionPart(String(questionsAnswered+1),currentQuestion)]]
	let row = 0
	let col = 0
	function write(text) {
		while (out[row]==undefined) out.push([""])
		while (out[row][col]==undefined) out[row].push("")
		out[row][col] = text
	}
	if (accessQuestion("r",question).text!=="") {
		col = 1
		write(colorQuestionPart(accessQuestion("r",question).text,currentQuestion))
		row++
	}
	for (let i of parts) {
		let part = accessQuestion(i,question)
		col = i.split(".").length
		write(colorQuestionPart(questionPartName(i.split(".").length,Number(i.split(".")[i.split(".").length-1])),part))
		if (part.type == "composite") {
			if (part.text !== "") {
				col = i.split(".").length+1
				write(part.text)
				row++
			}
		} else {
			col = i.split(".").length+1
			write((mode=="answer")?questionPartHTML(i,part):(mode=="review")?reviewQuestionPart(i,part):functionCrash("questionTable",arguments))
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
	return colorQuestionPart(q.text+maxMarkHTML(q)+"<br>"+questionAnswerHTML(q,id),q)
}
function check() {
	// Speed point factor is calculated first to minimize the impact of lag on it
	let timeTaken = (Date.now()-timestamp)/1000
	let parTime = questionPar(currentQuestion)
	let ratio = timeTaken/parTime
	let speedFactor = (ratio<1)?10
									 :(ratio<1.5)?10+5*Math.sin(Math.PI*ratio)
									 :(ratio<2)?5*Math.sin(Math.PI*(ratio-1))
									 :0

	let points = {recall:0,speed:0,depth:0,specialization:0}
	for (let i of compositeParts) {
		let question = accessQuestion(i)
		let marks = markQuestionPart(i)
		points[question.level=="A"?"depth":"recall"] += marks
		points.speed += Math.floor(marks*speedFactor)
		if (marks>=specializationThreshold&&marks==maxMark(question)) points.specialization++
	}
	let out = questionTableGenerator(questionTable("review"))
	if (allQuestionParts(currentQuestion).length>1) out += "<span style=\"float:right;color:hsl("+(120*(points.recall+points.depth)/maxMark(currentQuestion))+" 100% 33%)\">(Total = "+(points.recall+points.depth)+" / "+maxMark(currentQuestion)+")</span>"
	points.speed = Math.floor((points.recall+points.depth)*speedFactor)
	document.getElementById("reviewQuestion").innerHTML = out

	let categories = Object.keys(scores)
	state = "sleeping"
	tab("checkAnswers")
	for (let i=0;i<4;i++) scores[categories[i]].score+=points[categories[i]]
	document.getElementById("pointsObtained").innerHTML = categories.filter(x=>points[x]!==0).map(i=>"<span class=\""+i+"\">[+"+formatNum(points[i])+"]</span>").join(" ")
	questionsAnswered++
}

function stringSimplify(x) {
	return String(x).replace(/[^A-Za-z0-9]/g,"").toLowerCase();
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
	return Math.min(count,(max=="u"?Infinity:max))*marks
}

function bestMarks(array,amount,max="u") {
	return (max=="u"?array:array.map(x => Math.floor(Math.min(x,max)))).sort(function(a,b){return b-a}).slice(0,amount).sum()
}

function numberInRange(answer,min,max,step) {
	for (let i=min;i<=max;i+=step) if (keyword(answer,[String(i)],1,1)==1) return 1
	return 0
}

function clamp(value,max) {
	if (max == undefined) max = Infinity
	return Math.floor(Math.min(max,Math.max(0,value+1e-11)))
}

function updateHTML() {
	let tags = document.querySelectorAll('[data-i]')
	for (let num=0;num<tags.length;num++) tags[num].innerHTML = eval(tags[num].dataset.i)
}

function ranint(x,y,geo=false) {
	if (geo) return Math.round(x*(y/x)**Math.random())
	else return Math.round(x+(y-x)*Math.random())
}

function maxMark(question) {
	let marks
	if (question.type == "open") {
		let model = question.modelAnswer
		marks = question.mark(model)
	} else if (question.type == "multiplechoice") {
		marks = question.markTransform(question.answers.map(x => x[1]?1:0).sum())
	} else if (question.type == "gapfill") {
		marks = question.markTransform(question.words.map(x => (x.length == 3)?x[1](x[0]):0).sum())
	} else if (question.type == "composite") {
		marks = question.components.map(x => maxMark(x)).sum()
	}
	return Math.max(Math.floor(marks),0)
}
function isAdvanced(question) {
	return (question.type=="composite")?(!question.components.map(x => isAdvanced(x)).includes(false)):(question.level=="A")
}
function averageLevel(question) {
	if (question.type!=="composite") return question.level=="A"?10:question.level
	return allQuestionParts(question).map(x => (x.level=="A"?10:x.level)*maxMark(x)).sum()/maxMark(question)
}

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
	let possibleGaps = array.map((x,index) => (typeof x == "object")?index:null).filter(x => x!==null)
	let gaps = (typeof amount == "number")?possibleGaps.select(amount):possibleGaps
	return array.map((x,index) => gaps.includes(index)?[x[0],x[1],gaps.indexOf(index)]:(typeof x == "string")?[x,null]:[x[0],null])
}
function gapfillExact(text){return [text,(answer)=>{text==answer?1:0}]}
function multipleChoiceArray(q) {
	let indices = currentQuestion.answers.map((x,i) => x[1]==1?i:0).filter(x => x!==0).select(currentQuestion.gapTotal)
	let out = []
	for (let i=0;i<currentQuestion.answers.length;i++) if (indices.includes(i)) out.push([currentQuestion.answers[i][0],indices.includes(i)?indices.indexOf(i):0])
	return out
}
function multipleChoiceGenerator(correctArray,correctAmount,incorrectArray,incorrectAmount) {
	return [correctArray.select(correctAmount).map(x => [String(x),true]),incorrectArray.select(incorrectAmount).map(x => [String(x),false])].flat().sort((a,b)=>a[0].localeCompare(b[0]))
}
/*
arrayQuestions:
0    the question
1    the correct answer
2    the level
*/
function multipleChoiceComposite(text,arrayQuestions,numParts=arrayQuestions.length) {
	let out = []
	let answerArray = Array.from(new Set(arrayQuestions.map(x=>x[1])))
	for (let i of arrayQuestions.select(numParts)) out.push({text:i[0],type:"multiplechoice",level:i[2],answers:multipleChoiceGenerator([i[1]],1,answerArray.filter(x=>x!==i[1]),answerArray.length-1),markTransform:x=>x,par:Math.max(10,answerArray.length+6)})
	out.sort((a,b)=>averageLevel(a)*Math.random()-averageLevel(b)*Math.random())
	return {text:text,type:"composite",components:out}
}
const romanMatrix = [[1000,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]]
function roman(num) {
	if (num==0) return ""
	for (var i = 0; i < romanMatrix.length; i++) if (num >= romanMatrix[i][0]) return romanMatrix[i][1] + roman(num - romanMatrix[i][0]);
}
const numwordIllionsDictionary = ["thousand",...["m","b","tr","quadr","quint","sext","sept","oct","non"].map(x=>x+"illion"),...(()=>{
	let out = []
	for (let i=0;i<92;i++) out.push(["","un","duo","tre","quattuor","quin","sex","septem","octo","novem"][i%10]+["dec","vigint","trigint","quadragint","quinquagint","sexagint","septuagint","octogint","nonagint","cent"][Math.floor(i/10)]+"illion")
	return out
})()]
function numword(num,precision=3) {
	if (num==0) return "zero"
	let out = (num>0?"":"minus ")
	num=Math.abs(num)
	// for 1-999
	function smallInteger(x) {
		let smallIntOutput = ""
		if (x>99) {
			smallIntOutput = ["one","two","three","four","five","six","seven","eight","nine"][Math.floor(x/100-1)]+" hundred"+(x%100==0?"":" and ")
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
			illionOut.push(smallInteger(amount)+(illion==-1?"":(" "+numwordIllionsDictionary[illion])))
			num -= amount*illionValue
		}
	}
	out += illionOut.joinWithAnd()
	if (num%1!==0&&precision>0) {
		let decimals = String(num.toFixed(precision)).slice(2).split("")
		while (decimals[decimals.length-1]=="0") decimals.splice(decimals.length-1)
		out+=" point "+decimals.map(x=>["zero","one","two","three","four","five","six","seven","eight","nine"][x]).join(" ")
	}
	return out
}
function formatNum(num) {
	let out = ""
	if (num<0) {
		out = "-"
		num = -num
	}
	if (num<1000) {
		out += String(num).substring(0,4)
		if (out.substring(out.length-1)==".") out = out.substring(0,out.length-1)
		return out
	}
	if (num<1e6) return out+String(Math.floor(num/1e3))+","+String(num%1e3)
	out += formatNum(10**(Math.log10(num)%3))
	let exponent = Math.floor(Math.log10(num)/3-1)
	let exponentText = (exponent<10)?["K","M","B","T","Qa","Qt","Sx","Sp","Oc","No"][exponent]:(["","U","B","T","Qa","Qt","Sx","Sp","Oc","No"][exponent%10]+[null,"Dc","Vg","Tg","Qd","Qi","Se","St","Og","Nn","Ce"][Math.floor(exponent/10)])
	return out+" "+exponentText
}
function pluralize(num,word,uniquePlural) {
	if (num==1) return "one "+word
	return numword(num)+" "+((uniquePlural==undefined)?(word+"s"):uniquePlural)
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
	if (layer==1) return "("+symbolBase(countTo(26,true).map(x=>String.fromCharCode(x+97)),num)+")"
	if (layer==2) return "("+roman(num)+")"
	if (layer==4) return "("+symbolBase(countTo(24,true).map(x=>String.fromCharCode((x>18?946:945)+x)),num)+(layer>4?("<sup>"+(layer-3)+"</sup>"):"")+")"
	return "("+["ϟ","Ϙ","🔗","⌬","𖤓","ᛝ","♅"][(num-1)%7]+"<span class=\"xscript\"><sup>"+(layer==3?"":layer)+"</sup><sub>"+(num>7?Math.floor((num+6)/7):"")+"</sub></span>)"
}
function questionData(question) {
	if (question.type == "gapfill") return {gapFillArray:question.words,gapFillLength:null}
	if (question.type == "multiplechoice") return {multipleChoiceChosen:Array(question.answers.length).fill(0)}
	return {}
}
function questionAnswerHTML(question,id) {
	id=String(id)
	if (id=="") id="r"
	if (question.type == "open") {
		return "<textarea id=\"answerLine_"+id+"\" style=\"width:calc(100% - 12px)\"></textarea><br><br>"
	} else if (question.type == "gapfill") {
		let out = ""
		for (let i=0;i<question.words.length;i++) {
			out += question.words[i][1]==null?(question.words[i][0]):("<input class=\"gapfillAnswer\" type=\"text\" id=\"gapFillAnswer_"+id+"_"+currentQuestionData[id].gapFillArray[i][2]+"\" style=\"font-family:'Verdana'\"></input>")
		}
		return "<div id=\"answerLine_"+id+"\">"+out+"</div><br><br>"
	} else if (question.type == "multiplechoice") {
		let out = ""
		let locationOfOptions = "currentQuestionData['"+id+"'].multipleChoiceChosen"
		for (let i=0;i<question.answers.length;i++) out += "<button id=\"multipleChoiceAnswer_"+id+"_"+i+"\" onClick=\""+locationOfOptions+"["+i+"]=1-"+locationOfOptions+"["+i+"]\">"+question.answers[i][0]+"</button>"
		return out+"<br><br>"
	} else {
		crash("Question \""+question.text+"\" has no type.")
	}
}
function maxMarkHTML(x) {
	if (typeof x == "object") x = maxMark(x) // if a question is input
	return "<span style=\"float:right\">("+formatNum(x)+")</span>"
}
function reviewMarkHTML(earned,max) {
	return "<span style=\"float:right;color:hsl("+(120*earned/max)+" 100% 30%)\">("+formatNum(earned)+" / "+formatNum(max)+")</span>"
}
function colorQuestionPart(text,question) {
	let level = averageLevel(question)
	let magenta = ((level>9)?(2230-level*223):(259-level*4)).toString(16)
	return "<div style=\"color:#"+magenta.toString(16).padStart(2,"0")+"ff"+magenta.toString(16).padStart(2,"0")+";width:100%\">"+text+"</div>"
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
function loop() {
	if (state == "sleeping") {
		// do nothing in this stage
	} else if (state == "nextQuestion") {
		if (questions.length==questionsAnswered) {
			state = "sleeping"
			iotas = [iota("recall"),iota("speed"),iota("depth"),iota("specialization")]
			document.getElementById("recallScore").innerHTML = formatNum(scores.recall.score)
			document.getElementById("speedScore").innerHTML = formatNum(scores.speed.score)
			document.getElementById("depthScore").innerHTML = formatNum(scores.depth.score)
			document.getElementById("specializationScore").innerHTML = formatNum(scores.specialization.score)
			document.getElementById("recallMax").innerHTML = formatNum(scores.recall.max)
			document.getElementById("speedMax").innerHTML = formatNum(scores.speed.max)
			document.getElementById("depthMax").innerHTML = formatNum(scores.depth.max)
			document.getElementById("specializationMax").innerHTML = formatNum(scores.specialization.max)
			tab("end")
		} else {
			currentQuestion = questions[questionsAnswered]
			compositeParts = mapQuestion(currentQuestion)
			for (let i of compositeParts) currentQuestionData[i] = questionData(accessQuestion(i))
			generateQuestion()
			for (let i of compositeParts) if (accessQuestion(i).type == "open") {
				document.getElementById("textareaReplicator").value = accessQuestion(i).modelAnswer
				document.getElementById("answerLine_"+i).style.height = document.getElementById("textareaReplicator").scrollHeight+"px"
			}
			state = "answering"
			for (let i=0;i<answerdivs.length;i++) answerdivs[i].style.display = "none"
			
			timestamp = Date.now()			// The time when the question was started. Used to calculate Speed score.
		}
	} else if (state == "answering") {
		tab("quiz")
		let timePassed = (Date.now()-timestamp)/1000
		document.getElementById("time").innerHTML = (timePassed<questionPar(currentQuestion))?("<span style=\"color:#ffff00\">"+(questionPar(currentQuestion)-timePassed).toFixed(1)+" seconds to par time</span>"):("<span style=\"color:#ff0000\">"+(questionPar(currentQuestion)*2-timePassed).toFixed(1)+" seconds left</span>")
		if (timePassed/questionPar(currentQuestion)>2) check()
		for (let id of compositeParts) if (accessQuestion(id).type=="multiplechoice") for (let i=0;i<accessQuestion(id).answers.length;i++) document.getElementById("multipleChoiceAnswer_"+id+"_"+i).style["background-color"] = (currentQuestionData[id].multipleChoiceChosen[i]==1?"#990099":"#999999")
	} else if (state == "terminus") {
		let highestIota = iotas.reduce((x,y) => Math.max(x,y))
		let animationLength = 5+25*Math.log10(Math.log2(Math.log2(highestIota+4)))
		let shown = highestIota*(Date.now()-timestamp)/(animationLength*1000)
		let animIotas = countTo(4).map(i=>Math.round(Math.min(iotas[i],shown+(3-i)/4)))
		document.getElementById("iotaRecall").innerHTML = formatNum(animIotas[0])
		document.getElementById("iotaSpeed").innerHTML = formatNum(animIotas[1])
		document.getElementById("iotaDepth").innerHTML = formatNum(animIotas[2])
		document.getElementById("iotaSpecialization").innerHTML = formatNum(animIotas[3])
		document.getElementById("overallIota").innerHTML = formatNum(animIotas.reduce((x,y) => x+y))
		document.getElementById("overallLevel").innerHTML = formatNum(level(animIotas.reduce((x,y) => x+y)))
		document.getElementById("overallLevel").className = "level"+level(animIotas.reduce((x,y) => x+y))
		document.getElementById("nextLevelBoundary").innerHTML = formatNum(levelBoundaries[level(animIotas.reduce((x,y) => x+y))+1])
		if (Date.now()>timestamp+animationLength*1000) {
			if (iotas.reduce((x,y) => x+y)==maxIotas.reduce((x,y)=>x+y)) document.getElementById("overallLevel").className = "shiny9"
			document.getElementById("endButtons").style.display = "inline-block"
			state = "sleeping"
		}
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
			if (out[mark]==undefined) out[mark]=1
			else out[mark]++ 
		}
		return out
	},
	// Finds a question by text.
	findByText: function(file,key) {
		return file[file.map(x => x.text.search(key)==-1).indexOf(false)]
	}
}
function dictionary(key,array) {
	if (!(array instanceof Array)) crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid array")
	if (array.map(x=>x instanceof Array).includes(false)) crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid array")
	if (array.map(x=>x.length==2).includes(false)) crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid array")
	try {return array[array.map(x => x[0]).indexOf(key)][1];} catch {crash("dictionary("+JSON.stringify(key)+","+JSON.stringify(array)+") has an invalid key")}
}
function ordinal(num){return ordinal+(((num%10==1)&&(num%100!==11))?"st":((num%10==2)&&(num%100!==12))?"nd":((num%10==3)&&(num%100!==13))?"rd":"th")}
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
function expandListOfAbbreviations(qList,topicCallback) {
	let lists = qList.select(ranint(2,Math.ceil(qList.length**0.75))).sort((a,b)=>a[0]-b[0])
	let out = []
	for (let i of lists) {
		out.push({
			text:"Expand each of the following abbreviations from "+topicCallback(i[0]),type:"composite",components:(function(){
				let out2 = []
				i[1]=i[1].shuffle()
				for (let j=0;j<i[1].length;j++) {
					out2.push({text:i[1][j][0],type:"open",level:i[1][j][2],modelAnswer:i[1][j][1],mark:function(answer){let modelKeywords=i[1][j][1].split(/[- ]+/).flat();let counter=0;for(let word of modelKeywords){if(answer.search(word)!==-1){counter++}};return Math.floor(modelKeywords.length*0.4+0.6)*(counter/modelKeywords.length)**2},par:10})
					if (Math.random()<j/10) break
				}
				return out2
			})()
		})
	}
	return {text:"",type:"composite",components:out}
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