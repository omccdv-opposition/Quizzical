"use strict"
var question_file_at_gcse_biology = [
	// B1
	{
		text:"Name 12 organelles.",
		type:"open",
		level:"A",
		modelAnswer:"Nucleus; ribosomes; cytoplasm; cell membrane; mitochondria; cell wall; chloroplast; vacuole; slime capsule; plasmids; flagellum; fimbriae",
		mark:function(answer){
			let marks = keyword(answer,["ribosome","cytoplasm","cell membrane","cell wall","chloroplast","vacuole","slime capsule","plasmid"],"u",0.5)
									+keyword(answer,["pilus","pili","fimbria"],1,0.5)
									+keyword(answer,["flagellum","flagella"],1,0.5)
									+keyword(answer,["nucleus","nuclei"],1,0.5)
									+keyword(answer,["mitochondria","mitochondrion"],1,0.5)
			return clamp(marks,6)
		},
		par: 50
	},
	{
		text:"Describe the function of mitochondria and explain how they are adapted to their purpose.",
		type:"open",
		level:6,
		modelAnswer:"The purpose of mitochondria is to facilitate aerobic respiration. They have a folded inner membrane that increases the surface area for the relevant enzymes to work with.",
		mark:function(answer){
			if (keyword(answer,["respiration"],1)==0) return 0
			let marks = keyword(answer,["enzyme","aerobic","surface area"])+Math.floor(keyword(answer,["folded","membrane"],2,0.5))-keyword(answer,["protein","DNA","gene","photosynthesis"])
			return clamp(marks,4)
		},
		par: 30
	},
	{
		text:"Describe the purpose of the nucleus.",
		type:"open",
		level:3,
		modelAnswer:"The nucleus contains genetic material (DNA) in the form of chromosomes, allowing it to control the cell's activities.",
		mark:function(answer){
			if (keyword(answer,["DNA","gene"])==0) return 0
			let marks = keyword(answer,["DNA","genetic material"],1)+keyword(answer,["chromosomes"])+keyword(answer,["control","activities"],1)
			return clamp(marks,2)
		},
		par: 20
	},
	{
		text:"Describe the purpose of ribosomes.",
		type:"open",
		level:4,
		modelAnswer:"Ribosomes read mRNA sequences and synthesise proteins from amino acids based on the sequence of triplet codes within the mRNA strand.",
		mark:function(answer){
			if (keyword(answer,["protein"])==0) return 0
			let marks = keyword(answer,["synthesis","mRNA","amino acids","triplet code"],"u",2/3)+1/3
			return clamp(marks,3)
		},
		par: 20
	},
	{
		text:"Describe the purpose of the cell membrane.",
		type:"open",
		level:3,
		modelAnswer:"The cell membrane holds the cell together and acts as a selective barrier controlling what enters and leaves the cell via diffusion, active transport and osmosis.",
		mark:function(answer){
			let marks = keyword(answer,["hold","structure"],1)
								 +keyword(answer,["filter","selective","barrier"],1)
								 +keyword(answer,["enter","leave","exit","in","out","through"],2,1/2)
								 +keyword(answer,["diffusion","active transport","osmosis"],3,1/2)
			return clamp(marks,4)
		},
		par: 30
	},
	{
		text:"Describe the purpose of the cell wall.",
		type:"open",
		level:3,
		modelAnswer:"The cell wall provides the cell with structural support, somewhat like a skeleton in an animal.",
		mark:function(answer){return keyword(answer,["structur","support"],1)},
		par: 15
	},
	{
		text:"Describe the purpose of chloroplasts.",
		type:"open",
		level:3,
		modelAnswer:"Chloroplasts contain chlorophyll, a green pigment which allows photosynthesis to take place within the cell.",
		mark:function(answer){
			if (keyword(answer,["photosynthesis","food"],1)==0) return 0
			let marks = keyword(answer,["photosynthesis","chlorophyll"],2)
			return clamp(marks,2)
		},
		par: 20
	},
	{
		text:"Describe plasmids and explain their purpose.",
		type:"open",
		level:5,
		modelAnswer:"Plasmids are rings of DNA that are not part of a chromosome. They can replicate independently and be passed between different cells.",
		mark:function(answer){
			let marks = keyword(answer,["ring","loop","circle","circular"],1)
								 +keyword(answer,["not","part","in","chromosome"],3,1/3)
								 +keyword(answer,["replicate","independent"],2,1/2)
								 +keyword(answer,["between","different","cell"],1)
			return clamp(marks,4)
		},
		par: 30
	},
	{
		text:"Describe the purpose of a permanent vacuole.",
		type:"open",
		level:4,
		modelAnswer:"The vacuole contains cell sap that helps to keep the cell turgid. It is also used to store nutrients, break down waste and maintain the cell's shape.",
		mark:function(answer){
			let marks = keyword(answer,["cell sap","turgid"])
								 +keyword(answer,["store","storage","nutrients"],1)
								 +keyword(answer,["break","waste","decompose","remov","get rid","gets rid"],2,1/2)
								 +keyword(answer,["shape","structur"],1)
			return clamp(marks,4)
		},
		par: 30
	},
	{
		num1: ranint(10,100,true)/10,
		num2: ranint(1,20,true)*10**ranint(1,2),
		get text(){return "Calculate the image size if the actual size is "+this.num1.toFixed(1)+" micrometres and the magnification is ×"+this.num2+". Give your answer in millimetres."},
		type:"open",
		level:6,
		get modelAnswer() {return this.num1*this.num2/1000},
		mark:function(answer){
			let exponent_difference = Math.log10(Number(String(answer).split(" ")[0])/this.modelAnswer)
			let marks
			if (Math.abs(exponent_difference)<1e-6) marks = 2
			else if (approximateEqual(modulo(exponent_difference+0.5,1),0.5)) marks = 1
			else marks = 0
			return clamp(marks,2)
		},
		par: 15
	},
	{
		text:"Explain the purpose of each of the following microscope parts.",
		type:"composite",
		components:[
			{
				text:"eyepiece lens",
				type:"open",
				level:4,
				modelAnswer:"The eyepiece lens is looked through to see the image. It also magnifies the image.",
				mark:function(answer){return keyword(answer,["look","magnif"])},
				par:20
			},
			{
				text:"objective lens",
				type:"open",
				level:2,
				modelAnswer:"Magnifies the image",
				mark:function(answer){return keyword(answer,["magnif"])},
				par:10
			},
			{
				text:"stage",
				type:"open",
				level:2,
				modelAnswer:"Supports the slide",
				mark:function(answer){return keyword(answer,["support","slide"],2,0.5)},
				par:10
			},
			{
				text:"clip",
				type:"open",
				level:2,
				modelAnswer:"Holds the slide in place",
				mark:function(answer){return keyword(answer,["hold","keep","secure"])},
				par:10
			},
			{
				text:"handle",
				type:"open",
				level:2,
				modelAnswer:"To carry the microscope with",
				mark:function(answer){return keyword(answer,["carry"])},
				par:10
			},
			{
				text:"lamp",
				type:"open",
				level:1,
				modelAnswer:"Shines light through the slide so the image can be seen more easily",
				mark:function(answer){return keyword(answer,["ight"])+keyword(answer,["see","view"],1)},
				par:20
			},
			{
				text:"focusing knobs",
				type:"open",
				level:2,
				modelAnswer:"Move the stage up and down to bring the image into focus",
				mark:function(answer){return clamp(keyword(answer,["move"])+keyword(answer,["up","down"],2,0.5)+keyword(answer,["focus"]),2)},
				par:10
			}
		].shuffle().filter((x,i)=>Math.random()<Math.max(0.5,0.85**i)).sort((a,b)=>maxMark(a)-maxMark(b))
	},
	{
		text:"Select the three magnifications which are most often found on light microscopes.",
		type:"multiplechoice",
		level:3,
		answers:multipleChoiceGenerator(["×4","×10","×40"],3,["×2","×5","×8","×20","×40","×50","×80","×100","×200","×400","×500"],5),
		markTransform:x=>x*2/3,
		par:20
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State the names of the two focusing knobs on a light microscope.",
				type:"open",
				level:3,
				modelAnswer:"Coarse adjustment knob; fine adjustment knob",
				mark:function(answer){return Math.min(keyword(answer,["adjustment","knob"]),keyword(answer,["coarse","fine"]))},
				par:15
			},
			{
				num:ranint(0,1),
				get text(){return "Which knob produces the "+(this.num?"greater":"lower")+" change in magnification when turned?"},
				type:"open",
				level:3,
				get modelAnswer(){return (this.num?"coarse":"fine")+" adjustment knob"},
				mark:function(answer){return keyword(answer,[["fine","coarse"][this.num]],1,2)-keyword(answer,["coarse","fine"])},
				par:10
			}
		]
	},
	{
		text:"Describe the structure of a nucleotide.",
		level:6,
		type:"open",
		modelAnswer:"A nucleotide consists of a pentose sugar, a phosphate and a nitrogenous base.",
		mark:function(answer){return keyword(answer,["pentose","phosphate"],2,2/3)+keyword(answer,["nitrogen","base"],2,1/3)},
		par: 20
	},
	{
		text:"List the four bases of DNA.",
		level:4,
		type:"open",
		modelAnswer:"Adenine, thymine, cytosine and guanine",
		mark:function(answer){return keyword(answer,["adenine","thymine","cytosine","guanine"],4,0.5)-keyword(answer,["uracil"],1,0.5)},
		par: 20
	},
	{
		text:"List the four bases of RNA.",
		level:5,
		type:"open",
		modelAnswer:"Adenine, uracil, cytosine and guanine",
		mark:function(answer){return keyword(answer,["adenine","uracil","cytosine","guanine"],4,0.5)-keyword(answer,["thymine"],1,0.5)},
		par: 20
	},
	{
		num: ranint(0,3),
		input: function() {return ["adenine","thymine","cytosine","guanine"][this.num]},
		get text(){return "State the base that "+this.input()+" bonds with in DNA."},
		level:4,
		type:"open",
		get modelAnswer(){return ["thymine","adenine","guanine","cytosine"][this.num]},
		mark:function(answer){return clamp(keyword(answer,[this.modelAnswer],1,2)-keyword(answer,["adenine","thymine","cytosine","guanine","uracil"]),1)},
		par: 10
	},
	{
		num: ranint(0,3),
		input: function() {return ["adenine","uracil","cytosine","guanine"][this.num]},
		get text(){return "State the base that "+this.input()+" bonds with in RNA."},
		level:5,
		type:"open",
		get modelAnswer() {return ["uracil","adenine","guanine","cytosine"][this.num]},
		mark:function(answer){return clamp(keyword(answer,[this.modelAnswer],1,2)-keyword(answer,["adenine","thymine","cytosine","guanine","uracil"]),1)},
		par: 10
	},
	{
		text:"Select the number of nucleotides which codes for one amino acid.",
		level:5,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["3"],1,["1","2","4","5","6"],5),
		markTransform:x=>x,
		par: 10
	},
	{
		text:"Explain why DNA can be described as a polymer.",
		type:"open",
		level:4,
		modelAnswer:"It is a chain of nucleotide monomers",
		mark:function(answer){return clamp(keyword(answer,["chain"])+keyword(answer,["nucleotide","monomer"],2,0.5),1)},
		par:15
	},
	{
		text:"Describe what happens during the transcription stage of protein synthesis.",
		type:"open",
		level:6,
		modelAnswer:"Two DNA strands unzip around one another and one of them is used as a template to create mRNA. Base pairing enzures that this template is complementary to the opposite strand.",
		mark:function(answer){return keyword(answer,["unzip","mRNA","base pairing","complementary"],4,0.5)},
		par: 25
	},
	{
		text:"Describe what happens during the translation stage of protein synthesis.",
		type:"open",
		level:7,
		modelAnswer:"Amino acids that match the triplet code on the mRNA strand are brought to a ribosome by tRNA molecules. The amino acids are then joined together to make a protein.",
		mark:function(answer){
			let marks = keyword(answer,["match","triplet code"],2,0.5)
								+keyword(answer,["mRNA"])
								+keyword(answer,["brought","delivered"],1,1/3)+keyword(answer,["ribosome"],1,1/3)+keyword(answer,["tRNA","transfer RNA"],1,1/3)
								+keyword(answer,["join","connect"],2,0.25)+keyword(answer,["make","create","synthesis"],1,0.25)+keyword(answer,["protein"],1,0.25)
			return clamp(marks,4)
		},
		par: 35
	},
	{
		text:"State the number of unique amino acids.",
		level:"A",
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["20"],1,["1","2","3","4","5","6","8","9","10","12","15","16","18","24","25","30","32","36","40","48","52"],7),
		markTransform:x=>x,
		par: 10
	},
	{
		text:"State the RNA codes of the three termination triplet codes and their names.",
		type:"open",
		level:"A",
		modelAnswer:"UAG (amber), UAA (ochre) and UGA (opal)",
		mark:function(answer){
			let marks = keyword(answer,["UAG","UAA","UGA","amber","ochre"])+keyword(answer,["opal","umber"])
			return clamp(Math.sqrt(0.25+2*marks)-0.5,3)
		},
		par: 20
	},
	{
		text:"Explain what is meant by enzymes having a high specificity for their substrate.",
		type:"open",
		level:6,
		modelAnswer:"Enzymes have an active site that a substrate must fit into in order for the reaction to be catalysed. In the majority of cases only one substrate can fit into the active site. This is called the lock-and-key mechanism.",
		mark:function(answer){
			let marks = keyword(answer,["active site"])
								+keyword(answer,["fit","catalyse","catalyze"],2,0.5)
								+keyword(answer,["one substrate","1 substrate","single substrate"])
								+keyword(answer,["lock-and-key","lock and key"])
			return clamp(marks,4)
		},
		par: 50
	},
	{
		num: 7+ranint(-5,0)+ranint(0,3),
		get text(){return "Enzyme A has an optimum pH of "+this.num+". Explain what might happen to enzyme A's activity in conditions above pH "+this.num+"."},
		type:"open",
		level:6,
		get modelAnswer() {return "A pH greater than "+this.num+" may interfere with the bonds holding the enzyme together, causing it to change shape (denature) and resulting in the substrate no longer being able to fit in. This results in the rate of reaction decreasing, potentially to zero."},
		mark:function(answer){
			let marks = keyword(answer,["interfere","bonds",this.num],3,0.5)
								+Math.min(keyword(answer,["denature"])+keyword(answer,["change","shape"],2,0.5),1)
								+Math.floor(keyword(answer,["substrate","no","fit"],3,1/3))
								+keyword(answer,["reduce","slow","decrease","go down","going down","shrink"])
			return clamp(marks,4)
		},
		par: 40
	},
	{
		text:"List four factors that may limit the rate of an enzyme-controlled reaction.",
		type:"open",
		level:3,
		modelAnswer:"Temperature; pH; enzyme concentration; substrate concentration",
		mark:function(answer){return keyword(answer,["temperature","pH","enzyme concentration","substrate concentration"],4,0.75)},
		par: 20
	},
	{
		text:"Complete the symbol equation for aerobic respiration.",
		type:"gapfill",
		level:4,
		words:(()=>{function g(x){return [x,function(answer){return answer==x?1:0}]};function s(x){return ["<sup>",g(x),"</sup>"]};return gapfillGenerator([g("C"),...s("6"),g("H"),...s("12"),g("O"),...s("6")," + ",g("6"),g("O"),...s("2")," → ",g("6"),g("C"),g("O"),...s("2")," + ",g("6"),g("H"),...s("2"),g("O")],12)})(),
		markTransform:x=>x**2/48,
		par: 25
	},
	{
		text:"Complete the symbol equation for anaerobic respiration in animals.",
		type:"gapfill",
		level:4,
		words:(()=>{function g(x){return [x,function(answer){return answer==x?1:0}]};function s(x){return ["<sup>",g(x),"</sup>"]};return gapfillGenerator([g("C"),...s("6"),g("H"),...s("12"),g("O"),...s("6")," → ",g("2"),g("C"),...s("3"),g("H"),...s("6"),g("O"),...s("3")],8)})(),
		markTransform:x=>x**2/32,
		par: 25
	},
	{
		text:"Complete the symbol equation for fermentation.",
		type:"gapfill",
		level:4,
		words:(()=>{function g(x){return [x,function(answer){return answer==x?1:0}]};function s(x){return ["<sup>",g(x),"</sup>"]};return gapfillGenerator([g("C"),...s("6"),g("H"),...s("12"),g("O"),...s("6")," → ",g("2"),g("C"),...s("2"),g("H"),...s("5"),g("O"),g("H")," + ",g("2"),g("C"),g("O"),...s("2")],12)})(),
		markTransform:x=>x**2/48,
		par:25
	},
	{
		text:"State the molecule used to store energy by organisms.",
		type:"open",
		level:2,
		modelAnswer:"Adenosine triphosphate (ATP)",
		mark:function(answer){return keyword(answer,["ATP","Adenosine triphosphate"])},
		par: 15
	},
	{
		text:"Describe an experiment which proves that plants produce CO₂ during aerobic respiration.",
		type:"open",
		level:9,
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
			return clamp(marks,9)
		},
		par: 180
	},
	{
		text:"Describe an experiment that measures the heat transferred by a plant during respiration.",
		type:"open",
		level:9,
		modelAnswer: `Soak some dried beans in water for around a day until they start to germinate. Germinating beans will respire.
							<br>Boil a similarly sized bunch of dried beans. This will kill them and prevent them from respiring.
							<br>Add each set of beans to a vacuum flask, making sure that there is some oxygen left inside.
							<br>Place a thermometer into each flask and seal the top with cotton wool.
							<br>Record the temperature of each flask daily for a week.
							<br>The beans are well-insulated in the flasks, so when the germinating beans respire and transfer energy to their surroundings by heat, the test flask's temperature will increase compared to the control flask.`,
		mark:function(answer){return clamp(keyword(answer,["soak","dried beans","water","germinate","boil","similar","kill","vacuum flask","oxygen","thermometer","seal","cotton wool","record","temperature","insulat","transfer","test flask","increase","compared","control flask"],"u",0.5),9)},
		par: 180
	},
	{
		text:"State the three chemical elements which make up carbohydrates.",
		type:"open",
		level:"A",
		modelAnswer:"Hydrogen, carbon and oxygen",
		mark:function(answer){return clamp(keyword(answer,["hydrogen","carbon","oxygen"],3,2/3)-keyword(answer,["boron","nitrogen","sodium","magnesium","silicon","phosphorus","sulfur","chlorine","potassium","calcium","manganese","iron","cobalt","nickel","copper","zinc","selenium","molybdenum"]),2)},
		par: 20
	},
	{
		text:"State the four chemical elements which all proteins contain.",
		type:"open",
		level:"A",
		modelAnswer:"Hydrogen, carbon, nitrogen and oxygen",
		mark:function(answer){return clamp(keyword(answer,["hydrogen","carbon","nitrogen","oxygen"],4,0.75)-keyword(answer,["boron","sodium","magnesium","silicon","phosphorus","sulfur","chlorine","potassium","calcium","manganese","iron","cobalt","nickel","copper","zinc","selenium","molybdenum"]),3)},
		par: 20
	},
	{
		text:"State what lipids are made from.",
		type:"open",
		level:3,
		modelAnswer:"Glycerol and three fatty acids.",
		mark:function(answer){return keyword(answer,["glycerol","fatty acids"])+keyword(answer,["3","three"],1)-keyword(answer,["simple sugars","monosaccharides","glucose","fructose","amino","starch"])},
		par: 20
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State the monomers that carbohydrates are made up of.",
				type:"open",
				level:3,
				modelAnswer:"Simple sugars (monosaccharides)",
				mark:function(answer){return keyword(answer,["simple sugars","monosaccharides"],1)-keyword(answer,["amino acid","starch","lipids","glycerol","fatty acid"])},
				par:10
			},
			{
				text:"State three examples of such monomers.",
				type:"open",
				level:7,
				modelAnswer:"Glucose; fructose; galactose",
				mark:function(answer){return keyword(answer,["glyceraldehyde","dihydroxyacetone","erythrose","threose","erythrulose","arabinose","lyxose","ribose","xylose","ribulose","xylulose","allose","altrose","galactose","glucose","gulose","idose","mannose","talose","fructose","psicose","sorbose","tagatose","mannuheptulose","sedoheptulose","octolose","2-keto-3-deoxy-manno-octonate","sialose","maltose","sucrose"],3,2/3)},
				par:20
			}
		]
	},
	{
		text:"State the monomers that proteins are made up of.",
		type:"open",
		level:3,
		modelAnswer:"Amino acids",
		mark:function(answer){return keyword(answer,["amino acids"])-keyword(answer,["simple sugars","monosaccharides","glucose","fructose","starch","lipids","fatty acid","glycerol"])},
		par: 10
	},
	{
		text:"State where in the body carbohydrates are broken down and the enzymes responsible.",
		type:"open",
		level:4,
		modelAnswer:"They are broken down by carbohydrases in the mouth and small intestine.",
		mark:function(answer){return keyword(answer,["carbohydrases"])+keyword(answer,["mouth","small intestine"])-keyword(answer,["lipase","amylase","protease","stomach"])},
		par: 30
	},
	{
		text:"State where in the body proteins are broken down and the enzymes responsible.",
		type:"open",
		level:4,
		modelAnswer:"They are broken down by proteases in the stomach and small intestine.",
		mark:function(answer){return keyword(answer,["proteases"])+keyword(answer,["stomach","small intestine"])-keyword(answer,["lipase","amylase","carbohydrase","mouth"])},
		par: 30
	},
	{
		text:"State where in the body lipids are broken down and the enzymes responsible.",
		type:"open",
		level:4,
		modelAnswer:"They are broken down by lipases in the small intestine.",
		mark:function(answer){return keyword(answer,["lipases"])+keyword(answer,["small intestine"])-keyword(answer,["protease","amylase","carbohydrase","mouth","stomach"])},
		par: 20
	},
	{
		text:"Describe how you can test for reducing and non-reducing sugars.",
		type:"open",
		level:8,
		modelAnswer: `To test for reducing sugars, add blue Benedict's reagent to a sample and heat it in a water bath that's been set at 75 degrees Celsius.
							<br>If the test is positive, a coloured precipitate will form in the solution.
							<br>The higher the concentration of reducing sugar, the further the colour change goes.
							<br>It goes from blue to green to yellow to orange to brick red.
							<br>To test for non-reducing sugars, add dilute hydrochloric acid first and heat in a water bath at 75 degrees Celsius, then neutralise the solution using sodium hydrogen-carbonate and carry out Benedict's test as detailed above.`,
		mark:function(answer){
			let marks = keyword(answer,["blue","Benedict's reagent","sample","water bath","positive","coloured precipitate","concentration","reducing sugar","hydrochloric acid","neutralise","sodium hydrogen-carbonate"],"u",0.5)
								 +keyword(answer,["green","yellow","orange","brick red"],4,0.25)
								 +keyword(answer,["75","167","348","Celsius","Fahrenheit","Kelvin"],2,0.5)
			return clamp(marks,6)
		},
		par: 150
	},
	{
		text:"Describe how you can test for starch.",
		type:"open",
		level:7,
		modelAnswer: `Add iodine solution to the test sample.
							<br>If starch is present, the iodine will change colour from brown to dark blue.
							<br>If no starch is present, the iodine will stay brown.`,
		mark:function(answer){
			let marks = keyword(answer,["iodine","solution","sample","starch","present","no","stay"],"u",0.5)
								 +keyword(answer,["color","colour","change"],2,0.25)
								 +keyword(answer,["brown","orange"],1,0.5)
								 +keyword(answer,["blue","black"],1,0.5)
			return clamp(marks,4)
		},
		par: 120
	},
	{
		text:"Describe how you can test for lipids.",
		type:"open",
		level:7,
		modelAnswer: `Add ethanol to a test tube with the sample, shake for around a minute until it dissolves and pour the solution into water.
							<br>If lipids are present, a milky emulsion will appear.
							<br>The more lipid there is, the more noticeable the emulsion will be.`,
		mark:function(answer){
			let marks = keyword(answer,["ethanol","shake","minute","dissolve","solution","water","lipids","emulsion","more"],"u",0.5)
								 +keyword(answer,["sample","substance"],1,0.5)
								 +keyword(answer,["pour","add","mix"],1,0.5)
								 +keyword(answer,["test tube","boiling tube"],1,0.5)
			return clamp(marks,5)
		},
		par: 90
	},
	{
		text:"Describe how you can test for proteins.",
		type:"open",
		level:7,
		modelAnswer: `Use the Biuret test: first, add a few drops of sodium hydroxide solution to make the solution alkaline.
							<br>Then add some bright blue copper(II) sulfate solution.
							<br>If no protein is present, the solution will stay blue. If protein is present, the solution will turn purple.`,
		mark:function(answer){
			let marks = keyword(answer,["Biuret","drops","sodium hydroxide","solution","sample","alkali","present","stay","turn"],"u",0.5)
								 +keyword(answer,["blue","cyan"],1,0.5)
								 +keyword(answer,["copper sulfate","copper sulphate","copper(II) sulfate","copper(II) sulphate"],1,0.5)
								 +keyword(answer,["purple","violet"],1,0.5)
			return clamp(marks,5)
		},
		par: 90
	},
	{
		num: ranint(0,3),
		get text(){return "Select the type of reaction of "+["aerobic respiration","anaerobic respiration","fermentation","photosynthesis"][this.num]+"."},
		type:"multiplechoice",
		level:1,
		answers:multipleChoiceGenerator([this.num==3?"endothermic":"exothermic"],1,[this.num==3?"exothermic":"endothermic"],1),
		markTransform:x=>x,
		par:10
	},
	{
		text:"Describe an experiment to measure the rate of photosynthesis.",
		type:"open",
		level:9,
		modelAnswer: `Place some pondweed in a test tube filled with water.
							<br>Seal the test tube with a rubber bung, connect to a gas syringe via a capillary tube and attach to a clamp.
							<br>Leave the pondweed to photosynthesise for a set amount of time. As it photosynthesises, the oxygen released will collect in the capillary tube.
							<br>At the end of the experiment, use the syringe to draw the gas bubble in the tube up alongside a ruler.
							<br>The length of the gas bubble is proportional to the volume of oxygen produced.`,
		mark:function(answer){
			let marks = keyword(answer,["pondweed","test tube","water","seal","rubber bung","gas syringe","capillary tube","clamp","leave","photosynthesis","oxygen","collect","draw","bubble","ruler","proportional","oxygen","produced"],"u",0.5)
								 +keyword(answer,["test tube","boiling tube"],1,0.5)
								 +Math.floor(keyword(answer,["set","fixed"],1,0.5)+keyword(answer,["length","period","amount","duration"],1,0.5))/2
			return clamp(marks,9)
		},
		par: 180
	},
	{
		text:"List three factors that limit the rate of photosynthesis.",
		type:"open",
		level:4,
		modelAnswer:"Light intensity, carbon dioxide concentration, temperature",
		mark:function(answer){return (keyword(answer,["light intensity","temperature"])+Math.floor(keyword(answer,["concentration"],1,0.5)+keyword(answer,["carbon dioxide","CO₂","CO<sup>2</sup>"],1,0.5)))*2/3},
		par: 30
	},
	{
		distance1: ranint(1,4,true)*30,
		distance2: ranint(2,4,true)**((-1)**ranint(0,1)),
		intensity1: ranint(5,10,true)**2*36,
		get text(){return "When a lamp is "+this.distance1+" cm from a plant, the light intensity reaching it is "+this.intensity1+" lux. Calculate the light intensity if the lamp is moved to a distance of "+(this.distance1*this.distance2)+" cm."},
		type:"open",
		level:6,
		get modelAnswer() {return Math.round(this.intensity1*this.distance2**-2)+" lux"},
		mark:function(answer){
			let exponent_difference = Math.log10(Number(answer.split(" ")[0])/this.modelAnswer.split(" ")[0])
			let marks
			if (Math.abs(exponent_difference)<1e-6) marks = 2
			else if (approximateEqual(modulo(exponent_difference+0.5,1),0.5)) marks = 1
			else marks = 0
			if (marks>0) marks += keyword(answer,["lux"])
			return clamp(marks,3)
		},
		par: 15
	},
	// B3
	{
		text:"State the technical term for a nerve cell.",
		type:"open",
		level:2,
		modelAnswer:"Neurone",
		mark:function(answer){return keyword(answer,["neuron"])},
		par:10
	},
	{
		text:"Fill in the gaps.",
		type:"gapfill",
		level:4,
		words:(()=>{
			let words = ["Stimulus","receptor","sensory neurone","central nervous system","motor neurone","effector","response"]
			let out = []
			for (let i=0;i<7;i++) {
				out.push(gapfillExact(words[i]))
				if (i<6) out.push(" → ")
			}
			return gapfillGenerator(out,4)
		})(),
		markTransform:x=>x*0.75,
		par:70
	},
	{
		text:"Explain how the central nervous system coordinates a response.",
		type:"open",
		level:9,
		modelAnswer:"When sensory receptors detect a change in the environment (a stimuus), information is sent as nervous impulses along sensory neurones to the central nervous system, which consists of the brain and spinal cord.<br>The central nervous system sends information to an effector along a motor neurone. The effector then responds accordingly - for example, a muscle may contract or a gland may secrete a hormone.",
		mark:function(answer){
			if (keyword(answer,["central nervous system","CNS"])==0) return 0
			let marks = keyword(answer,["sensory","receptor","detect","stimul","information","impulse","neurone","brain","spinal cord","effector"],"u",0.5)+keyword(answer,["electrical","nervous"],1,0.5)
			return marks/2+1
		},
		par:60
	},
	{
		text:"Select the three main parts of a neurone.",
		type:"multiplechoice",
		level:2,
		answers:multipleChoiceGenerator(["Soma","Dendrite","Axon"],3,["Synapse","Receptor","Effector","Reflex arc","Myelin sheath"],5),
		markTransform:x=>x,
		par:30
	},
	{
		text:"What is an axon?",
		type:"open",
		level:4,
		modelAnswer:"The elongated part of a neurone along which impulses are passed.",
		mark:function(answer){return keyword(answer,["long"])},
		par:10
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"What is a dendrite?",
				type:"open",
				level:4,
				modelAnswer:"Branching extensions of a neurone",
				mark:function(answer){return keyword(answer,["branch","tree"])},
				par:10
			},
			{
				text:"Explain the advantage of dendrites.",
				type:"open",
				level:5,
				modelAnswer:"This allows neurones to connect to lots of other neurones.",
				mark:function(answer){return keyword(answer,["connect"])},
				par:20
			}
		]
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain the purpose of a myelin sheath.",
				type:"open",
				level:4,
				modelAnswer:"This acts as an electrical insulator, speeding up the electrical impulse.",
				mark:function(answer){return keyword(answer,["insulator","impulse"],2,2/3)+keyword(answer,["speed","accelerat","fast"],1,2/3)},
				par:20
			},
			{
				text:"What are myelin sheaths made of?",
				type:"multiplechoice",
				level:1,
				answers:multipleChoiceGenerator(["Fat"],1,["Muscle","Collagen"],2),
				markTransform:x=>x,
				par:10
			},
			{
				text:"Select the type of neurone which is least likely to be myelinated.",
				type:"multiplechoice",
				level:2,
				answers:multipleChoiceGenerator(["Relay"],1,["Sensory","Motor"],2),
				markTransform:x=>x,
				par:10
			},
		].select(ranint(1,3))
	},
	{
		text:"Select the two statements which are true.",
		type:"multiplechoice",
		level:2,
		answers:multipleChoiceGenerator(["Dendrites carry impulses towards the cell body","Axons carry impulses away from the cell body"],2,["Dendrites carry impulses away from the cell body","Axons carry impulses towards the cell body"],2),
		markTransform:x=>x/2,
		par:30
	},
	{
		text:"What is a synapse?",
		type:"open",
		level:3,
		modelAnswer:"The gap between two neurones",
		mark:function(answer){return keyword(answer,["gap"])},
		par:10
	},
	{
		text:"Explain how neurones communicate across a synapse.",
		type:"open",
		level:6,
		modelAnswer:"When an electrical impulse reaches the end of an axon, this stimulates the release of neurotransmitters which diffuse across the synapse. These chemicals bind to the receptor molecules in the membrane of the next neurone, causing a new electrical impulse.",
		mark:function(answer){return keyword(answer,["axon","neurotransmitter","diffuse","receptor","membrane"],4,0.5)},
		par:40
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain why reflex actions are quicker than conscious actions.",
				type:"open",
				level:6,
				modelAnswer:"The conscious brain is not involved in a reflex arc. The sensory neurone connects to a relay neurone in the spinal cord or in an unconscious part of the brain, which links directly to the correct motor neurone, so no time is spent thinking.",
				mark:function(answer){return Math.min(keyword(answer,["conscious","arc","sensory","relay","motor","neurone"],6,0.5)+keyword(answer,["spinal cord","direct","think"]))},
				par:40
			},
			{
				text:"State the purpose of reflex actions.",
				type:"open",
				level:5,
				modelAnswer:"To protect from injury",
				mark:function(answer){return keyword(answer,["protect","injur"])},
				par:15
			}
		].select(ranint(1,2))
	},
	{
		text:"State the function of the cornea.",
		type:"open",
		level:4,
		modelAnswer:"Refracts light into the eye",
		mark:function(answer){return keyword(answer,["refract"])},
		par:15
	},
	{
		text:"Explain the function of the iris.",
		type:"open",
		level:5,
		modelAnswer:"Controls the size of the pupil, which in turn determines how much light enters the eye",
		mark:function(answer){return keyword(answer,["size","pupil"],2,0.5)+keyword(answer,["light","enter","eye"],3,1/3)},
		par:30
	},
	{
		text:"Explain the function of the eye lens.",
		type:"open",
		level:5,
		modelAnswer:"The lens refracts light to focus it into the retina.",
		mark:function(answer){keyword(answer,["refract"])+keyword(answer,["focus","retina"],2,0.5)},
		par:20
	},
	{
		text:"The ciliary body contains ciliary muscles, which are attached to suspensory ligaments - they work together to alter the shape of the lens.",
		type:"composite",
		components:[
			{
				text:"Explain what happens in the ciliary body to look at distant objects.",
				type:"open",
				level:6,
				modelAnswer:"The ciliary muscle relaxes, causing the suspensory ligaments to tighten. This pulls the lens into a less rounded shape, so light is refracted less.",
				mark:function(answer){return keyword(answer,["ciliary muscle","relax","suspensory ligament","tight","refract","less"],6,0.5)-keyword(answer,["contract","slack"],2,0.5)},
				par:45
			},
			{
				text:"Explain what happens in the ciliary body to look at close objects.",
				type:"open",
				level:6,
				modelAnswer:"The ciliary muscle contracts, causing the suspensory ligaments to slacken. This pulls the lens into a more rounded shape, so light is refracted more.",
				mark:function(answer){return keyword(answer,["ciliary muscle","contract","suspensory ligament","slack","refract","more"],6,0.5)-keyword(answer,["relax","tight"],2,0.5)},
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
				level:5,
				modelAnswer:"They are more sensitive to light than cones, which enables vision in dim light.",
				mark:function(answer){return keyword(answer,["sensitive","light"],2,0.5)+keyword(answer,["dim","dark","low"])},
				par:20
			},
			{
				text:"Explain the function of cones.",
				type:"open",
				level:5,
				modelAnswer:"They are sensitive to different colours, enabling colour vision.",
				mark:function(answer){return keyword(answer,["sensitive","light","colour"],3,2/3)},
				par:20
			}
		]
	},
	{
		text:"Explain the function of the optic nerve.",
		type:"open",
		level:4,
		modelAnswer:"Carries impulses from the light receptors in the retina to the brain.",
		mark:function(answer){return keyword(answer,["impulse","receptor","retina","brain"],4,0.5)},
		par:20
	},
	{
		text:"Some people have a condition called long-sightedness.",
		type:"composite",
		components:[
			{
				text:"State the scientific term for this condition.",
				type:"open",
				level:3,
				modelAnswer:"Hyperopia",
				mark:function(answer){return keyword(answer,["hyperopia"])-keyword(answer,["myopia","hypoopia","superopia","subopia"])},
				par:10
			},
			{
				text:"State two causes this condition.",
				type:"open",
				level:5,
				modelAnswer:"<b>1</b> The lens is the wrong shape and doesn't refract light sufficiently<br><b>2</b> The eyeball is too short",
				mark:function(answer){return keyword(answer,["lens","shape","refract"],3,0.25)+keyword(answer,["sufficient","enough"],1,0.25)+keyword(answer,["eyeball","short"],2,0.5)},
				par:30
			},
			{
				text:"Explain how this condition affects vision.",
				type:"open",
				level:5,
				modelAnswer:"The images of near objects are brought into focus behind the retina",
				mark:function(answer){return keyword(answer,["image","focus","behind","retina"],4,0.5)+keyword(answer,["near","close"])},
				par:20
			},
			{
				text:"State two ways in which this condition can be treated.",
				type:"open",
				level:5,
				modelAnswer:"Glases or contact lenses with a convex lens; corneal laser surgery",
				mark:function(answer){return keyword(answer,["convex","lens"],2,0.5)+keyword(answer,["corneal","laser","surgery"],3,1/3)},
				par:20
			}
		].select(ranint(2,4,true))
	},
	{
		text:"Some people have a condition called short-sightedness.",
		type:"composite",
		components:[
			{
				text:"State the scientific term for this condition.",
				type:"open",
				level:3,
				modelAnswer:"Myopia",
				mark:function(answer){return keyword(answer,["myopia"])-keyword(answer,["hyperopia","hypoopia","superopia","subopia"])},
				par:10
			},
			{
				text:"State two causes this condition.",
				type:"open",
				level:5,
				modelAnswer:"<b>1</b> The lens is the wrong shape and refracts light too much<br><b>2</b> The eyeball is too long",
				mark:function(answer){return keyword(answer,["lens","shape","refract"],3,0.25)+keyword(answer,["much","strong","more"],1,0.25)+keyword(answer,["eyeball","long"],2,0.5)},
				par:30
			},
			{
				text:"Explain how this condition affects vision.",
				type:"open",
				level:5,
				modelAnswer:"The images of distant objects are brought into focus in front the retina",
				mark:function(answer){return keyword(answer,["image","focus","front","retina"],4,0.5)+keyword(answer,["distant","far"])},
				par:20
			},
			{
				text:"State two ways in which this condition can be treated.",
				type:"open",
				level:5,
				modelAnswer:"Glases or contact lenses with a concave lens; corneal laser surgery",
				mark:function(answer){return keyword(answer,["concave","lens"],2,0.5)+keyword(answer,["corneal","laser","surgery"],3,1/3)},
				par:20
			}
		].select(ranint(2,4,true))
	},
	{
		text:"Select the form of colour blindness which is most common.",
		type:"multiplechoice",
		level:3,
		answers:multipleChoiceGenerator(["Red-green"],1,["Green-blue","Blue-red","Black-white"],3),
		markTransform:x=>x,
		par:10
	},
	{
		text:"Explain how colour blindness can be treated.",
		type:"open",
		level:6,
		modelAnswer:"There is no cure, but tinted lenses can be used to help people see colours more normally.",
		mark:function(answer){return Math.floor(Math.max(keyword(answer,["no","cure"],2,0.5),keyword(answer,["incurable"])))+Math.floor(keyword(answer,["tinted","lens"],2,0.5))},
		par:30
	},
	multipleChoiceComposite("Select the region of the brain which matches each description.",[
		["The largest part of the brain","Cerebrum",2],
		["Has a wrinkled surface","Cerebrum",2],
		["Responsible for consciousness, intelligence, memory and language","Cerebrum",4],
		["Controls homeostasis","Hypothalamus",3],
		["Produces hormones that control the pituitary gland","Hypothalamus",4],
		["Produces many hormones including thyroid stimulating hormone (TSH)","Pituitary gland",3],
		["Controls unconscious activities such as breathing and heart rate","Medulla",3],
		["Facilitates muscle coordination","Cerebellum",4]
	],ranint(3,6)),
	{
		text:"Which is the approximate number of neurones in the brain?",
		type:"multiplechoice",
		level:"A",
		answers:multipleChoiceGenerator(["8.6×10<sup>10</sup>"],1,[5,6,7,8,9,11,12].map(x=>"8.6×10<sup>"+x+"</sup>"),5),
		markTransform:x=>x,
		par:10
	},
	{
		text:"Explain what is meant by a case study of the brain.",
		type:"open",
		level:5,
		modelAnswer:"A detailed study of an individual with abnormal brain function",
		mark:function(answer){
			if(keyword(answer,["study","individual"])<2){return 0}
			return ((keyword(answer,["detailed","brain","function"])+keyword(answer,["incorrect","abnormal","wrong"],1))>2)?2:1
		},
		par:20
	},
	{
		text:"Explain how case studies of people with brain damage help scientists understand the brain.",
		type:"open",
		level:6,
		modelAnswer:"If part of the brain has been damaged, the effect this has on the patient can be used to infer the function of the damaged part of the brain. For example, if an area of the brain was damaged and the patient went blind, it's likely that area of the brain is involved in vision.",
		mark:function(answer){return (keyword(answer,["infer","guess","predict"],1)==0)?0:(keyword(answer,["function","purpose"])==0)?1:2},
		par:30
	},
	{
		text:"Explain how fMRI scans help scientists understand the brain.",
		type:"open",
		level:5,
		modelAnswer:"This shows which parts of the brain are activated when performing certain tasks inside the scanner",
		mark:function(answer){return (keyword(answer,["part","region","section"],1)+keyword(answer,["brain","activ"])<3)?0:(keyword(answer,["scanner","machine","device"])==0)?1:2},
		par:20
	},
	{
		num:ranint(1,3,true),
		get text(){return "Explain "+pluralize(this.num,"problems")+" with case studies of the brain."},
		type:"open",
		get level(){return this.num+4},
		get modelAnswer(){return ["If a person has severe brain damage, it may be unethical to study them as they may not be able to give informed consent","Studying the brains of deceased people relies on people donating their brains, so supply is severely limited","There can be problems when interpreting the results of case studies, as it cannot be known for sure if the same activity would take place in a normal situation"].select(this.num).join("<br>")},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["ethic"],1,2/3)+keyword(answer,["damage"],1,2/3)+keyword(answer,["informed","consent"],2,1/3))
			marks.push((keyword(answer,["die","decease","dead","death"])==0)?0:(keyword(answer,["donat"])+keyword(answer,["limit","supply","scarce"],1)))
			marks.push((keyword(answer,["interpret","result"])<2)?0:((keyword(answer,["normal","ordinary","other"],1)+keyword(answer,["condition","situation","circumstance"],1))==2)?2:1)
			return bestMarks(marks,this.num,2)
		},
		get par(){return this.num*24}
	},
	multipleChoiceComposite("For each of the below, select which system in the body it describes.",[
		["Releases hormones into the bloodstream","Endocrine",3],
		["The fastest system in the body","Nervous",3],
		["Can be described as being \"double\"","Circulatory",2]
	]),
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by a target cell.",
				type:"open",
				level:4,
				modelAnswer:"Cells which have the right receptors to respond to a specific hormone.",
				mark:function(answer){return keyword(answer,["receptor","hormone"])},
				par:20
			},
			{
				text:"Give the scientific term for an organ which contains target cells.",
				type:"open",
				level:3,
				modelAnswer:"Target organ",
				mark:function(answer){return keyword(answer,["target organ"])-keyword(answer,["receptor"])},
				par:10
			}
		]
	},
