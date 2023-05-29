"use strict"
var question_file_at_gcse_physics = [
	// P1
	{
		text:"Describe an experiment to calculate the density of an irregular solid.",
		level:9,
		type:"open",
		modelAnswer: `To measure the density of a substance, it is necessary to measure its mass and volume first and use the formula: \"Density = Mass / Volume\".
							<br>The mass of the solid can be measured using a mass balance.
							<br>To measure the volume of the solid, fill a Eureka can with water so that the water level is just under the spout.
							<br>This can be done by overfilling it slightly and letting excess water drain away.
							<br>Then, place a measuring cylinder under the spout to measure the volume of water displaced.
							<br>Gently lower the irregular solid into the can - for example, using a thin, strong thread.
							<br>The object will displace the water in the can and cause it to drain from the spout.
							<br>The volume of water displaced will equal the volume of the solid.
							<br>Precision can be ensured by repeating three times and calculating a mean.`,
		mark:function(answer){return clamp(keyword(answer,["density","measure","mass","formula","volume","mass balance","Eureka can","under","spout","overfill","drain","measuring cylinder","displace","irregular solid","equal","precision","repeat","calculate","mean"],"u",0.5),9)},
		par: 180
	},
	{
		volume1: ranint(20,50,true),
		mass1: ranint(200,400,true),
		volume2: ranint(20,30,true)*5,
		mass2: ranint(100,150,true),
		get text() {return "A metal bar with volume "+this.volume1+" cm<sup>3</sup> and mass "+this.mass1+" g is placed in "+this.volume2+" litres of an unknown liquid. The mass of the liquid is "+this.mass2+" kg.<br>Explain whether or not the bar will float in the liquid."},
		level:6,
		type:"open",
		get modelAnswer(){return `Density = Mass / Volume
													<br>The bar's mass is `+this.mass1+` g and its volume is `+this.volume1+` cubic centimetres. Its density is therefore (`+this.mass1+` / `+this.volume1+`) = `+(this.mass1/this.volume1).toFixed(1)+` g·cm<sup>3</sup>.
													<br>The liquid's mass is `+this.mass2+` kg and its volume is `+this.volume2+` litres. Its density is therefore (`+this.mass2+` / `+this.volume2+`) = `+(this.mass2/this.volume2).toFixed(1)+` g·cm<sup>3</sup>.
													<br>A solid will float in a liquid if it is less dense than the liquid. As the bar is denser than the liquid, it will not float.`},
		mark:function(answer){return clamp(keyword(answer,["density","mass","volume",String(this.mass1),String(this.mass2),String(this.volume1),String(this.volume2),String(Math.floor(this.mass1/this.volume1)),String(Math.floor(this.mass2/this.volume2)),"denser","not float"],"u",0.5)+keyword(answer,["/","divide","÷"],1,0.5)+keyword(answer,["cm³","cubic centimetre"],1,0.5),6)},
		par: 120
	},
	{
		text:"Name the eight basic state changes.",
		level:"A",
		type:"open",
		modelAnswer:"Freezing, melting, evaporation, condensation, sublimation, deposition, ionization, recombination",
		mark:function(answer){return keyword(answer,["freez","melt","evaporat","condens","sublim","deposit","ioniz","recombin"],8,5/8)},
		par: 40
	},
	{
		text:"Outline the difference between an open and closed system.",
		level:4,
		type:"open",
		modelAnswer:"In a closed system no particles can enter or leave. In an open system, it is possible for particles to enter and leave.",
		mark:function(answer){return keyword(answer,["closed system","no","particles","open system"],4,0.5)+keyword(answer,["enter","in"],1,0.5)+keyword(answer,["leave","exit","out"],1,0.5)},
		par: 30
	},
	{
		capacity: ranint(100,999,true)*10**ranint(-1,1),
		mass: ranint(15,40,true)*10,
		startTemp: ranint(3,20)*25,
		tempChange: ranint(3,25,true)*5,
		energyHeating: function() {return this.mass*this.tempChange*this.capacity/1e3},
		energyMelting: function() {return this.mass*this.latent/1e3},
		meltingPoint: function() {return Math.round(this.startTemp+this.tempChange*(1+Math.random())/3)},
		latent: ranint(100,999,true)*10**ranint(1,3),
		answer: function() {return this.energyHeating()+this.energyMelting()},
		roundedAnswer: function() {return Number(this.answer().toPrecision(3))},
		get text() {return "A block of metal with a mass of "+this.mass+" grams is heated from "+this.startTemp+"°C to "+(this.startTemp+this.tempChange)+"°C. The metal has a specific heat capacity of "+this.capacity+" J/kg°C, a melting point of "+this.meltingPoint()+"°C and a specific latent heat of fusion of "+this.latent+" J/kg. Calculate the energy transferred to the block, correct to 3 significant digits."},
		level:9,
		type:"open",
		get modelAnswer() {return `Change in Thermal Energy = Mass × Specific Heat Capacity × Change in Temperature
																 <br>The temperature change is equal to (`+(this.startTemp+this.tempChange)+` - `+this.startTemp+`) = `+this.tempChange+`°C
																 <br>1 kg = 1000 g, therefore `+this.mass+` g = `+(this.mass/1e3)+` kg
																 <br>Change in Thermal Energy = (`+(this.mass/1e3)+` kg) × (`+this.capacity+`J/kg °C) × (`+this.tempChange+` °C) = `+this.energyHeating()+` J
																 <br>+`+(this.mass*this.capacity*this.tempChange/1e3)+` was transferred in heating.
																 <br>Change in Thermal Energy = Mass × Specific Latent Heat = (`+(this.mass/1e3)+` kg) × (`+this.latent+` J/kg) = `+this.energyMelting()+` J
																 <br>+`+(this.mass*this.latent/1e3)+` J was transferred in melting.
																 <br>The total energy transferred is equal to `+this.energyHeating()+` + `+this.energyMelting()+` = `+this.answer()+` ≈ `+this.roundedAnswer()+` J.`
		},
		mark:function(answer){clamp(keyword(answer,["thermal energy","mass","specific heat capacity","specific latent heat","temperature","=",String(this.startTemp),String(this.tempChange),String(this.startTemp+this.tempChange),String(this.capacity),String(this.latent),String(this.mass/1e3)],"u",0.5)+keyword(answer,["1","1000"],2,0.25)+keyword(answer,[this.energyHeating(),this.energyMelting(),this.answer(),this.roundedAnswer()].map(x=>String(x))),10)},
		par: 300
	},
	// Miscellaneous
	{
		text:"There are 9 Physics topics.",
		type:"composite",
		components:(function(){
			let out = []
			let keys = [1,2,3,4,5,6,7,8,9].select(Math.max(2,Array(9).fill(0).map(x => ranint(0,1)).reduce((x,y)=>x+y))).sort((a,b)=>a-b)
			for (let x of keys) {
				out.push({
					get text(){return "Name topic "+x+"."},
					level:"A",
					type:"open",
					modelAnswer:["Matter","Forces","Electricity","Magnetism and Magnetic Fields","Waves in Matter","Radioactivity","Energy","Global Challenges","Practical Skills"][x-1],
					mark:function(answer){return answer.replaceAll(" ","").toLowerCase()==this.modelAnswer.replaceAll(" ","").toLowerCase()?1:0},
					par:10
				})
			}
			return out 
		})()
	},
	{
		text:"Select the correct symbol for each unit.",
		type:"composite",
		components:(()=>{
			let list = [
				["density",4,"ρ",["p","P","d","D"]],
				["mass",2,"m",["M","k","g"]],
				["volume",2,"V",["v","A","a","s"]],
				["gravitational field strength",4,"g",["f","G","W","N"]]
			].shuffle().filter((x,i)=>Math.random()<0.8**i)
			let out = []
			for (let i of list) out.push({
				text:i[0],
				type:"multiplechoice",
				level:i[1],
				answers:multipleChoiceGenerator([i[2]],1,i[3],Math.min(i[3].length,ranint(3,5))),
				par:10
			})
			return out
		})()
	}
]
// continue from page 15