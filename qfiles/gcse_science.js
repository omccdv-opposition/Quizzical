"use strict";
var question_file_at_gcse_biochem = [
	{
		text:"State what is meant by a limiting factor.",
		type: "open",
		topic:"limiting factors",
		modelAnswer:"A variable which prevents another variable from increasing.",
		mark:function(answer){return {2:keyword(answer,["variable","factor"],1,1/3)+keyword(answer,["prevent","stop"],1,1/3)+keyword(answer,["increas","go up","going up","ris","grow"],1,1/3)}},
		par:15
	}
]
var question_file_at_gcse_biophy = []
var question_file_at_gcse_chemphy = [
	{
		text:"Describe the contribution that Democritus made to the atomic model.",
		type:"open",
		topic:"the history of the atom",
		modelAnswer:"Democritus proposed the existence of the atom. He viewed them as tiny spheres that are elementary and separated by empty space.",
		mark:function(answer){return "445".slice(0,keyword(answer,["exist","sphere","elementary","separated","empty space"],5,0.6))},
		par: 60
	},
	{
		text:"Describe the contribution that John Dalton made to the atomic model.",
		type:"open",
		topic:"the history of the atom",
		modelAnswer:"John Dalton proposed the 'solid sphere' atomic model and that different types of sphere make up different elements.",
		mark:function(answer){return "34".slice(0,keyword(answer,["solid","different","elements"],3,2/3))},
		par: 60
	},
	{
		text:"Describe the contribution that J.J. Thomson made to the atomic model.",
		type:"open",
		topic:"the history of the atom",
		modelAnswer:"J.J. Thomson proposed that atoms contain even smaller negatively charged particles bound inside positively charged balls. This is formally known as the 'plum pudding' model.",
		mark:function(answer){return "445".slice(0,keyword(answer,["smaller","negative","positive","charge","plum pudding"],5,0.6))},
		par: 60
	},
	{
		text:"Explain the contribution that Ernest Rutherford and his students Hans Geiger and Ernest Marsden made to the atomic model.",
		level:8,
		type:"open",
		topic:"the history of the atom",
		modelAnswer: `Rutherford and his students conducted the famous gold foil experiment in 1909.
							<br>They fired positively charged alpha particles at an extremely thin sheet of gold - from the plum pudding model, they expected the alpha particles to
							<br>either pass through the sheet or be slightly refracted, as the positive charge of the atom was thought to be very spread out.
							<br>However, while most of the particles did go through the sheet, some were significantly deflected and some were deflected backwards. This proved that the plum pudding model cannot be right.
							<br>Rutherford came up with a new theory of a positively charged nucleus surrounded by a 'cloud' of negatively charged electrons.`,
		mark:function(answer){
			let marks = keyword(answer,["gold","positive","alpha particle","plum pudding","slightly","reflect","spread out","back","nucleus","cloud"],10,0.5)+keyword(answer,["pass","through"],1,0.5)
			return "67778".slice(0,marks)
		},
		par: 120
	},
	{
		text:"Explain the contribution that Niels Bohr made to the atomic model.",
		level:8,
		type:"open",
		topic:"the history of the atom",
		modelAnswer: `Niels Bohr realised that electrons in a 'cloud' around the nucleus would be attracted to it, causing the atom to collapse.
							<br>He proposed a new model of the atom where the electrons were contained in shells.
							<br>In this model, electrons can only exist in fixed orbits, or shells, and not anywhere in between them. Each shell has a fixed energy level.
							<br>This theory was supported by many experiments and helped to explain the observations of other scientists at the time.`,
		mark:function(answer){
			let marks = keyword(answer,["cloud","attract","collapse","electrons","shells","fixed","orbits","not","between","energy","support","experiment","observation"],13,0.5)
			return "678789".slice(0,marks)
		},
		par: 120
	},
	{
		text:"State the contribution that James Chadwick made to the atomic model.",
		type:"open",
		topic:"the history of the atom",
		modelAnswer:"James Chadwick proposed the existence of neutrons alongside positively charged protons.",
		mark:function(answer){return keyword(answer,["neutr"])?"3":""},
		par: 30
	},
	{
		text:"Put the following scientists in order of when they contributed to the atomic model, starting with the earliest.",
		type:"order",
		topic:"the history of the atom",
		answers:orderGenerator(["Democritus","John Dalton","J.J. Thomson","Ernest Rutherford","Niels Bohr","James Chadwick"],4),
		markTransform:x=>"123".slice(0,x),
		par:24
	},
]
var question_file_at_gcse_science = [
	(()=>{
		let posbase = ranint(1,9,true)*100+ranint(1,9)*10+ranint(1,9)
		let negbase = ranint(1,9,true)*100+ranint(1,9)*10+ranint(1,9)
		let posexponent = ranint(3,12,true)
		let negexponent = ranint(3,12,true)
		return blankComposite([
			{
				text:"Express 0."+Array(negexponent).join("0")+negbase+" in standard form.",
				type:"gapfill",
				level:Math.floor(2.5+negexponent/2),
				topic:"standard form",
				words:gapfillGenerator([[Math.floor(negbase/100)+"."+(negbase%100),(answer)=>{return answer==(Math.floor(negbase/100)+"."+(negbase%100))?1:0}]," × 10<sup>",[String(-negexponent),(answer)=>{return answer==String(-negexponent)?1:0}],"</sup>"],2),
				markTransform:x=>"45".slice(0,x),
				par:20
			},
			{
				text:"Express "+posbase+Array(posexponent-2).join("0")+" in standard form.",
				type:"gapfill",
				level:Math.floor(1.5+posexponent/2),
				topic:"standard form",
				words:gapfillGenerator([[Math.floor(posbase/100)+"."+(posbase%100),(answer)=>{return answer==(Math.floor(posbase/100)+"."+(posbase%100))?1:0}]," × 10<sup>",[String(posexponent),(answer)=>{return answer==String(posexponent)?1:0}],"</sup>"],2),
				markTransform:x=>"45".slice(0,x),
				par:20
			}
		].select(Math.random()<0.25?1:2).qSort())
	})()
]