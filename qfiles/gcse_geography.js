"use strict";
var question_file_at_gcse_geography = [
	// Topic 1
	(()=>{
		let mode = Math.random()<0.25?1:0
		let order = ["Lithosphere","Asthenosphere","Lower mantle","Outer core","Inner core"]
		if (mode==1) order.reverse()
		return {
			text:"Put the following layers of the Earth in order of depth, starting with the "+["most shallow","deepest"][mode]+".",
			type:"order",
			topic:"Earth's layers",
			answers:orderGenerator(order,4),
			markTransform:x=>"34".slice(0,x),
			par:20
		}
	})(),
	(()=>{
		let mode = Math.random()<0.25?1:0
		let order = ["Troposphere","Stratosphere","Mesosphere","Thermosphere","Ionosphere","Exosphere"]
		if (mode===1) order.reverse()
		return {
			text:"Put the following layers of the atmosphere in order of altitude, starting with the "+["lowest","highest"][mode]+".",
			type:"order",
			topic:"Earth's layers",
			answers:orderGenerator(order,4),
			markTransform:function(x){return {A:x}},
			par:20
		}
	})(),
	{
		text:"Name the two types of crust.",
		type:"open",
		topic:"Earth's layers",
		modelAnswer:"Continental crust; oceanic crust",
		mark:function(answer){return {3:keyword(answer,["continental","oceanic"])}},
		par:15
	},
	multipleChoiceComposite("For each of the below, select which type of crust it describes.",[
		["Thicker than the other type","Continental","2"],
		["Thinner than the other type","Oceanic","2"],
		["Denser than the other type","Oceanic","2"],
		["Less dense than the other type","Continental","2"],
		["The UK is located on this type of crust","Continental","A"]
	],3,"Earth's layers"),
	multipleChoiceComposite("For each of the below, select which layers of the Earth it describes.",[
		["Ranges from 5 to 70 kilometres thick","Crust","3"],
		["2900 kilometres thick","Mantle","3"],
		["Has a maximum temperature of 400°C","Crust","3"],
		["Has both solid and liquid parts",["Mantle","Core"],"5",x=>x/2],
		["Almost pure iron and nickel","Core","3"],
		["Densest part of Earth","Core","4"],
		["Contains the lithosphere",["Crust","Mantle"],"5",x=>x/2]
	],3,"Earth's layers"),
	blankComposite((()=>{
		let out = [
			{
				label:"202306161707-1",
				text:"State the thickness of the mantle, correct to the nearest 100 kilometres.",
				type:"gapfill",
				topic:"Earth's layers",
				words:gapfillGenerator([gapfillExact("2900")," km"]),
				markTransform:x=>x?"2":"",
				par:10
			},
			{
				label:"202306161707-2",
				text:"State the thickness of the outer core, correct to the nearest 50 kilometres.",
				type:"gapfill",
				topic:"Earth's layers",
				words:gapfillGenerator([gapfillExact("2250")," km"]),
				markTransform:x=>x?"3":"",
				par:10
			},
			{
				label:"202306161707-3",
				text:"State the thickness of the inner core, correct to the nearest 10 kilometres.",
				type:"gapfill",
				topic:"Earth's layers",
				words:gapfillGenerator([gapfillExact("1220")," km"]),
				markTransform:x=>x?"4":"",
				par:10
			},
			{
				text:"The entire core of Earth is approximately the size of which planet?",
				type:"multiplechoice",
				topic:"Earth's layers",
				answers:multipleChoiceGenerator(["Mars"],1,["Mercury","Venus","Earth","Jupiter","Saturn","Uranus","Neptune","Pluto"],4),
				markTransform:x=>x?"A":"",
				par:10
			}
		].select(ranint(1,4,true))
		if (out.map(x=>x.label).includes("202306161707-2")&&out.map(x=>x.label).includes("202306161707-3")&&(Math.random()<0.6)) {
			out.push({
				get text(){return "Using your answers to parts "+[2,3].map(x=>getQuestionPartNameFromLabel("202306161707-"+x)).sort().join(" and ")+", estimate the thickness of the entire core."},
				type:"gapfill",
				topic:"Earth's layers",
				words:gapfillGenerator([gapfillExact("3470")," km"]),
				markTransform:x=>x?"4":"",
				par:10
			})
			if (out.map(x=>x.label).includes("202306161707-1")&&(Math.random()<0.9)) out.push(blankComposite([
				{
					label:"202306161715",
					get text(){return "Using your answers to parts "+[1,2,3].map(x=>getQuestionPartNameFromLabel("202306161707-"+x)).sort().joinWithAnd()+", estimate the thickness of the crust."},
					type:"gapfill",
					topic:"Earth's layers",
					words:gapfillGenerator([gapfillExact("8")," km"]),
					markTransform:x=>x?"5":"",
					par:10
				},
				{
					get text(){return "Given that continental crust is 30 km thick and oceanic crust is 5 km thick, what percentage of your answer to part "+getQuestionPartNameFromLabel("202306161715")+" is the true thickness of:<br>● continental crust?<br>● oceanic crust?"},
					type:"multiplechoice",
					topic:"Earth's layers",
					answers:multipleChoiceGenerator(["27%","160%"],2,["20%","40%","53%","60%","80%","120%","200%"],4),
					markTransform:x=>"67".slice(0,x),
					par:20
				}
			].slice(0,ranint(1,2))))
		}
		return out
	})().sort((a,b)=>baseSpellPoints(a)-baseSpellPoints(b)+Math.random())),
	{
		text:"Select the two elements which mostly make up the core of Earth.",
		type:"multiplechoice",
		topic:"Earth's layers",
		answers:multipleChoiceGenerator(["iron","nickel"],2,["cobalt","copper","zinc","aluminium","lithium","promethium","silver","gold","sodium","potassium","magnesium"],6),
		markTransform:x=>"34".slice(0,x),
		par:15
	},
	// Topic 5
	{
		text:"Shown below are the 10 largest urban core areas in the UK. Sort them in order of size:",
		type:"order",
		topic:"the UK's largest cities",
		answers:orderGenerator(["London","Manchester","Birmingham","Leeds","Newcastle","Sheffield","Southampton","Nottingham","Liverpool","Glasgow"]),
		markTransform:function(x){return {A:x}},
		par:40
	},
	(()=>{
		let num = ranint(1,ranint(1,4,true),true)
		return {
			text:"Explain "+pluralize(num,"key difference")+" between urban and rural areas.",
			type:"open",
			topic:"urban and rural areas",
			modelAnswer:[
				"Urban areas have higher population density than rural areas as people migrate to urban areas in search for better employment and healthcare.",
				"Rural areas have a higher median age as the brain drain attracts young people to cities, and elderly people migrate to rural areas once they retire.",
				"Rural areas are mainly active in the primary and secondary sectors, whereas urban areas are mainly active in the tertiary and quaternary sectors.",
				"Rural areas have more high-rise buildings and buildings are denser and more expensive. Conurbations form."
			].select(num).join("<br>"),
			mark:function(answer){
				if (keyword(answer,["urban","rural"])<2) return {}
				let marks = [
					keyword(answer,["population density"])?(keyword(answer,["migrat","natural increase"])?2:1):0,
					keyword(answer,["age structure","median age"])?(keyword(answer,["migrat","brain drain"])?2:1):0,
					(keyword(answer,["primary","secondary","tertiary","quaternary"])>1)?(keyword(answer,["econom"])?2:1):0,
					(keyword(answer,["building","density","high-rise","conurbation"])+keyword(answer,["expensive","price"],1))/2
				]
				let out = bestMarks(marks,num,"56")
				let extra = 0
				if (out[6]>2) {extra=out[6]-2;out[6]=2}
				if (out[5]===4) {extra++;out[5]=3}
				return addMarks([out,"789".slice(0,extra)])
			}
		}
	})(),
/*	multipleChoiceComposite("For each of the below jobs and economic activities, select whether it is more likely to be found in an urban core or rural area:",[
		["Corporate headquarters","Urban","1"],
		["Museum","Urban","1"],
		["Theatre","Urban","1"],
		["Farming","Rural","1"],
		["Fishing","Rural","1"],
		["Forestry","Rural","1"]
	],ranint(2,5,true),"urban and rural areas"),
	(()=>{
		let types = ["emigration","immigration","national migration","international migration","retirement migration","rural-to-urban migration"]
		let questions = types.select(ranint(1,ranint(1,ranint(1,3,true),true),3,true))
		finish
	})() */
	// Miscellaneous
]