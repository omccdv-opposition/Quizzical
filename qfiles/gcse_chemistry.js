"use strict"
var resources_gcse_chemistry = {
	elements: [null,"hydrogen","helium","lithium","beryllium","boron","carbon","nitrogen","oxygen","fluorine","neon","sodium","magnesium","aluminum","silicon","phosphorus","sulfur","chlorine","argon","potassium","calcium","scandium","titanium","vanadium","chromium","manganese","iron","cobalt","nickel","copper","zinc","gallium","germanium","arsenic","selenium","bromine","krypton","rubidium","strontium","yttrium","zirconium","niobium","molybdenum","technetium","ruthenium","rhodium","palladium","silver","cadmium","indium","tin","antimony","tellurium","iodine","xenon","caesium","barium","lanthanum","cerium","praseodymium","neodymium","promethium","samarium","europium","gadolinium","terbium","dysprosium","holmium","erbium","thulium","ytterbium","lutetium","hafnium","tantalum","tungsten","rhenium","osmium","iridium","platinum","gold","mercury","thallium","lead","bismuth","polonium","astatine","radon","francium","radium","actinium","thorium","protactinium","uranium","neptunium","plutonium","americium","curium","berkelium","californium","einsteinium","fermium","mendelevium","nobelium","lawrencium","rutherfordium","dubnium","seaborgium","bohrium","hassium","meitnerium","darmstadtium","roentgenium","copernicium","nihonium","flerovium","moscovium","livermorium","tennessine","oganesson"],
	massRanges: [null,[1,7],[2,10],[3,12],[5,16],[6,19],[8,22],[10,25],[12,28],[14,31],[16,34],[18,38],[19,40],[21,42],[22,44],[24,46],[26,49],[28,51],[30,53],[32,55],[34,57],[36,60],[38,63],[40,65],[42,67],[44,69],[45,72],[47,75],[48,78],[52,80],[54,83],[56,86],[58,89],[60,92],[65,94],[67,97],[69,100],[71,102],[73,105],[76,108],[78,110],[81,113],[83,115],[85,118],[87,120],[89,122],[91,124],[93,130],[95,132],[97,135],[99,137],[103,139],[105,142],[108,144],[110,147],[112,151],[114,153],[117,155],[119,157],[121,159],[124,161],[126,163],[128,165],[130,167],[134,169],[136,171],[138,173],[140,175],[143,177],[145,179],[148,182],[150,184],[153,188],[155,190],[158,192],[160,194],[162,196],[164,199],[166,202],[169,205],[171,210],[176,212],[178,215],[184,219],[188,220],[193,223],[195,228],[199,232],[202,234],[206,236],[209,238],[212,240],[217,242],[225,244],[228,247],[231,249],[233,252],[235,254],[237,256],[240,258],[242,260],[245,262],[248,264],[251,266],[253,268],[255,270],[258,273],[260,275],[263,277],[265,279],[267,281],[272,283],[277,285],[283,287],[285,289],[287,291],[289,293],[291,294],[293,293]]
}
var question_file_at_gcse_chemistry = [
	// C1+2
	blankComposite([
		{
			text:"State the mass and electric charge of a proton.",
			type:"open",
			topic:"subatomic particles",
			modelAnswer:"1 dalton; +1 elementary charge",
			mark:function(answer){return {
				3:keyword(answer,["1","+1"]),
				A:keyword(answer,["dalton","elementary charge"],2,0.5)
			}},
			par: 20
		},
		{
			text:"State the mass and electric charge of a neutron.",
			type:"open",
			topic:"subatomic particles",
			modelAnswer:"1 dalton; no charge",
			mark:function(answer){return {
				3:keyword(answer,["1"])+keyword(answer,["no","0","zero"],1),
				A:keyword(answer,["dalton","charge"],2,0.5)
			}},
			par: 20
		},
		{
			text:"State the mass and electric charge of an electron.",
			type:"open",
			topic:"subatomic particles",
			modelAnswer:"0.0005 daltons; -1 elementary charge",
			mark:function(answer){
				return {
					3:keyword(answer,["-1"]),
					4:keyword(answer,["0.0005","1/2000","1/183","1/184"],1),
					A:keyword(answer,["dalton","elementary charge"])
				}
			},
			par: 20
		}
	]),
	{
		text:"Describe the arrangement and motion of particles in a solid, liquid and gas.",
		type:"open",
		topic:"the particle model",
		modelAnswer: `In a solid, the particles are in a regular arrangement with minimal distance between them. They can not move freely and can only vibrate around a fixed position.
							<br>In a liquid, the particles are in an irregular arrangement with low distance between them. They move around each other, but are still touching.
							<br>In a gas, the particles are in an irregular arrangement and far apart from one apart. They move quickly in all directions in a process called Brownian motion.`,
		mark:function(answer){
			let marks = keyword(answer,["solid","regular","distance","free","vibrate","fixed position","liquid","irregular","around","touch","gas","all directions","Brownian motion"],13,0.5)+keyword(answer,["far","distan"],1,0.5)+keyword(answer,["fast","quick"],1,0.5)
			return "5667889".slice(0,marks)
		},
		par: 90
	},
	(()=>{
		let num = ranint(1,5,true)
		return {
			text:"State "+pluralize(num,"way")+" in which the particle model is inaccurate.",
			type:"open",
			topic:"the particle model",
			modelAnswer:[
				"Particles are not solid",
				"Particles are not spheres",
				"It does not accurately show the space between particles",
				"It does not accurately show the size of particles",
				"It does not show the forces between the particles"
			].select(num).join("<br>"),
			mark:function(answer){return "34567".slice(0,keyword(answer,["solid","space","size","force"])+keyword(answer,["sphere","ball","circ"],1))},
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
					topic:"physical and chemical changes",
					answers:multipleChoiceGenerator([["Physical","Chemical"][type]],1,[["Chemical","Physical"][type]],1),
					markTransform:x=>x?"1":"",
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
					topic:"isotopes",
					modelAnswer:String(mass-elem),
					mark:function(answer){return answer.trim()===String(mass-elem)?"344456"[i]:""},
					par:20+i*5
				})
			}
			return out
		})()
	},
	blankComposite([
		{
			text:"Select the particle with the greatest mass.",
			type:"multiplechoice",
			topic:"subatomic particles",
			answers:multipleChoiceGenerator(["Neutron"],1,["Proton","Electron"],0),
			markTransform:x=>x?"A":"",
			par:10
		},
		{
			text:"How much greater is the mass of this particle than that of the particle with the <i>second</i>-greatest mass? Select the closest approximation.",
			type:"multiplechoice",
			topic:"subatomic particles",
			answers:multipleChoiceGenerator(["1.001×"],1,["1.01×","1.1×","10×","100×","1000×","10,000×"]),
			markTransform:x=>x?"A":"",
			par:10
		}
	]),
	(()=>{
		function element(charge) {
			let out = [10,18,36,54,86]
			out.push(charge>0?2:118)
			return Array.random(out)
		}
		function formatCharge(charge) {return charge===0?"0":charge>0?("+"+charge+" e"):(charge+" e")}
		let out = []
		for (let i of [-3,-2,-1,1,2,3].select(ranint(1,4,true))) out.push({
			text:"Select the charge of a "+resources_gcse_chemistry.elements[element(i)]+" ion.",
			type:"multiplechoice",
			topic:"ions",
			answers:multipleChoiceGenerator([formatCharge(i)],1,[-4,-3,-2,-1,0,1,2,3,4].filter(x=>x!==i).map(x=>formatCharge(x)),5),
			markTransform:x=>x?"3":"",
			par:10
		})
		return blankComposite(out)
	})(),
	(()=>{
		let num = ranint(1,20)
		let correct = ["1","2","1","2","3","4","5","6","7","8","1","2","3","4","5","6","7","8","1","2"][num-1]
		return {
			text:"Select how many electrons "+resources_gcse_chemistry.elements[num]+" has in its outer shell.",
			type:"multiplechoice",
			topic:"electronic structures",
			answers:multipleChoiceGenerator([correct],1,["0","1","2","3","4","5","6","7","8"].filter(x => x!==correct),8),
			markTransform:x=>x?"3":"",
			par:10,
		}
	})(),
	(()=>{
		let period = ranint(1,4,true)-1
		function element(x){return [["lithium","sodium","potassium","rubidium"][period],["sodium","potassium","rubidium","caesium"][period],["magnesium","calcium","strontium","barium"][period]][x-1]}
		return {
			text:"Based on the position of "+element(1)+" in the periodic table, explain whether you would expect its chemical properties to be more similar to those of those of "+element(2)+" or "+element(3)+".",
			type:"open",
			topic:"properties of elements",
			modelAnswer:toTitleCase(element(1))+" and "+element(2)+" are both in Group 1. "+toTitleCase(element(1))+" and "+element(3)+" are in different groups. Therefore, the chemical properties of "+element(1)+" should be more similar to those of "+element(2)+" than "+element(3)+" because elements in the same group have similar chemical properties.",
			mark:function(answer){
				if (keyword(answer,countTo(3).map(x=>element(x)))!==3) return {}
				let marks = keyword(answer,["group 1"])+keyword(answer,["different","similar"],2,0.5)+keyword(answer,["similar to "+element(2),"closer to "+element(2),"closer to those of "+element(2)])+keyword(answer,["same group","similar properties","similar chemical properties"],2,0.5)
				return "2678".slice(0,clamp(marks,4))
			},
			par:60
		}
	})(),
	blankComposite([
		(()=>{
			let num = ranint(1,20)
			let shellCaps = [2,8,8,2]
			let ans = []
			let rem = num
			for (let i=0;i<4;i++) {
				ans.push(Math.min(rem,shellCaps[i]))
				rem-=ans[i]
				if (rem===0) break
			}
			return {
				text:"State the electron configuration of "+resources_gcse_chemistry.elements[num],
				type:"open",
				topic:"electronic structures",
				modelAnswer:ans.join("."),
				mark:function(answer){return answer.replaceAll(/\[|,|\.|\]/g,"")===ans.join("")?"6":""},
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
				if (rem===0) break
			}
			return {
				text:"State the element with electron configuration "+ans.join("."),
				type:"open",
				topic:"electronic structures",
				modelAnswer:resources_gcse_chemistry.elements[num],
				mark:function(answer){return {6:keyword(answer,[resources_gcse_chemistry.elements[num]],1,2)-keyword(answer,resources_gcse_chemistry.elements.slice(1))}},
				par:20
			}
		})()
	]),
	{
		text:"Describe the formation of ionic bonds.",
		type:"open",
		topic:"ionic bonding",
		modelAnswer:"When a metal and non-metal react together, the metal can lose electrons to form a positively charged cation and the non-metal can gain these electrons to form a negatively charged anion. These oppositely charged ions are then strongly attracted to one another by electrostatic forces and form an ionic bond.",
		mark:function(answer){
			if (keyword(answer,["electron"])===0) return {}
			let marks = keyword(answer,["metal","non-metal","lose","gain","negative","positive","anion","cation"],2,0.5)+keyword(answer,["opposite","electrostatic force","ionic bond"])-1
			return "676878".slice(0,clamp(marks,6))
		},
		par:60
	},
	{
		text:"State the structure of an ionic compound.",
		type:"open",
		topic:"ionic bonding",
		modelAnswer:"Giant ionic lattice structure",
		mark:function(answer){return "34".slice(0,keyword(answer,["giant","ionic","lattice","structure"],4,0.5)-keyword(answer,["covalent"],"u",2))},
		par:15
	},
	(()=>{
		let num = ranint(1,3,true)
		return {
			text:"Explain "+pluralize(num,"property","properties")+" of ionic compounds.",
			type:"open",
			topic:"ionic bonding",
			modelAnswer:["High melting and boiling points due to the fact that a lot of energy is needed to overcome the strong attraction between the ions.","Don't conduct electricity when solid because the ions are fixed in place and cannot move. However, when an ionic compound melts, the ions are free to move and will carry an electric charge.","Ionic compounds easily dissolve in water, because both ionic compounds and water molecules are polar."].select(num).join("<br>"),
			mark:function(answer){
				let marks = Array(3)
				marks[0] = keyword(answer,["high","melting","boiling","point"],4,0.375)+keyword(answer,["energy","overcome","attraction"],2,0.5)
				marks[1] = keyword(answer,["solid","liquid","molten","conduct","insulate","fixed","carry","electric charge"],6,0.5)
				marks[2] = keyword(answer,["dissolve","easily","ionic compound","water molecule","polar"],5,0.6)
				let out = bestMarks(marks,num,"567")
				if (num===3) { // if 9 marks, give 455666778 instead of 555666777
					if (out[7]===3) {out[7]=2;out[8]=1}
					if (out[5]>0) {out[5]=2;out[4]=1}
				}
				return out
			},
			par:num*40
		}
	})(),
	(()=>{
		let num = ranint(1,20)
		let correct = ["1","0","1","2","3","4","3","2","1","0","1","2","3","4","3","2","1","0","1","2"][num-1]
		return {
			text:"Select how many covalent bonds an atom of "+resources_gcse_chemistry.elements[num]+" can form.",
			type:"multiplechoice",
			topic:"covalent bonding",
			answers:multipleChoiceGenerator([correct],1,["0","1","2","3","4"].filter(x => x!==correct),1),
			markTransform:x=>x?"3":"",
			par:15
		}
	})(),
	{
		text:"Explain why covalent bonds are strong.",
		type:"open",
		topic:"covalent bonding",
		modelAnswer:"There is a strong electrostatic attraction between the positive nuclei of the atoms and the negative electrons in each shared pair.",
		mark:function(answer){return "45678".slice(0,keyword(answer,["strong","electrostatic","attraction","between","positive","nucle","negative","electron","shared","pair"],"u",0.5))},
		par:40
	},
	{
		text:"State two types of diagram which can be used to show covalent bonds.",
		type:"open",
		topic:"covalent bonding",
		modelAnswer:"Dot and cross diagrams; ball and stick models",
		mark:function(answer){return "43".slice(0,clamp(Math.floor(keyword(answer,["dot","and","cross"],3,1/3))+Math.floor(keyword(answer,["ball","and","stick"],3,1/3))+Math.floor(keyword(answer,["diagram","model"],2,0.5)),2))},
		par:30
	},
	{
		text:"State two similarities and two differences between the structure and properties of diamond and graphite.",
		type:"open",
		topic:"allotropes of carbon",
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
			let out = addMarks(["56".slice(0,bestMarks(similarities,2))+"56".slice(0,bestMarks(differences,2))])
			if (out[6]===2) {out[6]=1;out[7]=1}
			return out
		},
		par:90
	},
	{
		text:"Explain two typical properties of giant covalent structures.",
		type:"open",
		topic:["covalent bonding","giant covalent structures"],
		modelAnswer:"There are no delocalised electrons or free ions, so they do not conduct electricity, excluding a few exceptions such as graphite.<br>They have a very high melting and boiling point due to the strong covalent bonds.<br>They are insoluble in water.",
		mark:function(answer){
			let marks = Array(3)
			marks[0] = keyword(answer,["delocalised","free"],1)+keyword(answer,["electrons","ions"],2,0.5)+keyword(answer,["conduct","insulat","electricity"],2,0.5)
			marks[1] = keyword(answer,["high","melting","boiling","point"],4,0.25)+keyword(answer,["strong","covalent bond"],2,0.5)
			marks[2] = keyword(answer,["insoluble","water"],2,0.5)
			return bestMarks(marks,2,"56")
		},
		par:60
	},
	{
		text:"State the shape of fullerenes.",
		type:"open",
		topic:["covalent bonding","giant covalent structures"],
		modelAnswer:"They are either shaped like hollow spheres or tubes.",
		mark:function(answer){return "34".slice(0,keyword(answer,["hollow"],1,0.5)+keyword(answer,["spher","ball"],1,0.5)+keyword(answer,["tube","cylind"],1))},
		par:20
	},
	// Miscellaneous
]