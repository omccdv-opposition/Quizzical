"use strict"
var functions_omccdv = {
  sixDigitRiddle: function() {
    let out = shuffle([0,1,2,3,4,5,6,7,8,9]).splice(0,6)
    while (out[0]==0) out = shuffle(out)
    return out
  }
}
var question_file_at_omccdv = [
  {
    text: "State the Red User's username.",
    advanced: false,
    modelAnswer: "ltunknowngt",
    mark: function(answer) {
      let marks = keyword(answer,["ltunknowngt"],1,1)-keyword(answer,["The Opposition","Marion"],1,1)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "State the Blue User's username.",
    advanced: false,
    modelAnswer: "The Opposition",
    mark: function(answer) {
      let marks = keyword(answer,["The Opposition"],1,1)-keyword(answer,["ltunknowngt","Marion"],1,1)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "State the first Cyan User's username.",
    advanced: false,
    modelAnswer: "Marion",
    mark: function(answer) {
      let marks = keyword(answer,["Marion"],1,1)-keyword(answer,["ltunknowngt","The Opposition"],1,1)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "State the date on which <i>OM Challenge Chart Edit version</i> was created.",
    advanced: false,
    modelAnswer: "2020-07-19",
    mark: function(answer) {
      let marks = keyword(answer,["2020","19"],2,2/3)+keyword(answer,["07","July"],1,2/3)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "On what date did the Opposition first find <i>OM Challenge Chart Official</i>?",
    advanced: true,
    modelAnswer: "2020-07-08",
    mark: function(answer) {
      let marks = keyword(answer,["2020","08"],2,2/3)+keyword(answer,["07","July"],1,2/3)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "What was the version number of the Anarchist Opposition Supercomputer when it was first added to 'OMCCAV No bug edition.'?",
    advanced: true,
    modelAnswer: "69.0",
    mark: function(answer) {
      return keyword(answer,["69","69.0"],2,1)
    },
    par: 10
  },
  {
    text: "List afterlifes 1-10 of the Afterlife Continuum.",
    advanced: false,
    modelAnswer: "Hell; heaven; the spirit world; the void; the OMCCCDV World; Nether; Tunnels Universe; THE Róth Unfe Wuniverse; Online Sequencer; The UMCCDV World",
    mark: function(answer) {
      let marks = keyword(answer,["Hell","Heaven","Spirit world","Void","Nether","Tunnels Universe","Online Sequencer","The UMCCDV World"],8,0.5)
                 +((keyword(answer,["The OMCCCDV World"],1,1)==1)?1:(keyword(answer,["OMCCCDV"],1,1)==1)?0.5:0)
                 +((keyword(answer,["THE Róth Unfe Wuniverse"],1,1)==1)?1:(keyword(answer,["Róth Unfe Wuniverse"],1,1)==1)?0.5:(keyword(answer,["Roth Unfe Wuniverse"],1,1)==1)?0.5:0)
      return clamp(marks,6)
    },
    par: 50
  },
  {
    text: "State the name of the Opposition's first 'real' incremental game.",
    advanced: false,
    modelAnswer: "Exotic Matter Dimensions",
    mark: function(answer) {
      return keyword(answer,["Exotic Matter Dimensions"],1,1)
    },
    par: 15
  },
  {
    text: "State the sheet which was vandalized by the Opposition and ltunknowngt the day after the creation of the original OMCCDV World.",
    advanced: false,
    modelAnswer: "Electricity basics",
    mark: function(answer) {
      return keyword(answer,["Electricity basics"],1,1)
    },
    par: 15
  },
  {
    text: "State the title, artist, album and release year of the very first 'meme song'.",
    advanced: true,
    modelAnswer: "O-Zone - Dragostea Din Tei - Dragostea Din Tei (W&W Remix) - 2003",
    mark: function(answer) {
      return keyword(answer,["O-Zone"],1,1)
            +keyword(answer,["Dragostea Din Tei"],1,1)
            +keyword(answer,["Dragostea Din Tei (W&W Remix)"],1,1)
            +keyword(answer,["2003"],1,1)
    },
    par: 35
  },
  {
    text: "State the title, artist, album and release year of the first 'meme song' which originated from the Junior Eurovision Song Contest.",
    advanced: true,
    modelAnswer: "Enzo - Tic Tac - Tic Tac (L'album) - 2021",
    mark: function(answer) {
      return keyword(answer,["Enzo"],1,1)
            +keyword(answer,["Tic Tac"],1,1)
            +keyword(answer,["Tic Tac (L'album)"],1,1)
            +keyword(answer,["2021"],1,1)
    },
    par: 35
  },
  {
    text: "State the title, artist, album and release year of the first 'meme song' which has been remixed by <i>Sheet Music Boss</i>, but is not itself a remix.",
    advanced: true,
    modelAnswer: "Boney M. - Rasputin - Nightflight to Venus - 1978",
    mark: function(answer) {
      return keyword(answer,["Boney M."],1,1)
            +keyword(answer,["Rasputin"],1,1)
            +keyword(answer,["Nightflight to Venus"],1,1)
            +keyword(answer,["1978"],1,1)
    },
    par: 35
  },
  {
    text: "State the names of the Greek letters after which three adjacent <i>OMCCAV No bug edition.</i> sheets were named.",
    advanced: false,
    modelAnswer: "Epsilon; Psi; Omega",
    mark: function(answer) {
      let marks = keyword(answer,["epsilon","psi","omega"],3,1)-keyword(answer,["alpha","beta","gamma","delta","zeta","eta","theta","iota","kappa","lambda","mu","nu","xi","omicron","pi","rho","sigma","tau","upsilon","phi","chi"],"u",1)
      return clamp(marks,3)
    },
    par: 20
  },
  {
    text: "State the incantations of the first four spells to be introduced.",
    advanced: false,
    modelAnswer: "Avada Kedavra; Crucio; Imperio; Delirio",
    mark: function(answer) {
      return keyword(answer,["Avada Kedavra","Crucio","Imperio","Delirio"],4,1)
    },
    par: 20
  },
  {
    text: "State the original name of 'ÒMCCDV IIÍ'.",
    advanced: false,
    modelAnswer: "Java",
    mark: function(answer) {
      return keyword(answer,["Java"],1,1)
    },
    par: 10
  },
  {
    text: "State the index that Lua error 'Pou1' was briefly reassigned to from 'Pou' before receiving its current index.",
    advanced: true,
    modelAnswer: "335",
    mark: function(answer) {
      return (answer==335)?1:0
    },
    par: 10
  },
  {
    text: "State the index that Lua error 'Pou2' was briefly reassigned to from 'Pou_TooMuchBacon' before receiving its current index.",
    advanced: true,
    modelAnswer: "336",
    mark: function(answer) {
      return (answer==336)?1:0
    },
    par: 10
  },
  {
    text: "State the number of questions that this quiz has.",
    advanced: true,
    modelAnswer: function() {return eval("question_file_at_omccdv.length")},
    mark: function(answer) {
      return (answer==eval("question_file_at_omccdv.length"))?1:0
    },
    par: 10
  },
  {
    text: "State:<br>a) the number of entries in Marion's table of sweets<br>b) the three classifications within it.",
    advanced: false,
    modelAnswer: "a) 8<br>b) Liquid; Solid; Semi-Solid",
    mark: function(answer) {
      let marks = keyword(answer,["8","eight"],1,1)-keyword(answer,["1","2","3","4","5","6","7","9","10","one","two","three","four","five","six","seven","nine","ten"],"u",1)
                 +keyword(answer,["Liquid","Solid","Semi-Solid"],3,1)
      return clamp(marks,4)
    },
    par: 25
  },
  {
    text: "List the seven classifications in the Opposition's table of EMD features. <span style=\"color:#ffff00\">(Special characters: for Greek letters, type the name of the letter instead of its symbol, for instance 'lowercase-alpha' instead of 'α')</span>",
    advanced: false,
    modelAnswer: "Layer 0; Stardust; Wormhole; Spacetime; Layer ω; Unplayable; Rejected",
    mark: function(answer) {
      return keyword(answer,["Layer 0","Stardust","Wormhole","Spacetime","Unplayable","Rejected"],6,1)+keyword(answer,["Layer ω","Layer lowercase-omega"],1,1)
    },
    par: 45
  },
  {
    text: "State the name and index of the first track composed by the Opposition which appears in 'It's our favorites II'.",
    advanced: true,
    modelAnswer: "2965891 - Old Adversary",
    mark: function(answer) {
      let marks = 0.5+keyword(answer,["2965891","Old Adversary"],2,1)-keyword(answer,["2947240","Temple of the Twelve","2954560","Royal Parade","2991409","Safe House","3009411","Origin"],"u",0.5)
      return clamp(marks,2)
    },
    par: 15
  },
  {
    text: "List 20 locations from the old OMCCDV World (includes: 'The OMCCDV World', 'ltunknowngt's Continent', 'Marion's Island').",
    advanced: true,
    modelAnswer: function() {
      let locations = ["Wizard Tower","Magical Forest","Frigid Town","Wheatlands","Ghostly Palace","Primrose Plains","Olympe Crater","Olympe Mountain","Olympe Desert","Ministry of Anarchy","Flower Forest","Poopy Swamp","Anarchy City","Anarchy Beach","Mount Hoth","Azerbaijan","Snowland","Frosty Circle","Prismatic Ocean","Quirky Ocean","Link Center","Frigid Circle","Iceland","Azkaban","The Sky","Tropical Cyclone","Fat Domain","Interdimensional Network","Ancient Ruins","Poisoned Sea","Toxic Sea","Teleporters","The Evil Opposition","Message","Omdinal Barkup","House","Farm","Red Death","Prison","Trophy","Death Ray","No","Dezev Castle","Azerbaij City","Mount Serv","Mad Desert","Serv Garden","Forest of Green","House of Reinhardt","Hog Laundromat","Forest of Acid","Tower of Aziv","Swamplands","Filetmign Volcano","Throw-up Island","What's that octopus? Loadsamoney!","Polaroid Island"]
      locations = shuffle(locations)
      return locations.splice(0,25).join("; ")
    },
    mark: function(answer) {
      let marks = keyword(answer,["Wizard Tower","Magical Forest","Frigid Town","Wheatlands","Ghostly Palace","Primrose Plains","Olympe Crater","Olympe Mountain","Olympe Desert","Ministry of Anarchy","Flower Forest","Poopy Swamp","Anarchy City","Anarchy Beach","Mount Hoth","Azerbaijan","Snowland","Frosty Circle","Prismatic Ocean","Quirky Ocean","Link Center","Frigid Circle","Iceland","Azkaban","The Sky","Tropical Cyclone","Fat Domain","Interdimensional Network","Ancient Ruins","Poisoned Sea","Toxic Sea","Teleporters","The Evil Opposition","Message","Omdinal Barkup","House","Farm","Red Death","Prison","Trophy","Death Ray","No","Dezev Castle","Azerbaij City","Mount Serv","Mad Desert","Serv Garden","Forest of Green","House of Reinhardt","Hog Laundromat","Forest of Acid","Tower of Aziv","Swamplands","Filetmign Volcano","Throw-up Island","What's that octopus? Loadsamoney!","Polaroid Island"],30,1)**(Math.log(12)/Math.log(20))
      return clamp(marks,12)
    },
    par: 120
  },
  {
    text: "List 25 departments and offices from the old Ministry of Anarchy.",
    advanced: true,
    modelAnswer: function() {
      let locations = ["Office of the Lead Anarchist","Trial Hall","Department of Ministry Maintenance","Department of Gardening","Secret Department","Department of Cleaning","Department of Hierarchy","Insect Department","Department that actually relates to Ordinal Markup","Office of the Lead Terraformer","Department of Injustice","Department of Warion's extreme fatness","Department of Fatty McPatty Donald Trump","Smoking Parlor","Department of Protective Curses","Department of Computational Resources","Department of Magical Artifacts","Department of Dëæťh","Department of Jobs","Office of the Lead Cheater (who is nonexistent)","Department of Ridiculously Long Department Names that Nobody Will Ever Ever Like Because the Department Names are so Long","Department of Education","Department of Músique","Department of Balanga","Department of Lífë","Department of Cell Adventures","Department of Latin Square","Department of Wishology","Office of the Head of Magical Science","Ministry LABO","Office of the Vellumentalist","Vellumental Music Room","Classy Vellumental Music Room","Nonexistent Department","Office of the Googologist","Google LLC","Googol LLC","Office of the Head of Virtues","Hall of Beethoven","Department of Zip Points","Office of the Labourer","The Labour Party","Office of Jeremy Corbyn","Cleaning Cupboard","Department of Cleaners","Office of the Architech","Construction Plans","Office of the Secretist","Secret Departmnet","Office of the Slaves","Slave Trading Hall","Department of iwiHo","Office of the R I C K R O L L I F I E R","Department of Rickrolls","Department of Rick","Department of Astley","Rick's Bedroom (WTF is this doing in the Ministry?)","Astley's Bedroom (WTF is this doing in the Ministry?)","Office of the Terraformation Aide","Terraformation Aid","ActionAid","World Wildlife Fund","Oxfam","Charities Aid Foundation","Islamic Aid","Christian Aid","Office of the Control Freak","205G","Warning: If you are caught communicating with someone in 205G or looking in through the door, you will be severely sanctioned. Don't let it be you!","Faculty Room","Skool","Office of the I D L I F I E R","IDLE Lounge (fake)","IDLE Lounge (real)","IDLE Lounge (real and fake, but isn't)","Office of the Carrote Farmer","Carrote Farm","Office of the Rabbit Hunter","Armory","Rabbit Enclosure","Office of the Anti-Secretist","Anti-Secret Department","Office of the W3C CEO","Learn javascript","Office of the Incremental Game Dev","Incremental Development For Dummies: -205 G","Nonexistent Office","Office of the Sheet3597 Enforcer","Office of the Treasurer","Department of Investing","Department of Replacing Virtue with Monez","Department of Replacing the Head of Virtues with the Head of Monez","Treasury","Department of Monez Chess","Department of Monez Quarantine","Department of Appropriate Punishments for Stealing Monez","Department of Accounting","Department of Salaries","Office of the Polynomino Artist","Pentomino Puzzles","Office of the Flavor Text","Department of Comedy","Department of One-Liners","Department of Punchlines","Department of Educating Unfunny People","Office of the Definologomancoingist","Department of Named Ranges","Office of the Not-forbidden-but-you-really-ought-not-to-associate-with One","History Class","Office of the Pixel Painter","1R","Office of the Google CEO","Google Sheets","Office of the Cell Master","Link Center","Office of the Job Maker","Department of Making a Better job","Executive Balanga Floor","Office of the Ministry Manager","Office of the Vice Ministry Manager","Scaffolding Tower","Cafeteria","Public shower","Internet booth","Pet store","Forbidden Area","Delirius Chamber","Ministry Prison","Imperius Chamber","Death Chamber","Suicide Pit","10th Anarchy Trial","Cruciatus Chamber"]
      locations = shuffle(locations)
      return locations.splice(0,30).join("; ")
    },
    mark: function(answer) {
      let marks = keyword(answer,["Office of the Lead Anarchist","Trial Hall","Department of Ministry Maintenance","Department of Gardening","Secret Department","Department of Cleaning","Department of Hierarchy","Insect Department","Department that actually relates to Ordinal Markup","Office of the Lead Terraformer","Department of Injustice","Department of Warion's extreme fatness","Department of Fatty McPatty Donald Trump","Smoking Parlor","Department of Protective Curses","Department of Computational Resources","Department of Magical Artifacts","Department of Dëæťh","Department of Jobs","Office of the Lead Cheater (who is nonexistent)","Department of Ridiculously Long Department Names that Nobody Will Ever Ever Like Because the Department Names are so Long","Department of Education","Department of Músique","Department of Balanga","Department of Lífë","Department of Cell Adventures","Department of Latin Square","Department of Wishology","Office of the Head of Magical Science","Ministry LABO","Office of the Vellumentalist","Vellumental Music Room","Classy Vellumental Music Room","Nonexistent Department","Office of the Googologist","Google LLC","Googol LLC","Office of the Head of Virtues","Hall of Beethoven","Department of Zip Points","Office of the Labourer","The Labour Party","Office of Jeremy Corbyn","Cleaning Cupboard","Department of Cleaners","Office of the Architech","Construction Plans","Office of the Secretist","Secret Departmnet","Office of the Slaves","Slave Trading Hall","Department of iwiHo","Office of the R I C K R O L L I F I E R","Department of Rickrolls","Department of Rick","Department of Astley","Rick's Bedroom (WTF is this doing in the Ministry?)","Astley's Bedroom (WTF is this doing in the Ministry?)","Office of the Terraformation Aide","Terraformation Aid","ActionAid","World Wildlife Fund","Oxfam","Charities Aid Foundation","Islamic Aid","Christian Aid","Office of the Control Freak","205G","Warning: If you are caught communicating with someone in 205G or looking in through the door, you will be severely sanctioned. Don't let it be you!","Faculty Room","Skool","Office of the I D L I F I E R","IDLE Lounge (fake)","IDLE Lounge (real)","IDLE Lounge (real and fake, but isn't)","Office of the Carrote Farmer","Carrote Farm","Office of the Rabbit Hunter","Armory","Rabbit Enclosure","Office of the Anti-Secretist","Anti-Secret Department","Office of the W3C CEO","Learn javascript","Office of the Incremental Game Dev","Incremental Development For Dummies: -205 G","Nonexistent Office","Office of the Sheet3597 Enforcer","Office of the Treasurer","Department of Investing","Department of Replacing Virtue with Monez","Department of Replacing the Head of Virtues with the Head of Monez","Treasury","Department of Monez Chess","Department of Monez Quarantine","Department of Appropriate Punishments for Stealing Monez","Department of Accounting","Department of Salaries","Office of the Polynomino Artist","Pentomino Puzzles","Office of the Flavor Text","Department of Comedy","Department of One-Liners","Department of Punchlines","Department of Educating Unfunny People","Office of the Definologomancoingist","Department of Named Ranges","Office of the Not-forbidden-but-you-really-ought-not-to-associate-with One","History Class","Office of the Pixel Painter","1R","Office of the Google CEO","Google Sheets","Office of the Cell Master","Link Center","Office of the Job Maker","Department of Making a Better job","Executive Balanga Floor","Office of the Ministry Manager","Office of the Vice Ministry Manager","Scaffolding Tower","Cafeteria","Public shower","Internet booth","Pet store","Forbidden Area","Delirius Chamber","Ministry Prison","Imperius Chamber","Death Chamber","Suicide Pit","10th Anarchy Trial","Cruciatus Chamber"],25,1)**(Math.log(15)/Math.log(25))
      return clamp(marks,20)
    },
    par: 300
  },
  {
    text: "List the ten 'base colors' of Google Sheets.",
    advanced: true,
    modelAnswer: "Red berry; red; orange; yellow; green; cyan; cornflower blue; blue; purple; magenta",
    mark: function(answer) {
      let marks = keyword(answer,["red berry","red","orange","yellow","green","cyan","cornflower blue","blue","purple","magenta"],10,0.5)
      return clamp(marks,5)
    },
    par: 50
  },
  {
    text: "State the number of times a year that Annuation occurs.",
    advanced: false,
    modelAnswer: "1",
    mark: function(answer) {
      return (answer=="1"||answer.toLowerCase()=="one")?1:0
    },
    par: 10
  },
  {
    text: "State the number of Tunnels cycles in each year.",
    advanced: false,
    modelAnswer: "2",
    mark: function(answer) {
      return (answer=="2"||answer.toLowerCase()=="two")?1:0
    },
    par: 10
  },
  {
    text: "What does the =SHEETNUMBER() function do?",
    advanced: false,
    modelAnswer: "It returns the position of the sheet it is used in.",
    mark: function(answer) {
      let marks = keyword(answer,["position","sheet"],2,1)
                 +keyword(answer,["current","in"],1,1)
      return clamp(marks,3)
    },
    par: 30
  },
  {
    text: "List the four modes of the Anarchist Opposition Supercomputer.",
    advanced: false,
    modelAnswer: "Opposition mode; make-up mode; angry mother-in-law mode; exception error",
    mark: function(answer) {
      return keyword(answer,["opposition","exception error"],2,1)
            +keyword(answer,["make-up","makeup","make up"],1,1)
            +keyword(answer,["mother-in-law","mother in law"],1,1)
    },
    par: 40
  },
  {
    text: "List the seven objects that the Anarchist Opposition Supercomputer stores data dumps about. <p style=\"color:#ffff00\">(Special characters: for diacritics type the name of the respective normal letter, for example 'e' instead of 'é')</p>",
    advanced: false,
    modelAnswer: "Marion; ltunknowngt; itself; Luigin; Warion; Death; the dumpster behind Walmart",
    mark: function(answer) {
      return keyword(answer,["Marion","ltunknowngt","Luigin","Warion","dumpster behind Walmart"],5,1)
            +keyword(answer,["myself","itself","the Opposition","the Anarchist Opposition Supercomputer"],1,1)
            +keyword(answer,["Death","Deat'h","Dëæťh","Déæth"],1,1)
    },
    par: 50
  },
  {
    text: "State the overrated topic which was banned by Sheet101 of OMCCDV V.",
    advanced: false,
    modelAnswer: "Pou",
    mark: function(answer) {
      return keyword(answer,["Pou"],1,1)
    },
    par: 10
  },
  {
    text: "State the species of the three protagonists of <i>OMCCDV Origins</i>.",
    advanced: false,
    modelAnswer: "Marionians; plasmanians; french fries",
    mark: function(answer) {
      return keyword(answer,["Marionian","plasmanian","french fr"],3,1)
    },
    par: 25
  },
  {
    text: "State the length in digits of a Galactic ID number.",
    advanced: false,
    modelAnswer: "128",
    mark: function(answer) {
      return (answer=="128"||answer.toLowerCase()=="one hundred and twenty-eight")?1:0
    },
    par: 10
  },
  {
    text: "State the longest possible IDLE duration.",
    advanced: false,
    modelAnswer: "Infinite mintues",
    mark: function(answer) {
      return keyword(answer,["infinity","infinite","eternity","eternal","forever"],1,2)
    },
    par: 20
  },
  {
    text: "Quote the wisdom that the Talking Parrot in the aviary in the middle of nowhere imparts upon travelers for 20,000,000,000,000,000 Anarchy Dollars.",
    advanced: false,
    modelAnswer: "There was an old man of Dunrose;<br>A parrot seized hold of his nose.<br>When he grew melancholy,<br>They said, 'His name's Polly',<br>Which soothed that old man of Dunrose.<br>Thank you for your donation!",
    mark: function(answer) {
      let marks = Math.floor(keyword(answer,["There","was","an","old","man","of","Dunrose"],7,1/7))
                 +Math.floor(keyword(answer,["A","parrot","seized","hold","of","his","nose"],7,1/7))
                 +Math.floor(keyword(answer,["When","he","grew","melancholy"],4,0.25))
                 +Math.floor(keyword(answer,["They","said","His","name's","Polly"],5,0.2))
                 +Math.floor(keyword(answer,["Which","soothed","that","old","man","of","Dunrose"],7,1/7))
                 +Math.floor(keyword(answer,["Thank","you","for","your","donation"],5,0.2))
      return clamp(marks,6)
    },
    par: 75
  },
  {
    text: "State the integer which is equal to 1/3.",
    advanced: false,
    modelAnswer: "...6666666666667",
    mark: function(answer) {
      return Math.floor(keyword(answer,["...","666","7"],3,1/3))-keyword(answer,["77"],1,1)
    },
    par: 20
  },
  {
    text: "State the number of documents are in <i>Documents made by rxtge</i>.",
    advanced: false,
    modelAnswer: "1",
    mark: function(answer) {
      return (answer=="1"||answer.toLowerCase()=="one")?1:0
    },
    par: 10
  },
  {
    text: "If spell 1 is Crucio and spell 2 is Crusio, state the value of spell 3.",
    advanced: false,
    modelAnswer: "Crukio",
    mark: function(answer) {
      return keyword(answer,["Crukio"],1,1)
    },
    par: 15
  },
  {
    text: "List the 78 gifts that Marion received during the twelfth day of <i>12 Days of Christmas: Marion's Version</i>.",
    advanced: false,
    modelAnswer: `<div style=\"column-count:2\">12 Words
                  <br>And 11 Cells with texts
                  <br>And 10 Move
                  <br>And 9 Mirrors
                  <br>And 8 Guards
                  <br>And 7 Security QUARANTINE
                  <br>And 6 Confusing cells
                  <br>And 5 Colored cells
                  <br>And 4 Timers
                  <br>And 3 Death rays
                  <br>And 2 Math questions
                  <br>And 1 Link</div>`,
    mark: function(answer) {
      let marks = keyword(answer,["words","cells with texts","move","mirrors","guards","security quarantine","confusing cells","colored cells","timers","death rays","math questions","link"],12,0.375)
                 +keyword(answer,["12 words","11 cells with texts","10 move","9 mirrors","8 guards","7 security quarantine","6 confusing cells","5 colored cells","4 timers","3 death rays","2 math questions","1 link"],12,0.375)
                 -keyword(answer,["moves","security quarantines","links"],"u",0.75)
      return clamp(marks,9)
    },
    par: 90
  },
  {
    text: "List the items for sale in <i>A room for a tired people</i> and their prices.",
    advanced: false,
    modelAnswer: "Energy Flavored Zesty Bar ($0.69); Zesty Flavored Energy Bar ($0.96); B-Soda ($0.49); Wasp Soda (1 stinger); OppositioSoda (Ew! Why would you drink that?); ltunknowngt item (ltunknowngt price)",
    mark: function(answer) {
      let item_mark = keyword(answer,["Energy Flavored Zesty Bar","Zesty Flavored Energy Bar","B-Soda","Wasp Soda","Oppositio Soda","ltunknowngt item"],6,1)
      let price_mark = keyword(answer,["$0.69","$0.96","$0.49","1 stinger","Ew! Why would you drink that?","ltunknowngt price"],6,1)
      return clamp(2*(Math.sqrt(0.25+item_mark)+Math.sqrt(0.25+price_mark)-1),8)
    },
    par: 80
  },
  {
    text: "In <i>Learn your ABCs with Warion!</i>, Q stands for: ",
    advanced: false,
    modelAnswer: "Q \"QUE BUENO. ESE ESPAGUETI BUENO.\"",
    mark: function(answer) {
      let marks = keyword(answer,["Q","for"],2,0.5)+keyword(answer,["QUE BUENO","ESE ESPAGUETI BUENO"],2,1)+keyword(answer,["\"","'"],1,1)
      return clamp(marks,4)
    },
    par: 25
  },
  {
    text: "The <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#ffff00\">light bulb</span> is one of the objects in the <i>Objects</i> sheet. State the other three.",
    advanced: false,
    modelAnswer: "The <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#0000ff\">rubber band</span>, the <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#314c59\">stapler</span> and the <span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#ff0000\">idl</span><span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#0000ff\">eat</span><span style=\"font-family:'Verdana';font-size:18px;font-weight:700;color:#00ffff\">or</span>",
    mark: function(answer) {
      return keyword(answer,["rubber band","stapler","idleator"],3,1)
    },
    par: 25
  },
  {
    num: ranint(1,9,true),
    text: function() {return "Solve for x: "+this.num+"+1: x"},
    advanced: false,
    modelAnswer: function() {return String(this.num)},
    mark: function(answer) {
      return answer==this.modelAnswer()?1:0
    },
    par: 10
  },
  {
    text: "State the value beyond which the terraforming percentage of the old OMCCDV World never increased.",
    advanced: false,
    modelAnswer: "60%",
    mark: function(answer) {
      return keyword(answer,["60","%"],2,1)
    },
    par: 10
  },
  {
    text: "Quote Chirp's pronunciation of <i>OMCCDV World</i>.",
    advanced: false,
    modelAnswer: "OH-EM-CEE-CEE-DIVE-E World",
    mark: function(answer) {
      let terms = answer.split("-")
      if (terms.length !== 6) return 0
      let marks = 0
      for (let i=0;i<6;i++) if (terms[i]==["OH","EM","CEE","CEE","DIVE","E world"][i]) marks+=2/3
      return clamp(marks,4)
    },
    par: 25
  },
  {
    text: "State the radius of the <i>Interdimensional Network</i> portal leading to the Interdimensional Network itself.",
    advanced: false,
    modelAnswer: "14 cells",
    mark: function(answer) {
      let marks = keyword(answer,["14","fourteen"],1,1)+keyword(answer,["cells"],1,1)
                 -keyword(answer,["2","3","5","6","7","8","9","10","11","12","13","15","16","one","two","three","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen"],"u",1)
      return clamp(marks,2)
    },
    par: 15
  },
  {
    base: ranint(8,16,true),
    exp2: ranint(1,4,true),
    exp1: ranint(1,6,true),
    exp0: ranint(1,8,true),
    text: function() {return "State the number of successor clicks needed to reach the ordinal ω²"+(this.exp2==1?"":this.exp2)+"+ω"+(this.exp1==1?"":this.exp1)+"+"+this.exp0+"["+this.base+"] in <i>Ordinal Markup</i>."},
    advanced: true,
    modelAnswer: function() {return this.exp2*this.base**2+this.exp1*this.base+this.exp0},
    mark: function(answer) {
      if (answer==this.modelAnswer()) return 2
      if (answer==this.exp2*100+this.exp1*10+this.exp0) return 1
      return 0
    },
    par: 40
  },
  {
    text: "Which <i>Crowded Apartment</i> contains people locked in a dark closet?",
    advanced: false,
    modelAnswer: "All of them",
    mark: function(answer) {
      let marks = keyword(answer,["all"],1,2)+keyword(answer,["ltunknowngt","Opposition","Marion"],3,1/3)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "Prove that 1969-07-20 + 2020-07-19 is not defined, using as many examples as possible.",
    advanced: true,
    modelAnswer: `Arithmetic: 1969-07-20 + 2020-07+19 = 3936
                  <br>Date addition: 1969-07-20 + 2020-07+19 = 2090-02-06;
                  <br>Lunar arithmetic: 1969-07-20 + 2020-07+19 = 2919
                  <br>ij = -ji arithmetic: 1969-07-20 + 2020-07+19 = -(2020-07-19 + 1969-07-20) -3936
                  <br>String arithmetic: 1969-07-20 + 2020-07+19 = \"1969-07-20  2020-07-19\"
                  <br>Also string arithmetic: 1969-07-20 + 2020-07+19 = 1942+1994
                  <br>As arithmetic operations cannot be multivalued, 1969-07-20 + 2020-07-19 cannot be defined.`,
    mark: function(answer) {
      let marks = keyword(answer,["3936","2090-02-06","2919","-3936","multivalued"],5,1)
                 +keyword(answer,["1969-07-20","2020-07-19","1942","1994"],4,0.5)
                 +keyword(answer,["date","lunar","-ji","quaternion","string"],4,1)
      return clamp(marks,8)
    },
    par: 80
  },
  {
    text: "How long does All new machine works",
    advanced: true,
    modelAnswer: "\"5 years\" - Marion<br>\"No one knows.\" - Reality",
    mark: function(answer) {
      return 100
    },
    par: 600
  },
  {
    text: "Which of these species came first?, A: Prokaryotes, B: Eukaryotes",
    advanced: true,
    modelAnswer: "Neither are a species.",
    mark: function(answer) {
      return keyword(answer,["neither","none"],1,1)
    },
    par: 20
  },
  {
    text: "List 8 common trophies.",
    advanced: false,
    modelAnswer: "The first one's always free<br>The second one isn't so free<br>The third one's actually quite expensive<br>The fourth one's overpriced<br>Abrakazaam!<br>Azkaban!<br>Azerbaijan!<br>Alacalaban!",
    mark: function(answer) {
      return keyword(answer,["The first one's always free","The second one isn't so free","Community Service","Making cash","Making MORE cash","Workaholic","Polyglot","Proof of Good Deed","Proof of Evil Deed","Pixel Painter","Pumped","IT'S FREAKING OVERFLOWING!","Journalist","Multidimensional","Graham","Rayo","Shameless","Professional Hacker","1488715699 666","Blackmail","Rickroll'd","Trickster","Sisyphean Labor","Kidnapped","Kidnapper","Grand Balance","Evil","The Egregious Earthshaker","Paprikamint","Job Stealer","The third one's actually quite expensive","IT'S FREAKING AUGUST! Oh wait, it's now November","IT'S FREAKING COLD!","Abrakazaam!","Azkaban!","Azerbaijan!","Alacalaban!","Spooky!","Neighborhood Yin","Neighborhood Yang","Are you sure?","The fourth one's overpriced","78-hour days","IT'S ACTUALLY FREAKING OVERFLOWING!","How are you even here?","Grand Unbalance","President","Just stop","I am IDLE, yes I am!","Warping the Terre","Hyperpolyglot","IT'S FREAKING VANDALISED!","Short bedtime story, huh?","Overly long paragraph","You are now the Air Vellumental","I want to be the Magnanimity","Architectural Progression","Controversial","Get out of my secretistically secretive secret lab!","Yum-yum-yum in my tum!"],8,1)
    },
    par: 50
  },
  {
    text: "State the contents of 'H500'!H500 of <i>OMCCDV II</i>.",
    advanced: false,
    modelAnswer: "<span style=\"color:#00ffff;font-family:'Verdana';font-size:18px\">I am <span style=\"color:rgba(0,0,0,0);font-size:1px\">not</span> IDLE, yes I am!</span>",
    mark: function(answer) {
      let marks = keyword(answer,["I am ","IDLE, yes I am!"],2,0.5)+keyword(answer,["not"],1,1)
      return clamp(marks,2)
    },
    par: 20
  },
  {
    text: "How many <u>less</u> locations does <i>aaaaaas continent (extremely simplified)</i> have than <i>ltunknowngt's Continent</i>? Show your working.",
    advanced: false,
    modelAnswer: "18 - 11 = 7",
    mark: function(answer) {
      let marks = keyword(answer,["18","-","11","="],4,0.25)+keyword(answer,["7"],1,1)
      return clamp(marks,2)
    },
    par: 45
  },
  {
    text: "A civilization of gaseous black creatures found in the OMCCDV Universe is known as the Plasmanian civilization. What were Plasmanians called before receiving their current name?",
    advanced: false,
    modelAnswer: "Voidfaces",
    mark: function(answer) {
      return keyword(answer,["Voidface"],1,1)
    },
    par: 15
  },
  {
    text: "Complete the following quote:<br>\"I know your type, tall, dark and dead<br>___ ____ __ ____ ___ ___ ______ ___ __ __ ____<br>___ ____ ___ ___ ______ __<br>___ ___ ___ _______ __ ____<br><br>___ ____ _ _________ ___ ___<br>__ _____ __ ______ ________<br>___ ____ ___ _____ __ ______<br>__ _____ ____ _______",
    advanced: true,
    modelAnswer:"You want to bite all the petals off of my head<br>And then eat the brains of<br>The one who planted me here<br>I'm just a sunflower but see<br>Me power an entire infantry<br>You like the taste of brains<br>We don't like zombies",
    mark: function(answer) {
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
    text: "Complete the following quote:<br>\"I know your type: Tall, Dark and <span style=\"font-size:48px\">DEAD</span>,<br>___ ____ __ ____ __ ______ ___ __ __ ____,<br>___ ____ ___ ___ ___ __<br>___ ____ _______ __ ____<br><br>___ ___ _ _________ ___ ___<br>__ ______ ______-_______,<br>___ ____ ___ _____ __ ______<br>__ _____ ____ _______",
    advanced: true,
    modelAnswer:"you want to bite my petals out of my head<br>and then eat the bre of<br>who ever planted me here<br>I'm just a sunflower but see<br>me spread entire infatry<br>you like the taste of brains<br>we don't like zombies",
    mark: function(answer) {
      let marks = Math.floor(keyword(answer,["you","want","to","bite","my","petals","out","of","my","head"],10,0.4))
                 +Math.floor(keyword(answer,["and","then","eat","the","bre","of"],6,1/3))
                 +Math.floor(keyword(answer,["who","ever","planted","me","here"],5,0.4))
                 +Math.floor(keyword(answer,["I'm","just","a","sunflower","but","see"],6,1/3))
                 +Math.floor(keyword(answer,["me","power","entire","infatry"],4,0.5))
                 +Math.floor(keyword(answer,["you","like","the","taste","of","brains"],6,1/3))
                 +Math.floor(keyword(answer,["we","don't","like","zombies"],4,0.5))
      return clamp(marks/2,8)
    },
    par: 100
  },
  {
    text: "I beat but I don't eat, and I have hands but not feet.",
    advanced: false,
    modelAnswer: "A clock.",
    mark: function(answer) {
      return keyword(answer,["clock"],1,1)
    },
    par: 15
  },
  {
    text: "There are eleven planets in the Planet 0 system. List their names.",
    advanced: false,
    modelAnswer: "Planet 0, Planet 1, Planet 2, Planet 3, Planet 4, Invisible Ghostly Planet 5, Planet 6, Planet 7, Planet 8, Planet 9 and Planet 10.",
    mark: function(answer) {
      let marks = keyword(answer,["Planet 1","Planet 2","Planet 3","Planet 4","Planet 6","Planet 7","Planet 8","Planet 9","Planet 10"],9,1/3)
                 +keyword(answer,["Planet 0","Invisible Ghostly Planet 5"],2,1)
                 -keyword(answer,["Planet 11"],1,2)
      return clamp(marks,5)
    },
    par: 50
  },
  {
    text: "State the name of the first cell adventure.",
    advanced: false,
    modelAnswer: "Cell adventure (fake)",
    mark: function(answer) {
      return keyword(answer,["Cell adventure","(fake)"],2,1)
    },
    par: 15
  },
  {
    text: "Complete the quote: \"THIS IS NOT A SHEET.<br>____ __ _ _____ ______.<br>____ __ _ _____ __ ______.<br>____ __ _______ ___ _ ______ __ ___ _______.<br>____ __...<br>_______ _____ ____.\"",
    advanced: false,
    modelAnswer: "THIS IS A BLACK CANVAS.<br>THIS IS A BLANK TV SCREEN.<br>THIS IS TOTALLY NOT A RIPOFF OF VUE CINEMAS.<br>THIS IS...<br>ANOTHER GIANT TURD.",
    mark: function(answer) {
      let marks = keyword(answer,["THIS IS A BLACK CANVAS","THIS IS A BLANK TV SCREEN","THIS IS","ANOTHER GIANT TURD"],4,1)
                 +keyword(answer,["THIS","IS","TOTALLY","NOT","A","RIPOFF","OF","VUE","CINEMAS"],9,2/9)
      return clamp(marks,6)
    },
    par: 60
  },
  {
    text: "\"ROYGBIV? More like URCLMOK\" - ltunknowngt<br>Expand both acronyms.",
    advanced: false,
    modelAnswer: "Red, orange, yellow, green, blue, indigo, violet<br>ltunknowngt, Run away, Con, Luigin, Marion, The Opposition, THE ORIGAMI KINGH",
    mark: function(answer) {
      let color_mark = keyword(answer,["red","orange","yello","green","blue","indigo","violet"],7,1)**2/14
      let user_mark = keyword(answer,["ltunknowngt","Run away","Con","Luigin","Marion","Opposition","ORIGAMI KINGH"],7,1)**2/14
      return clamp(color_mark+user_mark,7)
    },
    par: 90
  },
  {
    num: functions_omccdv.sixDigitRiddle(),
    combinations: [[1,2],[1,3],[1,4],[1,5],[1,6],[2,3],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],[4,5],[4,6],[5,6]],
    text: function() {
      let out = "I am a number with six digits.<br>"
      out += "<div style=\"column-count:3\">"+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => "The sum of my digits "+this.combinations[i][0]+" and "+this.combinations[i][1]+" is "+(this.num[this.combinations[i][0]-1]+this.num[this.combinations[i][1]-1])).join("<br>")+"</div>"
      out += "<br>The difference between my largest and smallest digit is "+(this.num.reduce((x,y) => Math.max(x,y))-this.num.reduce((x,y) => Math.min(x,y)))+", none of my digits repeat. Evaluate me."
      return out
    },
    advanced: true,
    modelAnswer: function() {
      return [0,1,2,3,4,5].map(x => String(this.num[x])).join("")
    },
    mark: function(answer) {
      answer = String(answer)
      if (answer.length !== 6) return 0
      let marks = 0
      for (let i=0;i<6;i++) if (answer.substr(i,1)==this.num[i]) marks++
      return marks
    },
    par: 240
  },
  {
    num: functions_omccdv.sixDigitRiddle(),
    combinations: [[1,2],[1,3],[1,4],[1,5],[1,6],[2,3],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6],[4,5],[4,6],[5,6]],
    text: function() {
      let out = "I am a number with six digits.<br>"
      out += "<div style=\"column-count:3\">"+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => "The product of my digits "+this.combinations[i][0]+" and "+this.combinations[i][1]+" is "+(this.num[this.combinations[i][0]-1]*this.num[this.combinations[i][1]-1])).join("<br>")+"</div>"
      out += "<br>The difference between my largest and smallest digit is "+(this.num.reduce((x,y) => Math.max(x,y))-this.num.reduce((x,y) => Math.min(x,y)))+", none of my digits repeat. Evaluate me."
      return out
    },
    advanced: true,
    modelAnswer: function() {
      return [0,1,2,3,4,5].map(x => String(this.num[x])).join("")
    },
    mark: function(answer) {
      answer = String(answer)
      if (answer.length !== 6) return 0
      let marks = 0
      for (let i=0;i<6;i++) if (answer.substr(i,1)==this.num[i]) marks++
      return marks
    },
    par: 240
  },
  {
    text: "Translate \"alphabet\" to the Latin Square language.",
    advanced: false,
    modelAnswer: "ZKOGZADS",
    mark: function(answer) {
      return keyword(answer,["zkogzads"],1,1)-keyword(answer,["akohabes"],1,-3)
    },
    par: 30
  },
  {
    text: "State the cell adventure which is also known as <i>CS1685</i>.",
    advanced: false,
    modelAnswer: "LS Adventure",
    mark: function(answer) {
      let marks = keyword(answer,["LS","Latin Square","Adventure"],2,0.5)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "Substitute <span>X</span> and <span>Y</span> for the correct missing sections of the quote: \"Magical forest:*Dissapears In just 333ms*<br>Magical forest:*Appears In just 333ms*<br>Magical forest:*Dissapears In just 333ms*<br>Magical forest:*Appears In just 333ms<br><span>X<br>Y</span>*",
    advanced: false,
    modelAnswer: "Magical forest:*Dissapears In just 333ms*<br>Magical forest:*Appears In just 333ms*",
    mark: function(answer) {
      return keyword(answer,["Magical forest:","Dissapears In just 333ms","Appears In just 333ms"],3,1)
    },
    par: 45
  },
  {
    text: "Sing:<br>a) <i>a lulubuy</i><br>b) the wake-up song.",
    advanced: false,
    modelAnswer: "a) Everybody everybody sleep sleep sleep, Lay your heads start sleeping now<br>WAKE UP NOW, ITS 10:00, YOUR SCHOOL IS AT 9:00, YOUR TEACHER IS MAD AT YOU, ITS 4:00, YOU JUST MISS YOU FAVORITE CARTOON, YOU  FELL ASLEEP AGAIN,  YOU WILL MISS SCHOOL IF YOU DO THAT",
    mark: function(answer) {
      let mark_a = keyword(answer,["everybody everybody","sleep sleep sleep,","lay your heads","start sleeping now"],4,1)**2/8
      let mark_b = keyword(answer,["WAKE UP NOW","ITS 10:00","YOUR SCHOOL IS AT 9:00","YOUR TEACHER IS MAD AT YOU","ITS 4:00","YOU JUST MISS YOU FAVORITE CARTOON","YOU  FELL ASLEEP AGAIN","YOU WILL MISS SCHOOL IF YOU DO THAT"],8,1)**2/16
      return clamp(mark_a+mark_b,6)
    },
    par: 60
  },
  {
    text: "Name all the Alphablocks.",
    advanced: true,
    modelAnswer: "Acrabuy, Berioayu, Caractu, Dickson, Ebaosy, Ffintelecble, Glesse, Huritolly, Intelecble, Jeance, Kefitzat Haderech, Lalll, Monolouiting, Notaboary, Opelucid, Popo, Quincanomers, Recket, Skators, Truncts, Uhhh, Vianspely, Witnes, Xiznahou, Yiuaua, Zeaughtment",
    mark: function(answer) {
      let names = answer.split(" ")
      let letters = Array(26).fill(0)
      for (let i=0;i<names.length;i++) letters[names[i].charCodeAt(0)-65]=1
      let marks = letters.reduce((x,y) => x+y)
      return clamp(marks**2*(7/676),7)
    },
    par: 100
  },
  {
    text: "If term 1 is 'sphere', term 2 is 'ellipsoid' and term 3 is 'paraboloid' calculate:<br>a) term 4<br>b) the function.",
    advanced: false,
    modelAnswer: "a) Hyperboloid<br>b) Triangular sphere",
    mark: function(answer) {
      return keyword(answer,["hyperboloid","triangular sphere"],2,1)
    },
    par: 30
  },
  {
    text: "Complete the quote: \"KALINA KALINA KALINA MAJA<br>___ ____ ___ ____ ___ ____ ____\"",
    advanced: false,
    modelAnswer: "DAJ WINA DAJ WINA DAJ WINA MAJA",
    mark: function(answer) {
      return keyword(answer,["DAJ WINA DAJ WINA DAJ WINA","MAJA"],2,1)
    },
    par: 20
  },
  {
    text: "If you jump 100 feet high on a trampoline, where will you land?",
    advanced: false,
    modelAnswer: "On the ground.",
    mark: function(answer) {
      let marks = keyword(answer,["ground","trampoline"],1,1)-keyword(answer,["hospital"],1,1)
      return clamp(marks,1)
    },
    par: 15
  },
  {
    text: "Add the missing vowels: <br>\"S s tht th Cncl Sttn n th dstnc? I rmmbr th Plsmnns llyng wth th tw thr glctc pwrs t mk t. Th Plsmnns, Mrnns nd Frnchfryns wr th thr mst pwrfl cvlztns f SPT0418-47 fr mllns f yrs, bt thn Plsmn ws dstryd nd th Mrnns stppd cmmnctng svrl mnths g.\"",
    advanced: true,
    modelAnswer: "So is that the Conical Station in the distance? I remember the Plasmanians allying with the tw other galactic powers to make it. The Plasmanians, Marionians and Frenchfryians were the three most powerful civilizations of SPT0418-47 for millions of years, but then Plasmania was destroyed and the Marionians stopped communicating several months ago.",
    mark: function(answer) {
      let marks = keyword(answer,["So","is","that","the","Conical","Station","in","the","distance?","I","remember","the","Plasmanians","allying","with","the","2","other","galactic","powers","to","make","it.","The","Plasmanians,","Marionians","and","Frenchfryians","were","the","3","most","powerful","civilizations","of","SPT0418-47","for","millions","of","years,","but","then","Plasmania","was","destroyed","and","the","Marionians","stopped","communicating","several","months","ago."],53,1/53)**3*8
      return clamp(marks,8)
    },
    par: 120
  },
  {
    text: function() {return "If capacity = "+ranint(69,138)+", calculate the number of <span style=\"font-family:'Verdana';font-size:18px;color:#4a86e8\">Ph1</span> needed to make a <span style=\"font-family:'Verdana';font-size:18px;color:#ff0000\">Ph7</span>, showing your working."},
    advanced: false,
    modelAnswer: "That doesn't exist.",
    mark: function(answer) {
      let marks = keyword(answer,["Ph7","not","doesn't","exist"],4,1)-keyword(answer,["0","1","2","3","4","5","6","7","8","9"],"u",1)
      return clamp(marks,2)
    },
    par: 60
  },
  {
    text: "Recite the national anthem of <i>OMCCDV</i>",
    advanced: false,
    modelAnswer: "Hee! Maya hoo! Maya ha! Maya haha! MAYA HEE! MAYA HOO! MAYA HA! MAYA HAHA! MAYA HEE! MAYA HOO! MAYA HA! MAYA HAHA!",
    mark: function(answer) {
      let marks = keyword(answer,["maya"],1,1)+keyword(answer,["hee","hoo","ha"],3,1/3)
      return clamp(marks,2)
    },
    par: 50
  },
  {
    text: "Solve for x: 1,2,8,128,x",
    advanced: false,
    modelAnswer: "All of the below:<br><div style=\"column-count=3\">32768<br>16384<br>5168<br>471</div>",
    mark: function(answer) {
      return keyword(answer,["32768","16384","5168","471"],"u",1)
    },
    par: 60
  },
  {
    text: "Discuss the advantages of the <i>this way: \"Acilange\"</i> system.",
    advanced: false,
    modelAnswer: "It wastes cells.",
    mark: function(answer) {
      return keyword(answer,["cell"],1,1)+keyword(answer,["use","waste","squander"],1,1)
    },
    par: 60
  },
]