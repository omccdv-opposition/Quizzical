"use strict"
// This clears any cached data.
document.getElementById("answerLine").value = ""

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

document.getElementById("answerLine").addEventListener("keypress",function(event){
  if (event.keyCode==13) enters++
  else enters=0
  if (enters==3) {check(); enters=0}
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

var timestamp          // This variable serves many purposes, but only one at a time is ever used.

var enters = 0         // Press enter key 3 times in a row to quickly check your answer.

// The average number of marks per question varies, so the same must apply to the specialization point threshold.
var specialization_threshold

// Acts as a "weak min" - a value that exceeds the limit is not reduced to the limit but instead increases much slower past the limit.
function converge(value,limit) {
  if (value<limit) return value
  return limit*(2-1/(1+Math.log(value/limit)/10))
}

function modulo(number,modulus) {
  return number-modulus*Math.floor(number/modulus)
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

// If a variable is a function, returns the result of the function. Otherwise, returns the value of the variable.
function halfFunction(x) {
  return (typeof eval(x) == "undefined")?undefined:(typeof eval(x) == "function")?eval(x+"()"):eval(x)
}

// Multiplies max iotas by a random number in a weak attempt to make the process more transparent.
function maxIotaSeed(x) {
  let seed = Math.sin(Object.values(scores).map(x => x.max).reduce((x,y) => x*y)**Math.exp(-1))
  let index = ["recall","speed","depth","specialization"].indexOf(x)+1
  let out = 0.1*seed-0.05*Math.cos(index*seed)
  return Math.exp(out)/2
}

function maxIotaStepSize(x) {
  let x_mantissa = 10**(Math.log10(x)%1)
  let x_exponent = Math.floor(Math.log10(x))
  let out_mantissa = (x_mantissa>5)?2:(x_mantissa>2)?1:0.5
  let out_exponent = x_exponent-1
  return Math.ceil(out_mantissa*10**out_exponent)
}

function maxIota(category) {
  let base = Array(4)
  base[0] = scores.recall.max
  base[2] = converge(Math.sqrt(scores.recall.max*scores.depth.max)*2/3,scores.recall.max)
  base[1] = converge((scores.recall.max+Math.sqrt(scores.recall.max*scores.depth.max))*2/3,scores.recall.max*1.2)
  base[3] = converge(scores.specialization.max*specialization_threshold,scores.recall.max*0.8)
  let relevant = base[["recall","speed","depth","specialization"].indexOf(category)]
  let sum = base.reduce((x,y) => x+y)
  return maxIotaStepSize(sum)*Math.ceil(relevant/maxIotaStepSize(sum))
}

function iota(category) {
  if (scores[category].max==0) return 0
  let ratio = scores[category].score/scores[category].max
  ratio = 1.5*ratio-0.5*ratio**2
  return Math.floor(ratio*maxIota(category))
}

function overallIota() {
  return iota("recall")+iota("speed")+iota("depth")+iota("specialization")
}

function overallMaxIota() {
  return maxIota("recall")+maxIota("speed")+maxIota("depth")+maxIota("specialization")
}

function levelBoundary(x) {
  if (![0,1,2,3,4,5,6,7,8,9,10].includes(x)) crash(x+" is not a valid level.")
  if (x==10) return Infinity
  let recall_ratio = (x/10)**0.75
  let speed_ratio = (x/10)**0.875
  let depth_ratio = (x/10)
  let specialization_ratio = (x/10)**1.25
  return Math.ceil(recall_ratio*maxIota("recall") + speed_ratio*maxIota("speed") + depth_ratio*maxIota("depth") + specialization_ratio*maxIota("specialization"))
}

function level() {
  let out = 0
  while (overallIota()>levelBoundary(out+1)) out++
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
  for (let i=0;i<Object.keys(globalThis).length;i++) if (Object.keys(globalThis)[i].substr(0,17)=="question_file_at_") out.push(Object.keys(globalThis)[i])
  return out
}

function loadTopic() {
  let topics
  if (document.getElementById("topicSelector").value=="all") topics = allQuestionFiles()
  else topics = document.getElementById("topicSelector").value.split(",").map(x => "question_file_at_"+x)
  let question_list = []
  for (let i=0;i<topics.length;i++) question_list.push(eval(topics[i]))
  question_list=question_list.flat()
  for (let i=0;i<questions.length;i++) {
    if (!["string","function"].includes(typeof questions[i].text)) {crash("Question #"+(i+1)+" of this file is undefined."); return}
    if (typeof questions[i].advanced !== "boolean") {crash("Question #"+i+" \""+questions[i].text+"\" has no 'advanced' property."); return}
    if (!["string","function"].includes(typeof questions[i].modelAnswer)) {crash("Question #"+i+" \""+questions[i].text+"\" has no 'modelAnswer' property."); return}
    if (typeof questions[i].mark !== "function") {crash("Question #"+i+" \""+questions[i].text+"\" has no 'mark' property."); return}
    if (typeof questions[i].par !== "number") {crash("Question #"+i+" \""+questions[i].text+"\" has no 'par' property."); return}
    if (maxMark(questions[i]) == 0) {crash("Question #"+i+" \""+halfFunction(questions[i].text)+"\" is worth 0 marks."); return}
    if (keyword(halfFunction("questions["+i+"].text").toString(),["undefined"],1,1) == 1) {crash("Question #"+i+" \""+halfFunction("questions["+i+"].text")+"\" is undefined."); return}
    if (keyword(halfFunction("questions["+i+"].modelAnswer").toString(),["undefined"],1,1) == 1) {crash("Question #"+i+" \""+halfFunction("questions["+i+"].text")+"\" has an undefined answer."); return}
  }
  question_list = shuffle(question_list)
  while (true) {
    let next = question_list.splice(0,1)[0]
    if (questions.length>0) if (questions.map(x => x.par).reduce((x,y) => x+y)>(document.getElementById("lengthSelector").value*60+next.par/2)) break
    if (question_list.length == 0) break
    questions.push(next)
  }
  specialization_threshold = questions.map(x => maxMark(x)).sort(function(a,b) {return a-b})[Math.ceil(questions.length*0.8)-1]+1
  scores.recall.max = questions.map(x => x.advanced?0:maxMark(x)).reduce((x,y) => x+y)
  scores.depth.max = questions.map(x => x.advanced?maxMark(x):0).reduce((x,y) => x+y)
  scores.speed.max = (scores.recall.max+scores.depth.max)*5
  scores.specialization.max = questions.map(x => maxMark(x)>=specialization_threshold?1:0).reduce((x,y) => x+y)
  document.getElementsByTagName("title")[0].innerHTML = "\"Quizzical\" by AleManInc: "+document.getElementById("topicSelector")[document.getElementById("topicSelector").selectedIndex].innerHTML
  updateHTML()
  tab("howToPlay")
}

function questionHTML() {
  let color = currentQuestion.advanced?"#00ff00":"#ffffff"
  let out = "<p style=\"color:"+color+"\">"+((typeof currentQuestion.text == "function") ? currentQuestion.text() : currentQuestion.text)
  out += " ("+maxMark(currentQuestion)+" mark"+(maxMark(currentQuestion)==1?"":"s")+")</p>"
  return out
}

function approximateEqual(x,y) {
  return Math.abs(Math.log10(x)-Math.log10(y))<0.0001
}

function check() {
  // Speed point factor is calculated first to minimize the impact of lag on it
  let timeTaken = Date.now()-timestamp
  let parTime = currentQuestion.par*1000
  let speedFactor = 5/Math.max(1,timeTaken/parTime)**Math.max(1,timeTaken/parTime)

  let marks = Math.min(currentQuestion.mark(document.getElementById("answerLine").value),maxMark(currentQuestion))
  let points = {recall:0,speed:0,depth:0,specialization:0}
  if (currentQuestion.advanced) points.depth=marks
  else points.recall=marks
  points.speed=Math.floor(marks*speedFactor)
  if (marks==maxMark(currentQuestion)&&marks>=specialization_threshold) points.specialization=1
  let categories = Object.keys(scores)
  state = "sleeping"
  document.getElementById("checkAnswers_question").innerHTML = questionHTML()
  document.getElementById("yourAnswer").innerHTML = document.getElementById("answerLine").value
  document.getElementById("modelAnswer").innerHTML = (typeof currentQuestion.modelAnswer == "function") ? currentQuestion.modelAnswer() : currentQuestion.modelAnswer
  document.getElementById("marksObtained").innerHTML = marks+"/"+maxMark(currentQuestion)
  for (let i=0;i<4;i++) {
    scores[categories[i]].score+=points[categories[i]]
    if (points[categories[i]]>0) document.getElementById("marksObtained").innerHTML += "<br><span class=\""+categories[i]+"\">(+"+points[categories[i]]+" "+toTitleCase(categories[i])+" points)</span>"
  }
  tab("checkAnswers")
  document.getElementById("answerLine").value = ""
}

/*
  Finds keywords within an answer.
  answer      the answer to check for keywords
  array       an array containing the keywords to look for
  max         the maximum number of keywords to give marks to (eg. for "nucleus" and "nuclei" set this to 1). Can set this to "u" for unlimited.
  marks       the number of marks to award per keyword (can be negative to prevent spam-scumming)
*/
function keyword(answer,array,max,marks) {
  let count = 0
  for (let i=0;i<array.length;i++) if (answer.toLowerCase().search(array[i].toLowerCase()) !== -1) count++
  return Math.min(count,(max=="u"?1e100:max))*marks
}

function clamp(value,max) {
  return Math.floor(Math.min(max,Math.max(0,value+1e-11)))
}

function updateHTML() {
  let tags = document.querySelectorAll('[data-i]')
  for (let num=0;num<tags.length;num++) tags[num].innerHTML = eval(tags[num].dataset.i)
}

function ranint(x,y,geo) {
  if (geo==undefined) geo = false
  if (geo) return Math.floor(x*(y/x)**Math.random())
  else return Math.round(x+(y-x)*Math.random())
}

function maxMark(question) {
  let model = (typeof question.modelAnswer == "function")?question.modelAnswer():question.modelAnswer
  return question.mark(model)
}

/*
Valid states are:
sleeping                        This does nothing until the user inputs something.
nextQuestion                    This picks a question and outputs it before entering the "answering" state.
answering                       This waits for the user to answer the current question.
*/
var state = "sleeping"

function loop() {
  if (state == "sleeping") {
    // do nothing in this stage
  } else if (state == "nextQuestion") {
    if (questions.length==0) {
      tab("end")
      updateHTML()
      state = "sleeping"
    } else {
      currentQuestion = questions.splice(0,1)[0]
      document.getElementById("currentQuestionP").innerHTML = questionHTML()
      state = "answering"
      timestamp = Date.now()      // The time when the question was started. Used to calculate Speed score.
    }
  } else if (state == "answering") {
    tab("quiz")
    let timeLeft = (timestamp+currentQuestion.par*1000-Date.now())/1000
    document.getElementById("time").innerHTML = (timeLeft>0)?("<span style=\"color:#ffff00\">"+timeLeft.toFixed(1)+" seconds to par time</span>"):("<span style=\"color:#ff0000\">"+(-timeLeft).toFixed(1)+" seconds past par time</span>")
  } else {
    crash(state+" is not a valid game state.")
  }
}

var loopvar = window.setInterval(loop,50)

function crash(message) {
  let name = document.getElementsByTagName("title")[0].innerHTML
  document.write("<!DOCTYPE html><body style=\"background-color:#190033\"><p style=\"color:#ff0000\">"+name+" has stopped working.<br>Details: "+message+"</p></body>")
}

const devtools = {
  // Returns the amount of each question worth each amount of marks.
  mode: function() {
    let highest = questions.map(x => maxMark(x)).reduce((x,y) => Math.max(x,y))
    let out = {}
    for (let i=1;i<=highest;i++) {
      let number = questions.map(x => maxMark(x)==i?1:0).reduce((x,y) => x+y)
      if (number>0) out[i]=number 
    }
    return out
  }
}