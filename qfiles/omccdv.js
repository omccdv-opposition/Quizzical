"use strict"
var resources_omccdv = {
	sixDigitRiddle: function() {
		let out = countTo(10,true).select(6)
		while (out[0]==0) out = out.shuffle()
		return out
	}
}
var question_file_at_omccdv = [
  {
    text:"",
    type:"composite",
    components:[
      {
        text:"State the Red User's username.",
        level:1,
        type:"open",
        modelAnswer:"ltunknowngt",
        mark:function(answer){return keyword(answer,["ltunknowngt"])-keyword(answer,["The Opposition","Marion"])},
        par:10
      },
      {
        text:"State the Blue User's username.",
        level:1,
        type:"open",
        modelAnswer:"The Opposition",
        mark:function(answer){return keyword(answer,["The Opposition"])-keyword(answer,["ltunknowngt","Marion"])},
        par:10
      },
      {
        text:"State the first Cyan User's username.",
        level:1,
        type:"open",
        modelAnswer:"Marion",
        mark:function(answer){return keyword(answer,["Marion"])-keyword(answer,["ltunknowngt","The Opposition"])},
        par:10
      }
    ].shuffle()
  },
  {
    text:"",
    type:"composite",
    components:[
      {
        text:"State the date on which <i>OM Challenge Chart Edit version</i> was created.",
        level:2,
        type:"open",
        modelAnswer:"2020-07-19",
        mark:function(answer){return keyword(answer,["2020","19"],2,2/3)+keyword(answer,["07","July"],1,2/3)},
        par: 20
      },
      {
        text:"What is the name of the holiday celebrated on the anniversary of this event each year?",
        level:2,
        type:"open",
        modelAnswer:"Annuation",
        mark:function(answer){return keyword(answer,["annuation"])-keyword(answer,["anniversa"])},
				par:10
      }
    ]
  },
	{
		text:"On what date did the Opposition first find <i>OM Challenge Chart Official</i>?",
		level:"A",
		type:"open",
		modelAnswer:"2020-07-08",
		mark:function(answer){return keyword(answer,["2020","08"],2,2/3)+keyword(answer,["07","July"],1,2/3)},
		par: 20
	},
	{
		text:"What was the version number of the Anarchist Opposition Supercomputer when it was first added to <i>OMCCAV No bug edition.</i>?",
		level:"A",
		type:"open",
		modelAnswer:"69.0",
		mark:function(answer){return keyword(answer,["69","69.0"])},
		par: 10
	},
  {
    text:"",
    type:"composite",
    components:(()=>{
      let list = [[1,"Hell"],[2,"Heaven"],[3,"The Spirit World"],[4,"Void"],[5,"The OMCCCDV World"],[6,"Nether"],[7,"Tunnels Universe"],[8,"THE Róth Unfe Wuniverse"],[9,"Online Sequencer"],[10,"The UMCCDV World"]].select(ranint(2,6,true)).sort((a,b)=>a[0]-b[0])
      let out = []
      for (let i of list) out.push({
        text:"State afterlife "+i[0]+" of the Afterlife Continuum",
        type:"open",
        level:[null,3,4,5,5,6,7,7,8,7,5][i[0]],
        modelAnswer:i[1],
        mark:function(answer){return keyword(answer,[i[1]],1,2)-keyword(answer,list.map(x=>x[1]))},
        par:10
      })
      return out
    })()
	},
  {
    text:"",
    type:"composite",
    components:[
      {
        text:"State the name of the Opposition's first 'real' incremental game.",
        level:3,
        type:"open",
        modelAnswer:"Exotic Matter Dimensions",
        mark:function(answer){return keyword(answer,["Exotic Matter Dimensions"])},
        par:15
      },
      {
        text:"How many Sheets incrementals did the Opposition make before this?",
        level:4,
        type:"multiplechoice",
        answers:multipleChoiceGenerator(["5"],1,["1","2","3","4","6","7","8"],7),
        markTransform:x=>x,
        par:10
      }
    ]
  },
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State the sheet which was vandalized by the Opposition and ltunknowngt the day after the creation of the original OMCCDV World.",
				level:4,
				type:"open",
				modelAnswer:"Electricity basics",
				mark:function(answer){return keyword(answer,["Electricity basics"])},
				par: 15
			},
			...[
				{
					text:"",
					type:"composite",
					components:[
						{
							text:"State the name of the document to which the Opposition and ltunknowngt moved during this time.",
							level:4,
							type:"open",
							modelAnswer:"The impossible quiz",
							mark:function(answer){return keyword(answer,["The impossible quiz"])},
							par:10
						},
						{
							text:"For how many days did the Opposition and ltunknowngt stay in this document?",
							level:3,
							type:"multiplechoice",
							answers:multipleChoiceGenerator([2],1,[1,3,4,5,6],5),
							markTransform:x=>x,
							par:10
						},
					]
				},
				{
					text:"Marion deleted the sheets of ltunknowngt and the Opposition after this.",
					type:"composite",
					components:[
						{
							text:"",
							type:"composite",
							components:[
								{
									text:"What did Marion threaten to feed them after this?",
									level:6,
									type:"open",
									modelAnswer:"Peppermint",
									mark:function(answer){return keyword(answer,["peppermint"])-keyword(answer,["paprikamint"])},
									par:10
								},
								{
									text:"",
									type:"composite",
									components:[
										{
											text:"What did the Opposition threaten to feed Marion in return?",
											level:7,
											type:"open",
											modelAnswer:"PAPRIKAMINT",
											mark:function(answer){return keyword(answer,["paprikamint"])-keyword(answer,["peppermint"])},
											par:10
										},
										{
											text:"How much of this did the Opposition threaten to feed Marion?",
											level:7,
											type:"open",
											modelAnswer:"Forty pounds",
											mark:function(answer){return keyword(answer,["forty","40"],1)+keyword(answer,["pound"])},
											par:10
										}
									]
								}
							]
						},
						{
							text:"What tool was used to restore the sheets?",
							level:4,
							type:"open",
							modelAnswer:"Version history",
							mark:function(answer){return keyword(answer,["version","history"],2,0.5)},
							par:10
						}
					]
				}
			].select(2),
		]
	},
  ...(()=>{
    let songs = [
      {title:"Dragostea Din Tei",artist:"O-Zone",album:"Dragostea Din Tei (W&W Remix)",year:"2003",label:"very first 'meme song'"},
      {title:"Tic Tac",artist:"Enzo",album:"Tic Tac (L'album)",year:"2021",label:"first 'meme song' which originated from the Junior Eurovision Song Contest"},
      {title:"Rasputin",artist:"Boney M.",album:"Nightflight to Venus",year:"1978",label:"first 'meme song' which has a piano remix by <i>Sheet Music Boss</i>"}
    ]
    let out = []
    for (let i of songs) out.push({
      text:"",
      type:"composite",
      components:(()=>{
        let out2 = []
        for (let j=0;j<3;j++) out2.push({
          text:"State the "+["title","artist","album"][j]+" of the "+i.label+".",
          type:"open",
          level:[7,"A","A"][j],
          modelAnswer:i[["title","artist","album"][j]],
          mark:function(answer){return answer.trim().toLowerCase()==i[["title","artist","album"][j]].trim().toLowerCase()?1:0},
          par:10
        })
        let years = [...songs.filter((x,index)=>i!==index).map(x=>x.year),...countTo(new Date().getUTCFullYear()-1970).filter(x=>Math.random()<x/40).map(x=>String(x+1970)).filter(x=>!songs.map(x=>x.year).includes(String(x))).shuffle()]
        out2.push({
          text:"Select the release year of the "+i.label+".",
          type:"multiplechoice",
          level:"A",
          answers:multipleChoiceGenerator([i.year],1,years,7),
          markTransform:x=>x,
          par:10
        })
        return out2
      })()
    })
    return out
  })(),
	{
		text:"State the names of the Greek letters after which three adjacent <i>OMCCAV No bug edition.</i> sheets were named.",
		level:7,
		type:"open",
		modelAnswer:"Epsilon; Psi; Omega",
		mark:function(answer){return keyword(answer,["epsilon","psi","omega"],3,2/3)-keyword(answer,["alpha","beta","gamma","delta","zeta","eta","theta","iota","kappa","lambda","mu","nu","xi","omicron","pi","rho","sigma","tau","upsilon","phi","chi"])},
		par: 20
	},
	{
		text:"State the incantations of the first four spells to be introduced.",
		level:6,
		type:"open",
		modelAnswer:"Avada Kedavra; Crucio; Imperio; Delirio",
		mark:function(answer){return keyword(answer,["Avada Kedavra","Crucio","Imperio","Delirio"])},
		par: 20
	},
	{
		text:"State the original name of 'ÒMCCDV IIÍ'.",
		level:5,
		type:"open",
		modelAnswer:"Java",
		mark:function(answer){return keyword(answer,["Java"])-keyword(answer,["JavaScript","Blocks","Alturns"])},
		par: 10
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State the index that Lua error 'Pou1' was briefly reassigned to from 'Pou' before receiving its current index.",
				level:"A",
				type:"open",
				modelAnswer:"335",
				mark:markTemplate.number(335),
				par: 10
			},
			{
				text:"State the index that Lua error 'Pou2' was briefly reassigned to from 'Pou_TooMuchBacon' before receiving its current index.",
				level:"A",
				type:"open",
				modelAnswer:"336",
				mark:markTemplate.number(336),
				par: 10
			}
		]
	},
	{
		text:"It pays to read the instructions.",
		type:"composite",
		components:[
			{
				text:"State the number of questions that this quiz has.",
				level:"A",
				type:"open",
				get modelAnswer(){return questions.length},
				mark:function(answer){return (String(answer).replaceAll(" ","")==this.modelAnswer)?1:0},
				par: 10
			},
			{
				text:"State the total number of parts that the questions in this quiz have.",
				level:"A",
				type:"open",
				get modelAnswer(){return allQuestionParts(questions).length},
				mark:function(answer){return (String(answer).replaceAll(" ","")==this.modelAnswer)?1:0},
				par: 10
			}
		]
	},
	{
		text:"This question is about \"The ___ tables of ___\".",
		type:"composite",
		components:[
			{
				text:"One of the tables in the sheet \"The ___ tables of ___\" is Marion's table of sweets.",
				type:"composite",
				components:[
					{
						text:"How many entries are in Marion's table of sweets?",
						level:5,
						type:"multiplechoice",
						answers:multipleChoiceGenerator(["8"],1,["4","5","6","7","9","10","11","12"],5),
						markTransform:x=>x,
						par:10
					},
					{
						text:"State the three classifications within this table.",
						level:7,
						type:"open",
						modelAnswer:"Solid; Liquid; Semi-Solid",
						mark:function(answer){return keyword(answer,["Liquid","Solid","Semi-Solid"])},
						par:20
					}
				]
			},
			{
				text:"List the seven classifications in the Opposition's table of EMD features.",
				level:8,
				type:"open",
				modelAnswer:"Layer 0; Stardust; Wormhole; Spacetime; Layer ω; Unplayable; Rejected",
				mark:function(answer){return keyword(answer,["Layer 0","Stardust","Wormhole","Spacetime","Layer ω","Unplayable","Rejected"],7,4/7)},
				par: 60
			}
		]
	},
	{
		text:"State the name and index of the first track composed by the Opposition which appears in 'It's our favorites II'.",
		level:"A",
		type:"open",
		modelAnswer:"2965891 - Old Adversary",
		mark:function(answer){return 0.5+keyword(answer,["2965891","Old Adversary"])-keyword(answer,["2947240","Temple of the Twelve","2954560","Royal Parade","2991409","Safe House","3009411","Origin"],"u",0.5)},
		par: 15
	},
	{
		locations: ["Wizard Tower","Magical Forest","Frigid Town","Wheatlands","Ghostly Palace","Primrose Plains","Olympe Crater","Olympe Mountain","Olympe Desert","Ministry of Anarchy","Flower Forest","Poopy Swamp","Anarchy City","Anarchy Beach","Mount Hoth","Azerbaijan","Snowland","Frosty Circle","Prismatic Ocean","Quirky Ocean","Link Center","Frigid Circle","Iceland","Azkaban","The Sky","Tropical Cyclone","Fat Domain","Interdimensional Network","Ancient Ruins","Poisoned Sea","Toxic Sea","Teleporters","The Evil Opposition","Message","Omdinal Barkup","House","Farm","Red Death","Prison","Trophy","Death Ray","No","Dezev Castle","Azerbaij City","Mount Serv","Mad Desert","Serv Garden","Forest of Green","House of Reinhardt","Hog Laundromat","Forest of Acid","Tower of Aziv","Swamplands","Filetmign Volcano","Throw-up Island","What's that octopus? Loadsamoney!","Polaroid Island"],
		text:"List 40 locations from the old OMCCDV World (includes: 'The OMCCDV World', 'ltunknowngt's Continent', 'Marion's Island').",
		level:"A",
		type:"open",
		get modelAnswer() {
			return this.locations.select(40).join("; ")
		},
		mark:function(answer){return keyword(answer,this.locations,40)**(Math.log(15)/Math.log(40))},
		par: 240
	},
	{
		departments: ["Office of the Lead Anarchist","Trial Hall","Department of Ministry Maintenance","Department of Gardening","Secret Department","Department of Cleaning","Department of Hierarchy","Insect Department","Department that actually relates to Ordinal Markup","Office of the Lead Terraformer","Department of Injustice","Department of Warion's extreme fatness","Department of Fatty McPatty Donald Trump","Smoking Parlor","Department of Protective Curses","Department of Computational Resources","Department of Magical Artifacts","Department of Dëæťh","Department of Jobs","Office of the Lead Cheater (who is nonexistent)","Department of Ridiculously Long Department Names that Nobody Will Ever Ever Like Because the Department Names are so Long","Department of Education","Department of Músique","Department of Balanga","Department of Lífë","Department of Cell Adventures","Department of Latin Square","Department of Wishology","Office of the Head of Magical Science","Ministry LABO","Office of the Vellumentalist","Vellumental Music Room","Classy Vellumental Music Room","Nonexistent Department","Office of the Googologist","Google LLC","Googol LLC","Office of the Head of Virtues","Hall of Beethoven","Department of Zip Points","Office of the Labourer","The Labour Party","Office of Jeremy Corbyn","Cleaning Cupboard","Department of Cleaners","Office of the Architech","Construction Plans","Office of the Secretist","Secret Departmnet","Office of the Slaves","Slave Trading Hall","Department of iwiHo","Office of the R I C K R O L L I F I E R","Department of Rickrolls","Department of Rick","Department of Astley","Rick's Bedroom (WTF is this doing in the Ministry?)","Astley's Bedroom (WTF is this doing in the Ministry?)","Office of the Terraformation Aide","Terraformation Aid","ActionAid","World Wildlife Fund","Oxfam","Charities Aid Foundation","Islamic Aid","Christian Aid","Office of the Control Freak","205G","Warning: If you are caught communicating with someone in 205G or looking in through the door, you will be severely sanctioned. Don't let it be you!","Faculty Room","Skool","Office of the I D L I F I E R","IDLE Lounge (fake)","IDLE Lounge (real)","IDLE Lounge (real and fake, but isn't)","Office of the Carrote Farmer","Carrote Farm","Office of the Rabbit Hunter","Armory","Rabbit Enclosure","Office of the Anti-Secretist","Anti-Secret Department","Office of the W3C CEO","Learn javascript","Office of the Incremental Game Dev","Incremental Development For Dummies: -205 G","Nonexistent Office","Office of the Sheet3597 Enforcer","Office of the Treasurer","Department of Investing","Department of Replacing Virtue with Monez","Department of Replacing the Head of Virtues with the Head of Monez","Treasury","Department of Monez Chess","Department of Monez Quarantine","Department of Appropriate Punishments for Stealing Monez","Department of Accounting","Department of Salaries","Office of the Polynomino Artist","Pentomino Puzzles","Office of the Flavor Text","Department of Comedy","Department of One-Liners","Department of Punchlines","Department of Educating Unfunny People","Office of the Definologomancoingist","Department of Named Ranges","Office of the Not-forbidden-but-you-really-ought-not-to-associate-with One","History Class","Office of the Pixel Painter","1R","Office of the Google CEO","Google Sheets","Office of the Cell Master","Link Center","Office of the Job Maker","Department of Making a Better job","Executive Balanga Floor","Office of the Ministry Manager","Office of the Vice Ministry Manager","Scaffolding Tower","Cafeteria","Public shower","Internet booth","Pet store","Forbidden Area","Delirius Chamber","Ministry Prison","Imperius Chamber","Death Chamber","Suicide Pit","10th Anarchy Trial","Cruciatus Chamber"],
		text:"List 80 departments and offices from the old Ministry of Anarchy.",
		level:"A",
		type:"open",
		get modelAnswer() {
			return this.departments.select(80).join("; ")
		},
		mark:function(answer){return keyword(answer,this.departments,80)**(Math.log(30)/Math.log(80))},
		par: 480
	},
	{
		text:"List the ten 'base colors' of Google Sheets.",
		level:"A",
		type:"open",
		modelAnswer:"Red berry; red; orange; yellow; green; cyan; cornflower blue; blue; purple; magenta",
		mark:function(answer){return keyword(answer,["red berry","red","orange","yellow","green","cyan","cornflower blue","blue","purple","magenta"],10,0.4)},
		par: 50
	},
	{
		text:"Select the number of times a year that Annuation occurs.",
		level:3,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["1"],1,["2","3","4","½","¼"],5),
		markTransform:x=>x,
		par: 10
	},
	{
		text:"Select the number of Tunnels cycles in each year.",
		level:6,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["2"],1,["1","3","4","½","¼"],5),
		markTransform:x=>x,
		par: 10
	},
	{
		text:"What does the =SHEETNUMBER() function do?",
		level:7,
		type:"open",
		modelAnswer:"It returns the position of the sheet it is used in.",
		mark:function(answer){return keyword(answer,["position","sheet"])+keyword(answer,["current","in"],1)},
		par: 30
	},
	{
		text:"List the four modes of the Anarchist Opposition Supercomputer.",
		level:7,
		type:"open",
		modelAnswer:"Opposition mode; make-up mode; angry mother-in-law mode; exception error",
		mark:function(answer){return keyword(answer,["opposition","exception error"],2,0.75)+keyword(answer,["make-up","makeup","make up"],1,0.75)+keyword(answer,["mother-in-law","mother in law"],1,0.75)},
		par: 40
	},
	{
		text:"The Anarchist Opposition Supercomputer stores a data dump all about Dëæťh. List the other six objects that the Anarchist Opposition Supercomputer stores data dumps about.",
		level:7,
		type:"open",
		modelAnswer:"Marion; ltunknowngt; itself; Luigin; Warion; Death; the dumpster behind Walmart",
		mark:function(answer){return keyword(answer,["Marion","ltunknowngt","Luigin","Warion","dumpster behind Walmart"])+keyword(answer,["self","the Opposition","the Anarchist Opposition Supercomputer"],1)},
		par: 50
	},
	{
		text:"State the overrated topic which was banned by Sheet101 of OMCCDV V.",
		level:4,
		type:"open",
		modelAnswer:"Pou",
		mark:function(answer){return keyword(answer,["Pou","Poo"],1)},
		par: 10
	},
	{
		text:"State the species of the three protagonists of <i>OMCCDV Origins</i>.",
		level:3,
		type:"open",
		modelAnswer:"Marionians; plasmanians; fries",
		mark:function(answer){return keyword(answer,["Marionian","plasmanian"])+keyword(answer,["fry","fries"],1)-keyword(answer,["Frenchfryian"])},
		par: 25
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State the length in digits of a Galactic ID number.",
				level:7,
				type:"open",
				modelAnswer:"128",
				mark:markTemplate.number("128"),
				par:10
			},
			{
				text:"State the Opposition's Galactic ID number.",
				level:"A",
				type:"open",
				modelAnswer:"24816326412825651210242048409681921638432768655361310722621445242881048576209715241943048388608167772163355443267108864134217728",
				mark:function(answer){return keyword(answer,[[0,12],[12,24],[24,36],[36,48],[48,60],[60,76],[76,92],[92,108],[108,128]].map(x=>this.modelAnswer.substring(x[0],x[1])))},
				par:70
			}
		]
	},
	{
		text:"State the longest possible IDLE duration.",
		level:8,
		type:"open",
		modelAnswer:"Infinite mintues",
		mark:function(answer){return keyword(answer,["infinit","etern","ever"],1)},
		par: 20
	},
	{
		text:"Quote the wisdom that the Talking Parrot in the aviary in the middle of nowhere imparts upon travelers for 20,000,000,000,000,000 Anarchy Dollars.",
		level:7,
		type:"open",
		modelAnswer:"There was an old man of Dunrose;<br>A parrot seized hold of his nose.<br>When he grew melancholy,<br>They said, 'His name's Polly',<br>Which soothed that old man of Dunrose.<br>Thank you for your donation!",
		mark:function(answer){
			return Math.floor(keyword(answer,["There","was","an","old","man","of","Dunrose"],7,1/7))
						+Math.floor(keyword(answer,["A","parrot","seized","hold","of","his","nose"],7,1/7))
						+Math.floor(keyword(answer,["When","he","grew","melancholy"],4,0.25))
						+Math.floor(keyword(answer,["They","said","His","name's","Polly"],5,0.2))
						+Math.floor(keyword(answer,["Which","soothed","that","old","man","of","Dunrose"],7,1/7))
						+Math.floor(keyword(answer,["Thank","you","for","your","donation"],5,0.2))
		},
		par: 75
	},
	{
		text:"State the integer which is equal to 1/3.",
		level:7,
		type:"open",
		modelAnswer:"...6666666666667",
		mark:function(answer){return Math.floor(keyword(answer,["...","666","7"],3,1/3))-keyword(answer,["77"])},
		par: 20
	},
	{
		text:"Select the number of documents are in <i>Documents made by rxtge</i>.",
		level:7,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["1"],1,["0","2","3","4","5","6","7"],7),
		markTransform:x=>x,
		par: 10
	},
	{
		text:"Complete the sequence.",
		level:8,
		type:"gapfill",
		words:gapfillGenerator([["Crucio",function(answer){return answer.trim().toLowerCase()=="crucio"?1:0}],", ",["Crusio",function(answer){return answer.trim().toLowerCase()=="crusio"?1:0}],", ",["Crukio",function(answer){return answer.trim().toLowerCase()=="crukio"?1:0}]],1),
		markTransform:x=>x,
		par: 15
	},
	{
		text:"List the 78 gifts that Marion received during the twelfth day of <i>12 Days of Christmas: Marion's Version</i>.",
		level:8,
		type:"open",
		modelAnswer: "<div style=\"column-count:2\">12 Words<br>And 11 Cells with texts<br>And 10 Move<br>And 9 Mirrors<br>And 8 Guards<br>And 7 Security QUARANTINE<br>And 6 Confusing cells<br>And 5 Colored cells<br>And 4 Timers<br>And 3 Death rays<br>And 2 Math questions<br>And 1 Link</div>",
		mark:function(answer){
			return keyword(answer,["words","cells with texts","move","mirrors","guards","security quarantine","confusing cells","colored cells","timers","death rays","math questions","link"],12,0.375)
						+keyword(answer,["12 words","11 cells with texts","10 move","9 mirrors","8 guards","7 security quarantine","6 confusing cells","5 colored cells","4 timers","3 death rays","2 math questions","1 link"],12,0.375)
						-keyword(answer,["moves","security quarantines","links"],"u",0.75)
		},
		par: 90
	},
	{
		text:"List the items for sale in <i>A room for a tired people</i> and their prices.",
		level:8,
		type:"open",
		modelAnswer:"Energy Flavored Zesty Bar ($0.69); Zesty Flavored Energy Bar ($0.96); B-Soda ($0.49); Wasp Soda (1 stinger); OppositioSoda (Ew! Why would you drink that?); ltunknowngt item (ltunknowngt price)",
		mark:function(answer){
			let item_mark = keyword(answer,["Energy Flavored Zesty Bar","Zesty Flavored Energy Bar","B-Soda","Wasp Soda","OppositioSoda","ltunknowngt item"])
			let price_mark = keyword(answer,["$0.69","$0.96","$0.49","1 stinger","Ew! Why would you drink that?","ltunknowngt price"])
			return clamp(2*(Math.sqrt(0.25+item_mark)+Math.sqrt(0.25+price_mark)-1),8)
		},
		par: 80
	},
	{
		text:"In <i>Learn your ABCs with Warion!</i>, Q stands for: ",
		level:6,
		type:"open",
		modelAnswer:"Q stands for \"QUE BUENO. ESE ESPAGUETI BUENO.\"",
		mark:function(answer){return keyword(answer,["Q","for"],2,0.5)+keyword(answer,["QUE BUENO","ESE ESPAGUETI BUENO"])+keyword(answer,["\"","'"],1)},
		par: 25
	},
	{
		text:"The <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#ffff00\">light bulb</span> is one of the objects in the <i>Objects</i> sheet. State the other three.",
		level:6,
		type:"open",
		modelAnswer:"The <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#0000ff\">rubber band</span>, the <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#314c59\">stapler</span> and the <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#ff0000\">idl</span><span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#0000ff\">eat</span><span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#00ffff\">or</span>",
		mark:function(answer){return keyword(answer,["rubber band","stapler","idleator"])},
		par: 25
	},
	{
		num: ranint(1,9,true),
		get text(){return "Solve for x:<br>"+this.num+"+1: x"},
		level:6,
		type:"open",
		get modelAnswer() {return String(this.num)},
		mark:function(answer){return answer==this.modelAnswer?1:0},
		par: 10
	},
	{
		text:"State the value beyond which the terraforming percentage of the old OMCCDV World never increased.",
		level:4,
		type:"open",
		modelAnswer:"60%",
		mark:function(answer){return keyword(answer,["60","%"])},
		par: 10
	},
	{
		text:"Quote Chirp's pronunciation of <i>OMCCDV World</i>.",
		level:6,
		type:"open",
		modelAnswer:"OH-EM-CEE-CEE-DIVE-E world",
		mark:function(answer){
			let terms = answer.split("-")
			if (terms.length !== 6) return 0
			let marks = 0
			for (let i=0;i<6;i++) if (terms[i].toLowerCase()==["oh","em","cee","cee","dive","e world"][i]) marks+=1/3
			return clamp(marks,2)
		},
		par: 25
	},
	{
		text:"Select the radius of the <i>Interdimensional Network</i> portal leading to the Interdimensional Network itself.",
		level:8,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["14 cells"],1,["10 cells","11 cells","12 cells","13 cells","15 cells","16 cells"],6),
		markTransform:x => x,
		par: 15
	},
	{
		base: ranint(8,16,true),
		exp2: ranint(1,4,true),
		exp1: ranint(1,6,true),
		exp0: ranint(1,8,true),
		get text(){return "State the number of successor clicks needed to reach the ordinal ω²"+(this.exp2==1?"":this.exp2)+"+ω"+(this.exp1==1?"":this.exp1)+"+"+this.exp0+"["+this.base+"] in <i>Ordinal Markup</i>."},
		level:"A",
		type:"open",
		get modelAnswer() {return this.exp2*this.base**2+this.exp1*this.base+this.exp0},
		mark:function(answer){
			if (answer==this.modelAnswer) return 2
			if (answer==this.exp2*100+this.exp1*10+this.exp0) return 1
			return 0
		},
		par: 40
	},
	{
		text:"Which <i>Crowded Apartment</i> contains people locked in a dark closet?",
		level:5,
		type:"open",
		modelAnswer:"All of them",
		mark:function(answer){return keyword(answer,["all"],1,2)+keyword(answer,["ltunknowngt","Opposition","Marion"],3,1/3)},
		par: 20
	},
	{
		text:"Prove that 1969-07-20 + 2020-07-19 is not defined, using as many examples as possible.",
		level:"A",
		type:"open",
		modelAnswer: `Arithmetic: 1969-07-20 + 2020-07+19 = 3936
							<br>Date addition: 1969-07-20 + 2020-07+19 = 2090-02-06;
							<br>Lunar arithmetic: 1969-07-20 + 2020-07+19 = 2919
							<br>ij = -ji arithmetic: 1969-07-20 + 2020-07+19 = -(2020-07-19 + 1969-07-20) -3936
							<br>String arithmetic: 1969-07-20 + 2020-07+19 = \"1969-07-20	2020-07-19\"
							<br>Also string arithmetic: 1969-07-20 + 2020-07+19 = 1942+1994
							<br>As arithmetic operations cannot be multivalued, 1969-07-20 + 2020-07-19 cannot be defined.`,
		mark:function(answer){return keyword(answer,["3936","2090-02-06","2919","-3936","multivalued"],5,1)+keyword(answer,["1969-07-20","2020-07-19","1942","1994"],4,0.5)+keyword(answer,["date","lunar","-ji","quaternion","string"],4,1)},
		par: 80
	},
	{
		text:"How long does All new machine works",
		level:1,
		type:"open",
		modelAnswer:"\"5 years\" - Marion<br>\"No one knows.\" - Reality",
		mark:function(answer){return 100},
		par: 600
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Which of these species came first?",
				level:"A",
				type:"multiplechoice",
				answers:multipleChoiceGenerator([],0,["Prokaryotes","Eukaryotes"],2),
				markTransform:x=>x+1,
				par:10
			},
			{
				text:"Explain your answer to part (a).",
				level:"A",
				type:"open",
				modelAnswer:"Neither of those is a species.",
				mark:function(answer){return keyword(answer,["neither","not","aren't"],1)*keyword(answer,["species"])},
				par:10
			}
		]
	},
	{
		text:"List 8 common trophies.",
		answerKey:["The first one's always free","The second one isn't so free","Community Service","Making cash","Making MORE cash","Workaholic","Polyglot","Proof of Good Deed","Proof of Evil Deed","Pixel Painter","Aspiring Artisan","The Best of the Best","God","Humanist","Office Block","Pumped","IT'S FREAKING OVERFLOWING!","Journalist","Multidimensional","Graham","Rayo","Shameless","Professional Hacker","1488715699 666","Blackmail","Elementalist","What's wrong with you?","BINGO!","The Clutterer","Unholy Shit","Rickroll'd","Trickster","Sisyphean Labor","Kidnapped","Kidnapper","Grand Balance","Evil","The Egregious Earthshaker","Paprikamint","Job Stealer","Blank Achievement Slot","If no one'll clean, it'll be unclean!","If no one'll unclean, it'll be clean!","OCD","Dreamweaver","The third one's actually quite expensive","IT'S FREAKING AUGUST! Oh wait, it's now March","IT'S FREAKING COLD!","Abrakazaam!","Azkaban!","Azerbaijan!","Alacalaban!","Spooky!","Neighborhood Yin","Neighborhood Yang","Bootlegged Books","Life...","...Death...","...and Dëæťh","Ghost in the Glycocalyx","Are you sure?","The fourth one's overpriced","78-hour days","IT'S ACTUALLY FREAKING OVERFLOWING!","How are you even here?","Grand Unbalance","President","Just stop","I am IDLE, yes I am!","Warping the Terre","The Other Side","What is this monstrosity?","Failing on purpose","Credit Card Fraud","What's wrong with you?","Hyperpolyglot","IT'S FREAKING VANDALISED!","Short bedtime story, huh?","Overly long paragraph","You are now the Air Vellumental","I want to be the Magnanimity","Architectural Progression","Controversial","Get out of my secretistically secretive secret lab!","Yum-yum-yum in my tum!","Blue Fire","Goodbye continent","I am Lord Voldemort","Unique Snowflakes","Jack of All Trades"],
		level:"A",
		type:"open",
		get modelAnswer(){return this.answerKey.select(8).join("<br>")},
		mark:function(answer){return keyword(answer,this.answerKey,8,1/2)},
		par: 50
	},
	{
		text:"State the contents of 'H500'!H500 of <i>OMCCDV II</i>.",
		level:8,
		type:"open",
		modelAnswer:"<span style=\"color:#00ffff;font-family:'Verdana';font-size:18px\">I am <span style=\"color:rgba(0,0,0,0);font-size:1px\">not</span> IDLE, yes I am!</span>",
		mark:function(answer){return keyword(answer,["I am ","IDLE, yes I am!"],2,0.5)+keyword(answer,["not"],1,1)},
		par: 20
	},
	{
		text:"How many <u>less</u> locations does <i>aaaaaas continent (extremely simplified)</i> have than <i>ltunknowngt's Continent</i>? Show your working.",
		level:8,
		type:"open",
		modelAnswer:"18 - 11 = 7",
		mark:function(answer){return keyword(answer,["18","11"],2,0.5)+keyword(answer,["7"],1,1)},
		par: 45
	},
	{
		text:"A civilization of gaseous black creatures found in the OMCCDV Universe is known as the Plasmanian civilization. What were Plasmanians called before receiving their current name?",
		level:4,
		type:"open",
		modelAnswer:"Void-Faces",
		mark:function(answer){return keyword(answer,["Voidface","Void-Face"],1,1)},
		par: 15
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Complete the following quote:<br>\"I know your type, tall, dark and dead<br>___ ____ __ ____ ___ ___ ______ ___ __ __ ____<br>___ ____ ___ ___ ______ __<br>___ ___ ___ _______ __ ____<br><br>___ ____ _ _________ ___ ___<br>__ _____ __ ______ ________<br>___ ____ ___ _____ __ ______<br>__ _____ ____ _______",
				level:"A",
				type:"open",
				modelAnswer:"You want to bite all the petals off of my head<br>And then eat the brains of<br>The one who planted me here<br>I'm just a sunflower but see<br>Me power an entire infantry<br>You like the taste of brains<br>We don't like zombies",
				mark:function(answer){
					let marks = Math.floor(keyword(answer,["You","want","to","bite","all","the","petals","off","of","my","head"],11,4/11))
										+Math.floor(keyword(answer,["And","then","eat","the","brains","of"],6,1/3))
										+Math.floor(keyword(answer,["The","one","who","planted","me","here"],6,1/3))
										+Math.floor(keyword(answer,["I'm","just","a","sunflower","but","see"],6,1/3))
										+Math.floor(keyword(answer,["Me","power","an","entire","infantry"],5,0.4))
										+Math.floor(keyword(answer,["You","like","the","taste","of","brains"],6,1/3))
										+Math.floor(keyword(answer,["We","don't","like","zombies"],4,0.5))
					return clamp(marks/2,8)
				},
				par: 100
			},
			{
				text:"Complete the following quote:<br>\"I know your type: Tall, Dark and <span style=\"font-size:48px\">DEAD</span>,<br>___ ____ __ ____ __ ______ ___ __ __ ____,<br>___ ____ ___ ___ ___ __<br>___ ____ _______ __ ____<br><br>___ ___ _ _________ ___ ___<br>__ ______ ______-_______,<br>___ ____ ___ _____ __ ______<br>__ _____ ____ _______",
				level:"A",
				type:"open",
				modelAnswer:"you want to bite my petals out of my head<br>and then eat the bre of<br>who ever planted me here<br>I'm just a sunflower but see<br>me spread entire infatry<br>you like the taste of brains<br>we don't like zombies",
				mark:function(answer){
					let marks = Math.floor(keyword(answer,["you","want","to","bite","my","petals","out","of","my","head"],10,0.4))
										+Math.floor(keyword(answer,["and","then","eat","the","bre","of"],6,1/3))
										+Math.floor(keyword(answer,["who","ever","planted","me","here"],5,0.4))
										+Math.floor(keyword(answer,["I'm","just","a","sunflower","but","see"],6,1/3))
										+Math.floor(keyword(answer,["me","spread","entire","infatry"],4,0.5))
										+Math.floor(keyword(answer,["you","like","the","taste","of","brains"],6,1/3))
										+Math.floor(keyword(answer,["we","don't","like","zombies"],4,0.5))
					return clamp(marks/2,8)
				},
				par: 100
			}
		]
	},
	{
		text:"I beat but I don't eat, and I have hands but not feet. What am I?",
		level:8,
		type:"open",
		modelAnswer:"A clock.",
		mark:function(answer){return keyword(answer,["clock"],1,1)},
		par: 15
	},
	(()=>{
    let numbers = countTo(11).select(ranint(3,6)).sort((a,b)=>a-b)
    let out = []
    for (let i of numbers) out.push({
      text:"Name the "+ordinal(i)+" planet from its star.",
      level:i==5?5:4,
      type:"open",
      modelAnswer:i==6?"Invisible Ghostly Planet 5":("Planet "+(i-1)),
      mark:function(answer){answer.trim().toLowerCase()==this.modelAnswer.trim().toLowerCase()?1:0},
      par:10
    })
    return {text:"There are eleven planets in the Planet 0 system.",type:"composite",components:out}
  })(),
	{
		text:"State the name of the first cell adventure.",
		level:4,
		type:"open",
		modelAnswer:"Cell adventure (fake)",
		mark:function(answer){return keyword(answer,["Cell adventure","(fake)"],2,1)},
		par: 15
	},
	{
		text:"Complete the quote: \"THIS IS NOT A SHEET.<br>____ __ _ _____ ______.<br>____ __ _ _____ __ ______.<br>____ __ _______ ___ _ ______ __ ___ _______.<br>____ __...<br>_______ _____ ____.\"",
		level:7,
		type:"open",
		modelAnswer:"THIS IS A BLACK CANVAS.<br>THIS IS A BLANK TV SCREEN.<br>THIS IS TOTALLY NOT A RIPOFF OF VUE CINEMAS.<br>THIS IS...<br>ANOTHER GIANT TURD.",
		mark:function(answer){return keyword(answer,["THIS IS A BLACK CANVAS","THIS IS A BLANK TV SCREEN","THIS IS","ANOTHER GIANT TURD"],4,1)+keyword(answer,["THIS","IS","TOTALLY","NOT","A","RIPOFF","OF","VUE","CINEMAS"],9,2/9)},
		par: 60
	},
	{
		text:"Long, long ago, ltunknowngt said: \"ROYGBIV? More like URCLMOK\".",
		type:"composite",
		components:[
			{
				text:"Expand the acronym ROYGBIV.",
				level:3,
				type:"open",
				modelAnswer:"Red, orange, yellow, green, blue, indigo, violet",
				mark:function(answer){keyword(answer,["red","orange","yellow","green","blue","indigo","violet"],7,3/7)},
				par:30
			},
			{
				text:"Expand the acronym URCLMOK.",
				level:3,
				type:"open",
				modelAnswer:"ltunknowngt, Run away, Con, Luigin, Marion, The Opposition, THE ORIGAMI KINGH",
				mark:function(answer){keyword(answer,["ltunknowngt","Run away","Con","Luigin","Marion","Opposition","ORIGAMI KINGH"],7,3/7)},
				par:30
			}
		]
	},
	{
		type:"",
		type:"composite",
		components:[
			{
				num: resources_omccdv.sixDigitRiddle(),
				combinations: [[1,2],[1,3],[1,4],[1,5],[1,6],[2,3],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],[4,5],[4,6],[5,6]],
				get text() {
					let out = "I am a number with six digits.<br>"
					out += "<div style=\"column-count:3\">"+this.combinations.map(x => "The sum of my digits "+x[0]+" and "+x[1]+" is "+(this.num[x[0]-1]+this.num[x[1]-1])).join("<br>")+"</div>"
					out += "<br>The difference between my largest and smallest digit is "+(this.num.reduce((x,y) => Math.max(x,y))-this.num.reduce((x,y) => Math.min(x,y)))+", none of my digits repeat. Evaluate me."
					return out
				},
				level:"A",
				type:"open",
				get modelAnswer() {
					return [0,1,2,3,4,5].map(x => String(this.num[x])).join("")
				},
				mark:function(answer){
					answer = String(answer)
					if (answer.length !== 6) return 0
					let marks = 0
					for (let i=0;i<6;i++) if (answer.substring(i,i+1)==this.num[i]) marks++
					return marks
				},
				par: 210
			},
			{
				num: resources_omccdv.sixDigitRiddle(),
				combinations: [[1,2],[1,3],[1,4],[1,5],[1,6],[2,3],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],[4,5],[4,6],[5,6]],
				get text() {
					let out = "I am a number with six digits.<br>"
					out += "<div style=\"column-count:3\">"+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => "The product of my digits "+this.combinations[i][0]+" and "+this.combinations[i][1]+" is "+(this.num[this.combinations[i][0]-1]*this.num[this.combinations[i][1]-1])).join("<br>")+"</div>"
					out += "<br>The difference between my largest and smallest digit is "+(this.num.reduce((x,y) => Math.max(x,y))-this.num.reduce((x,y) => Math.min(x,y)))+", none of my digits repeat. Evaluate me."
					return out
				},
				level:"A",
				type:"open",
				get modelAnswer() {
					return [0,1,2,3,4,5].map(x => String(this.num[x])).join("")
				},
				mark:function(answer){
					answer = String(answer)
					if (answer.length !== 6) return 0
					let marks = 0
					for (let i=0;i<6;i++) if (answer.substring(i,i+1)==this.num[i]) marks++
					return marks
				},
				par: 210
			}
		]
	},
	{
		text:"Translate \"alphabet\" to the Latin Square language.",
		level:7,
		type:"open",
		size: 1,
		modelAnswer:"ZKOGZADS",
		mark:function(answer){return keyword(answer,["zkogzads"],1,1)-keyword(answer,["akohabes"],1,1)},
		par: 30
	},
	{
		text:"State the cell adventure which is also known as <i>CS1685</i>.",
		level:6,
		type:"open",
		size: 1,
		modelAnswer:"LS Adventure",
		mark:function(answer){return answer.trim().toLowerCase()=="ls adventure"?1:0},
		par: 15
	},
	{
		text:"Substitute <span>X</span> and <span>Y</span> for the correct missing sections of the quote:<br> \"Magical forest:*Dissapears In just 333ms*<br>Magical forest:*Appears In just 333ms*<br>Magical forest:*Dissapears In just 333ms*<br>Magical forest:*Appears In just 333ms*<br><span>X<br>Y</span>",
		level:4,
		type:"open",
		size: 2,
		modelAnswer:"Magical forest:*Dissapears In just 333ms*;<br>Magical forest:*Appears In just 333ms*",
		mark:function(answer){return keyword(answer,["Magical forest:","Dissapears In just 333ms","Appears In just 333ms"],3,1)},
		par: 45
	},
	{
		text:"The \"Dream Machine\" cell adventure featured two songs.",
		type:"composite",
		components:[
			{
				text:"Recite the lyrics of \"a lulubuy\".",
				level:6,
				type:"open",
				modelAnswer:"Everybody everybody sleep sleep sleep, Lay your heads start sleeping now",
				mark:function(answer){return keyword(answer,["everybody everybody","sleep sleep sleep,","lay your heads","start sleeping now"],4,1)**2/8},
				par:20
			},
			{
				text:"Recite the lyrics of the wake-up song.",
				level:8,
				type:"open",
				modelAnswer:"WAKE UP NOW, ITS 10:00, YOUR SCHOOL IS AT 9:00, YOUR TEACHER IS MAD AT YOU, ITS 4:00, YOU JUST MISS YOU FAVORITE CARTOON, YOU  FELL ASLEEP AGAIN,  YOU WILL MISS SCHOOL IF YOU DO THAT",
				mark:function(answer){return keyword(answer,["WAKE UP NOW","ITS 10:00","YOUR SCHOOL IS AT 9:00","YOUR TEACHER IS MAD AT YOU","ITS 4:00","YOU JUST MISS YOU FAVORITE CARTOON","YOU  FELL ASLEEP AGAIN","YOU WILL MISS SCHOOL IF YOU DO THAT"],8,1)**2/16},
				par:50
			}
		]
	},
	{
		text:"Name all the Alphablocks.",
		level:"A",
		type:"open",
		modelAnswer:"Acrabuy, Berioayu, Caractu, Dickson, Ebaosy, Ffintelecble, Glesse, Huritolly, Intelecble, Jeance, Kefitzat Haderech, Lalll, Monolouiting, Notaboary, Opelucid, Popo, Quincanomers, Recket, Skators, Truncts, Uhhh, Vianspely, Witnes, Xiznahou, Yiuaua, Zeaughtment",
		mark:function(answer){
			let names = answer.split(" ")
			let letters = Array(26).fill(0)
			for (let i=0;i<names.length;i++) letters[names[i].charCodeAt(0)-65]=1
			let marks = letters.reduce((x,y) => x+y)
			return clamp(marks**2*(7/676),7)
		},
		par: 100
	},
	{
		text:"Term 1 of a sequence is 'sphere', term 2 is 'ellipsoid' and term 3 is 'paraboloid'.",
		type:"composite",
		components:[
			{
				text:"Calculate term 4.",
				level:8,
				type:"open",
				modelAnswer:"Hyperboloid",
				mark:function(answer){return keyword(answer,["hyperboloid"],1,1)},
				par:10
			},
			{
				text:"Find the function used to generate the sequence.",
				level:8,
				type:"open",
				modelAnswer:"Triangular sphere",
				mark:function(answer){return keyword(answer,["triangular","sphere"],2,1/2)},
				par:10
			}
		]
	},
	{
		text:"Complete the quote: \"KALINA KALINA KALINA MAJA<br>___ ____ ___ ____ ___ ____ ____\"",
		level:6,
		type:"gapfill",
		words:gapfillGenerator(["\"KALINA KALINA KALINA MAJA<br>",["DAJ WINA DAJ WINA DAJ WINA MAJA",function(answer){return keyword(answer,["DAJ WINA DAJ WINA DAJ WINA","MAJA"],2,1)}],"\""]),
		markTransform:x=>x,
		par: 20
	},
	{
		text:"If you jump 100 feet high on a trampoline, where will you land?",
		level:3,
		type:"open",
		modelAnswer:"On the ground.",
		mark:function(answer){keyword(answer,["ground","trampoline"],1,1)-keyword(answer,["hospital"],1,1)},
		par: 15
	},
	{
		text:"Add the missing vowels: <br>\"S s tht th Cncl Sttn n th dstnc? I rmmbr th Plsmnns llyng wth th tw thr glctc pwrs t mk t. Th Plsmnns, Mrnns nd Frnchfryns wr th thr mst pwrfl cvlztns f SPT0418-47 fr mllns f yrs, bt thn Plsmn ws dstryd nd th Mrnns stppd cmmnctng svrl mnths g.\"",
		level:"A",
		type:"open",
		modelAnswer:"So is that the Conical Station in the distance? I remember the Plasmanians allying with the two other galactic powers to make it. The Plasmanians, Marionians and Frenchfryians were the three most powerful civilizations of SPT0418-47 for millions of years, but then Plasmania was destroyed and the Marionians stopped communicating several months ago.",
		mark:function(answer){return clamp(keyword(answer,["So","is","that","the","Conical","Station","in","the","distance?","I","remember","the","Plasmanians","allying","with","the","two","other","galactic","powers","to","make","it.","The","Plasmanians,","Marionians","and","Frenchfryians","were","the","three","most","powerful","civilizations","of","SPT0418-47","for","millions","of","years,","but","then","Plasmania","was","destroyed","and","the","Marionians","stopped","communicating","several","months","ago."],53,1/53)**3*8,8)},
		par: 120
	},
	{
		capacity: ranint(69,138,true),
		get text(){return "If capacity = "+this.capacity+", calculate the number of <span style=\"font-family:'Verdana';font-size:18px;color:#4a86e8\">Ph1</span> needed to make a <span style=\"font-family:'Verdana';font-size:18px;color:#ff0000\">Ph7</span>, showing your working."},
		level:6,
		type:"open",
		modelAnswer:"That doesn't exist.",
		mark:function(answer){return clamp(keyword(answer,["Ph7","no","doesn't","exist","such","thing"],4,1)-keyword(answer,["0","2","3","4","5","6","8","9"]),2)},
		par: 60
	},
	{
		text:"Recite the national anthem of <i>OMCCDV</i>",
		level:4,
		type:"open",
		modelAnswer:"Hee! Maya hoo! Maya ha! Maya haha! MAYA HEE! MAYA HOO! MAYA HA! MAYA HAHA! MAYA HEE! MAYA HOO! MAYA HA! MAYA HAHA!",
		mark:function(answer){return clamp(keyword(answer,["maya"],1,1)+keyword(answer,["hee","hoo","ha"],3,1/3),2)},
		par: 50
	},
	{
		text:"Solve for x: 1,2,8,128,x",
		level:7,
		type:"open",
		modelAnswer:"All of the below:<br><div style=\"column-count=3\">32768<br>16384<br>5168<br>471</div>",
		mark:function(answer){return keyword(answer,["32768","16384","5168","471"],3,1)},
		par: 60
	},
	{
		text:"Discuss the advantages and disadvantages of the <i>this way: \"Acilange\"</i> system.",
		level:6,
		type:"open",
		modelAnswer:"It wastes cells. No advantages exist.",
		mark:function(answer){return keyword(answer,["cell"],1,1.5)+keyword(answer,["use","waste","squander"],1,1.5)},
		par: 60
	},
	{
		text:"Type exactly 256 characters here. You will be given marks based on how close you are to the requirement!",
		level:"A",
		type:"open",
		modelAnswer:"Medical ALERT! A dangerous intruder has been detected within the Ministry building. The intruder goes by 'Catnip' and it's an extremely powerful Plasmanian. It is currently located on floor 45014. You must evacuate the Ministry as fast as you feasibly can!",
		mark:function(answer){
			let error = Math.abs(answer.length-256)
			return Math.round(Math.max(0,4-Math.log(error+1)))
		},
		par:60
	},
	(()=>{
		let numbers = countTo(20).shuffle()
		let wins = ranint(4,10,true)
		return {
			text:"Luck tester - choose <b>"+numword(wins)+"</b>",
			type:"multiplechoice",
			level:"A",
			answers:multipleChoiceGenerator(numbers.slice(0,wins),wins,numbers.slice(wins),20-wins),
			markTransform:x=>x,
			par:60
		}
	})()
]