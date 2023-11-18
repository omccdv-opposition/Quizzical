"use strict"
var question_file_at_gcse_physics = [
	// P1
	{
		text:"Describe an experiment to calculate the density of an irregular solid.",
		type:"open",
		topic:["density","states of matter"],
		modelAnswer: `To measure the density of a substance, it is necessary to measure its mass and volume first and use the formula: \"Density = Mass / Volume\".
							<br>The mass of the solid can be measured using a mass balance.
							<br>To measure the volume of the solid, fill a Eureka can with water so that the water level is just under the spout.
							<br>This can be done by overfilling it slightly and letting excess water drain away.
							<br>Then, place a measuring cylinder under the spout to measure the volume of water displaced.
							<br>Gently lower the irregular solid into the can - for example, using a thin, strong thread.
							<br>The object will displace the water in the can and cause it to drain from the spout.
							<br>The volume of water displaced will equal the volume of the solid.
							<br>Precision can be ensured by repeating three times and calculating a mean.`,
		mark:function(answer){
			let marks = clamp(keyword(answer,["density","measure","mass","formula","volume","mass balance","Eureka can","under","spout","overfill","drain","measuring cylinder","displace","irregular solid","equal","precision","repeat","calculate","mean"],"u",0.5),9)
			return "778789899".slice(0,marks)
		},
		par: 180
	},
	{
		text:"",
		type:"composite",
		components:(()=>{
			let changes = [["solid","liquid","melting",2],["liquid","solid","freezing",2],["solid","gas","sublimation",4],["gas","solid","deposition",4],["liquid","gas",["boiling","evaporation"],3],["gas","liquid","condensation",2],["gas","plasma","ionization","A"],["plasma","gas","recombination","A"]]
			let out = []
			for (let i of changes.select(ranint(2,4,true))) out.push({
				text:"Name "+((i[2] instanceof Array)?"a":"the")+" state change from "+i[0]+" to "+i[1],
				type:"open",
				topic:"states of matter",
				modelAnswer:(i[2] instanceof Array)?i[2][0]:i[2],
				mark:function(answer){return keyword(answer,(i[2] instanceof Array)?i[2]:[i[2]])?i[3]:{}},
				par:10
			})
			return out.sort((a,b)=>baseSpellPoints(a)-baseSpellPoints(b)+Math.random())
		})()
	},
	{
		text:"Outline the difference between an open and closed system.",
		type:"open",
		topic:"open and closed systems",
		modelAnswer:"In a closed system no particles can enter or leave. In an open system, it is possible for particles to enter and leave.",
		mark:function(answer){return "334".slice(0,keyword(answer,["closed system","no","particles","open system"],4,0.5)+keyword(answer,["enter","in"],1,0.5)+keyword(answer,["leave","exit","out"],1,0.5))},
		par: 30
	},
	// P5
	{
		text:"What type of spectrum do electromagnetic waves form?",
		type:"multiplechoice",
		topic:"the EM spectrum",
		answers:multipleChoiceGenerator(["Continuous"],1,["Discrete","Discontinuous","Electromagnetic"],3),
		markTransform:x=>x?"2":"",
		par:10
	},
	{
		text:"Put the types of electromagnetic wave in order of increasing frequency",
		type:"order",
		topic:"the EM spectrum",
		answers:orderGenerator(["Radio","Micro","Infrared","Visible","Ultraviolet","X-ray","Gamma"]),
		markTransform:x=>"123".slice(0,x),
		par:30
	},
	{
		text:"How do the speeds of electromagnetic radiation differ:<ul><li>in a vacuum</li><li>in air</li></ul>",
		type:"open",
		topic:"the EM spectrum",
		modelAnswer:"Electromagnetic waves all travel at the same speed in a vacuum and air",
		mark:function(answer){return {3:keyword(answer,["same","equal"],1)}},
		par:20
	},
	{
		text:"What type of waves can be produced by oscillations in an electrical circuit?",
		type:"multiplechoice",
		topic:"the EM spectrum",
		answers:multipleChoiceGenerator(["Radio"],1,["Micro","Infrared","Visible","Ultraviolet","X-ray","Gamma"],3),
		markTransform:x=>x?"3":"",
		par:10
	},
	{
		text:"State how gamma radiation is usually created.",
		type:"open",
		topic:"the EM spectrum",
		modelAnswer:"Radioactive decay in the nuclei of atoms",
		mark:function(answer){return {4:keyword(answer,["decay"])}},
		par:10
	},
	// Miscellaneous
	{
		text:"Select the correct symbol for each unit.",
		type:"composite",
		components:(()=>{
			let list = [
				["density","4","ρ",["p","P","d","D"]],
				["mass","2","m",["M","k","g"]],
				["volume","2","V",["v","A","a","s"]],
				["gravitational field strength","4","g",["f","G","W","N"]],
				["wavelength","5","λ",["Λ","l","L","w","v"]],
				["frequency","4","f",["F","φ","H","z"]]
			].shuffle().filter((x,i)=>Math.random()<0.8**i)
			let out = []
			for (let i of list) out.push({
				text:i[0],
				type:"multiplechoice",
				topic:"unit symbols",
				answers:multipleChoiceGenerator([i[2]],1,i[3],3),
				markTransform:x=>x?i[1]:{},
				par:10
			})
			return out.qSort()
		})()
	}
]
// continue from page 15