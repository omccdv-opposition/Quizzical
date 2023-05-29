"use strict"
var resources_gcse_chemistry = {
	elements: [null,"hydrogen","helium","lithium","beryllium","boron","carbon","nitrogen","oxygen","fluorine","neon","sodium","magnesium","aluminum","silicon","phosphorus","sulfur","chlorine","neon","potassium","calcium","scandium","titanium","vanadium","chromium","manganese","iron","cobalt","nickel","copper","zinc","gallium","germanium","arsenic","selenium","bromine","krypton","rubidium","strontium","yttrium","zirconium","niobium","molybdenum","technetium","ruthenium","rhodium","palladium","silver","cadmium","indium","tin","antimony","tellurium","iodine","xenon","caesium","barium","lanthanum","cerium","praseodymium","neodymium","promethium","samarium","europium","gadolinium","terbium","dysprosium","holmium","erbium","thulium","ytterbium","lutetium","hafnium","tantalum","tungsten","rhenium","osmium","iridium","platinum","gold","mercury","thallium","lead","bismuth","polonium","astatine","radon","francium","radium","actinium","thorium","protactinium","uranium","neptunium","plutonium","americium","curium","berkelium","californium","einsteinium","fermium","mendelevium","nobelium","lawrencium","rutherfordium","dubnium","seaborgium","bohrium","hassium","meitnerium","darmstadtium","roentgenium","copernicium","nihonium","flerovium","moscovium","livermorium","tennessine","oganesson"],
	massRanges: [null,[1,7],[2,10],[3,12],[5,16],[6,19],[8,22],[10,25],[12,28],[14,31],[16,34],[18,38],[19,40],[21,42],[22,44],[24,46],[26,49],[28,51],[30,53],[32,55],[34,57],[36,60],[38,63],[40,65],[42,67],[44,69],[45,72],[47,75],[48,78],[52,80],[54,83],[56,86],[58,89],[60,92],[65,94],[67,97],[69,100],[71,102],[73,105],[76,108],[78,110],[81,113],[83,115],[85,118],[87,120],[89,122],[91,124],[93,130],[95,132],[97,135],[99,137],[103,139],[105,142],[108,144],[110,147],[112,151],[114,153],[117,155],[119,157],[121,159],[124,161],[126,163],[128,165],[130,167],[134,169],[136,171],[138,173],[140,175],[143,177],[145,179],[148,182],[150,184],[153,188],[155,190],[158,192],[160,194],[162,196],[164,199],[166,202],[169,205],[171,210],[176,212],[178,215],[184,219],[188,220],[193,223],[195,228],[199,232],[202,234],[206,236],[209,238],[212,240],[217,242],[225,244],[228,247],[231,249],[233,252],[235,254],[237,256],[240,258],[242,260],[245,262],[248,264],[251,266],[253,268],[255,270],[258,273],[260,275],[263,277],[265,279],[267,281],[272,283],[277,285],[283,287],[285,289],[287,291],[289,293],[291,294],[293,293]]
}
var question_file_at_gcse_chemistry = [
	// C1+2
	{
		text:"Describe the contribution that Democritus made to the atomic model.",
		level:5,
		type:"open",
		modelAnswer:"Democritus proposed the existence of the atom. He viewed them as tiny spheres that are elementary and separated by empty space.",
		mark:function(answer){return keyword(answer,["exist","sphere","elementary","separated","empty space"],5,0.6)},
		par: 60
	},
	{
		text:"Describe the contribution that John Dalton made to the atomic model.",
		level:4,
		type:"open",
		modelAnswer:"John Dalton proposed the 'solid sphere' atomic model and that different types of sphere make up different elements.",
		mark:function(answer){return keyword(answer,["solid","different","elements"],3,2/3)},
		par: 60
	},
	{
		text:"Describe the contribution that J.J. Thomson made to the atomic model.",
		level:5,
		type:"open",
		modelAnswer:"J.J. Thomson proposed that atoms contain even smaller negatively charged particles bound inside positively charged balls. This is formally known as the 'plum pudding' model.",
		mark:function(answer){return keyword(answer,["smaller","negative","positive","charge","plum pudding"],5,0.6)},
		par: 60
	},
	{
		text:"Explain the contribution that Ernest Rutherford and his students Hans Geiger and Ernest Marsden made to the atomic model.",
		level:8,
		type:"open",
		modelAnswer: `Rutherford and his students conducted the famous gold foil experiment in 1909.
							<br>They fired positively charged alpha particles at an extremely thin sheet of gold - from the plum pudding model, they expected the alpha particles to
							<br>either pass through the sheet or be slightly refracted, as the positive charge of the atom was thought to be very spread out.
							<br>However, while most of the particles did go through the sheet, some were significantly deflected and some were deflected backwards. This proved that the plum pudding model cannot be right.
							<br>Rutherford came up with a new theory of a positively charged nucleus surrounded by a 'cloud' of negatively charged electrons.`,
		mark:function(answer){return keyword(answer,["gold","positive","alpha particle","plum pudding","slightly","reflect","spread out","back","nucleus","cloud"],10,0.5)+keyword(answer,["pass","through"],1,0.5)},
		par: 120
	},
	{
		text:"Explain the contribution that Niels Bohr made to the atomic model.",
		level:8,
		type:"open",
		modelAnswer: `Niels Bohr realised that electrons in a 'cloud' around the nucleus would be attracted to it, causing the atom to collapse.
							<br>He proposed a new model of the atom where the electrons were contained in shells.
							<br>In this model, electrons can only exist in fixed orbits, or shells, and not anywhere in between them. Each shell has a fixed energy level.
							<br>This theory was supported by many experiments and helped to explain the observations of other scientists at the time.`,
		mark:function(answer){return keyword(answer,["cloud","attract","collapse","electrons","shells","fixed","orbits","not","between","energy","support","experiment","observation"],13,0.5)},
		par: 120
	},
	{
		text:"State the contribution that James Chadwick made to the atomic model.",
		level:3,
		type:"open",
		modelAnswer:"James Chadwick proposed the existence of neutrons alongside positively charged protons.",
		mark:function(answer){return keyword(answer,["neutr"])},
		par: 30
	},
	{
		text:"State the mass and electric charge of a proton.",
		level:3,
		type:"open",
		modelAnswer:"1 dalton; +1 elementary charge",
		mark:function(answer){return keyword(answer,["1"])+keyword(answer,["+1","dalton","elementary charge"],4,0.5)},
		par: 20
	},
	{
		text:"State the mass and electric charge of a neutron.",
		level:3,
		type:"open",
		modelAnswer:"1 dalton; no charge",
		mark:function(answer){
			return keyword(answer,["1","dalton","charge"])+keyword(answer,["no","0","zero"],1)
		},
		par: 20
	},
	{
		text:"State the mass and electric charge of an electron.",
		level:4,
		type:"open",
		modelAnswer:"0.0005 daltons; -1 elementary charge",
		mark:function(answer){
			return keyword(answer,["-1","elementary charge","dalton"])+keyword(answer,["0.0005","1/2000","1/183","1/184"],1)
		},
		par: 20
	},
	{
		text:"Describe the arrangement and motion of particles in a solid, liquid and gas.",
		level:7,
		type:"open",
		modelAnswer: `In a solid, the particles are in a regular arrangement with minimal distance between them. They can not move freely and can only vibrate around a fixed position.
							<br>In a liquid, the particles are in an irregular arrangement with low distance between them. They move around each other, but are still touching.
							<br>In a gas, the particles are in an irregular arrangement and far apart from one apart. They move quickly in all directions in a process called Brownian motion.`,
		mark:function(answer){return keyword(answer,["solid","regular","distance","free","vibrate","fixed position","liquid","irregular","around","touch","gas","all directions","Brownian motion"],13,0.5)+keyword(answer,["far","distan"],1,0.5)+keyword(answer,["fast","quick"],1,0.5)},
		par: 90
	},
	(()=>{
		let num = ranint(1,5,true)
		return {
			text:"State "+pluralize(num,"way")+" in which the particle model is inaccurate.",
			type:"open",
			level:num+3,
			modelAnswer:[
				"Particles are not solid",
				"Particles are not spheres",
				"It does not accurately show the space between particles",
				"It does not accurately show the size of particles",
				"It does not show the forces between the particles"
			].select(num).join("<br>"),
			mark:function(answer){return keyword(answer,["solid","space","size"])+keyword(answer,["sphere","ball","circ"],1)},
			par:15*num
		}
	})(),
	{
		text:"For each of the below, select whether it is typical of a physical or chemical change.",
		type:"composite",
		components:(()=>{
			let answers = [
				["It is typically easy to reverse","It is typically difficult to reverse"],
				["No new substances are made","New substances are made"],
				["It involves a change of state","It involves a chemical reaction"],
				["It can be reversed by heating or cooling","It cannot be reversed by heating or cooling"]
			].select(ranint(2,4))
			let out = []
			for (let i of answers) {
				let type = ranint(0,1)
				out.push({
					text:i[type],
					type:"multiplechoice",
					level:1,
					answers:multipleChoiceGenerator([["Physical","Chemical"][type]],1,[["Chemical","Physical"][type]],1),
					markTransform:x=>x,
					par:10
				})
			}
			return out
		})()
	},
	{
		text:"Calculate the number of neutrons in the following atoms:",
		type:"composite",
		components:(()=>{
			let out = []
			for (let i=0;i<ranint(2,6,true);i++) {
				let elem = ranint(20*i+1,Math.min(20*(i+1),118))
				let mass = ranint(...resources_gcse_chemistry.massRanges[elem])
				out.push({
					text:resources_gcse_chemistry[elem]+"-"+mass,
					type:"open",
					level:[3,4,4,4,5,6][i],
					modelAnswer:String(mass-elem),
					mark:function(answer){return answer.trim()==String(mass-elem)?1:0},
					par:20+i*5
				})
			}
			return out
		})()
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Select the particle with the greatest mass.",
				type:"multiplechoice",
				level:"A",
				answers:multipleChoiceGenerator(["Neutron"],1,["Proton","Electron"],0),
				markTransform:x=>x,
				par:10
			},
			{
				text:"How much heavier is this particle from the particle with the <i>second</i>-greatest mass? Select the closest approximation.",
				type:"multiplechoice",
				level:"A",
				answers:multipleChoiceGenerator(["1.001×"],1,["1.01×","1.1×","10×","100×","1000×","10,000×"]),
				markTransform:x=>x,
				par:10
			}
		]
	},
	{
		get text() {return "State the charge of a "+resources_gcse_chemistry.elements[[5,13,21,39,57,89][ranint(0,5)]]+" ion."},
		level:4,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["+3 e"],1,["-4 e","-3 e","-2 e","-1 e","0","+1 e","+2 e","+4 e"],3),
		markTransform:x=>x,
		par: 15
	},
	{
		get text() {return "State the charge of a "+resources_gcse_chemistry.elements[[8,16,34,52,84,116][ranint(0,5)]]+" ion."},
		level:4,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["-2 e"],1,["-4 e","-3 e","-1 e","0","+1 e","+2 e","+3 e","+4 e"],3),
		markTransform:x=>x,
		par: 15
	},
	(()=>{
		let num = ranint(1,20)
		let correct = ["1","2","1","2","3","4","5","6","7","8","1","2","3","4","5","6","7","8","1","2"][num-1]
		return {
			text:"Select how many electrons "+resources_gcse_chemistry.elements[num]+" has in its outer shell.",
			level:3,
			type:"multiplechoice",
			answers:multipleChoiceGenerator([correct],1,["0","1","2","3","4","5","6","7","8"].filter(x => x!==correct),8),
			markTransform:x=>x,
			par:10,
		}
	})(),
	{
		period:ranint(1,4,true)-1,
		element:function(x){return [["lithium","sodium","potassium","rubidium"][this.period],["sodium","potassium","rubidium","caesium"][this.period],["magnesium","calcium","strontium","barium"][this.period]][x-1]},
		get text(){ return "Based on the position of "+this.element(1)+" in the periodic table, state whether you would expect its chemical properties to be more similar to those of those of "+this.element(2)+" or "+this.element(3)+". Explain your answer"},
		level:6,
		type:"open",
		get modelAnswer(){return toTitleCase(this.element(1))+" and "+this.element(2)+" are both in Group 1. "+toTitleCase(this.element(1))+" and "+this.element(3)+" are in different groups. Therefore, the chemical properties of "+this.element(1)+" should be more similar to those of "+this.element(2)+" than "+this.element(3)+" because elements in the same group have similar chemical properties."},
		mark:function(answer){
			if (keyword(answer,countTo(3).map(x=>this.element(x)))!==3) return 0
			let marks = keyword(answer,["group 1"])+keyword(answer,["different","similar"],2,0.5)+keyword(answer,["similar to "+this.element(2),"closer to "+this.element(2),"closer to those of "+this.element(2)])+keyword(answer,["same group","similar properties","similar chemical properties"],2,0.5)
			return clamp(marks,4)
		},
		par:60
	},
	{
		text:"",
		type:"composite",
		components:[
			(()=>{
				let num = ranint(1,20)
				let shellCaps = [2,8,8,2]
				let ans = []
				let rem = num
				for (let i=0;i<4;i++) {
					ans.push(Math.min(rem,shellCaps[i]))
					rem-=ans[i]
					if (rem==0) break
				}
				return {
					text:"State the electron configuration of "+resources_gcse_chemistry.elements[num],
					type:"open",
					level:6,
					modelAnswer:ans.join("."),
					mark:function(answer){return answer.replaceAll(/\[|,|\.|\]/g,"")==ans.join("")?1:0},
					par:20
				}
			})(),
			(()=>{
				let num = ranint(1,20)
				let shellCaps = [2,8,8,2]
				let ans = []
				let rem = num
				for (let i=0;i<4;i++) {
					ans.push(Math.min(rem,shellCaps[i]))
					rem-=ans[i]
					if (rem==0) break
				}
				return {
					text:"State the element with electron configuration "+ans.join("."),
					type:"open",
					level:6,
					modelAnswer:ans.join("."),
					mark:function(answer){return keyword(answer,[resources_gcse_chemistry.elements[num]],1,2)-keyword(answer,resources_gcse_chemistry.elements)},
					par:20
				}
			})()
		]
	},
	{
		text:"Describe the formation of ionic bonds.",
		level:6,
		type:"open",
		modelAnswer:"When a metal and non-metal react together, the metal can lose electrons to form a positively charged cation and the non-metal can gain these electrons to form a negatively charged anion. These oppositely charged ions are then strongly attracted to one another by electrostatic forces and form an ionic bond.",
		mark:function(answer){
			if (keyword(answer,["electron"])==0) return 0
			let marks = keyword(answer,["metal","non-metal","lose","gain","negative","positive","anion","cation"],2,0.5)+keyword(answer,["opposite","electrostatic force","ionic bond"])-1
			return clamp(marks,6)
		},
		par:60
	},
	{
		text:"State the structure of an ionic compound.",
		level:3,
		type:"open",
		modelAnswer:"Giant ionic lattice structure",
		mark:function(answer){return keyword(answer,["giant","ionic","lattice","structure"],4,0.5)-keyword(answer,["covalent"],"u",2)},
		par:15
	},
	{
		get text(){return "Explain "+["one property","two properties","three properties"][this.par/40-1]+" of ionic compounds."},
		level:6,
		type:"open",
		modelAnswer:"High melting and boiling points due to the fact that a lot of energy is needed to overcome the strong attraction between the ions.<br>Don't conduct electricity when solid because the ions are fixed in place and cannot move. However, when an ionic compound melts, the ions are free to move and will carry an electric charge.<br>Ionic compounds easily dissolve in water, because both ionic compounds and water molecules are polar.",
		mark:function(answer){
			let marks = Array(3)
			marks[0] = keyword(answer,["high","melting","boiling","point"],4,1/3)+keyword(answer,["energy","overcome","attraction"],2,2/3)
			marks[1] = keyword(answer,["solid","liquid","molten","conduct","insulate","fixed","carry","electric charge"],6,0.5)
			marks[2] = keyword(answer,["dissolve","easily","ionic compound","water molecule","polar"],5,0.6)
			return clamp(bestMarks(marks,this.par/40,3),9)
		},
		par:ranint(1,3,true)*40
	},
	{
		num:ranint(1,20),
		get text(){return "State how many covalent bonds an atom of "+resources_gcse_chemistry.elements[this.num]+" can form."},
		level:3,
		type:"multiplechoice",
		get correct(){return ["1","0","1","2","3","4","3","2","1","0","1","2","3","4","3","2","1","0","1","2"][this.num-1]},
		get answers(){return multipleChoiceGenerator([this.correct],1,["0","1","2","3","4"].filter(x => x!==this.correct),1)},
		markTransform:x => x,
		par:15
	},
	{
		text:"Explain why covalent bonds are strong.",
		level:7,
		type:"open",
		modelAnswer:"There is a strong electrostatic attraction between the positive nuclei of the atoms and the negative electrons in each shared pair.",
		mark:function(answer){return keyword(answer,["strong","electrostatic","attraction","between","positive","nucle","negative","electron","shared","pair"],"u",1/3)},
		par:40
	},
	{
		text:"State two types of diagram which can be used to show covalent bonds.",
		level:4,
		type:"open",
		modelAnswer:"Dot and cross diagrams; ball and stick models",
		mark:function(answer){return Math.floor(keyword(answer,["dot","and","cross"],3,1/3))+Math.floor(keyword(answer,["ball","and","stick"],3,1/3))+Math.floor(keyword(answer,["diagram","model"],2,0.5))},
		par:30
	},
	{
		text:"State two similarities and two differences between the structure and properties of diamond and graphite.",
		level:7,
		type:"open",
		modelAnswer:"Both diamond and graphite form covalent bonds and have a very high melting point as a result of these strong covalent bonds. However, in a diamond, each carbon atom forms 4 covalent bonds in a very rigid giant covalent structure. In graphite, each carbon atom forms 3 covalent bonds creating sheets of carbon atoms that can slide over one another. Each of these layers is held together by weak electrostatic forces of attraction, so they can easily slide over each other. As graphite only forms 3 covalent bonds, it has delocalised electrons and is able to conduct electricity.",
		mark:function(answer){
			let similarities = []
			let differences = []
			similarities[0] = keyword(answer,["giant covalent structure"])
			similarities[1] = keyword(answer,["covalent bonding"])+keyword(answer,["form","covalent bond"],2,0.5)
			similarities[2] = keyword(answer,["high melting point"])
			differences[0] = keyword(answer,["colourless","transparent"],1,0.5)+keyword(answer,["black"],1,0.5)
			differences[1] = keyword(answer,["conduct","electricity"],2,0.25)+keyword(answer,["not","doesn't","insulat"],1,0.5)
			differences[2] = keyword(answer,["4","four"],1,0.5)+keyword(answer,["3","three"],1,0.5)
			return clamp(bestMarks(similarities,2,1)+bestMarks(differences,2,1),4)
		},
		par:90
	},
	{
		text:"Explain two typical properties of giant covalent structures.",
		level:6,
		type:"open",
		modelAnswer:"There are no delocalised electrons or free ions, so they do not conduct electricity, excluding a few exceptions such as graphite.<br>They have a very high melting and boiling point due to the strong covalent bonds.<br>They are insoluble in water.",
		mark:function(answer){
			let marks = Array(3)
			marks[0] = keyword(answer,["delocalised","free"],1)+keyword(answer,["electrons","ions"],2,0.5)+keyword(answer,["conduct","insulat","electricity"],2,0.5)
			marks[1] = keyword(answer,["high","melting","boiling","point"],4,0.25)+keyword(answer,["strong","covalent bond"],2,0.5)
			marks[2] = keyword(answer,["insoluble","water"],2,0.5)
			return clamp(bestMarks(marks,2),4)
		},
		par:60
	},
	{
		text:"State the shape of fullerenes.",
		level:3,
		type:"open",
		modelAnswer:"They are either shaped like hollow spheres or tubes.",
		mark:function(answer){return keyword(answer,["hollow"],1,0.5)+keyword(answer,["spher","ball"],1,0.5)+keyword(answer,["tube","cylind"],1)},
		par:20
	},
	// Miscellaneous
	{
		text:"There are 7 Chemistry topics.",
		type:"composite",
		components:(function(){
			let out = []
			let keys = [1,2,3,4,5,6,7].select(Math.max(2,Array(7).fill(0).map(x => ranint(0,1)).reduce((x,y)=>x+y))).sort((a,b)=>a-b)
			for (let x of keys) {
				out.push({
					get text(){return "Name topic "+x+"."},
					level:"A",
					type:"open",
					modelAnswer:["Particles","Elements, Compounds and Mixtures","Chemical Reactions","Predicting and Identifying Reactions and Products","Monitoring and Controlling Chemical Reactions","Global Challenges","Practical Skills"][x-1],
					mark:function(answer){return answer.replaceAll(" ","").toLowerCase()==this.modelAnswer.replaceAll(" ","").toLowerCase()?1:0},
					par:10
				})
			}
			return out 
		})()
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"For each of the below chemical elements, select the atomic number of said element.",
				type:"composite",
				components:(()=>{
					let nums = countTo(118).select(ranint(3,8,true))
					let out = []
					for (let i of nums) out.push({
						text:resources_gcse_chemistry.elements[i],
						type:"multiplechoice",
						level:"A",
						answers:multipleChoiceGenerator([String(i)],1,countTo(118).filter(x=>x!==i).map(x=>String(x)),7),
						markTransform:x=>x,
						par:10
					})
					return out
				})()
			},
			{
				text:"For each of the below, state the chemical element with that atomic number.",
				type:"composite",
				components:(()=>{
					let nums = countTo(118).select(ranint(3,8,true)).sort((a,b)=>a-b)
					let out = []
					for (let i of nums) out.push({
						text:String(i),
						type:"open",
						level:"A",
						modelAnswer:resources_gcse_chemistry.elements[i],
						mark:function(answer){return resources_gcse_chemistry.elements[i].trim().toLowerCase()==answer.trim().toLowerCase()?1:0},
						par:10
					})
					return out
				})()
			}
		]
	}
]