/*	(()=>{
		let list = [["Adrenaline","Adrenal glands",x=>keyword(answer,["adrenal gland"]),4],["Thyroxine","Thyroid gland",x=>keyword(answer,["thyroid gland"]),2],["Testosterone","Testicles",x=>keyword(answer,["testicles","testes","testis"],1),3],["Oestrogen","Ovaries",x=>keyword(answer,["ovaries"]),3],["FSH","Pituitary gland",x=>keyword(answer,["pituitary gland"]),3],["LH","Pituitary gland",x=>keyword(answer,["pituitary gland"]),3],["Progesterone",]]
		FIX
	})(), */
	// Miscellaneous
	{
		text:"There are 7 Biology topics.",
		type:"composite",
		components:(function(){
			let out = []
			let keys = [1,2,3,4,5,6,7].select(Math.max(2,Array(7).fill(0).map(x => ranint(0,1)).reduce((x,y)=>x+y))).sort((a,b)=>a-b)
			for (let x of keys) {
				out.push({
					get text(){return "Name topic "+x+"."},
					level:"A",
					type:"open",
					modelAnswer:["Cell Level Systems","Scaling Up","Organism Level Systems","Community Level Systems","Genes, Inheritance and Selection","Global Challenges","Practical Skills"][x-1],
					mark:function(answer){return answer.replaceAll(" ","").toLowerCase()==this.modelAnswer.replaceAll(" ","").toLowerCase()?1:0},
					par:10
				})
			}
			return out 
		})()
	},
	expandListOfAbbreviations([
		[1,[["TEM","Transmission electron microscope",4],["SEM","Scanning electron microscope",4]]],
		[3,[["CNS","Central nervous system",3],["fMRI","Functional magnetic resonance imaging","A"],["CT (as in \"CT scan\")","Computer tomography","A"],["PET (as in \"PET scan\")","Positron emission tomography","A"],["TSH","Thyroid stimulating hormone",3],["LH","luteinising hormone",4],["FSH","follicle stimulating hormone",4]],["IUD","Intra-uterine device",4],["IUS","Intra-uterine system",4],["IVF","In vitro fertiisation",3],["STI","Sexually transmitted infection",3],["ADH","Anti-diuretic hormone"]]
	],t=>"Topic "+t)
]
// resume at page 23