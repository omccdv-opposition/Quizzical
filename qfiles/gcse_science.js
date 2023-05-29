"use strict";
var question_file_at_gcse_biochem = [
	{
		text:"State what is meant by a limiting factor.",
		level:2,
		type: "open",
		modelAnswer:"A variable which prevents another variable from increasing.",
		mark:function(answer){return keyword(answer,["variable","factor"],1,1/3)+keyword(answer,["prevent","stop"],1,1/3)+keyword(answer,["increas","go up","going up","ris","grow"],1,1/3)},
		par:15
	}
]
var question_file_at_gcse_biophy = []
var question_file_at_gcse_chemphy = []
var question_file_at_gcse_science = [
	(()=>{
		let posbase = ranint(10,99,true)*10+ranint(1,9)
		let negbase = ranint(10,99,true)*10+ranint(1,9)
		let posexponent = ranint(3,12,true)
		let negexponent = ranint(3,12,true)
		return {
			text:"",
			type:"composite",
			components:[
				{
					text:"Express 0."+Array(negexponent).join("0")+negbase+" in standard form.",
					type:"gapfill",
					level:Math.floor(2.5+negexponent/2),
					words:gapfillGenerator([[Math.floor(negbase/100)+"."+(negbase%100),(answer)=>{return answer==(Math.floor(negbase/100)+"."+(negbase%100))?1:0}]," × 10<sup>",[String(-negexponent),(answer)=>{return answer==String(-negexponent)?1:0}],"</sup>"],2),
					markTransform:x=>x,
					par:20
				},
				{
					text:"Express "+posbase+Array(posexponent-2).join("0")+" in standard form.",
					type:"gapfill",
					level:Math.floor(1.5+posexponent/2),
					words:gapfillGenerator([[Math.floor(posbase/100)+"."+(posbase%100),(answer)=>{return answer==(Math.floor(posbase/100)+"."+(posbase%100))?1:0}]," × 10<sup>",[String(posexponent),(answer)=>{return answer==String(posexponent)?1:0}],"</sup>"],2),
					markTransform:x=>x,
					par:20
				}
			].select(Math.random()<0.25?1:2)
		}
	})()
]