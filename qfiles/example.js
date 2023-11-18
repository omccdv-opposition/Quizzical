"use strict"
var question_file_at_example = [
	{
		text:"State the value of 4 + 6",
		type:"open",
		topic:"arithmetic",
		modelAnswer:"10",
		mark:markTemplate.number(10,"1"),
		par:10
	},
	{
		text:"Which of the following equal 4?",
		type:"multiplechoice",
		topic:"arithmetic",
		answers: multipleChoiceGenerator(["1+3","2+2","1+1+2","2×2","2<sup>2</sup>","8-4"],2,["3-1","4+4","0","22","40<sup>0.5</sup>"],2),
		markTransform:x=>"23".slice(0,x),
		par:15
	},
	{
		text:"Fill in the gaps:",
		type:"gapfill",
		topic:"atoms",
		words:gapfillGenerator(["Atoms are made of protons, ",["electrons",function(answer){return answer=="electrons"?{8:1}:{}}]," and neutrons. Protons have a charge of ",["+1 e",function(answer){return {9:keyword(answer,["+","1","e"],3,1/3)}}]," and electrons have a charge of ",["-1 e",function(answer){return {9:keyword(answer,["-","1","e"],3,1/3)}}],". Neutrons have no charge."],2),
		noTransform:true,
		par:25
	},
	{
		text:"Put the following expressions in ascending order:",
		type:"order",
		topic:"arithmetic",
		answers:orderGenerator(["4-3","1+1","9<sup>0.5</sup>","2*2","log<sub>2</sub>(32)","3!","2<sup>3</sup>-1","2<sup>2<sup>2</sup>-1</sup>","9"],4),
		markTransform:x=>"45".slice(0,x),
		par:30
	},
	{
		text:"Earth is located in the Solar System.",
		type:"composite",
		components:[
			{
				text:"Name four planets of the Solar System.",
				level:2,
				type:"open",
				topic:"astronomy",
				modelAnswer:"Mercury; Venus; Earth; Mars",
				mark:function(answer){
					let marks = keyword(answer,["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"],4)
					return "5667".slice(0,marks)
				},
				par:30
			},
			{
				text:"How many planets are in the Solar System?",
				level:2,
				type:"multiplechoice",
				topic:"astronomy",
				answers:multipleChoiceGenerator(["8"],1,["5","6","7","9"],4),
				markTransform:x=>x?"3":"",
				par:10
			},
			{
				text:"Fill in the gaps:",
				level:"A",
				type:"gapfill",
				topic:"astronomy",
				words:gapfillGenerator(["An ",["astronomical unit",function(answer){return answer.toLowerCase().trim()=="astronomical unit"?1:0}]," is approximately 150 million ",["km",function(answer){return keyword(answer,["km","kilometres","kilometers"],1)}],". This is the distance between ",["Earth",function(answer){return answer.toLowerCase().trim()=="earth"?1:0}]," and the Sun."],2),
				markTransform:x=>"77".slice(0,x),
				par:20
			},
			{
				text:"The Asteroid Belt is a region of the solar system.",
				type:"composite",
				components:[
					{
						text:"State the shape of the Asteroid Belt.",
						level:"A",
						type:"open",
						topic:"astronomy",
						modelAnswer:"Torus",
						mark:function(answer){return answer.trim().toLowerCase()=="torus"?"A":""},
						par:10
					},
					{
						text:"Fill in the gaps:",
						level:3,
						type:"gapfill",
						topic:"astronomy",
						words:gapfillGenerator(["The Asteroid Belt is situated between the planets ",["Mars",function(answer){return answer.toLowerCase().trim()=="mars"?1:0}]," and ",["Jupiter",function(answer){return answer.toLowerCase().trim()=="jupiter"?1:0}],"."],1),
						markTransform:x=>x?"4":"",
						par:10
					},
					{
						text:"Which <b>three</b> of the below are dwarf planets?",
						level:"A",
						type:"multiplechoice",
						topic:"astronomy",
						answers:multipleChoiceGenerator(["Ceres","Pluto","Haumea","Makemake","Eris"],3,["Kuiper","Oort","Herschel","Zeus","Pelle"],3),
						markTransform:x=>"4AA".slice(0,x),
						par:25
					}
				].shuffle()
			}
		].shuffle()
	},
	blankComposite([
		blankComposite([
			{
				text:"What does each letter stand for in 'RGB'?",
				level:"A",
				type:"gapfill",
				topic:"color models",
				words:gapfillGenerator(["R: ",["red",function(answer){return answer.trim().toLowerCase()=="red"?1:0}],"<br>G: ",["green",function(answer){return answer.trim().toLowerCase()=="green"?1:0}],"<br>B: ",["blue",function(answer){return answer.trim().toLowerCase()=="blue"?1:0}]],3),
				markTransform:function(x){return {6:x}},
				par:30
			},
			{
				text:"What color is obtained by mixing 255 units each of red, green and blue?",
				level:"A",
				type:"multiplechoice",
				topic:"color models",
				answers:multipleChoiceGenerator(["White"],1,["Black","Cyan","Magenta","Yellow","Gray"],5),
				markTransform:x=>x?"7":"",
				par:10
			}
		]),
		{
			text:"Which of the below is most likely to use the CMYK color model?",
			level:4,
			type:"multiplechoice",
			topic:"color models",
			answers:multipleChoiceGenerator(["Printing"],1,["Painting","Web design","Optics"],3),
			markTransform:x=>x?"8":"",
			par:10
		}
	]),
	{
		text:"This question is about SI units.",
		type:"composite",
		components:[
			{
				text:"How many base SI units are there?",
				level:"A",
				type:"multiplechoice",
				topic:"measurements",
				answers:multipleChoiceGenerator([7],1,[3,4,5,6,8,9],3),
				markTransform:x=>x?"6":"",
				par:10
			},
			blankComposite((()=>{
				let units = [["length","meter (m)"],["mass","kilogram (kg)"],["time","second (s)"],["amount of substance","mole (mol)"],["electric current","ampere (A)"],["luminous intensity","candela (cd)"],["temperature","kelvin (K)"]]
				let out = []
				for (let i of units.select(3)) out.push({
					text:"What is the SI base unit for "+i[0]+"?",
					level:"A",
					type:"multiplechoice",
					topic:"measurements",
					answers:multipleChoiceGenerator([i[1]],1,units.map(x=>x[1]).filter(x=>x!==i[1]),3),
					markTransform:x=>x?"7":"",
					par:10
				})
				return out
			})())
		]
	},
	{
		text:"<i>Antimatter Dimensions</i> is a popular incremental game.",
		type:"composite",
		components:[
			{
				text:"How many Antimatter Dimensions are there in the game?",
				type:"multiplechoice",
				level:4,
				topic:"Antimatter Dimensions",
				answers:multipleChoiceGenerator([8],1,[3,4,5,6,7,9,10,11],5),
				markTransform:x=>x?"2":"",
				par:10
			},
			{
				text:"There are five prestige layers in the game.",
				type:"composite",
				components:[
					{
						text:"Name the first four layers.",
						type:"open",
						level:6,
						topic:"Antimatter Dimensions",
						modelAnswer:"Dimension Shift; Antimatter Galaxy; Infinity; Eternity",
						mark:function(answer){
							let x = keyword(answer,["dimension","shift","boost"],2,0.5)+keyword(answer,["galaxy","infinity","eternity"])
							return "4456".slice(0,x)
						},
						par:10
					},
					{
						text:"The Celestials make up most of the fifth layer's content.",
						type:"composite",
						components:(()=>{
							let celestials = [["Teresa","Reality","#5151ec"],["Effarig","Ancient Relics","#d13737"],["The Nameless Ones","Time","#f1aa7f"],["V","Achievements","#ead584"],["Ra","the Forgotten","#9575cd"],["Lai'tela","Dimensions","#ffffff"],["Pelle","Antimatter","#dc143d"]]
							let out = []
							for (let i=0;i<7;i++) out.push({
								text:"State the full name of the celestial with symbol <span style=\"color:"+celestials[i][2]+"\">"+questionPartName(3,i+1).substring(1,questionPartName(3,i+1).length-41)+"</span>",
								type:"open",
								level:Math.floor(7+i/3),
								topic:"Antimatter Dimensions",
								modelAnswer:celestials[i][0]+", the Celestial of "+celestials[i][1],
								mark:function(answer){
									let out = ""
									if (keyword(answer,celestials[i][0])) out+="7778889"[i]
									if (keyword(answer,celestials[i][1])) out+="77A8989"[i]
									return out
								},
								par:10
							})
							return out
						})()
					}
				]
			}
		]
	},
	(()=>{
		let out = {
			text:"What is 10+10?",
			type:"open",
			topic:"arithmetic",
			modelAnswer:"20",
			mark:function(answer){return answer.trim()=="20"?"1":""},
			par:5
		}
		for (let i=9;i>=0;i--) out = blankComposite([
			{
				text:"What is "+i+"+"+i+"?",
				type:"open",
				level:1,
				topic:"arithmetic",
				modelAnswer:String(i*2),
				mark:function(answer){return answer.trim()==String(i*2)?"1":""},
				par:5
			},out
		])
		return out
	})()
]