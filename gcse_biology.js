"use strict"
var question_file_at_gcse_biology = [
  {
    text: "Name 12 organelles.",
    advanced: true,
    modelAnswer: "nucleus; ribosomes; cytoplasm; cell membrane; mitochondria; cell wall; chloroplast; vacuole; slime capsule; plasmids; flagellum; fimbriae",
    mark: function(answer) {
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
    text: "Name the 7 Biology topics.",
    advanced: true,
    modelAnswer: "Cell Level Systems; Scaling Up; Organism Level Systems; Community Level Systems; Genes, Inheritance and Selection; Global Challenges; Practical Skills",
    mark: function(answer) {
      let marks = keyword(answer,["Cell Level Systems","Scaling Up","Organism Level Systems","Community Level Systems","Genes, Inheritance and Selection","Global Challenges","Practical Skills"],7,3/7)
      return clamp(marks,3)
    },
    par: 30
  },
  {
    text: "Describe the function of mitochondria and explain how they are adapted to their purpose.",
    advanced: false,
    modelAnswer: "The purpose of mitochondria is to facilitate aerobic respiration. They have a folded inner membrane that increases the surface area for the relevant enzymes to work with.",
    mark: function(answer) {
      if (keyword(answer,["respiration"],1,1)==0) return 0
      let marks = keyword(answer,["enzyme","aerobic","surface area"],"u",1)+Math.floor(keyword(answer,["folded","membrane"],2,0.5))-keyword(answer,["protein","DNA","gene","photosynthesis"],"u",1)
      return clamp(marks,4)
    },
    par: 30
  },
  {
    text: "Describe the purpose of the nucleus.",
    advanced: false,
    modelAnswer: "The nucleus contains genetic material (DNA) in the form of chromosomes, allowing it to control the cell's activities.",
    mark: function(answer) {
      if (keyword(answer,["DNA","gene"],1,1)==0) return 0
      let marks = keyword(answer,["DNA","genetic material"],1,1)+keyword(answer,["chromosomes"],1,1)+keyword(answer,["control","activities"],1,1)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "Describe the purpose of ribosomes.",
    advanced: false,
    modelAnswer: "Ribosomes read mRNA sequences and synthesise proteins from amino acids based on the sequence of triplet codes within the mRNA strand.",
    mark: function(answer) {
      if (keyword(answer,["protein"],1,1)==0) return 0
      let marks = keyword(answer,["synthesis","mRNA","amino acids","triplet code"],"u",2/3)+1/3
      return clamp(marks,3)
    },
    par: 20
  },
  {
    text: "Describe the purpose of the cell membrane.",
    advanced: false,
    modelAnswer: "The cell membrane holds the cell together and acts as a selective barrier controlling what enters and leaves the cell via diffusion, active transport and osmosis.",
    mark: function(answer) {
      let marks = keyword(answer,["hold","structure"],1,1)
                 +keyword(answer,["filter","selective","barrier"],1,1)
                 +keyword(answer,["enter","leave","exit","in","out","through"],2,1/2)
                 +keyword(answer,["diffusion","active transport","osmosis"],3,1/2)
      return clamp(marks,4)
    },
    par: 30
  },
  {
    text: "Describe the purpose of the cell wall.",
    advanced: false,
    modelAnswer: "The cell wall provides the cell with structural support, somewhat like a skeleton in an animal.",
    mark: function(answer) {
      let marks = keyword(answer,["structur","support"],1,1)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "Describe the purpose of chloroplasts.",
    advanced: false,
    modelAnswer: "Chloroplasts contain chlorophyll, a green pigment which allows photosynthesis to take place within the cell.",
    mark: function(answer) {
      if (keyword(answer,["photosynthesis","food"],1,1)==0) return 0
      let marks = keyword(answer,["photosynthesis","chlorophyll"],2,1)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "Describe plasmids and explain their purpose.",
    advanced: false,
    modelAnswer: "Plasmids are rings of DNA that are not part of a chromosome. They can replicate independently and be passed between different cells.",
    mark: function(answer) {
      let marks = keyword(answer,["ring","loop","circle","circular"],1,1)
                 +keyword(answer,["not","part","in","chromosome"],3,1/3)
                 +keyword(answer,["replicate","independent"],2,1/2)
                 +keyword(answer,["between","different","cell"],1,1)
      return clamp(marks,4)
    },
    par: 30
  },
  {
    text: "Describe the purpose of a permanent vacuole.",
    advanced: false,
    modelAnswer: "The vacuole contains cell sap that helps to keep the cell turgid. It is also used to store nutrients, break down waste and maintain the cell's shape.",
    mark: function(answer) {
      let marks = keyword(answer,["cell sap","turgid"],2,1)
                 +keyword(answer,["store","storage","nutrients"],1,1)
                 +keyword(answer,["break","waste","decompose","remov","get rid","gets rid"],2,1/2)
                 +keyword(answer,["shape","structur"],1,1)
      return clamp(marks,4)
    },
    par: 30
  },
  {
    num1: ranint(10,100,true)/10,
    num2: ranint(1,20,true)*10**ranint(1,2),
    text: function() {return "Calculate the image size if the actual size is "+this.num1.toFixed(1)+" micrometres and the magnification is ×"+this.num2+". Give your answer in millimetres."},
    advanced: false,
    modelAnswer: function() {return this.num1*this.num2/1000},
    mark: function(answer) {
      let exponent_difference = Math.log10(Number(String(answer).split(" ")[0])/this.modelAnswer())
      let marks
      if (Math.abs(exponent_difference)<1e-6) marks = 2
      else if (approximateEqual(modulo(exponent_difference+0.5,1),0.5)) marks = 1
      else marks = 0
      return clamp(marks,2)
    },
    par: 15
  },
  {
    text: "Describe the structure of a nucleotide.",
    advanced: false,
    modelAnswer: "A nucleotide consists of a pentose sugar, a phosphate and a nitrogenous base.",
    mark: function(answer) {
      let marks = keyword(answer,["pentose sugar","phosphate","nitrogenous base"],3,2/3)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "List the four bases of DNA.",
    advanced: false,
    modelAnswer: "Adenine, thymine, cytosine and guanine",
    mark: function(answer) {
      let marks = keyword(answer,["adenine","thymine","cytosine","guanine"],4,0.5)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "List the four bases of RNA.",
    advanced: false,
    modelAnswer: "Adenine, uracil, cytosine and guanine",
    mark: function(answer) {
      let marks = keyword(answer,["adenine","uracil","cytosine","guanine"],4,0.5)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    num: ranint(0,3),
    input: function() {return ["adenine","thymine","cytosine","guanine"][this.num]},
    text: function() {return "State the base that "+this.input()+" bonds with in DNA."},
    advanced: false,
    modelAnswer: function() {return ["thymine","adenine","guanine","cytosine"][this.num]},
    mark: function(answer) {
      let marks = keyword(answer,[this.modelAnswer()],1,2)-keyword(answer,["adenine","thymine","cytosine","guanine","uracil"],"u",1)
      return clamp(marks,1)
    },
    par: 10
  },
  {
    num: ranint(0,3),
    input: function() {return ["adenine","uracil","cytosine","guanine"][this.num]},
    text: function() {return "State the base that "+this.input()+" bonds with in RNA."},
    advanced: false,
    modelAnswer: function() {return ["uracil","adenine","guanine","cytosine"][this.num]},
    mark: function(answer) {
      let marks = keyword(answer,[this.modelAnswer()],1,2)-keyword(answer,["adenine","thymine","cytosine","guanine","uracil"],"u",1)
      return clamp(marks,1)
    },
    par: 10
  },
  {
    text: "State the number of nucleotides which codes for one amino acid.",
    advanced: false,
    modelAnswer: "3",
    mark: function(answer) {
      let marks = (answer==3||answer.toLowerCase()=="three")?1:0
      return clamp(marks,1)
    },
    par: 10
  },
  {
    text: "Describe what happens during the transcription stage of protein synthesis.",
    advanced: false,
    modelAnswer: "Two DNA strands unzip around one another and one of them is used as a template to create mRNA. Base pairing enzures that this template is complementary to the opposite strand.",
    mark: function(answer) {
      let marks = keyword(answer,["unzip","mRNA","base pairing","complementary"],4,0.5)
      return clamp(marks,2)
    },
    par: 25
  },
  {
    text: "Describe what happens during the translation stage of protein synthesis.",
    advanced: false,
    modelAnswer: "Amino acids that match the triplet code on the mRNA strand are brought to a ribosome by tRNA molecules. The amino acids are then joined together to make a protein.",
    mark: function(answer) {
      let marks = keyword(answer,["match","triplet code"],2,0.5)
                +keyword(answer,["mRNA"],1,1)
                +keyword(answer,["brought","delivered"],1,1/3)+keyword(answer,["ribosome"],1,1/3)+keyword(answer,["tRNA","transfer RNA"],1,1/3)
                +keyword(answer,["join","connect"],2,0.25)+keyword(answer,["make","create","synthesis"],1,0.25)+keyword(answer,["protein"],1,0.25)
      return clamp(marks,4)
    },
    par: 35
  },
  {
    text: "State the number of unique amino acids.",
    advanced: true,
    modelAnswer: 20,
    mark: function(answer) {
      let marks = (answer==20||answer.toLowerCase()=="twenty")?1:0
      return clamp(marks,1)
    },
    par: 10
  },
  {
    text: "State the RNA codes of the three termination triplet codes and their names.",
    advanced: true,
    modelAnswer: "UAG (amber), UAA (ochre) and UGA (opal or umber)",
    mark: function(answer) {
      let marks = keyword(answer,["UAG","UAA","UGA","amber","ochre"],5,1)+keyword(answer,["opal","umber"],1,1)
      return clamp(Math.sqrt(0.25+2*marks)-0.5,3)
    },
    par: 20
  },
  {
    text: "State what is meant by enzymes having a high specificity for their substrate.",
    advanced: false,
    modelAnswer: "Enzymes have an active site that a substrate must fit into in order for the reaction to be catalysed. In the majority of cases only one substrate can fit into the active site. This is called the lock-and-key mechanism.",
    mark: function(answer) {
      let marks = keyword(answer,["active site"],1,1)
                +keyword(answer,["fit","catalyse","catalyze"],2,0.5)
                +keyword(answer,["one substrate","1 substrate","single substrate"],1,1)
                +keyword(answer,["lock-and-key","lock and key"],1,1)
      return clamp(marks,4)
    },
    par: 50
  },
  {
    num: 7+ranint(-5,0)+ranint(0,3),
    text: function() {return "Enzyme A has an optimum pH of "+this.num+". Explain what might happen to enzyme A's activity in conditions above pH "+this.num+"."},
    advanced: false,
    modelAnswer: function() {return "A pH greater than "+this.num+" may interfere with the bonds holding the enzyme together, causing it to change shape (denature) and resulting in the substrate no longer being able to fit in. This results in the rate of reaction decreasing, potentially to zero."},
    mark: function(answer) {
      let marks = keyword(answer,["interfere","bonds"],2,0.5)
                +Math.min(keyword(answer,["denature"],1,1)+keyword(answer,["change","shape"],2,0.5),1)
                +Math.floor(keyword(answer,["substrate","no","fit"],3,1/3))
                +keyword(answer,["reduce","slow","decrease","go down","going down","shrink"],1,1)
      return clamp(marks,4)
    },
    par: 40
  },
  {
    text: "Describe what is meant by a limiting factor.",
    advanced: false,
    modelAnswer: "A variable which prevents another variable from increasing.",
    mark: function(answer) {
      let marks = keyword(answer,["variable"],1,1/3)+keyword(answer,["prevent","stop"],1,1/3)+keyword(answer,["increas","go up","going up","ris","grow"],1,1/3)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "List four factors that may limit the rate of an enzyme-controlled reaction.",
    advanced: false,
    modelAnswer: "Temperature; pH; enzyme concentration; substrate concentration",
    mark: function(answer) {
      let marks = keyword(answer,["temperature","pH","enzyme concentration","substrate concentration"],4,0.75)
      return clamp(marks,3)
    },
    par: 20
  },
  {
    text: "Write out the symbol equation for aerobic respiration. <span style=\"color:#ffff00\">(Special characters: type subscripts as normal numbers (example: '6H2O' instead of '6H₂O') and an = equals sign in place of the → right-arrow.)</span>",
    advanced: false,
    modelAnswer: "C6H12O6 + 6O2 = 6CO2 + 6H2O",
    mark: function(answer) {
      let terms = answer.split("=")
      if (terms.length !== 2) return 0
      let marks = keyword(terms[0],["C6H12O6","6O2"],2,1)+keyword(terms[1],["6H2O","6CO2"],2,1)
      marks -= Math.max(0,terms[0].split("+").length-2)
      marks -= Math.max(0,terms[1].split("+").length-2)
      return clamp(marks,4)
    },
    par: 25
  },
  {
    text: "Write out the symbol equation for anaerobic respiration in animals. <span style=\"color:#ffff00\">(Special characters: type subscripts as normal numbers (example: '6H2O' instead of '6H₂O') and an = equals sign in place of the → right-arrow.)</span>",
    advanced: false,
    modelAnswer: "C6H12O6 = 2C3H6O3",
    mark: function(answer) {
      let terms = answer.split("=")
      if (terms.length !== 2) return 0
      let marks = keyword(terms[0],["C6H12O6"],1,1)+keyword(terms[1],["2C3H6O3"],1,1)
      marks -= Math.max(0,terms[0].split("+").length-1)
      marks -= Math.max(0,terms[1].split("+").length-1)
      return clamp(marks,2)
    },
    par: 25
  },
  {
    text: "Write out the symbol equation for fermentation. <span style=\"color:#ffff00\">(Special characters: type subscripts as normal numbers (example: '6H2O' instead of '6H₂O') and an = equals sign in place of the → right-arrow.)</span>",
    advanced: true,
    modelAnswer: "C6H12O6 = 2C2H5OH + 2CO2",
    mark: function(answer) {
      let terms = answer.split("=")
      if (terms.length !== 2) return 0
      let marks = keyword(terms[0],["C6H12O6"],1,1)+keyword(terms[1],["2C2H5OH","2CO2"],2,1)
      marks -= Math.max(0,terms[0].split("+").length-1)
      marks -= Math.max(0,terms[1].split("+").length-2)
      return clamp(marks,3)
    },
    par: 25
  },
  {
    text: "Write out the symbol equation for fermentation. <span style=\"color:#ffff00\">(Special characters: type subscripts as normal numbers (example: '6H2O' instead of '6H₂O') and an = equals sign in place of the → right-arrow.)</span>",
    advanced: true,
    modelAnswer: "C6H12O6 = 2C2H5OH + 2CO2",
    mark: function(answer) {
      let terms = answer.split("=")
      if (terms.length !== 2) return 0
      let marks = keyword(terms[0],["C6H12O6"],1,1)+keyword(terms[1],["2C2H5OH","2CO2"],2,1)
      marks -= Math.max(0,terms[0].split("+").length-1)
      marks -= Math.max(0,terms[1].split("+").length-2)
      return clamp(marks,3)
    },
    par: 30
  },
  {
    text: "What molecule is used to store energy by organisms?",
    advanced: false,
    modelAnswer: "Adenosine triphosphate (ATP)",
    mark: function(answer) {
      let marks = keyword(answer,["ATP","Adenosine triphosphate"],1,1)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "Describe an experiment which proves that plants produce CO₂ during aerobic respiration.",
    advanced: false,
    modelAnswer: `Soak some dried beans in water for around a day until they start to germinate. Germinating beans will respire.
                  <br>Boil a similarly sized bunch of dried beans. This will kill them and prevent them from respiring.
                  <br>Put some hydrogen-carbonate indicator in two test tubes, then place your samples on platforms made of gauze.
                  <br>Seal the test tubes with a rubber bung, and leave the apparatus for a set period of time - for example, 1 hour.
                  <br>Hydrogen-carbonate solution is normally red, but becomes primary yellow upon reacting with CO₂.
                  <br>The CO₂ produced by the germinating beans will turn the hydrogen-carbonate indicator yellow.`,
    mark: function(answer) {
      let marks = keyword(answer,["soak","dried beans","water","germinate","boil","similar","kill","hydrogen-carbonate indicator","test tubes","platform","gauze","seal","rubber bung","leave","apparatus","red","yellow","react","carbon dioxide","CO2"],"u",0.5)
                 +Math.floor(keyword(answer,["set","fixed"],1,0.5)+keyword(answer,["length","period","amount","duration"],1,0.5))/2
      return clamp(marks,9)
    },
    par: 180
  },
  {
    text: "Describe an experiment that measures the heat transferred by a plant during respiration.",
    advanced: false,
    modelAnswer: `Soak some dried beans in water for around a day until they start to germinate. Germinating beans will respire.
                  <br>Boil a similarly sized bunch of dried beans. This will kill them and prevent them from respiring.
                  <br>Add each set of beans to a vacuum flask, making sure that there is some oxygen left inside.
                  <br>Place a thermometer into each flask and seal the top with cotton wool.
                  <br>Record the temperature of each flask daily for a week.
                  <br>The beans are well-insulated in the flasks, so when the germinating beans respire and transfer energy to their surroundings by heat, the test flask's temperature will increase compared to the control flask.`,
    mark: function(answer) {
      let marks = keyword(answer,["soak","dried beans","water","germinate","boil","similar","kill","vacuum flask","oxygen","thermometer","seal","cotton wool","record","temperature","insulat","transfer","test flask","increase","compared","control flask"],"u",0.5)
      return clamp(marks,9)
    },
    par: 180
  },
  {
    text: "State the three chemical elements which make up carbohydrates.",
    advanced: true,
    modelAnswer: "Hydrogen, carbon and oxygen",
    mark: function(answer) {
      let marks = keyword(answer,["hydrogen","carbon","oxygen"],3,2/3)-keyword(answer,["boron","nitrogen","sodium","magnesium","silicon","phosphorus","sulfur","chlorine","potassium","calcium","manganese","iron","cobalt","nickel","copper","zinc","selenium","molybdenum"],"u",1)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "State the four chemical elements which all proteins contain.",
    advanced: true,
    modelAnswer: "Hydrogen, carbon, nitrogen and oxygen",
    mark: function(answer) {
      let marks = keyword(answer,["hydrogen","carbon","nitrogen","oxygen"],4,0.75)-keyword(answer,["boron","sodium","magnesium","silicon","phosphorus","sulfur","chlorine","potassium","calcium","manganese","iron","cobalt","nickel","copper","zinc","selenium","molybdenum"],"u",1)
      return clamp(marks,3)
    },
    par: 20
  },
  {
    text: "State what lipids are made from.",
    advanced: false,
    modelAnswer: "Glycerol and three fatty acids.",
    mark: function(answer) {
      let marks = keyword(answer,["glycerol","fatty acids"],2,1)+keyword(answer,["3","three"],1,1)
                 -keyword(answer,["the","simple sugars","monosaccharides","glucose","fructose","amino acid","starch"],"u",1)
      return clamp(marks,3)
    },
    par: 20
  },
  {
    text: "State the monomers that carbohydrates are made up of and provide three examples.",
    advanced: false,
    modelAnswer: "Simple sugars (monosaccharides), for example glucose, fructose or galactose molecules.",
    mark: function(answer) {
      let marks = keyword(answer,["simple sugars","monosaccharides"],1,1)+keyword(answer,["glyceraldehyde","dihydroxyacetone","erythrose","threose","erythrulose","arabinose","lyxose","ribose","xylose","ribulose","xylulose","allose","altrose","galactose","glucose","gulose","idose","mannose","talose","fructose","psicose","sorbose","tagatose","mannuheptulose","sedoheptulose","octolose","2-keto-3-deoxy-manno-octonate","sialose","maltose","sucrose"],3,2/3)
                 -keyword(answer,["amino acid","starch","lipids","glycerol","fatty acid"],"u",1)
      return clamp(marks,3)
    },
    par: 15
  },
  {
    text: "State the monomers that proteins are made up of.",
    advanced: false,
    modelAnswer: "Amino acids",
    mark: function(answer) {
      let marks = keyword(answer,["amino acids"],1,1)-keyword(answer,["simple sugars","monosaccharides","glucose","fructose","starch","lipids","fatty acid","glycerol"],1,1)
      return clamp(marks,1)
    },
    par: 10
  },
  {
    text: "State where in the body carbohydrates are broken down and the enzymes responsible.",
    advanced: false,
    modelAnswer: "They are broken down by carbohydrases in the mouth and small intestine.",
    mark: function(answer) {
      let marks = keyword(answer,["carbohydrases"],1,1)+keyword(answer,["mouth","small intestine"],2,1)
                 -keyword(answer,["lipase","amylase","protease","stomach"],"u",1)
      return clamp(marks,3)
    },
    par: 30
  },
  {
    text: "State where in the body proteins are broken down and the enzymes responsible.",
    advanced: false,
    modelAnswer: "They are broken down by proteases in the stomach and small intestine.",
    mark: function(answer) {
      let marks = keyword(answer,["proteases"],1,1)+keyword(answer,["stomach","small intestine"],2,1)
                 -keyword(answer,["lipase","amylase","carbohydrase","mouth"],"u",1)
      return clamp(marks,3)
    },
    par: 30
  },
  {
    text: "State where in the body lipids are broken down and the enzymes responsible.",
    advanced: false,
    modelAnswer: "They are broken down by lipases in the small intestine.",
    mark: function(answer) {
      let marks = keyword(answer,["lipases"],1,1)+keyword(answer,["small intestine"],1,1)
                 -keyword(answer,["protease","amylase","carbohydrase","mouth","stomach"],"u",1)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "Describe how you can test for reducing and non-reducing sugars.",
    advanced: false,
    modelAnswer: `To test for reducing sugars, add blue Benedict's reagent to a sample and heat it in a water bath that's been set at 75 degrees Celsius.
                  <br>If the test is positive, a coloured precipitate will form in the solution.
                  <br>The higher the concentration of reducing sugar, the further the colour change goes.
                  <br>It goes from blue to green to yellow to orange to brick red.
                  <br>To test for non-reducing sugars, add dilute hydrochloric acid first and heat in a water bath at 75 degrees Celsius, then neutralise the solution using sodium hydrogen-carbonate and carry out Benedict's test as detailed above.`,
    mark: function(answer) {
      let marks = keyword(answer,["blue","Benedict's reagent","sample","water bath","positive","coloured precipitate","concentration","reducing sugar","hydrochloric acid","neutralise","sodium hydrogen-carbonate"],"u",0.5)
                 +keyword(answer,["green","yellow","orange","brick red"],4,0.25)
                 +keyword(answer,["75","167","348","Celsius","Fahrenheit","Kelvin"],2,0.5)
      return clamp(marks,6)
    },
    par: 150
  },
  {
    text: "Describe how you can test for starch.",
    advanced: false,
    modelAnswer: `Add iodine solution to the test sample.
                  <br>If starch is present, the iodine will change colour from brown to dark blue.
                  <br>If no starch is present, the iodine will stay brown.`,
    mark: function(answer) {
      let marks = keyword(answer,["iodine","solution","sample","starch","present","no","stay"],"u",0.5)
                 +keyword(answer,["color","colour","change"],2,0.25)
                 +keyword(answer,["brown","orange"],1,0.5)
                 +keyword(answer,["blue","black"],1,0.5)
      return clamp(marks,4)
    },
    par: 120
  },
  {
    text: "Describe how you can test for lipids.",
    advanced: false,
    modelAnswer: `Add ethanol to a test tube with the sample, shake for around a minute until it dissolves and pour the solution into water.
                  <br>If lipids are present, a milky emulsion will appear.
                  <br>The more lipid there is, the more noticeable the emulsion will be.`,
    mark: function(answer) {
      let marks = keyword(answer,["ethanol","shake","minute","dissolve","solution","water","lipids","emulsion","more"],"u",0.5)
                 +keyword(answer,["sample","substance"],1,0.5)
                 +keyword(answer,["pour","add","mix"],1,0.5)
                 +keyword(answer,["test tube","boiling tube"],1,0.5)
      return clamp(marks,5)
    },
    par: 90
  },
  {
    text: "Describe how you can test for proteins.",
    advanced: false,
    modelAnswer: `Use the Biuret test: first, add a few drops of sodium hydroxide solution to make the solution alkaline.
                  <br>Then add some bright blue copper(II) sulfate solution.
                  <br>If no protein is present, the solution will stay blue. If protein is present, the solution will turn purple.`,
    mark: function(answer) {
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
    text: function() {return "State the type of reaction of "+["aerobic respiration","anaerobic respiration","fermentation","photosynthesis"][this.num]+"."},
    advanced: false,
    modelAnswer: function() {return this.num==3?"endothermic":"exothermic"},
    mark: function(answer) {
      let marks = keyword(answer,[this.modelAnswer()],1,2)-keyword(answer,["exothermic","endothermic"],2,1)
      return clamp(marks,1)
    },
    par: 10
  },
  {
    text: "Describe an experiment to measure the rate of photosynthesis.",
    advanced: false,
    modelAnswer: `Place some pondweed in a test tube filled with water.
                  <br>Seal the test tube with a rubber bung, connect to a gas syringe via a capillary tube and attach to a clamp.
                  <br>Leave the pondweed to photosynthesise for a set amount of time. As it photosynthesises, the oxygen released will collect in the capillary tube.
                  <br>At the end of the experiment, use the syringe to draw the gas bubble in the tube up alongside a ruler.
                  <br>The length of the gas bubble is proportional to the volume of oxygen produced.`,
    mark: function(answer) {
      let marks = keyword(answer,["pondweed","test tube","water","seal","rubber bung","gas syringe","capillary tube","clamp","leave","photosynthesis","oxygen","collect","draw","bubble","ruler","proportional","oxygen","produced"],"u",0.5)
                 +keyword(answer,["test tube","boiling tube"],1,0.5)
                 +Math.floor(keyword(answer,["set","fixed"],1,0.5)+keyword(answer,["length","period","amount","duration"],1,0.5))/2
      return clamp(marks,9)
    },
    par: 180
  },
  {
    text: "List three factors that limit the rate of photosynthesis.",
    advanced: false,
    modelAnswer: "Light intensity, carbon dioxide concentration, temperature",
    mark: function(answer) {
      let marks = keyword(answer,["light intensity","carbon dioxide concentration","temperature","CO2 concentration"],3,2/3)
      return clamp(marks,2)
    },
    par: 30
  },
  {
    distance1: ranint(1,4,true)*30,
    distance2: ranint(2,4,true)**((-1)**ranint(0,1)),
    intensity1: ranint(5,10,true)**2*36,
    text: function() {return "When a lamp is "+this.distance1+" cm from a plant, the light intensity reaching it is "+this.intensity1+" lux. Calculate the light intensity if the lamp is moved to a distance of "+(this.distance1*this.distance2)+" cm."},
    advanced: false,
    modelAnswer: function() {return this.intensity1*this.distance2**-2+" lux"},
    mark: function(answer) {
      let exponent_difference = Math.log10(Number(answer.split(" ")[0])/this.modelAnswer().split(" ")[0])
      let marks
      if (Math.abs(exponent_difference)<1e-6) marks = 2
      else if (approximateEqual(modulo(exponent_difference+0.5,1),0.5)) marks = 1
      else marks = 0
      if (marks>0) marks += keyword(answer,["lux"],1,1)
      return clamp(marks,3)
    },
    par: 15
  }
]
// resume at page 23