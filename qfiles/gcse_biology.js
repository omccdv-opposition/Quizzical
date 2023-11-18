"use strict"
var question_file_at_gcse_biology = [
	// B1
	{
		text:"Name 12 organelles.",
		type:"open",
		topic:"organelles",
		modelAnswer:"Nucleus; ribosomes; cytoplasm; cell membrane; mitochondria; cell wall; chloroplast; vacuole; slime capsule; plasmids; flagellum; fimbriae",
		mark:function(answer){
			let marks = keyword(answer,["ribosome","cytoplasm","cell membrane","cell wall","chloroplast","vacuole","slime capsule","plasmid"])
									+keyword(answer,["pilus","pili","fimbria"],1)
									+keyword(answer,["flagellum","flagella"],1)
									+keyword(answer,["nucleus","nuclei"],1)
									+keyword(answer,["mitochondri"])
			return "123456789AAA".slice(0,marks)
		},
		par: 50
	},
	{
		text:"Describe the function of mitochondria and explain how they are adapted to their purpose.",
		type:"open",
		topic:"organelles",
		modelAnswer:"The purpose of mitochondria is to facilitate aerobic respiration. They have a folded inner membrane that increases the surface area for the relevant enzymes to work with.",
		mark:function(answer){
			if (keyword(answer,["respiration"],1)===0) return {}
			let marks = (keyword(answer,["enzyme"])?"3":"")+"556".slice(0,keyword(answer,["enzyme","aerobic"])+keyword(answer,["surface","area"],2,0.5)+Math.floor(keyword(answer,["folded","membrane"],2,0.5)))
			return subMarks(marks,keyword(answer,["protein","DNA","gene","photosynthesis"]))
		},
		par: 30
	},
	{
		text:"Describe the purpose of the nucleus.",
		type:"open",
		topic:"organelles",
		modelAnswer:"The nucleus contains genetic material (DNA) in the form of chromosomes, allowing it to control the cell's activities.",
		mark:function(answer){
			let marks = keyword(answer,["DNA","gene"],1)+keyword(answer,["DNA","genetic material"],1)+keyword(answer,["chromosomes"])+keyword(answer,["control","activities"],1)-1
			return {3:clamp(marks,2)}
		},
		par: 20
	},
	{
		text:"Describe the purpose of ribosomes.",
		type:"open",
		topic:"organelles",
		modelAnswer:"Ribosomes read mRNA sequences and synthesise proteins from amino acids based on the sequence of triplet codes within the mRNA strand.",
		mark:function(answer){
			if (keyword(answer,["protein"])===0) return {}
			let marks = keyword(answer,["synthesis","mRNA","amino acids","triplet code"],"u",2/3)+1/3
			return "455".slice(0,clamp(marks,3))
		},
		par: 20
	},
	{
		text:"Describe the purpose of the cell membrane.",
		type:"open",
		topic:"organelles",
		modelAnswer:"The cell membrane holds the cell together and acts as a selective barrier controlling what enters and leaves the cell via diffusion, active transport and osmosis.",
		mark:function(answer){
			let marks = ""
			if (keyword(answer,["hold","structure"])) marks += "3"
			if (keyword(answer,["filter","selective","barrier"])) marks += "5"
			if (keyword(answer,["enter","leave","exit","in","out","through"],2,1/2)>=1) marks += "4"
			if (keyword(answer,["diffusion","active transport","osmosis"],3,1/2)>=1) marks += "5"
			return marks
		},
		par: 30
	},
	{
		text:"Describe the purpose of the cell wall.",
		type:"open",
		topic:"organelles",
		modelAnswer:"The cell wall provides the cell with structural support, somewhat like a skeleton in an animal.",
		mark:function(answer){return {2:keyword(answer,["structur","support"],1)}},
		par: 15
	},
	{
		text:"Describe the purpose of chloroplasts.",
		type:"open",
		topic:"organelles",
		modelAnswer:"Chloroplasts contain chlorophyll, a green pigment which allows photosynthesis to take place within the cell.",
		mark:function(answer){
			if (keyword(answer,["photosynthesis","food"],1)===0) return {}
			return {2:keyword(answer,["photosynthesis"]),3:keyword(answer,["chlorophyll"])}
		},
		par: 20
	},
	{
		text:"Describe plasmids and explain their purpose.",
		type:"open",
		topic:["organelles","genes"],
		modelAnswer:"Plasmids are rings of DNA that are not part of a chromosome. They can replicate independently and be passed between different cells.",
		mark:function(answer){
			return {
				4:keyword(answer,["ring","loop","circle","circular"],1)+keyword(answer,["not","part","in","chromosome"],3,1/3),
				5:keyword(answer,["replicate","independent"],2,1/2)+keyword(answer,["between","different","cell"],1)
			}
		},
		par: 30
	},
	{
		text:"Describe the purpose of a permanent vacuole.",
		type:"open",
		topic:"organelles",
		modelAnswer:"The vacuole contains cell sap that helps to keep the cell turgid. It is also used to store nutrients, break down waste and maintain the cell's shape.",
		mark:function(answer){return {4:keyword(answer,["cell sap","turgid"])+keyword(answer,["store","storage","nutrients"],1)+keyword(answer,["break","waste","decompose","remov","get rid","gets rid"],2,1/2)+keyword(answer,["shape","structur"],1)}},
		par: 30
	},
	(()=>{
		let num1 = ranint(10,100,true)/10
		let num2 = ranint(1,20,true)*10**ranint(1,2)
		let correct = num1*num2/1000
		return {
			text:"Calculate the image size if the actual size is "+num1.toFixed(1)+" micrometres and the magnification is ×"+num2+". Give your answer in millimetres.",
			type:"open",
			topic:"microscopes",
			modelAnswer:String(correct),
			mark:function(answer){
				let exponent_difference = Math.log10(Number(String(answer).split(" ")[0])/correct)
				if (Math.abs(exponent_difference)<1e-6) return "45"
				if (approximateEqual(modulo(exponent_difference+0.5,1),0.5)) return "5"
				return ""
			},
			par: 15
		}
	})(),
	{
		text:"Explain the purpose of each of the following microscope parts.",
		type:"composite",
		components:[
			{
				text:"eyepiece lens",
				type:"open",
				topic:"microscopes",
				modelAnswer:"The eyepiece lens is looked through to see the image. It also magnifies the image.",
				mark:function(answer){return {2:keyword(answer,["look"]),3:keyword(answer,["magnif"])}},
				par:20
			},
			{
				text:"objective lens",
				type:"open",
				topic:"microscopes",
				modelAnswer:"Magnifies the image",
				mark:function(answer){return keyword(answer,["magnif"])?"2":""},
				par:10
			},
			{
				text:"stage",
				type:"open",
				topic:"microscopes",
				modelAnswer:"Supports the slide",
				mark:function(answer){return {3:keyword(answer,["support","slide"],2,0.5)}},
				par:10
			},
			{
				text:"clip",
				type:"open",
				topic:"microscopes",
				modelAnswer:"Holds the slide in place",
				mark:function(answer){return {2:keyword(answer,["hold","keep","secure"],1)}},
				par:10
			},
			{
				text:"handle",
				type:"open",
				topic:"microscopes",
				modelAnswer:"To carry the microscope with",
				mark:function(answer){return {2:keyword(answer,["carry"])}},
				par:10
			},
			{
				text:"lamp",
				type:"open",
				topic:"microscopes",
				modelAnswer:"Shines light through the slide so the image can be seen more easily",
				mark:function(answer){return {1:keyword(answer,["light"]),2:keyword(answer,["see","view"],1)}},
				par:20
			},
			{
				text:"focusing knobs",
				type:"open",
				topic:"microscopes",
				modelAnswer:"Move the stage up and down to bring the image into focus",
				mark:function(answer){return {2:clamp(keyword(answer,["move"])+keyword(answer,["up","down"],2,0.5)+keyword(answer,["focus"]),2)}},
				par:10
			}
		].shuffle().filter((x,i)=>Math.random()<0.5*0.85**i).sort((a,b)=>maxMark(a)-maxMark(b))
	},
	{
		text:"Select the three magnifications which are most often found on light microscopes.",
		type:"multiplechoice",
		topic:"microscopes",
		answers:multipleChoiceGenerator(["×4","×10","×40"],3,["×2","×5","×8","×20","×50","×80","×100","×200","×400","×500"],5),
		markTransform:x=>"123".slice(0,x),
		par:20
	},
	blankComposite([
		{
			label:"202306151837",
			text:"State the names of the two focusing knobs on a light microscope.",
			type:"open",
			topic:"microscopes",
			modelAnswer:"Coarse adjustment knob; fine adjustment knob",
			mark:function(answer){return {2:Math.min(keyword(answer,["adjustment","knob"]),keyword(answer,["coarse","fine"]))}},
			par:15
		},
		(()=>{
			let num=ranint(0,1)
			return {
				get text(){return "Which of the knobs you named in part "+getQuestionPartNameFromLabel("202306151837")+" produces the "+(num?"greater":"lower")+" change in magnification when turned?"},
				type:"open",
				topic:"microscopes",
				modelAnswer:(num?"coarse":"fine")+" adjustment knob",
				mark:function(answer){return {3:keyword(answer,[["fine","coarse"][num]])-keyword(answer,[["coarse","fine"][num]])}},
				par:10
			}
		})()
	]),
	{
		text:"Describe the structure of a nucleotide.",
		type:"open",
		topic:"genes",
		modelAnswer:"A nucleotide consists of a pentose sugar, a phosphate and a nitrogenous base.",
		mark:function(answer){return "445".slice(0,keyword(answer,["pentose","deoxyribose"])+keyword(answer,["phosphate"])+keyword(answer,["nitrogen","base"],2,0.5))},
		par: 20
	},
	{
		text:"List the four bases of DNA.",
		type:"open",
		topic:"genes",
		modelAnswer:"Adenine, thymine, cytosine and guanine",
		mark:function(answer){return subMarks("2223".slice(0,keyword(answer,["adenine","thymine","cytosine","guanine"])),keyword(answer,["uracil"]))},
		par: 20
	},
	{
		text:"List the four bases of RNA.",
		type:"open",
		topic:["genes","RNA"],
		modelAnswer:"Adenine, uracil, cytosine and guanine",
		mark:function(answer){return subMarks("2223".slice(0,keyword(answer,["adenine","uracil","cytosine","guanine"])),keyword(answer,["thymine"]))},
		par: 20
	},
	blankComposite([
		(()=>{
			let num = ranint(0,3)
			let correct = ["thymine","adenine","guanine","cytosine"][num]
			return {
				text:"State the base that "+["adenine","thymine","cytosine","guanine"][num]+" bonds with in DNA.",
				type:"open",
				topic:"genes",
				modelAnswer:correct,
				mark:function(answer){return {3:clamp(keyword(answer,[correct],1,2)-keyword(answer,["adenine","thymine","cytosine","guanine","uracil"]),1)}},
				par: 10
			}
		})(),
		(()=>{
			let num = ranint(0,3)
			let correct = ["uracil","adenine","guanine","cytosine"][num]
			return {
				text:"State the base that "+["adenine","uracil","cytosine","guanine"][num]+" bonds with in RNA.",
				type:"open",
				topic:["genes","RNA"],
				modelAnswer:correct,
				mark:function(answer){return {4:clamp(keyword(answer,[correct],1,2)-keyword(answer,["adenine","thymine","cytosine","guanine","uracil"]),1)}},
				par: 10
			}
		})()
	]),
	{
		text:"Select the number of nucleotides which codes for one amino acid.",
		type:"multiplechoice",
		topic:["genes","protein synthesis"],
		answers:multipleChoiceGenerator(["3"],1,["1","2","4","5","6"],5),
		markTransform:x=>x?"3":"",
		par: 10
	},
	{
		text:"Explain why DNA can be described as a polymer.",
		type:"open",
		topic:"genes",
		modelAnswer:"It is a chain of nucleotide monomers",
		mark:function(answer){return {3:clamp(keyword(answer,["chain"])+keyword(answer,["nucleotide","monomer"],2,0.5),1)}},
		par:15
	},
	blankComposite([
		{
			text:"Describe what happens during the transcription stage of protein synthesis.",
			type:"open",
			topic:"protein synthesis",
			modelAnswer:"Two DNA strands unzip around one another and one of them is used as a template to create mRNA. Base pairing enzures that this template is complementary to the opposite strand.",
			mark:function(answer){return "56".slice(0,keyword(answer,["unzip","mRNA","base pairing","complementary"],4,0.5))},
			par: 25
		},
		{
			text:"Describe what happens during the translation stage of protein synthesis.",
			type:"open",
			topic:"protein synthesis",
			modelAnswer:"Amino acids that match the triplet code on the mRNA strand are brought to a ribosome by tRNA molecules. The amino acids are then joined together to make a protein.",
			mark:function(answer){
				let marks = keyword(answer,["match","triplet code"],2,0.5)
									+keyword(answer,["mRNA"])
									+keyword(answer,["brought","delivered"],1,1/3)+keyword(answer,["ribosome"],1,1/3)+keyword(answer,["tRNA","transfer RNA"],1,1/3)
									+keyword(answer,["join","connect"],2,0.25)+keyword(answer,["make","create","synthesis"],1,0.25)+keyword(answer,["protein"],1,0.25)
				return "5678".slice(0,marks)
			},
			par: 35
		}
	]),
	{
		text:"Select the number of unique amino acids.",
		type:"multiplechoice",
		topic:["genes","protein synthesis"],
		answers:multipleChoiceGenerator(["20"],1,["1","2","3","4","5","6","8","9","10","12","15","16","18","24","25","30","32","36","40","48","52"],7),
		markTransform:x=>x?"A":"",
		par: 10
	},
	{
		text:"State the RNA codes of the three termination codons and their names.",
		type:"open",
		topic:["genes","protein synthesis"],
		modelAnswer:"UAG (amber), UAA (ochre) and UGA (opal)",
		mark:function(answer){return {A:keyword(answer,["UAG","UAA","UGA","amber","ochre"])+keyword(answer,["opal","umber"],1)}},
		par: 20
	},
	{
		text:"Explain what is meant by enzymes having a high specificity for their substrate.",
		type:"open",
		topic:"enzymes",
		modelAnswer:"Enzymes have an active site that a substrate must fit into in order for the reaction to be catalysed. In the majority of cases only one substrate can fit into the active site. This is called the lock-and-key mechanism.",
		mark:function(answer){
			let marks = keyword(answer,["active site"])
								+keyword(answer,["fit","catalyse","catalyze"],2,0.5)
								+keyword(answer,["one substrate","1 substrate","single substrate"])
								+keyword(answer,["lock-and-key","lock and key"])
			return "5666".slice(0,marks)
		},
		par: 50
	},
	(()=>{
		let num = 7+ranint(-5,0)+ranint(0,3)
		return {
			text:"Enzyme A has an optimum pH of "+num+". Explain what might happen to enzyme A's activity in conditions above pH "+num+".",
			type:"open",
			topic:"enzymes",
			modelAnswer:"A pH greater than "+num+" may interfere with the bonds holding the enzyme together, causing it to change shape (denature) and resulting in the substrate no longer being able to fit in. This results in the rate of reaction decreasing, potentially to zero.",
			mark:function(answer){
				let marks = keyword(answer,["interfere","bonds",num],3,0.5)
									+Math.min(keyword(answer,["denature"])+keyword(answer,["change","shape"],2,0.5),1)
									+Math.floor(keyword(answer,["substrate","no","fit"],3,1/3))
									+keyword(answer,["reduce","slow","decrease","go down","going down","shrink"])
				return "5666".slice(0,marks)
			},
			par: 40
		}
	})(),
	{
		text:"List four factors that may limit the rate of an enzyme-controlled reaction.",
		type:"open",
		topic:"enzymes",
		modelAnswer:"Temperature; pH; enzyme concentration; substrate concentration",
		mark:function(answer){return "1234".slice(0,keyword(answer,["temperature","pH","enzyme concentration","substrate concentration"]))},
		par: 20
	},
	blankComposite([
		{
			text:"Complete the symbol equation for aerobic respiration.",
			type:"gapfill",
			topic:"respiration",
			words:(()=>{function g(x){return [x,function(answer){return answer===x?1:0}]};function s(x){return ["<sub>",g(x),"</sub>"]};return gapfillGenerator([g("C"),...s("6"),g("H"),...s("12"),g("O"),...s("6")," + ",g("6"),g("O"),...s("2")," → ",g("6"),g("C"),g("O"),...s("2")," + ",g("6"),g("H"),...s("2"),g("O")],12)})(),
			markTransform:x=>"234".slice(0,x**2/48),
			par: 25
		},
		{
			text:"Complete the symbol equation for anaerobic respiration in animals.",
			type:"gapfill",
			topic:"respiration",
			words:(()=>{function g(x){return [x,function(answer){return answer===x?1:0}]};function s(x){return ["<sub>",g(x),"</sub>"]};return gapfillGenerator([g("C"),...s("6"),g("H"),...s("12"),g("O"),...s("6")," → ",g("2"),g("C"),...s("3"),g("H"),...s("6"),g("O"),...s("3")],8)})(),
			markTransform:x=>"334".slice(0,x**2/32),
			par: 25
		},
		{
			text:"Complete the symbol equation for fermentation.",
			type:"gapfill",
			topic:"respiration",
			words:(()=>{function g(x){return [x,function(answer){return answer===x?1:0}]};function s(x){return ["<sub>",g(x),"</sub>"]};return gapfillGenerator([g("C"),...s("6"),g("H"),...s("12"),g("O"),...s("6")," → ",g("2"),g("C"),...s("2"),g("H"),...s("5"),g("O"),g("H")," + ",g("2"),g("C"),g("O"),...s("2")],12)})(),
			markTransform:x=>"345".slice(0,x**2/48),
			par:25
		}
	].select(ranint(1,3,true)).qSort()),
	{
		text:"State the molecule used to store energy by organisms.",
		type:"open",
		topic:"respiration",
		modelAnswer:"Adenosine triphosphate (ATP)",
		mark:function(answer){return keyword(answer,["ATP","Adenosine triphosphate"],1)?"2":""},
		par: 15
	},
	{
		text:"Describe an experiment which proves that plants produce CO₂ during aerobic respiration.",
		type:"open",
		topic:["respiration","practical Skills"],
		modelAnswer: `Soak some dried beans in water for around a day until they start to germinate. Germinating beans will respire.
							<br>Boil a similarly sized bunch of dried beans. This will kill them and prevent them from respiring.
							<br>Put some hydrogen-carbonate indicator in two test tubes, then place your samples on platforms made of gauze.
							<br>Seal the test tubes with a rubber bung, and leave the apparatus for a set period of time - for example, 1 hour.
							<br>Hydrogen-carbonate solution is normally red, but becomes primary yellow upon reacting with CO₂.
							<br>The CO₂ produced by the germinating beans will turn the hydrogen-carbonate indicator yellow.`,
		mark:function(answer){
			let marks = keyword(answer,["soak","dried beans","water","germinate","boil","similar","kill","hydrogen-carbonate indicator","test tubes","platform","gauze","seal","rubber bung","leave","apparatus","red","yellow","react"],"u",0.5)
								 +keyword(answer,["carbon dioxide","CO2","CO₂"],1,0.5)
								 +Math.floor(keyword(answer,["set","fixed"],1,0.5)+keyword(answer,["length","period","amount","duration"],1,0.5))/2
			return "778789899".slice(0,clamp(marks,9))
		},
		par: 180
	},
	{
		text:"Describe an experiment that measures the heat transferred by a plant during respiration.",
		type:"open",
		topic:["respiration","practical skills"],
		modelAnswer: `Soak some dried beans in water for around a day until they start to germinate. Germinating beans will respire.
							<br>Boil a similarly sized bunch of dried beans. This will kill them and prevent them from respiring.
							<br>Add each set of beans to a vacuum flask, making sure that there is some oxygen left inside.
							<br>Place a thermometer into each flask and seal the top with cotton wool.
							<br>Record the temperature of each flask daily for a week.
							<br>The beans are well-insulated in the flasks, so when the germinating beans respire and transfer energy to their surroundings by heat, the test flask's temperature will increase compared to the control flask.`,
		mark:function(answer){
			let marks = keyword(answer,["soak","dried beans","water","germinate","boil","similar","kill","vacuum flask","oxygen","thermometer","seal","cotton wool","record","temperature","insulat","transfer","test flask","increase","compared","control flask"],"u",0.5)
			return "778789899".slice(0,clamp(marks,9))
		},
		par: 180
	},
	blankComposite([
		{
			text:"State the three chemical elements which make up carbohydrates.",
			type:"open",
			topic:"nutrients",
			modelAnswer:"Hydrogen, carbon and oxygen",
			mark:function(answer){return {A:keyword(answer,["hydrogen","carbon","oxygen"])-keyword(answer,["boron","nitrogen","sodium","magnesium","silicon","phosphorus","sulfur","chlorine","potassium","calcium","manganese","iron","cobalt","nickel","copper","zinc","selenium","molybdenum"])}},
			par: 20
		},
		{
			text:"State the four chemical elements which all proteins contain.",
			type:"open",
			topic:"protein synthesis",
			modelAnswer:"Hydrogen, carbon, nitrogen and oxygen",
			mark:function(answer){return {A:keyword(answer,["hydrogen","carbon","nitrogen","oxygen"],4,0.75)-keyword(answer,["boron","sodium","magnesium","silicon","phosphorus","sulfur","chlorine","potassium","calcium","manganese","iron","cobalt","nickel","copper","zinc","selenium","molybdenum"])}},
			par: 20
		}
	]),
	{
		text:"State what lipids are made from.",
		type:"open",
		topic:"nutrients",
		modelAnswer:"Glycerol and three fatty acids",
		mark:function(answer){return "34".slice(0,keyword(answer,["glycerol","fatty acids"])-keyword(answer,["simple sugars","monosaccharides","glucose","fructose","amino","starch"]))},
		par: 20
	},
	blankComposite([
		{
			text:"State the monomers that carbohydrates are made up of.",
			type:"open",
			topic:"nutrients",
			modelAnswer:"Simple sugars (monosaccharides)",
			mark:function(answer){return {3:keyword(answer,["simple sugars","monosaccharides"],1)-keyword(answer,["amino acid","starch","lipids","glycerol","fatty acid"])}},
			par:10
		},
		{
			text:"State three examples of such monomers.",
			type:"open",
			topic:"nutrients",
			modelAnswer:"Glucose; fructose; galactose",
			mark:function(answer){return "477".slice(0,keyword(answer,["glyceraldehyde","dihydroxyacetone","erythrose","threose","erythrulose","arabinose","lyxose","ribose","xylose","ribulose","xylulose","allose","altrose","galactose","glucose","gulose","idose","mannose","talose","fructose","psicose","sorbose","tagatose","mannuheptulose","sedoheptulose","octolose","2-keto-3-deoxy-manno-octonate","sialose","maltose","sucrose"],3))},
			par:20
		}
	]),
	{
		text:"State the monomers that proteins are made up of.",
		type:"open",
		topic:"nutrients",
		modelAnswer:"Amino acids",
		mark:function(answer){return {3:keyword(answer,["amino acids"])-keyword(answer,["simple sugars","monosaccharides","glucose","fructose","starch","lipids","fatty acid","glycerol"])}},
		par: 10
	},
	blankComposite([
		{
			text:"State where in the body carbohydrates are broken down and the enzymes responsible.",
			type:"open",
			topic:"digestion",
			modelAnswer:"They are broken down by carbohydrases in the mouth and small intestine.",
			mark:function(answer){return "35".slice(0,keyword(answer,["carbohydrases"])+keyword(answer,["mouth","small intestine"],2,0.5)-keyword(answer,["lipase","amylase","protease","stomach"]))},
			par: 30
		},
		{
			text:"State where in the body proteins are broken down and the enzymes responsible.",
			type:"open",
			topic:"digestion",
			modelAnswer:"They are broken down by proteases in the stomach and small intestine.",
			mark:function(answer){return "35".slice(0,keyword(answer,["proteases"])+keyword(answer,["stomach","small intestine"],2,0.5)-keyword(answer,["lipase","amylase","carbohydrase","mouth"]))},
			par: 30
		},
		{
			text:"State where in the body lipids are broken down and the enzymes responsible.",
			type:"open",
			topic:"digestion",
			modelAnswer:"They are broken down by lipases in the small intestine.",
			mark:function(answer){return "34".slice(0,keyword(answer,["lipases"])+keyword(answer,["small intestine"])-keyword(answer,["protease","amylase","carbohydrase","mouth","stomach"]))},
			par: 20
		}
	].select(ranint(1,3,true))),
	{
		text:"Describe how you can test for reducing and non-reducing sugars.",
		type:"open",
		topic:["food tests","practical skills"],
		modelAnswer: `To test for reducing sugars, add blue Benedict's reagent to a sample and heat it in a water bath that's been set at 75 degrees Celsius.
							<br>If the test is positive, a coloured precipitate will form in the solution.
							<br>The higher the concentration of reducing sugar, the further the colour change goes.
							<br>It goes from blue to green to yellow to orange to brick red.
							<br>To test for non-reducing sugars, add dilute hydrochloric acid first and heat in a water bath at 75 degrees Celsius, then neutralise the solution using sodium hydrogen-carbonate and carry out Benedict's test as detailed above.`,
		mark:function(answer){
			let marks = keyword(answer,["blue","Benedict's reagent","sample","water bath","positive","coloured precipitate","concentration","reducing sugar","hydrochloric acid","neutralise","sodium hydrogen-carbonate"],"u",0.5)
								 +keyword(answer,["green","yellow","orange","brick red"],4,0.25)
								 +keyword(answer,["75","167","348","Celsius","Fahrenheit","Kelvin"],2,0.5)
			return "678789".slice(0,clamp(marks,6))
		},
		par: 150
	},
	{
		text:"Describe how you can test for starch.",
		type:"open",
		topic:["food tests","practical skills"],
		modelAnswer: `Add iodine solution to the test sample.
							<br>If starch is present, the iodine will change colour from brown to dark blue.
							<br>If no starch is present, the iodine will stay brown.`,
		mark:function(answer){
			let marks = keyword(answer,["iodine","solution","sample","starch","present","no","stay"],"u",0.5)
								 +keyword(answer,["color","colour","change"],2,0.25)
								 +keyword(answer,["brown","orange"],1,0.5)
								 +keyword(answer,["blue","black"],1,0.5)
			return "5678".slice(0,clamp(marks,4))
		},
		par: 120
	},
	{
		text:"Describe how you can test for lipids.",
		type:"open",
		topic:["food tests","practical skills"],
		modelAnswer: `Add ethanol to a test tube with the sample, shake for around a minute until it dissolves and pour the solution into water.
							<br>If lipids are present, a milky emulsion will appear.
							<br>The more lipid there is, the more noticeable the emulsion will be.`,
		mark:function(answer){
			let marks = keyword(answer,["ethanol","shake","minute","dissolve","solution","water","lipids","emulsion","more"],"u",0.5)
								 +keyword(answer,["sample","substance"],1,0.5)
								 +keyword(answer,["pour","add","mix"],1,0.5)
								 +keyword(answer,["test tube","boiling tube"],1,0.5)
			return "67778".slice(0,clamp(marks,5))
		},
		par: 90
	},
	{
		text:"Describe how you can test for proteins.",
		type:"open",
		topic:["food tests","practical skills"],
		modelAnswer: `Use the Biuret test: first, add a few drops of sodium hydroxide solution to make the solution alkaline.
							<br>Then add some bright blue copper(II) sulfate solution.
							<br>If no protein is present, the solution will stay blue. If protein is present, the solution will turn purple.`,
		mark:function(answer){
			let marks = keyword(answer,["Biuret","drops","sodium hydroxide","solution","sample","alkali","present","stay","turn"],"u",0.5)
								 +keyword(answer,["blue","cyan"],1,0.5)
								 +keyword(answer,["copper sulfate","copper sulphate","copper(II) sulfate","copper(II) sulphate"],1,0.5)
								 +keyword(answer,["purple","violet"],1,0.5)
			return "67778".slice(0,clamp(marks,5))
		},
		par: 90
	},
	(()=>{
		let num = ranint(0,3)
		return {
			text:"Select the type of reaction of "+["aerobic respiration","anaerobic respiration","fermentation","photosynthesis"][num]+".",
			type:"multiplechoice",
			topic:num===3?"photosynthesis":"respiration",
			answers:multipleChoiceGenerator([num===3?"endothermic":"exothermic"],1,[num===3?"exothermic":"endothermic"],1),
			markTransform:x=>x?"1":"0",
			par:10
		}
	})(),
	{
		text:"Describe an experiment to measure the rate of photosynthesis.",
		type:"open",
		topic:["photosynthesis","practical skills"],
		modelAnswer: `Place some pondweed in a test tube filled with water.
							<br>Seal the test tube with a rubber bung, connect to a gas syringe via a capillary tube and attach to a clamp.
							<br>Leave the pondweed to photosynthesise for a set amount of time. As it photosynthesises, the oxygen released will collect in the capillary tube.
							<br>At the end of the experiment, use the syringe to draw the gas bubble in the tube up alongside a ruler.
							<br>The length of the gas bubble is proportional to the volume of oxygen produced.`,
		mark:function(answer){
			let marks = keyword(answer,["pondweed","test tube","water","seal","rubber bung","gas syringe","capillary tube","clamp","leave","photosynthesis","oxygen","collect","draw","bubble","ruler","proportional","oxygen","produced"],"u",0.5)
								 +keyword(answer,["test tube","boiling tube"],1,0.5)
								 +Math.floor(keyword(answer,["set","fixed"],1,0.5)+keyword(answer,["length","period","amount","duration"],1,0.5))/2
			return "778789899".slice(0,clamp(marks,9))
		},
		par: 180
	},
	{
		text:"List three factors that limit the rate of photosynthesis.",
		type:"open",
		topic:"photosynthesis",
		modelAnswer:"Light intensity, carbon dioxide concentration, temperature",
		mark:function(answer){return "334".slice(0,keyword(answer,["light intensity","temperature"])+Math.floor(keyword(answer,["concentration"],1,0.5)+keyword(answer,["carbon dioxide","CO₂","CO<sub>2</sub>"],1,0.5)))},
		par: 30
	},
	(()=>{
		let distance = ranint(1,4,true)*30
		let multiplier = ranint(2,4,true)**((-1)**ranint(0,1))
		let intensity = ranint(5,10,true)**2*36
		let correct = Math.round(intensity*multiplier**-2)+" lux"
		return {
			text:"When a lamp is "+distance+" cm from a plant, the light intensity reaching it is "+intensity+" lux. Calculate the light intensity if the lamp is moved to a distance of "+(distance*multiplier)+" cm.",
			type:"open",
			topic:["photosynthesis","calculations"],
			modelAnswer:correct,
			mark:function(answer){
				let exponent_difference = Math.log10(Number(answer.split(" ")[0])/Number(correct.split(" ")[0]))
				let marks = ""
				if (Math.abs(exponent_difference)<1e-6) {marks = "45"}
				else if (approximateEqual(modulo(exponent_difference+0.5,1),0.5)) {marks = "5"}
				if (marks>0) marks += keyword(answer,["lux"])?"6":""
				return marks
			},
			par: 15
		}
	})(),
	// B2
	(()=>{
		let words = ["Organelle","Cell","Tissue","Organ","Organ system"]
		if (Math.random()<0.4) {return {
			text:"Fill in the missing levels of organisation:",
			type:"gapfill",
			topic:"levels of cellular organisation",
			words:(()=>{
				let out = []
				for (let i=0;i<7;i++) {
					out.push(gapfillExact(words[i]))
					if (i<6) out.push(" → ")
				}
				return gapfillGenerator(out,3)
			})(),
			markTransform:x=>"3".repeat(x),
			par:30
		}}
		return {
			text:"Put the levels of organisation in order, from smallest to largest.",
			type:"order",
			topic:"levels of cellular organisation",
			answers:words,
			markTransform:x=>"12".slice(0,x),
			par:25
		}
	})(),
	blankComposite([
		{
			text:"Explain what is meant by an organ.",
			type:"open",
			topic:["levels of cellular organisation","organs"],
			modelAnswer:"A group of tissues working together to perform a common function.",
			mark:function(answer){return "45".slice(0,Math.floor(keyword(answer,["group","tissue"],2,0.5))+Math.floor(keyword(answer,["common","function"],2,0.5)))},
			par:15
		},
		{
			text:"Which of the below are <b>not</b> organs?<br>Select <b>two</b> options.",
			type:"multiplechoice",
			topic:["levels of cellular organisation","organs"],
			answers:multipleChoiceGenerator(["Capillaries","Nucleus"],2,["Brain","Eyes","Heart","Intestines","Lungs","Pancreas","Stomach"],4),
			markTransform:x=>"12".slice(0,x),
			par:20
		}
	].filter(x=>Math.random()<0.75)),
	(()=>{
		let out = [{
			text:"Explain what is meant by an organ system.",
			type:"open",
			topic:["levels of cellular organisation","organ systems"]
		}]
		if (Math.random()<0.3) {
			let num = ranint(ranint(1,3,true),ranint(3,9,true),true)
			out.push({
				text:((num>2)?"List":"Name")+" "+pluralize(num,"example")+" of organ systems.",
				type:"open",
				topic:["levels of cellular organisation","organ systems"],
				modelAnswer:["skeletal","nervous","endocrine","cardiovascular","lymphatic","respiratory","digestive","urinary","reproductive"],
				mark:function(answer){
					let marks = keyword(answer,this.modelAnswer)
					return addMarks("2345".slice(0,marks),{A:Math.max(marks-4,0)})
				},
				par:5+num*5
			})
		}
	})(),
	// B3
	{
		text:"State the technical term for a nerve cell.",
		type:"open",
		topic:"the nervous system",
		modelAnswer:"Neurone",
		mark:function(answer){return keyword(answer,["neuron"])?"2":""},
		par:10
	},
	(()=>{
		let words = ["Stimulus","Receptor","Sensory neurone","Central nervous system","Motor neurone","Effector","Response"]
		if (Math.random()<0.4) {return {
			text:"Fill in the missing parts of the reflex arc:",
			type:"gapfill",
			topic:"the nervous system",
			words:(()=>{
				let out = []
				for (let i=0;i<7;i++) {
					out.push(gapfillExact(words[i]))
					if (i<6) out.push(" → ")
				}
				return gapfillGenerator(out,4)
			})(),
			markTransform:x=>"4".repeat(x),
			par:30
		}}
		return {
			text:"Put the parts of a reflex arc in order.",
			type:"order",
			topic:"the nervous system",
			answers:words,
			markTransform:x=>"123".slice(0,x),
			par:25
		}
	})(),
	{
		text:"Explain how the central nervous system coordinates a response.",
		type:"open",
		topic:"the nervous system",
		modelAnswer:"When sensory receptors detect a change in the environment (a stimuus), information is sent as nervous impulses along sensory neurones to the central nervous system, which consists of the brain and spinal cord.<br>The central nervous system sends information to an effector along a motor neurone. The effector then responds accordingly - for example, a muscle may contract or a gland may secrete a hormone.",
		mark:function(answer){
			if (keyword(answer,["central nervous system","CNS"])===0) return {}
			let marks = keyword(answer,["sensory","receptor","detect","stimul","information","impulse","neurone","brain","spinal cord","effector"],"u",0.5)+keyword(answer,["electrical","nervous"],1,0.5)
			return "678789".slice(0,marks/2+1)
		},
		par:60
	},
	{
		text:"Select the three main parts of a neurone.",
		type:"multiplechoice",
		topic:"the nervous system",
		answers:multipleChoiceGenerator(["Soma","Dendrite","Axon"],3,["Synapse","Receptor","Effector","Reflex arc","Myelin sheath"],5),
		markTransform:x=>"123".slice(0,x),
		par:30
	},
	{
		text:"What is an axon?",
		type:"open",
		topic:"the nervous system",
		modelAnswer:"The elongated part of a neurone along which impulses are passed.",
		mark:function(answer){return keyword(answer,["long"])?"4":""},
		par:10
	},
	blankComposite([
		{
			text:"What is a dendrite?",
			type:"open",
			topic:"the nervous system",
			modelAnswer:"Branching extensions of a neurone",
			mark:function(answer){return keyword(answer,["branch","tree"])?"4":""},
			par:10
		},
		{
			text:"Explain the advantage of dendrites.",
			type:"open",
			topic:"the nervous system",
			modelAnswer:"This allows neurones to connect to lots of other neurones.",
			mark:function(answer){return keyword(answer,["connect"])?"5":""},
			par:20
		}
	]),
	blankComposite([
		{
			text:"Explain the purpose of a myelin sheath.",
			type:"open",
			topic:["the nervous system","myelination"],
			modelAnswer:"This acts as an electrical insulator, speeding up the electrical impulse.",
			mark:function(answer){return "34".slice(0,keyword(answer,["insulator","impulse"],2,2/3)+keyword(answer,["speed","accelerat","fast"],1,2/3))},
			par:20
		},
		{
			text:"What are myelin sheaths made of?",
			type:"multiplechoice",
			topic:["the nervous system","myelination"],
			answers:multipleChoiceGenerator(["Fat"],1,["Muscle","Collagen"],2),
			markTransform:x=>x?"1":"",
			par:10
		},
		{
			text:"Select the type of neurone which is least likely to be myelinated.",
			type:"multiplechoice",
			topic:["the nervous system","myelination"],
			answers:multipleChoiceGenerator(["Relay"],1,["Sensory","Motor"],2),
			markTransform:x=>x?"2":"",
			par:10
		},
	].select(ranint(1,3))),
	{
		text:"Select the two statements which are true.",
		type:"multiplechoice",
		topic:"the nervous system",
		answers:multipleChoiceGenerator(["Dendrites carry impulses towards the cell body","Axons carry impulses away from the cell body"],2,["Dendrites carry impulses away from the cell body","Axons carry impulses towards the cell body"],2),
		markTransform:x=>{return {2:x/2}},
		par:30
	},
	blankComposite([
	{
		text:"What is a synapse?",
		type:"open",
		topic:"the nervous system",
		modelAnswer:"The gap between two neurones",
		mark:function(answer){return keyword(answer,["gap"])?"3":""},
		par:10
	},
	{
		text:"Explain how neurones communicate across a synapse.",
		type:"open",
		topic:"the nervous system",
		modelAnswer:"When an electrical impulse reaches the end of an axon, this stimulates the release of neurotransmitters which diffuse across the synapse. These chemicals bind to the receptor molecules in the membrane of the next neurone, causing a new electrical impulse.",
		mark:function(answer){return "56".slice(0,keyword(answer,["axon","neurotransmitter","diffuse","receptor","membrane"],4,0.5))},
		par:40
	}
]),
	blankComposite([
		{
			text:"Explain why reflex actions are quicker than conscious actions.",
			type:"open",
			topic:["the nervous system","reflex actions"],
			modelAnswer:"The conscious brain is not involved in a reflex arc. The sensory neurone connects to a relay neurone in the spinal cord or in an unconscious part of the brain, which links directly to the correct motor neurone, so no time is spent thinking.",
			mark:function(answer){return "345678".slice(0,keyword(answer,["conscious","arc","sensory","relay","motor","neurone"],6,0.5)+keyword(answer,["spinal cord","direct","think"]))},
			par:40
		},
		{
			text:"State the purpose of reflex actions.",
			type:"open",
			topic:["the nervous system","reflex actions"],
			modelAnswer:"To protect from injury",
			mark:function(answer){return "45".slice(0,keyword(answer,["protect","injur"]))},
			par:15
		}
	].select(ranint(1,2))),
	blankComposite([
		{
			text:"State the function of the cornea.",
			type:"open",
			topic:"the eye",
			modelAnswer:"Refracts light into the eye",
			mark:function(answer){return keyword(answer,["refract"])?"4":""},
			par:15
		},
		{
			text:"Explain the function of the iris.",
			type:"open",
			topic:"the eye",
			modelAnswer:"Controls the size of the pupil, which in turn determines how much light enters the eye",
			mark:function(answer){return "45".slice(0,keyword(answer,["size","pupil"],2,0.5)+keyword(answer,["light","enter","eye"],3,1/3))},
			par:30
		},
		{
			text:"Explain the function of the eye lens.",
			type:"open",
			topic:"the eye",
			modelAnswer:"The lens refracts light to focus it into the retina.",
			mark:function(answer){return "45".slice(0,keyword(answer,["refract"])+keyword(answer,["focus","retina"],2,0.5))},
			par:20
		}
	]),
	{
		text:"The ciliary body contains ciliary muscles, which are attached to suspensory ligaments - they work together to alter the shape of the lens.",
		type:"composite",
		components:[
			{
				text:"Explain what happens in the ciliary body to look at distant objects.",
				type:"open",
				topic:"the eye",
				modelAnswer:"The ciliary muscle relaxes, causing the suspensory ligaments to tighten. This pulls the lens into a less rounded shape, so light is refracted less.",
				mark:function(answer){return "556".slice(0,keyword(answer,["ciliary muscle","relax","suspensory ligament","tight","refract","less"],6,0.5)-keyword(answer,["contract","slack"],2,0.5))},
				par:45
			},
			{
				text:"Explain what happens in the ciliary body to look at close objects.",
				type:"open",
				topic:"the eye",
				modelAnswer:"The ciliary muscle contracts, causing the suspensory ligaments to slacken. This pulls the lens into a more rounded shape, so light is refracted more.",
				mark:function(answer){return "556".slice(0,keyword(answer,["ciliary muscle","contract","suspensory ligament","slack","refract","more"],6,0.5)-keyword(answer,["relax","tight"],2,0.5))},
				par:45
			}
		].select(ranint(1,2))
	},
	{
		text:"The retina is covered in light receptors called rods and cones.",
		type:"composite",
		components:[
			{
				text:"Explain the function of rods.",
				type:"open",
				topic:"the eye",
				modelAnswer:"They are more sensitive to light than cones, which enables vision in dim light.",
				mark:function(answer){return "45".slice(0,keyword(answer,["sensitive","light"],2,0.5)+keyword(answer,["dim","dark","low"],1))},
				par:20
			},
			{
				text:"Explain the function of cones.",
				type:"open",
				topic:"the eye",
				modelAnswer:"They are sensitive to different colours, enabling colour vision.",
				mark:function(answer){return "45".slice(0,keyword(answer,["sensitive","light","colour"],3,2/3))},
				par:20
			}
		].select(Math.random()<0.25?1:2)
	},
	{
		text:"Explain the function of the optic nerve.",
		type:"open",
		topic:"the eye",
		modelAnswer:"Carries impulses from the light receptors in the retina to the brain.",
		mark:function(answer){return "34".slice(0,keyword(answer,["impulse","receptor","retina","brain"],4,0.5))},
		par:20
	},
	{
		text:"Some people have a condition called long-sightedness.",
		type:"composite",
		components:[
			{
				text:"State the scientific term for this condition.",
				type:"open",
				topic:"the eye",
				modelAnswer:"Hyperopia",
				mark:function(answer){return {3:keyword(answer,["hyperopia"])-keyword(answer,["myopia","hypoopia","superopia","subopia"])}},
				par:10
			},
			{
				text:"State two causes this condition.",
				type:"open",
				topic:"the eye",
				modelAnswer:"<b>1</b> The lens is the wrong shape and doesn't refract light sufficiently<br><b>2</b> The eyeball is too short",
				mark:function(answer){return "45".slice(0,keyword(answer,["lens","shape","refract"],3,0.25)+keyword(answer,["sufficient","enough"],1,0.25)+keyword(answer,["eyeball","short"],2,0.5))},
				par:30
			},
			{
				text:"Explain how this condition affects vision.",
				type:"open",
				topic:"the eye",
				modelAnswer:"The images of near objects are brought into focus behind the retina",
				mark:function(answer){return "345".slice(0,keyword(answer,["image","focus","behind","retina"],4,0.5)+keyword(answer,["near","close"],1))},
				par:20
			},
			{
				text:"State two ways in which this condition can be treated.",
				type:"open",
				topic:"the eye",
				modelAnswer:"Glasses or contact lenses with a convex lens; corneal laser surgery",
				mark:function(answer){return "45".slice(0,keyword(answer,["convex","lens"],2,0.5)+keyword(answer,["corneal","laser","surgery"],3,1/3))},
				par:20
			}
		].select(ranint(2,4,true)).qSort()
	},
	{
		text:"Some people have a condition called short-sightedness.",
		type:"composite",
		components:[
			{
				text:"State the scientific term for this condition.",
				type:"open",
				topic:"the eye",
				modelAnswer:"Myopia",
				mark:function(answer){return {3:keyword(answer,["myopia"])-keyword(answer,["hyperopia","hypoopia","superopia","subopia"])}},
				par:10
			},
			{
				text:"State two causes this condition.",
				type:"open",
				topic:"the eye",
				modelAnswer:"<b>1</b> The lens is the wrong shape and refracts light too much<br><b>2</b> The eyeball is too long",
				mark:function(answer){return "45".slice(0,keyword(answer,["lens","shape","refract"],3,0.25)+keyword(answer,["much","strong","more"],1,0.25)+keyword(answer,["eyeball","long"],2,0.5))},
				par:30
			},
			{
				text:"Explain how this condition affects vision.",
				type:"open",
				topic:"the eye",
				modelAnswer:"The images of distant objects are brought into focus in front the retina",
				mark:function(answer){return "345".slice(0,keyword(answer,["image","focus","front","retina"],4,0.5)+keyword(answer,["distant","far"],1))},
				par:20
			},
			{
				text:"State two ways in which this condition can be treated.",
				type:"open",
				topic:"the eye",
				modelAnswer:"Glasses or contact lenses with a concave lens; corneal laser surgery",
				mark:function(answer){return "45".slice(0,keyword(answer,["concave","lens"],2,0.5)+keyword(answer,["corneal","laser","surgery"],3,1/3))},
				par:20
			}
		].select(ranint(2,4,true)).qSort()
	},
	blankComposite([
		{
			text:"Select the form of colour blindness which is most common.",
			type:"multiplechoice",
			topic:["the eye","colour blindness"],
			answers:multipleChoiceGenerator(["Red-green"],1,["Green-blue","Blue-red","Black-white"],3),
			markTransform:x=>x?"3":"",
			par:10
		},
		{
			text:"Explain how colour blindness can be treated.",
			type:"open",
			topic:["the eye","colour blindness"],
			modelAnswer:"There is no cure, but tinted lenses can be used to help people see colours more normally.",
			mark:function(answer){return "456".slice(0,Math.floor(Math.max(keyword(answer,["no","cure"],2,0.5),keyword(answer,["incurable"])))+Math.floor(keyword(answer,["tinted","lens"],2,0.5)))},
			par:30
		}
	]),
	multipleChoiceComposite("Select the region of the brain which matches each description.",[
		["The largest part of the brain","Cerebrum","2"],
		["Has a wrinkled surface","Cerebrum","2"],
		["Responsible for consciousness, intelligence, memory and language","Cerebrum","4"],
		["Controls homeostasis","Hypothalamus","3"],
		["Produces hormones that control the pituitary gland","Hypothalamus","4"],
		["Produces many hormones including thyroid stimulating hormone (TSH)","Pituitary gland","3"],
		["Controls unconscious activities such as breathing and heart rate","Medulla","3"],
		["Facilitates muscle coordination","Cerebellum","4"]
	],ranint(3,6),["the nervous system","the brain"]),
	{
		text:"Which is the approximate number of neurones in the brain?",
		type:"multiplechoice",
		topic:["the nervous system","the brain"],
		answers:multipleChoiceGenerator(["8.6×10<sup>10</sup>"],1,[5,6,7,8,9,11,12].map(x=>"8.6×10<sup>"+x+"</sup>"),5),
		markTransform:x=>x?"A":"",
		par:10
	},
	blankComposite([
		{
			text:"Explain what is meant by a case study of the brain.",
			type:"open",
			topic:"the brain",
			modelAnswer:"A detailed study of an individual with abnormal brain function",
			mark:function(answer){
				if(keyword(answer,["study","individual"])<2){return ""}
				return "45".slice(0,((keyword(answer,["detailed","brain","function"])+keyword(answer,["incorrect","abnormal","wrong"],1))>2)?2:1)
			},
			par:20
		},
		{
			text:"Explain how case studies of people with brain damage help scientists understand the brain.",
			type:"open",
			topic:"the brain",
			modelAnswer:"If part of the brain has been damaged, the effect this has on the patient can be used to infer the function of the damaged part of the brain. For example, if an area of the brain was damaged and the patient went blind, it's likely that area of the brain is involved in vision.",
			mark:function(answer){return (keyword(answer,["infer","guess","predict"],1)===0)?"":(keyword(answer,["function","purpose"])===0)?"5":"56"},
			par:30
		},
		{
			text:"Explain how fMRI scans help scientists understand the brain.",
			type:"open",
			topic:"the brain",
			modelAnswer:"This shows which parts of the brain are activated when performing certain tasks inside the scanner",
			mark:function(answer){return (keyword(answer,["part","region","section"],1)+keyword(answer,["brain","activ"])<3)?"":(keyword(answer,["scanner","machine","device"])===0)?"5":"56"},
			par:20
		},
		(()=>{
			let num = ranint(1,3,true)
			return {
				text:"Explain "+pluralize(num,"problems")+" with case studies of the brain.",
				type:"open",
				topic:"the brain",
				modelAnswer:["If a person has severe brain damage, it may be unethical to study them as they may not be able to give informed consent","Studying the brains of deceased people relies on people donating their brains, so supply is severely limited","There can be problems when interpreting the results of case studies, as it cannot be known for sure if the same activity would take place in a normal situation"].select(num).join("<br>"),
				mark:function(answer){
					let marks = []
					marks.push(keyword(answer,["ethic"],1,2/3)+keyword(answer,["damage"],1,2/3)+keyword(answer,["informed","consent"],2,1/3))
					marks.push((keyword(answer,["die","decease","dead","death"])===0)?0:(keyword(answer,["donat"])+keyword(answer,["limit","supply","scarce"],1)))
					marks.push((keyword(answer,["interpret","result"])<2)?0:((keyword(answer,["normal","ordinary","other"],1)+keyword(answer,["condition","situation","circumstance"],1))===2)?2:1)
					return bestMarks(marks,num,"56")
				},
				par:num*24
			}
		})(),
	].select(ranint(1,4,true)).qSort()),
	multipleChoiceComposite("For each of the below, select which system in the body it describes.",[
		["Releases hormones into the bloodstream","Endocrine","3"],
		["The fastest system in the body","Nervous","3"],
		["Can be described as being \"double\"","Circulatory","2"]
	],3,"the endocrine system"),
	blankComposite([
		{
			text:"Explain what is meant by a target cell.",
			type:"open",
			topic:"the endocrine system",
			modelAnswer:"Cells which have the right receptors to respond to a specific hormone.",
			mark:function(answer){return {4:keyword(answer,["receptor","hormone"])}},
			par:20
		},
		{
			text:"Give the scientific term for an organ which contains target cells.",
			type:"open",
			topic:"the endocrine system",
			modelAnswer:"Target organ",
			mark:function(answer){return {3:keyword(answer,["target organ"])-keyword(answer,["receptor"])}},
			par:10
		}
	]),
	// Miscellaneous
	expandListOfAbbreviations([
		["TEM","Transmission electron microscope","4"],
		["SEM","Scanning electron microscope","4"],
		["ATP","Adenosine triphosphate","A"],
		["CNS","Central nervous system","3"],
		["fMRI","Functional magnetic resonance imaging","A"],
		["CT (as in \"CT scan\")","Computer tomography","A"],
		["PET (as in \"PET scan\")","Positron emission tomography","A"],
		["TSH","Thyroid stimulating hormone","3"],
		["LH","luteinising hormone","4"],
		["FSH","follicle stimulating hormone","4"],
		["IUD","Intra-uterine device","4"],
		["IUS","Intra-uterine system","4"],
		["IVF","In vitro fertiisation","3"],
		["STI","Sexually transmitted infection","2"],
		["ADH","Anti-diuretic hormone","4"]
	])
]
// resume at page 23