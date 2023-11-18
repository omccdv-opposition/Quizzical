"use strict"
const resources_gcse_comp_sci = {
	CPULanguageGapfillGenerator:function(array,gaps){
		let processedArray = array.map((x,i) => (typeof x == "object")?x.map((y,j) => (j==0)?((i==0?"<table> class=\"table\"":"")+"<tr class=\"table\"><td class=\"table\" style=\"width:30px\">"+(i+1)+"</td><td class=\"table\" style=\"width:calc(100% - 50px)\">"+y+"</td></tr>"+(array.length-i==1?"</table>":"")):y):x)
		let out = ["<table style=\"font-family:'Courier New'\" class=\"table\">"]
		let pos = 0
		for (let i=0;i<array.length;i++) {
			out[pos] += "<tr class=\"table\"><td style=\"width:30px\" class=\"table\">"+(i+1)+"</td><td style=\"width:calc(100% - 45px)\" class=\"table\">"
			if (typeof array[i] == "object") {
				pos++
				out[pos] = [array[i][0],function(answer){return answer==array[i][0]?1:0}]
				pos++
				out[pos] = ""
			} else {
				out[pos] += array[i]+"</td></tr>"
			}
		}
		out[pos] += "</table>"
		return gapfillGenerator(out,gaps)
	}
}
var question_file_at_gcse_comp_sci = [
	// Unit 01
	{
		text:"A laptop and smartphone are both examples of computer systems.",
		type:"composite",
		components:[
			blankComposite([
				(()=>{
					let correct = ranint(1,3,true)
					let incorrect = ranint(2,4,true)
					return {
						get text(){return "Select the "+pluralize(correct,"input device")+" of a computer."},
						type:"multiplechoice",
						topic:"input and output devices",
						answers:multipleChoiceGenerator(["Keyboard","Buttons","Trackpad","Microphone"],correct,["Speakers","Display","Processor","MDR","ALU","CPU"],incorrect),
						markTransform:x=>"223".slice(0,x),
						par:8*correct+2*incorrect
					}
				})(),
				(()=>{
					let correct = ranint(1,5,true)
					let incorrect = ranint(3,6,true)
					return {
						get text(){return "Select the "+pluralize(correct,"input device")+" of a smartphone."},
						type:"multiplechoice",
						topic:"input and output devices",
						answers:multipleChoiceGenerator(["Microphone","Buttons","GPS sensor","Gyroscopic sensor","Touchscreen"],correct,["Speakers","Display","Processor","MDR","ALU","CPU"],incorrect),
						markTransform:x=>"22314".slice(0,x),
						par:8*correct+2*incorrect
					}
				})()
			].shuffle()),
			{
				text:"Select the two output devices.",
				type:"multiplechoice",
				topic:"input and output devices",
				answers:multipleChoiceGenerator(["Speakers","Display"],2,["Camera","Microphone","Keyboard","Buttons"],2),
				markTransform:x=>"12".slice(0,x),
				par:15
			}
		].shuffle()
	},
	{
		text:"Describe the concept of a stored-program computer.",
		type:"open",
		topic:"stored program computers",
		modelAnswer:"In a stored-program computer, program instructions and the data used by the programs are both stored in the same memory. The CPU accesses both instructions and data from the same RAM.",
		mark:function(answer){return "456".slice(0,keyword(answer,["instructions","data","memory"],3,0.5)+keyword(answer,["CPU","access","RAM"],2,0.75))},
		par:40
	},
	{
		text:"Name the architecture typically used by stored-program computers.",
		type:"open",
		topic:["stored program computers","von Neumann architecture"],
		modelAnswer:"von Neumann architecture",
		mark:function(answer){return {3:keyword(answer,["von","Neumann","architecture"],3,1/3)}},
		par:15
	},
	blankComposite([
		{
			text:"Give the full names of the two major components of the CPU.",
			type:"open",
			topic:"CPU components",
			modelAnswer:"Control Unit; Arithmetic-Logic Unit.",
			mark:function(answer){return {3:keyword(answer,["Control","Unit"],2,0.5)+keyword(answer,["Arithmetic","Logic","Unit"],3,1/3)}},
			par:20
		},
		{
			text:"The CPU also contains memory locations called registers.",
			type:"composite",
			components:[
				{
					text:"Select the four registers of a CPU.",
					type:"multiplechoice",
					topic:"CPU components",
					answers:multipleChoiceGenerator(["Program Counter","Memory Address Register","Memory Data Register","Accumulator"],4,["Random Access Memory","Read-Only Memory","Arithmetic-Logic Unit","SD card"],4),
					markTransform:x=>"1123".slice(0,x),
					par:30
				},
				{
					text:"Two of the registers of the CPU work together. Name these registers and explain how they work together.",
					type:"open",
					topic:"CPU components",
					modelAnswer:"The Memory Address Register (MAR) and Memory Data Register (MDR) work together as the MAR holds the address of data or instructions that need to be executed, and the MDR stores the instructions or data itself until the CPU can execute it.",
					mark:function(answer){return {
						2:keyword(answer,["Memory Address Register","MAR"],1)+keyword(answer,["Memory Data Register","MDR"],1),
						4:keyword(answer,["store","address","instruction","data","execute"],5,0.5)
					}},
					par:15
				}
			]
		}
	]),
	{
		text:"The CPU contains memory locations. What word is used to refer to these?",
		type:"open",
		topic:"CPU components",
		modelAnswer:"Registers",
		mark:function(answer){return {2:keyword(answer,["register"])}},
		par:10
	},
	{
		text:"Explain the function of the Control Unit.",
		type:"open",
		topic:"CPU components",
		modelAnswer:"The Control Unit coordinates and controls all of the activities taking place within the CPU. It decodes instructions and executes them, receives signals from the system clock and directs the timing and control of other parts of the CPU.",
		mark:function(answer){return "345".slice(0,keyword(answer,["coordinate","control"],1)+keyword(answer,["fetch","decode","execute"],2,0.5)+keyword(answer,["signal","clock"],2,0.5))},
		par:30
	},
	{
		text:"Explain the function of the Arithmetic Logic Unit.",
		type:"open",
		topic:"CPU components",
		modelAnswer:"The Arithmetic Logic Unit performs arithmetic operations and logical operations such as AND, OR and NOT.",
		mark:function(answer){return {
			1:keyword(answer,["arithmetic","logic"])/2,
			5:keyword(answer,["operations"])
		}},
		par:20
	},
	{
		text:"The CPU operates by repeating three operations in a cycle called the fetch-decode-execute cycle. State what happens at each stage of this cycle:",
		type:"composite",
		components:[
			{
				text:"Fetch",
				type:"open",
				topic:"CPU processes",
				modelAnswer:"The next instruction and any data involved is fetched from memory, and the program counter is incremented",
				mark:function(answer){return "345".slice(0,clamp(keyword(answer,["instruction","data"])+keyword(answer,["fetch","retrieve","access"],1)+keyword(answer,["program counter","increase","increment"],2,0.5)-1,3))},
				par:30
			},
			{
				text:"Decode",
				type:"open",
				topic:"CPU processes",
				modelAnswer:"The instruction is decoded, or converted to an executable format",
				mark:function(answer){return {
					1:keyword(answer,["decode"]),
					5:keyword(answer,["convert","format","execut","read"],2,0.5)
				}},
				par:20
			},
			{
				text:"Execute",
				type:"open",
				topic:"CPU processes",
				modelAnswer:"The instruction is executed and its results are stored in the accumulator",
				mark:function(answer){return {
					1:keyword(answer,["execute"]),
					5:(keyword(answer,["store","save"],1)+keyword(answer,["accumulator"]))/2
				}},
				par:20
			}
		]
	},
	{
		text:"Explain the function of the program counter.",
		type:"open",
		topic:"CPU components",
		modelAnswer:"The program counter holds the address of the next instruction to be executed. It is incremented as soon as the instruction is fetched.",
		mark:function(answer){return "45".slice(0,keyword(answer,["hold","store","contain","has"],1,0.5)+keyword(answer,["address","increment","fetch"],3,0.5))},
		par:30
	},
	blankComposite([
		{
			text:"Explain the function of the accumulator.",
			type:"open",
			topic:"CPU components",
			modelAnswer:"The accumulator temporarily stores arithmetic and logic results.",
			mark:function(answer){return "234".slice(0,keyword(answer,["store","hold"],1)+keyword(answer,["temporar","until","before"],1)+keyword(answer,["arithmetic","logic","result"],3,1/3))},
			par:40
		},
		{
			text:"Which two functions of a calculator can the accumulator be compared to?",
			type:"multiplechoice",
			topic:"CPU components",
			answers:multipleChoiceGenerator(["M+","M-"],2,["MC","CE","log","CNC","OFF","+/-"],6),
			markTransform:x=>(x===2)?"A":"",
			par:10
		}
	]),
	{
		text:"The processes carried out by the CPU can be represented in a table.",
		type:"composite",
		components:[
			(function(){
				let num = [ranint(6,12,true),ranint(4,8,true)]
				return {
					text:"Complete the table for a program that carries out the operation \""+num[0]+" + "+num[1]+"\" and store it in memory location 8.",
					type:"gapfill",
					topic:"CPU processes",
					words:resources_gcse_comp_sci.CPULanguageGapfillGenerator(["","","LDA 7",["ADD #"+num[1]],["STO 8"],"",num[0],""]),
					markTransform:x=>"56".slice(0,x),
					par:40
				}
			})(),
			blankComposite((function(){
				let num = []
				num[0] = ranint(4,8,true)
				num[1] = ranint(3,5,true)
				num[3] = ranint(3,5,true)
				num[2] = num[3]*ranint(4,8,true)
				return [
					{
						label:"202306151840",
						text:"Complete the table for a program that carries out the operation \"[15] * [14] - [13] ÷ [12]\" (where [x] is the contents of memory address x) and stores the result in memory address 11. Remember order of operations!",
						type:"gapfill",
						topic:"CPU processes",
						words:resources_gcse_comp_sci.CPULanguageGapfillGenerator(["",["LDA 15"],["MUL 14"],"STO 10",["LDA 13"],["DIV 12"],"STA 9",["LDA 10"],["SUB 9"],"STO 11","",num[3],num[2],num[1],num[0]],4),
						markTransform:x=>"6789".slice(0,x),
						par:90
					},
					{
						get text(){return "What value will get stored in memory address 11 when the program from part "+getQuestionPartNameFromLabel("202306151840")+" runs?"},
						type:"open",
						topic:"CPU processes",
						modelAnswer:String(num[0]*num[1]-num[2]/num[3]),
						mark:markTemplate.number(num[0]*num[1]-num[2]/num[3],"9"),
						par:20
					}
				]
			})())
		]
	},
	{
		text:"Select the three most common factors that may affect the speed of a CPU.",
		type:"multiplechoice",
		topic:"CPU speed",
		answers:multipleChoiceGenerator(["Clock speed","Number of cores","Cache size"],3,["RAM","ROM","Storage","Time of day","Price","Whether or not the system is embedded"],3),
		markTransform:x=>"123".slice(0,x),
		par:30
	},
	{
		text:"One of the most common factors that may affect the speed of a CPU is clock speed.",
		type:"composite",
		components:[
			{
				text:"State what is meant by clock speed.",
				type:"open",
				topic:"CPU speed",
				modelAnswer:"The number of fetch-decode-execute cycles per second",
				mark:function(answer){return {5:keyword(answer,["cycle","per","second"],3,1/3)}},
				par:15
			},
			{
				text:"Select the unit used to measure clock speed.",
				type:"multiplechoice",
				topic:"CPU speed",
				answers:multipleChoiceGenerator(["Hertz (Hz)"],1,["Cycles per second (cps)","Megabits per second (Mbps)","Gigabytes (GB)"],3),
				markTransform:x=>x?"4":"",
				par:10
			},
			{
				text:"How would performance increase if clock speed was doubled?",
				type:"multiplechoice",
				topic:"CPU speed",
				answers:multipleChoiceGenerator(["Double"],1,["Halve","Quadruple","Quarter"],3),
				markTransform:x=>x?"1":"",
				par:10
			},
			{
				text:"Complete the sentence:",
				type:"gapfill",
				topic:"CPU speed",
				words:gapfillGenerator(["Everything in the computer happens on the ",["pulse",function(answer){return stringSimplify(answer)=="pulse"?1:0}]," of a clock."]),
				markTransform:x=>x?"3":"",
				par:10
			}
		]
	},
	{
		text:"One of the most common factors that may affect the speed of a CPU is the number of cores.",
		type:"composite",
		components:[
			{
				text:"State what is meant by a core.",
				type:"open",
				topic:"CPU components",
				modelAnswer:"A duplicate processing unit",
				mark:function(answer){return {5:keyword(answer,["processor","processing unit"],1)}},
				par:15
			},
			blankComposite([
				{
					label:"202306101957",
					text:"Under ideal conditions, by what factor would performance increase if the number of cores was doubled?",
					type:"multiplechoice",
					topic:"CPU speed",
					answers:multipleChoiceGenerator(["2"],1,["Less than 2","More than 2"],2),
					markTransform:x=>x?"3":"",
					par:10
				},
				{
					get text(){return "Suggest a scenario in which your answer to part "+getQuestionPartNameFromLabel("202306101957")+" may not be true."},
					type:"open",
					topic:"CPU speed",
					modelAnswer:"If a computer is running a single program, it may not necessarily be any faster, since the program may have been designed to only run on one core.",
					mark:function(answer){return "54".slice(0,keyword(answer,["single","one","1","few"],1,2/3)+keyword(answer,["program","core"],2,2/3))},
					par:10
				}
			])
		]
	},
	{
		text:"One of the most common factors that may affect the speed of a CPU is the cache size.",
		type:"composite",
		components:[
			{
				text:"State what is meant by cache.",
				type:"open",
				topic:["CPU speed","CPU components"],
				modelAnswer:"Memory stored on the CPU",
				mark:function(answer){return {4:keyword(answer,["memory","CPU"],2,1/2)}},
				par:15
			},
			{
				text:"How fast is cache relative to other forms of memory? Select <b>two</b> options.",
				type:"multiplechoice",
				topic:["CPU speed","cache and RAM"],
				answers:multipleChoiceGenerator(["Faster than RAM","Slower than registers"],2,["Slower than RAM","Roughly the same speed as RAM","Faster than registers","Roughly the same speed as registers"],4),
				markTransform:x=>"23".slice(0,x),
				par:20
			},
			{
				text:"There are multiple levels of cache.",
				type:"composite",
				components:[
					{
						text:"How many?",
						type:"multiplechoice",
						topic:"cache and RAM",
						answers:multipleChoiceGenerator(["3"],1,["2","4","5","6"],3),
						markTransform:x=>x?"2":"",
						par:10
					},
					{
						text:"Fill in the gaps:",
						type:"gapfill",
						topic:"cache and RAM",
						words:gapfillGenerator(["Level ",["1",function(answer){return ["1","one"].includes(answer.toLowerCase())?1:0}]," cache is extremely fast, but also extremely small (typically between 2-256 ",["KB",function(answer){return ["KB","kilobytes"].includes(answer)?1:0}],"). Each core will have its own cache of this type.<br><br>Level ",["3",function(answer){return ["3","three"].includes(answer.toLowerCase())?1:0}]," cache is the slowest type of cache, but still faster than ",["RAM",function(answer){return answer=="RAM"?1:0}],". It is usually located on the CPU and stores ",["MB",function(answer){return ["MB","megabytes"].includes(answer)?1:0}],". It is shared between all cores on a CPU."],4),
						markTransform:x=>"1213".slice(0,x),
						par:40
					}
				]
			}
		]
	},
	blankComposite([
		{
			text:"Approximately what percentage of the time is Level 1 cache used?",
			type:"multiplechoice",
			topic:"cache and RAM",
			answers:multipleChoiceGenerator(["50%"],1,["10%","20%","30%","40%","60%","70%","80%","90%"],5),
			markTransform:x=>x?"A":"",
			par:10
		},
		{
			text:"Approximately what percentage of the time is Level 2 cache used?",
			type:"multiplechoice",
			topic:"cache and RAM",
			answers:multipleChoiceGenerator(["90%"],1,["10%","20%","30%","40%","50%","60%","70%","80%"],5),
			markTransform:x=>x?"A":"",
			par:10
		}
	]),
	(function(){
		let devices = []
		for (let i=0;i<8;i++) devices.push([String.fromCharCode(65+i),ranint(0,3),ranint(10,99,true)/10])
		let sorted = devices.sort((a,b)=>(2**b[1]*b[2])-(2**a[1]*a[2])).map(x => x[0])
		return {
			text:"Consider the following eight devices: <ul>"+devices.map(x => "<li>"+x[0]+": A "+(2**x[1])+" core processor running at "+x[2]+" GHz</li>").sort().join("")+"Select the <b>four</b> devices which are <b>fastest</b>.",
			type:"multiplechoice",
			topic:"CPU speed",
			answers:multipleChoiceGenerator(sorted.slice(0,4),4,sorted.slice(4,8),4),
			markTransform:x=>"1357".slice(0,x),
			par:160
		}
	})(),
	{
		text:"Devices with simple inputs normally use embedded systems.<br>Explain what an embedded computer is.",
		type:"open",
		topic:"embedded systems",
		modelAnswer:"A single microprocessor that includes RAM, ROM and CPU",
		mark:function(answer){return {
			6:keyword(answer,["microprocessor"]),
			5:keyword(answer,["RAM","ROM","CPU"],3,1/3)
		}},
		par:20
	},
	(()=>{
		let correct = ["Personal computer","Laptop","Smartphone","Tablet","Server"]
		let incorrect =["Car","Microwave","Washing machine","Credit card reader","Calculator","GPS system","Dishwasher","Central heating system","Digital alarm clock","Television","Video game console","Solar panel controller","Vending machine","Automated teller machine (ATM)","Burglar alarm","Digital watch"]
		return {
			text:"Select the <b>four</b> devices which are unlikely to use embedded systems.",
			type:"multiplechoice",
			topic:"embedded systems",
			answers:multipleChoiceGenerator(correct,4,incorrect,8),
			markTransform:x=>"1234".slice(0,x),
			par:60
		}
	})(),
	(function(){
		let parts = [["Typically slow","Typically very fast"],["Has one purpose","Can perform a variety of tasks"],["Cannot install new software","New software can be installed"],["Programs stored on ROM","Programs stored on hard drives"],["Very reliable","May be less reliable and require restarting the device"]].select(ranint(2,5,true))
		let out = {
			text:"For each of the below, select whether it is typical of embedded systems or general purpose machines.",
			type:"composite",
			components:[]
		}
		for (let i of parts) {
			let ans = ranint(0,1)
			out.components.push({
				text:i[ans],
				type:"multiplechoice",
				topic:"embedded systems",
				answers:multipleChoiceGenerator([["Embedded","General purpose"][ans]],1,[["General purpose","Embedded"][ans]],1),
				markTransform:x=>x?"1":"",
				par:10
			})
		}
		return out
	})(),
	(function(){
		let parts = [["RAM",1],["ROM",1],["Cache",1],["Solid state drive",2],["Hard disk drive",2],["Optical storage",2]].select(ranint(2,6,true))
		let out = {
			text:"For each of the below, select whether it is primary or secondary storage.",
			type:"composite",
			components:[]
		}
		for (let i of parts) {
			out.components.push({
				text:i[0],
				type:"multiplechoice",
				topic:"storage",
				answers:multipleChoiceGenerator([["Primary","Secondary"][i[1]-1]],1,[["Secondary","Primary"][i[1]-1]],1),
				markTransform:x=>x?"1":"",
				par:10
			})
		}
		return out
	})(),
	{
		text:"Describe what primary storage is used for in the von Neumann architecture.",
		type:"open",
		topic:["storage","von Neumann architecture"],
		modelAnswer:"To store programs that are currently running and need to be accessed by the CPU.",
		mark:function(answer){return "345".slice(0,keyword(answer,["store","program","currently","access","CPU"],5,0.5)+keyword(answer,["use","running"],1,0.5))},
		par:30
	},
	{
		text:"When a computer is turned off, all data stored in RAM is lost.",
		type:"composite",
		components:[
			{
				text:"State the technical term for this.",
				type:"open",
				topic:"volatility",
				modelAnswer:"Volatility",
				mark:function(answer){return {2:keyword(answer,["volatil"])-keyword(answer,["no"])}},
				par:10
			},
			multipleChoiceComposite("For each of the below, select whether or not they lose data in this way when the computer is turned off.",[
				["Hard drive","Doesn't lose data","1"],
				["ROM","Doesn't lose data","1"],
				["Cache","Loses data","1"],
				["CPU registers","Loses data","1"]
			])
		]
	},
	{
		text:"State what is meant by RAM being volatile.",
		type:"open",
		topic:"volatility",
		modelAnswer:"When the computer is turned off, data stored in RAM is lost.",
		mark:function(answer){return "34".slice(0,keyword(answer,["turn","switch"],1,0.5)+keyword(answer,["off","data","store"],3,1/3)+keyword(answer,["lost","deleted"],1,0.5))},
		par:20
	},
	(()=>{
		let num = ranint(1,3,true)
		return {
			text:"State "+pluralize(num,"example")+" of things which are normally stored on RAM at a given time.",
			type:"open",
			topic:"cache and RAM",
			modelAnswer:["The operating system","The software currently in use","Data used by this software"].slice(0,num).join("<br>"),
			mark:function(answer){return "345".slice(0,keyword(answer,["operating system","software","data"],num))},
			par:5+10*num
		}
	})(),
	{
		text:"A user attempts to open a browser to search the Internet, but the browser software needs more memory to run than is available in RAM. What <b>two</b> things can happen as a result?",
		type:"open",
		topic:"cache and RAM",
		modelAnswer:"Either virtual memory is allocated, or an error occurs.",
		mark:function(answer){return {
			3:keyword(answer,["virtual","memory"],2,0.5),
			2:keyword(answer,["error","crash"],1)
		}},
		par:20
	},
	{
		text:"Explain why virtual memory is slow.",
		type:"open",
		topic:"cache and RAM",
		modelAnswer:"To access data, the existing data in RAM needs to be copied to the virtual memory, then data in virtual memory needs to be copied to RAM.",
		mark:function(answer){return "567".slice(0,keyword(answer,["access","data","existing","RAM","cop","virtual","memory"],6,1/2))},
		par:45
	},
	blankComposite([
		{
			label:"202306151842",
			text:"State the technical term for the initial program which is run when a computer is turned on.",
			type:"open",
			topic:"the booting process",
			modelAnswer:"Bootstrap",
			mark:function(answer){return {3:keyword(answer,["bootstrap"])-keyword(answer,["OS","operating system"])}},
			par:10
		},
		{
			get text(){return "Select where the program named in part "+getQuestionPartNameFromLabel("202306151842")+" gets stored."},
			type:"multiplechoice",
			topic:"the booting process",
			answers:multipleChoiceGenerator(["ROM"],1,["RAM","Virtual memory","BIOS","Cache","Hard drive","Registers"],3),
			markTransform:x=>x?"2":"",
			par:10
		}
	]),
	blankComposite([
		{
			text:"Explain the purpose of the BIOS.",
			type:"open",
			topic:"the booting process",
			modelAnswer:"It controls basic technical configuration such as the processor speed and system time.",
			mark:function(answer){return "56".slice(0,keyword(answer,["configuration","time"],2,2/3)+keyword(answer,["processor","speed"],2,1/3))},
			par:20
		},
		{
			text:"Select where the BIOS gets stored.",
			type:"multiplechoice",
			topic:"the booting process",
			answers:multipleChoiceGenerator(["ROM"],1,["RAM","Virtual memory","BIOS","Cache"],3),
			markTransform:x=>x?"2":"",
			par:10
		},
		{
			text:"Fill in the gaps:",
			type:"gapfill",
			topic:"the booting process",
			words:gapfillGenerator(["The BIOS can run without a ",["hard drive",function(answer){return answer.replaceAll(" ","").toLowerCase()=="harddrive"?1:0}]," or other secondary ",["storage",function(answer){return answer.replaceAll(" ","").toLowerCase()=="storage"?1:0}]," being present."],ranint(1,2)),
			markTransform:function(x){return {3:x}},
			par:10
		}
	].select(ranint(1,3,true)).qSort()),
	{
		text:"What is the typical size of ROM?",
		type:"multiplechoice",
		topic:"ROM",
		answers:multipleChoiceGenerator(["4 - 8 MB"],1,["4 - 8 KB","16 - 32 KB","64 - 128 KB","256 - 512 KB","1 - 2 MB","16 - 32 MB","64 - 128 MB"],7),
		markTransform:x=>x?"A":"",
		par:10
	},
	(()=>{
		let num = ranint(1,6,true)
		let answers = ["Capacity","Speed","Portability","Durability","Reliability","Cost"]
		return {
			text:"State "+pluralize(num,"characteristic")+" of secondary storage devices that a buyer should consider.",
			type:"open",
			topic:"storage devices",
			modelAnswer:answers.select(num).join("; "),
			mark:function(answer){return "123456".slice(0,keyword(answer,answers,num))},
			par:2+8*num
		}
	})(),
	blankComposite([
		(()=>{
			let num = ranint(1,3,true)
			return {
				text:"State "+pluralize(num,"type")+" of secondary storage devices.",
				type:"open",
				topic:"storage devices",
				modelAnswer:["Magnetic","Optical","Solid State"].select(num).join("; "),
				mark:function(answer){return "123".slice(0,keyword(answer,["Magnetic","Optical","Solid State"],num))},
				par:10*num
			}
		})(),
		(()=>{
			let num = ranint(1,4,true)+ranint(1,4,true)
			return {
				text:"State "+pluralize(num,"example")+" of offline secondary storage.",
				type:"open",
				topic:"storage devices",
				modelAnswer:["Compact Disc (CD)","Digital Versatile Disc (DVD)","BluRay","Flash memory","SD card","Removable HDD","Removable SSD","Magnetic tape"].select(num).join("; "),
				mark:function(answer){
					let marks = keyword(answer,["BluRay","Flash memory","SD card","Magnetic tape"])+keyword(answer,["Compact Disc","CD"],1)+keyword(answer,["Digital Versatile Disc","DVD"],1)+keyword(answer,["Removable HDD","Removable hard disk drive"],1)+keyword(answer,["Removable SSD","Removable solid state drive"],1)
					return "12345678".slice(0,Math.min(marks,num))
				},
				par:10*num
			}
		})()
	]),
	{
		text:"The surface of a magnetic disk can be divided in two ways.",
		type:"composite",
		components:[
			{
				label:"202306151843",
				text:"What are the concentric circles on a magnetic disk called?",
				type:"open",
				topic:["storage devices","magnetic storage"],
				modelAnswer:"Tracks",
				mark:function(answer){return {3:keyword(answer,["track"])-keyword(answer,["sector"])}},
				par:10
			},
			{
				get text(){return "What are the circles named in part "+getQuestionPartNameFromLabel("202306151843")+" divided into?"},
				type:"open",
				topic:["storage devices","magnetic storage"],
				modelAnswer:"Sectors",
				mark:function(answer){return {3:keyword(answer,["sector"])-keyword(answer,["track"])}},
				par:10
			}
		]
	},
	blankComposite([
		{
			text:"Explain how magnetic storage works.",
			type:"open",
			topic:["storage devices","magnetic storage"],
			modelAnswer:"A drive head moves over the disk surface or magnetic tape to read or write data magnetically",
			mark:function(answer){return "56".slice(0,keyword(answer,["head","move","surface","tape"],4,0.5))},
			par:30
		},
		{
			text:"State how bits are physically stored by magnetic storage devices.",
			type:"open",
			topic:["storage devices","magnetic storage"],
			modelAnswer:"As tiny areas of magnetic north or south",
			mark:function(answer){return {A:keyword(answer,["north","south"],2,0.5)}},
			par:10
		}
	].slice(0,ranint(1,2))),
	(()=>{
		let num = ranint(1,3)
		return {
			text:"State "+pluralize(num,"advantage")+" of magnetic storage.",
			type:"open",
			topic:["storage devices","magnetic storage"],
			modelAnswer:["They are cheap","They have large storage capacities","They have a relatively fast write speed"].select(num).join("<br"),
			mark:function(answer){
				let marks = []
				marks.push(keyword(answer,["cheap"]))
				marks.push(keyword(answer,["high","large"],1,1/3)+keyword(answer,["storage"],1,2/3))
				marks.push(keyword(answer,["high","fast"],1,1/3)+keyword(answer,["write"],2,2/3))
				return "334".slice(0,Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),num))
			},
			par:10*num
		}
	})(),
	{
		text:"Explain why moving mechanical parts are a disadvantage of magnetic storage.",
		type:"open",
		topic:["storage devices","magnetic storage"],
		modelAnswer:"Because a drive head has to move, read and write speeds are slower than with solid state drive (SSD) storage. In addition, the parts of a HDD can be damaged easily.",
		mark:function(answer){return {
			3:keyword(answer,["drive","head","move"],3,1/3)+keyword(answer,["damage","wear"],1),
			4:keyword(answer,["speed","slow","read","write","access"],3,1/3)
		}},
		par:30
	},
	{
		text:"Explain how optical storage works.",
		type:"open",
		topic:["storage devices","optical storage"],
		modelAnswer:"Data is stored as pits or lands burnt or pressed into a spiral track circulating outwards from the centre. A laser beam passes over the pits and lands and the level of reflection is measured. From this signal bit values can be derived.",
		mark:function(answer){return "4456".slice(0,keyword(answer,["pits","lands"],2,0.5)+keyword(answer,["spiral","laser","reflection"]))},
		par:45
	},
	blankComposite([
		(()=>{
			let num = ranint(1,3)
			return {
				text:"State "+pluralize(num,"advantage")+" of optical storage.",
				type:"open",
				topic:["storage devices","optical storage"],
				modelAnswer:["It is cheap","Disks are very easily portable","Disks are physically compact"].select(num).join("<br"),
				mark:function(answer){
					let marks = []
					marks.push(keyword(answer,["cheap"]))
					marks.push(keyword(answer,["port","move","locat"],1))
					marks.push(keyword(answer,["small","compact"],1))
					return "334".slice(0,Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),num))
				},
				par:10*num
			}
		})(),
		(()=>{
			let num = ranint(1,3)
			return {
				text:"State "+pluralize(num,"disadvantage")+" of optical storage.",
				type:"open",
				topic:["storage devices","optical storage"],
				modelAnswer:["They have less storage capacity compared to other forms of storage","They are easily damaged or scratched","They require a CD reader","They have slow write speeds"].select(num).join("<br"),
				mark:function(answer){
					let marks = []
					marks.push(keyword(answer,["capacity"],1,0.5)+keyword(answer,["low","less"],1,0.5))
					marks.push(keyword(answer,["damage","scratch"],1,0.5)+keyword(answer,["eas"],1,0.5))
					marks.push(keyword(answer,["CD","Compact Disc"],1,0.5)+keyword(answer,["reader"],1,0.5))
					marks.push(keyword(answer,["low","write","speed"],3,1/3))
					return "334".slice(0,Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),num))
				},
				par:10*num
			}
		})()
	]),
	{
		text:"Explain why Blu-ray discs can store more data than CD's.",
		type:"open",
		topic:["storage devices","optical storage"],
		modelAnswer:"Blue light has a higher wavelength than the red light used by CD's, so Blu-rays have smaller pits and lands, enabling them to store more data",
		mark:function(answer){return "345".slice(0,keyword(answer,["red","blue","light","wavelength"],4,0.5)+keyword(answer,["small","pit","land"],3,1/3))},
		par:30
	},
	blankComposite([
		{
			text:"Explain how flash memory works.",
			type:"open",
			topic:["storage devices","flash memory and SSD's"],
			modelAnswer:"A large electric current is used to force electrons through a barrier and trap them on the other side. They remain on the other side until 'flashed' with a new current",
			mark:function(answer){return "45".slice(0,keyword(answer,["electric","current","electron","barrier"],4,0.5))},
			par:30
		},
		{
			text:"Select the storage medium which uses flash memory.",
			type:"multiplechoice",
			topic:["storage devices","flash memory and SSD's"],
			answers:multipleChoiceGenerator(["Solid State Drive (SSD)"],1,["Hard Disk Drive (HDD)","CD","Blu-ray","SD card"],3),
			markTransform:x=>x?"3":"",
			par:15
		}
	]),
	(()=>{
		let num = ranint(1,4)
		return {
			text:"State "+pluralize(num,"advantage")+" of solid state drives.",
			type:"open",
			topic:["storage devices","flash memory and SSD's"],
			modelAnswer:["They are highly durable","They have very fast read/write speeds","They make less noise due to no drive arm or fan","They have faster start-up times"].select(num).join("<br"),
			mark:function(answer){
				let marks = [
					keyword(answer,["durab"]),
					keyword(answer,["no","mov","part"],3,1/3),
					keyword(answer,["fast","high"],1,0.5)+keyword(answer,["read","write"],2,0.25),
					keyword(answer,["noise","loud","quiet"],1),
					keyword(answer,["fast","start"],2,0.5)
				]
				return "3345".slice(0,Math.min(marks.map(x => Math.floor(x)).sum(),num))
			},
			par:10*num
		}
	})(),
	// Unit 02
	multipleChoiceComposite("Select the number of bits in each of the following:",[
		["nibble","4","2"],
		["byte","8","1"],
		["kilobit","1,000","1"],
		["kilobyte","8,000","2"],
		["megabit","1,000,000","2"],
		["megabyte","8,000,000","3"],
		["gigabit","10<sup>9</sup>","3"],
		["gigabyte","8 × 10<sup>9</sup>","4"],
		["terabit","10<sup>12</sup>","4"],
		["terabyte","8 × 10<sup>12</sup>","5"],
		["petabit","10<sup>15</sup>","A"],
		["petabyte","8 × 10<sup>15</sup>","A"],
		["exabit","10<sup>18</sup>","A"],
		["exabyte","8 × 10<sup>18</sup>","A"],
		["zettabit","10<sup>21</sup>","A"],
		["zettabyte","8 × 10<sup>21</sup>","A"],
		["yottabit","10<sup>24</sup>","A"],
		["yottabyte","8 × 10<sup>24</sup>","A"],
		["ronnabit","10<sup>27</sup>","A"],
		["ronnabyte","8 × 10<sup>27</sup>","A"],
		["quettabit","10<sup>30</sup>","A"],
		["quettabyte","8 × 10<sup>30</sup>","A"],
	],ranint(2,8,true),"units of information"),
	{
		text:"Fill in the table:",
		type:"gapfill",
		words:gapfillGenerator(["<table class=\"table\"><tr class=\"table\"><th class=\"table\">Number of switches (bits)</th><th class=\"table\">Possible combinations or states</th></tr><tr class=\"table\"><td class=\"table\">",["1",(answer)=>(answer=="1"?1:0)],"</td><td class=\"table\">",["2",(answer)=>(answer=="2"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["2",(answer)=>(answer=="2"?1:0)],"</td><td class=\"table\">",["4",(answer)=>(answer=="4"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["3",(answer)=>(answer=="3"?1:0)],"</td><td class=\"table\">",["8",(answer)=>(answer=="8"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["4",(answer)=>(answer=="4"?1:0)],"</td><td class=\"table\">",["16",(answer)=>(answer=="16"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["5",(answer)=>(answer=="5"?1:0)],"</td><td class=\"table\">",["32",(answer)=>(answer=="32"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["6",(answer)=>(answer=="6"?1:0)],"</td><td class=\"table\">",["64",(answer)=>(answer=="64"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["7",(answer)=>(answer=="7"?1:0)],"</td><td class=\"table\">",["128",(answer)=>(answer=="128"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["8",(answer)=>(answer=="8"?1:0)],"</td><td class=\"table\">",["256",(answer)=>(answer=="256"?1:0)],"</td></tr></table>"],ranint(3,6,true)),
		markTransform:x=>"334455".slice(0,x),
		par:40
	},
	blankComposite((()=>{
		let bases = [2,3,8,10,16]
		let basePairs = (()=>{let out = [];for (let i of bases) for (let j of bases.filter(x=>x!==i)) out.push([i,j]);return out})()
		let usedPairs = [...basePairs.filter(x=>!x.includes(8)).select(ranint(1,6)),...basePairs.filter(x=>x.includes(8)).filter(x=>Math.random()<0.1)]
		let out = []
		function baseName(x) {return dictionary(x,[[2,"binary"],[3,"ternary"],[8,"octal"],[10,"denary"],[16,"hexadecimal"]])}
		for (let i of usedPairs) {
			let num = ranint(100,255,true)
			let correct = num.toString(i[1])
			out.push({
				text:"Convert the "+baseName(i[0])+" integer "+num.toString(i[0])+" to "+baseName(i[1]),
				type:"open",
				topic:"bases",
				modelAnswer:correct,
				mark:function(answer){return Object.fromEntries([[
					i.includes(8)||i.includes(3)?"A":i.includes(10)?4:(Math.log2(i.product())%1==0)?5:6,
					((i.includes(10)||Math.log2(i.product())%1==0)?1:2)-(keyword(answer,[correct])?0:keyword(answer,[num.toString(10)])?1:2)
				]])},
				par:(i.includes(10)||Math.log2(i.product())%1==0)?10:40
			})
		}
		return out.sort((a,b)=>baseSpellPoints(a)-baseSpellPoints(b)+Math.random())
	})()),
	blankComposite((()=>{
		let out = []
		let double = ranint(0,2)
		for (let i=0;i<3;i++) {
			let base = [2,16,8][i]
			let baseName = ["binary","hexadecimal","octal"][i]
			let num = []
			num[0] = ranint(100,238,true)
			num[1] = ranint(16,255-num[0],true)
			if (num[1]>num[0]) num.reverse()
			let label = "202306101959."+i
			let next = {
				label:label,
				text:"Add the "+baseName+" integers "+num.map(x=>x.toString(base)).join(" and ")+". Leave your answer as a "+baseName+" integer.",
				type:"open",
				topic:"bases",
				modelAnswer:num.sum().toString(base),
				mark:function(answer){return answer.trim()==num.sum().toString(base)?["7","6","A"][i]:""},
				par:30
			}
			if (i===double) next = blankComposite([next,{
				get text(){return "Convert your answer to part "+getQuestionPartNameFromLabel(label)+" to a denary integer."},
				type:"open",
				topic:"bases",
				modelAnswer:num.sum().toString(),
				mark:function(answer){return answer.trim()==num.sum().toString()?["8","7","A"][i]:""},
				par:30
			}])
			out.push(next)
		}
		return out
	})()),
	{
		text:"Select the two binary numbers which are odd.",
		type:"multiplechoice",
		topic:"bases",
		answers:multipleChoiceGenerator(countTo(2).map(x=>[ranint(1,127).toString(2)+"1"]),2,countTo(6).map(x=>[ranint(1,127).toString(2)+"0"]),6),
		markTransform:x=>"12".slice(0,x),
		par:10
	},
	(()=>{
		let num=ranint(1,3)
		return {
			text:"Explain "+pluralize(num,"advantage")+" of hexadecimal over binary",
			type:"open",
			topic:"bases",
			modelAnswer:[
				"It is much easier to remember a hexadecimal value rather than a binary value",
				"It is much faster to write hexadecimal numbers than binary numbers",
				"People are less likely to make an error with fewer digits",
			].select(num).join("<br>"),
			mark:function(answer){
				let marks = keyword(answer,["remember","forget"],1)+keyword(answer,["write","type"],1)+keyword(answer,["error","mistake","accident","wrong"],1)
				if (marks>1) marks += keyword(answer,["convert"])
				return "445".slice(0,clamp(marks,num))
			},
			par:15*num
		}
	})(),
	...(()=>{
		let out = []
		for (let i=0;i<2;i++) {
			let num1 = i==0?ranint(16,63,true):(ranint(16,63,true)*4+ranint(1,3))
			let places1 = Math.random()<0.3?2:1
			let num2 = i==0?ranint(16,63,true):(ranint(16,63,true)*4+ranint(1,3))
			let places2 = Math.random()<0.3?2:1
			let ans11 = (i==0?(num1*2**places1):Math.floor(num1/2**places1)).toString(2)
			let ans12 = (i==0?(num1*2**places1):Math.floor(num1/2**places1)).toString()
			let ans2 = (i==0?(num2*2**places2):Math.floor(num2/2**places2)).toString(16)
			let next = [
				blankComposite([
					{
						label:"202306101936",
						text:"Perform a binary "+["left","right"][i]+" shift of "+pluralize(places1,"place")+" on the binary number "+num1.toString(2),
						type:"open",
						topic:["bases","binary arithmetic"],
						modelAnswer:ans11,
						mark:function(answer){return answer.trim()==ans11?"2":""},
						par:10
					},
					{
						get text(){return "Given that "+num1.toString(2)+" is "+num1+" in denary, convert your answer to part "+getQuestionPartNameFromLabel("202306101936")+" to denary."},
						type:"open",
						topic:["bases","binary arithmetic"],
						modelAnswer:ans12,
						mark:function(answer){return {3:(1+i)-(answer.trim()==ans12?0:keyword(answer,[ans12])?1:2)}},
						par:20
					}
				]),
				{
					text:"Perform a binary "+["left","right"][i]+" shift of "+pluralize(places2,"place")+" on the hexadecimal number "+num2.toString(16),
					type:"open",
					topic:["bases","binary arithmetic"],
					modelAnswer:ans2,
					mark:function(answer){return keyword(answer,[ans2])?"23":keyword(answer,[num2.toString(2),ans2.toString(2)])?"2":""},
					par:40
				}
			]
			if (i===0) next.push({
				text:"Explain what will happen if a binary left shift of two places is performed on the binary number "+ranint(64,255,true).toString(2) ,
				type:"open",
				topic:["bases","binary arithmetic"],
				modelAnswer:"The result will be too large for the number of bits the computer can work with so the ninth bit will be lost. This is called an overflow error.",
				mark:function(answer){return {
					3:keyword(answer,["large","big",1]),
					4:keyword(answer,["overflow"])
				}},
				par:20
			})
			out.push(blankComposite(next))
		}
		return out
	})(),
	(()=>{
		let num = ranint(0,1)
		return blankComposite([
			{
				text:"Explain what "+["ASCII","Unicode"][num]+" is an example of.",
				type:"open",
				topic:"character sets",
				modelAnswer:["ASCII","Unicode"][num]+" is an example of a character set. This is a set of letters, digits and symbols which can be represented by a computer",
				mark:function(answer){return (answer,["character","set"])<2?0:{4:1,5:keyword(answer,["represent"])}},
				par:25
			},
			{
				text:"What is the other major instance of this in use today?",
				type:"open",
				topic:"character sets",
				modelAnswer:["Unicode","ASCII"][num],
				mark:function(answer){return keyword(answer,[["Unicode","ASCII"][num]])?"4":""},
				par:10
			}
		])
	})(),
	{
		text:"State how many characters can be represented by each of the below:",
		type:"composite",
		components:(()=>{
			let out = []
			for (let i=0;i<3;i++) out.push({
				text:["ASCII","Extended ASCII","Unicode"][i],
				type:"open",
				topic:"character sets",
				modelAnswer:["128","256","1114112"][i],
				mark:function(answer){return answer.replaceAll(/[^0-9]/g,"")==["128","256","1114112"][i]?["3","3","A"][i]:""},
				par:10
			})
			return out
		})()
	},
	(()=>{
		let cap = !ranint(0,1)
		let let1 = cap?ranint(97,108):ranint(65,76)
		let let2 = cap?ranint(111,122):ranint(79,90)
		let let3 = cap?let1-32:let2+32
		let num1 = ranint(0,4)
		let num2 = ranint(5,9)
		return blankComposite([
			{
				text:"The character code for \""+String.fromCharCode(let1)+"\" is "+let1+".<br>State the character code of each of the below:",
				type:"gapfill",
				topic:"character sets",
				words:gapfillGenerator([String.fromCharCode(let1+1)+":",[String(let1+1),function(answer){return answer==String(let1+1)?1:0}],"<br>"+String.fromCharCode(let2)+":",[String(let2),function(answer){return answer==String(let2)?1:0}],"<br>"+String.fromCharCode(let3)+":",[String(let3),function(answer){return answer==String(let3)?1:0}]],3),
				markTransform:x=>"345".slice(0,x),
				par:30
			},
			{
				text:"The character code for "+num1+" is "+(num1+48)+".",
				type:"composite",
				components:[
					{
						label:"202306102000",
						text:"State the character code for "+num2+".",
						type:"open",
						topic:"character sets",
						modelAnswer:String(num2),
						mark:function(answer){return answer==String(num2)?"3":""},
						par:10
					},
					{
						get text(){return "Convert your answer to part "+getQuestionPartNameFromLabel("202306102000")+" to a binary number"},
						type:"open",
						topic:"character sets",
						modelAnswer:num2.toString(2),
						mark:function(answer){return answer==String(num2.toString(2))?"4":""},
						par:10
					}
				].slice(0,ranint(1,2))
			}
		])
	})(),
	(()=>{
		let message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ")
		let message1 = message.slice(ranint(0,message.length-3)).slice(0,3).join(" ")
		let message2 = message.slice(ranint(0,message.length-8)).slice(0,ranint(4,6)).join(" ")
		let message3 = message.slice(ranint(0,message.length/2-1),ranint(message.length/2+1,message.length)).join(" ")
		let message4 = "あいうえおがぎぐげござじずぜぞだぢつ".split("").select(ranint(9,18)).join("")
		return blankComposite([
			{
				text:"Calculate the number of bytes needed to store the string \""+message1+"\".",
				type:"open",
				topic:"character sets",
				modelAnswer:message1.length.toString(),
				mark:function(answer){return keyword(answer,[message1.length.toString()])?"3":""},
				par:15
			},
			{
				text:"Calculate the number of bits needed to store the string \""+message2+"\".",
				type:"open",
				topic:"character sets",
				modelAnswer:message2.length+" × 8 = "+(message2.length*8),
				mark:function(answer){return String(Math.floor(4+message2.length/30)).repeat(keyword(answer,[String(message2.length*8)])?2:keyword(answer,[message2.length]))},
				par:20
			},
			{
				text:"Calculate the number of bits needed to store the string \""+message3+"\".",
				type:"open",
				topic:"character sets",
				modelAnswer:message3.length+" × 8 = "+(message3.length*8),
				mark:function(answer){return {A:keyword(answer,[String(message3.length*8)])?3:keyword(answer,[message3.length])?(1+keyword(answer,[8])):0}},
				par:40
			},
			{
				text:"Japanese characters require 2 bytes each to store.<br>Calculate the number of bits needed to store the string \""+message4+"\".",
				type:"open",
				topic:"character sets",
				modelAnswer:message4.length+" × 2 × 8 = "+(message4.length*16),
				mark:function(answer){return "667".slice(0,keyword(answer,[String(message4.length*16)])?3:keyword(answer,[message4.length])?(1+keyword(answer,[16])):0)},
				par:30
			}
		].select(ranint(1,4,true)).sort((a,b)=>baseSpellPoints(a)-baseSpellPoints(b)))
	})(),
	blankComposite([
		(()=>{
			let amount = ranint(1,ranint(3,8,true),true)
			let list = ["JPG","GIF","PNG","BMP","TIFF","XPM","XBM","PPM"]
			return {
				text:"Give "+pluralize(amount,"example")+" of bitmap image file formats.",
				type:"open",
				topic:["images","bitmap and vector images"],
				modelAnswer:list.slice(0,amount).join("; "),
				mark:function(answer){return "456AAA".slice(0,keyword(answer,list,amount))},
				par:4+6*amount
			}
		})(),
		{
			text:"Explain what is meant by a bitmap image.",
			type:"open",
			topic:["images","bitmap and vector images"],
			modelAnswer:"An image consisting of a grid of pixels, each of which is given a binary color value representing a color - for example, 111100000000 may be red.",
			mark:function(answer){return {
				5:keyword(answer,["pixel"]),
				6:keyword(answer,["grid"]),
				7:keyword(answer,["binary","value","represent"],3,0.5)+keyword(answer,["colour","color"],1,0.5)
			}},
			par:30
		},
		{
			text:"What name is occasionally used to refer to bitmap images?",
			type:"open",
			topic:["images","bitmap and vector images"],
			modelAnswer:"Raster",
			mark:function(answer){return {2:keyword(answer,["raster"])-keyword(answer,["vector"])}},
			par:10
		},
		{
			text:"What is the origin of the word \"pixel\"?",
			type:"open",
			topic:["images","bitmap and vector images"],
			modelAnswer:"Picture element",
			mark:function(answer){return {A:keyword(answer,["picture","element"],2,0.5)}},
			par:10
		}
	].filter(x=>Math.random()<0.75)),
	blankComposite([
		(()=>{
			let amount = ranint(1,ranint(2,6,true),true)
			let list = ["SVG","WMF","EPS","PDF","CDR","AI"]
			return {
				text:"Give "+pluralize(amount,"example")+" of vector image file formats.",
				type:"open",
				topic:["images","bitmap and vector images"],
				modelAnswer:list.slice(0,amount).join("; "),
				mark:function(answer){return "45AAAA".slice(0,keyword(answer,list,amount,[1,1,2/3,3/4,3/5,2/3][amount-1]))},
				par:4+6*amount
			}
		})(),
		{
			text:"Explain what is meant by a vector image.",
			type:"open",
			topic:["images","bitmap and vector images"],
			modelAnswer:"An image consisting of geometric shapes.",
			mark:function(answer){return keyword(answer,["shape"])?"4":""},
			par:15
		}
	].filter(x=>Math.random()<0.75)),
	(()=>{
		let bigger = !ranint(0,1)
		return {
			text:"Which image type has the "+(bigger?"larger":"smaller")+" file size?",
			type:"multiplechoice",
			topic:["images","bitmap and vector images"],
			answers:multipleChoiceGenerator([bigger?"Bitmap":"Vector"],1,[bigger?"Vector":"Bitmap"],1),
			markTransform:x=>x?"1":"",
			par:5
		}
	})(),
	blankComposite([
		{
			text:"Explain what is meant by resolution.",
			type:"open",
			topic:"images",
			modelAnswer:"The concentration of pixels per unit area",
			mark:function(answer){return "345".slice(0,keyword(answer,["concentrat","tight","much","many","number","amount"],1)+keyword(answer,["per","in"],1)+keyword(answer,["area"]))},
			par:20
		},
		{
			text:"State the unit typically used to measure resolution",
			type:"composite",
			components:[
				{
					text:"on a screen",
					type:"open",
					topic:"images",
					modelAnswer:"Pixels per inch (PPI)",
					mark:function(answer){return {3:Math.max(keyword(answer,["pixel","per","inch"],3,1/3),keyword(answer,["PPI"]))-keyword(answer,["dot","DPI"])}},
					par:10
				},
				{
					text:"when printing",
					type:"open",
					topic:"images",
					topic:["images","bitmap and vector images"],
					modelAnswer:"Dots per inch (DPI)",
					mark:function(answer){return {3:Math.max(keyword(answer,["dot","per","inch"],3,1/3),keyword(answer,["DPI"]))-keyword(answer,["pixel","PPI"])}},
					par:10
				}
			].shuffle()
		}
	].shuffle()),
	blankComposite([
		{
			text:"Explain what is meant by colour depth.",
			type:"open",
			topic:"images",
			modelAnswer:"The number of bits coding for each pixel",
			mark:function(answer){return {4:keyword(answer,["number","amount","many","much"],1,0.5)+keyword(answer,["bit"],1,0.5)}},
			par:15
		},
		{
			text:"Increasing the colour depth causes the image quality to:",
			type:"multiplechoice",
			topic:"images",
			answers:multipleChoiceGenerator(["Increase"],1,["Decrease"],1),
			markTransform:x=>x?"2":"",
			par:5
		}
	]),
	blankComposite([
		blankComposite([
			{
				label:"202306151844",
				text:"Write the general equation for the size of an image. Include units in your answer.<br><span style=\"opacity:0.5\">(Hint: equations always have a = sign)</span>",
				type:"open",
				topic:"images",
				modelAnswer:"(File size / bits) = (height / pixels) × (width / pixels) × (colour depth / bits)",
				mark:function(answer){
					let sides = answer.split("=")
					if (sides.length!==2) return {}
					return "345".slice(0,(keyword(sides[0],["file size","bit"])+keyword(sides[1],["colour depth","pixel","bit"])+keyword(sides[1],["×","*"],1))/2)
				},
				par:40
			},
			(()=>{
				let scaleFactor = ranint(0,2)
				let height = ranint(10,20)*10**scaleFactor
				let width = ranint(10,20)*10**scaleFactor
				let depth = [2,4,8,12,16,24].select(1)[0]
				let ans = (height*width*depth/8000).toPrecision(6).split("")
				while ((ans[ans.length-1]=="0")&&ans.includes(".")) ans.splice(ans.length-1)
				ans = ans.filter(x=>x!==".").join("")
				return {
					get text(){"Using your answer to part "+getQuestionPartNameFromLabel("202306151844")+", calculate the image size of an image with dimensions "+height+" pixels × "+width+" pixels and colour depth "+depth+" bits.<br>Give your answer in kilobytes."},
					type:"open",
					topic:"images",
					modelAnswer:"(File size / bits) = (height / pixels) × (width / pixels) × (colour depth / bits)"
						+"<br>= ("+height+") × ("+width+") × ("+depth+")"
						+"<br>= "+(height*width*depth)
						+"<br>8000 b = 1 KB"
						+"<br>∴ "+(height*width*depth)+" b = "+ans+" KB"
						+"<br>∴ the file size is "+ans+" KB",
					mark:function(answer){return "667".slice(0,keyword(answer,[ans])?3:keyword(answer,[height*width*depth,8000]))},
					par:40
				}
			})()
		].slice(0,ranint(1,2))),
		multipleChoiceComposite("Select what will happen to the file size for each of the below.",[
			["The height doubles","It doubles","3"],
			["The width doubles","It doubles","3"],
			["The height halves","It halves","3"],
			["The width halves","It halves","3"],
			["The bit depth doubles","It doubles","4"],
			["The bit depth halves","It halves","4"],
			["The height is multiplied by 4","It multiplies by 4","3"],
			["The width is divided by 4","It divides by 4","3"],
			["The number of colours is multiplied by 4","It increases slightly","5"],
			["The number of colours halves","It decreases slightly","5"],
		],3,"images")
	].select(ranint(1,2))),
	{
		text:"The general formula for the size of an image is (File size / bits) = (height / pixels) × (width / pixels) × (colour depth / bits).<br>However, image sizes are often slightly higher than this due to the presence of metadata.",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by metadata.",
				type:"open",
				topic:"metadata",
				modelAnswer:"Data other than the image itself: data about data",
				mark:function(answer){return {4:keyword(answer,["about"])}},
				par:10
			},
			(()=>{
				let amount = ranint(1,4,true)
				return {
					text:"Give "+pluralize(amount,"example")+" of metadata which may be stored.",
					type:"open",
					topic:"metadata",
					modelAnswer:["Colour depth in bits per pixel","Resolution","Date and time of creation","Author"].select(amount).join("<br>"),
					mark:function(answer){return "3456".slice(0,clamp([
						keyword(answer,["colour","color"],1,0.5)+keyword(answer,["depth"],1,0.5),
						keyword(answer,["resolution"]),
						keyword(answer,["date"]),
						keyword(answer,["author"])
					].map(x=>Math.floor(x)).sum()))},
					par:5+5*amount
				}
			})()
		].select(0,ranint(1,2))
	},
	blankComposite([
		{
			text:"Select the three primary colours used by computer screens.",
			type:"multiplechoice",
			topic:"colors",
			answers:multipleChoiceGenerator(["Red","Green","Blue"],3,["Yellow","Cyan","Magenta","Purple","White","Black","Gray"],5),
			markTransform:x=>"234".slice(0,x),
			par:15
		},
		{
			text:"Select the four primary colours used by printers.",
			type:"multiplechoice",
			topic:"colors",
			answers:multipleChoiceGenerator(["Cyan","Magenta","Yellow","Black"],4,["Red","Green","Blue","Purple","White","Gray"],4),
			markTransform:x=>"1234".slice(0,x),
			par:15
		}
	].select(ranint(1,2))),
	multipleChoiceComposite("For each of the below, select whether it is true of an analogue or digital sound signal.",[
		["It is continuous","Analogue","2"],
		["It is discrete","Digital","2"],
		["Computers store sound as this type","Digital","1"],
		["It has the shape of a sine wave","Analogue","A"]
	]),
	blankComposite([
		{
			text:"Explain how sound is digitized.",
			type:"open",
			topic:"sound",
			modelAnswer:"By repeatedly measuring and recording a sound wave.",
			mark:function(answer){return {5:keyword(answer,["repeat","measur","record"],3,2/3)}},
			par:15
		},
		{
			text:"Name the component which:",
			type:"composite",
			components:[
				{
					text:"converts sound to digital signals",
					type:"open",
					topic:"sound",
					modelAnswer:"Analogue to Digital Converter (ADC)",
					mark:function(answer){return {3:keyword(stringSimplify(answer),["analoguetodigitalconverter"])}},
					par:10
				},
				{
					text:"converts digital signals back to sound",
					type:"open",
					topic:"sound",
					modelAnswer:"Digital to Analogue Converter (DAC)",
					mark:function(answer){return {3:keyword(stringSimplify(answer),["digitaltoanalogueconverter"])}},
					par:10
				}
			].shuffle()
		}
	].filter(x=>Math.random()<0.6)),
	blankComposite([
		{
			text:"State what is meant by a sound sample.",
			type:"open",
			topic:"sound",
			modelAnswer:"A measurement of the amplitude of a sound wave at a given time.",
			mark:function(answer){return "34".slice(0,keyword(answer,["measure","amplitude","time"],3,2/3))},
			par:20
		},
		{
			text:"Name the two factors which determine the quality of sound.",
			type:"open",
			topic:"sound",
			modelAnswer:"Sample rate; bit depth",
			mark:function(answer){return "34".slice(0,Math.floor(keyword(answer,["sample","rate"]))+Math.floor(keyword(answer,["bit","depth"])))},
			par:10
		}
	]),
	{
		text:"The two factors which influence the quality of a sound file are the sample rate and sample resolution.",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by sample rate and state the unit used to measure it.",
				type:"open",
				topic:"sound",
				modelAnswer:"Sample rate is the number of sound samples taken per second. It is measured in hertz (Hz).",
				mark:function(answer){return {
					5:keyword(answer,["number","amount","many","much"],1,0.5)+keyword(answer,["second"],1,0.5),
					4:keyword(answer,["hertz","Hz"],1)
				}},
				par:20
			},
			blankComposite([
				{
					text:"Explain what is meant by sample resolution.",
					type:"open",
					topic:"sound",
					modelAnswer:"The number of bits used to record each sample.",
					mark:function(answer){return "45".slice(0,(keyword(answer,["number","amount","many","much"],1)+keyword(answer,["bit"])+keyword(answer,["record","store","hold"],1))*2/3)},
					par:20
				},
				{
					text:"What term is sometimes used to refer to sample resolution?",
					type:"open",
					topic:"sound",
					modelAnswer:"Audio bit depth",
					mark:function(answer){return {3:keyword(answer,["bit","depth"],1)}},
					par:10
				}
			])
		].select(Math.random()<0.25?1:2)
	},
	{
		text:"The sample rate of a sound file is usually measured in hertz.",
		type:"composite",
		components:[
			{
				text:"How much is 1 hertz?",
				type:"open",
				topic:"sound",
				modelAnswer:"1 sample per second",
				mark:function(answer){return {2:keyword(answer,["1","one"],1,1/3)+keyword(answer,["sample","second"],2,1/3)}},
				par:10
			},
			{
				text:"What is the typical sample rate of a CD?",
				type:"multiplechoice",
				topic:"sound",
				answers:multipleChoiceGenerator(["44,100 Hz"],1,["44 Hz","441 Hz","4,410 Hz","441,000 Hz","14 Hz","144 Hz","1,440 Hz","14,400 Hz","144,000 Hz"],5),
				markTransform:x=>x?"A":"",
				par:10
			}
		]
	},
	blankComposite([
		{
			label:"202306151845",
			text:"Write the general equation for the size of a sound file. Include units in your answer.<br><span style=\"opacity:0.5\">(Hint: equations always have a = sign)</span>",
			type:"open",
			topic:"sound",
			modelAnswer:"(File size / bits) = (sample rate / hertz) × (bit depth / bits) × (duration / seconds)",
			mark:function(answer){
				let sides = answer.split("=")
				if (sides.length!==2) return {}
				return "3445".slice(0,(keyword(sides[0],["file size","bit"])+keyword(sides[1],["sample rate","hertz","bit depth","duration","seconds"])+keyword(sides[1],["×","*"],1))/2)
			},
			par:40
		},
		(()=>{
			let sampleRate = ranint(1,9,true)*10**ranint(0,4)
			let bitDepth = [2,4,8,12,16,24,32].select(1)[0]
			let duration = ranint(2,6,true)/2
			let ans =((sampleRate*bitDepth*duration)*(60/8000)).toPrecision(6).split("")
			while ((ans[ans.length-1]=="0")&&ans.includes(".")) ans.splice(ans.length-1)
			ans = ans.filter(x=>x!==".").join("")
			return {
				get text(){return "Using your answer to part "+getQuestionPartNameFromLabel("202306151845")+", calculate the file size of a "+duration+"-minute-long sound file with a sample rate of "+sampleRate+" hertz and bit depth of "+bitDepth+" bits. <br>Give your answer in kilobytes."},
				type:"open",
				topic:"sound",
				modelAnswer:"(File size / bits) = (sample rate / hertz) × (bit depth / bits) × (duration / seconds)"
					+"<br>= ("+sampleRate+") × ("+bitDepth+") × ("+duration+" × 60)"
					+"<br>= "+(sampleRate*bitDepth*duration*60)
					+"<br>8000 b = 1 KB"
					+"<br>∴ "+(sampleRate*bitDepth*duration*60)+" b = "+ans+" KB"
					+"<br>∴ the file size is "+ans+" KB",
				mark:function(answer){return "5667".slice(0,keyword(answer,[ans])?4:((keyword(answer,[sampleRate*bitDepth*duration*60])?2:keyword(answer,[sampleRate*bitDepth*duration]))+keyword(answer,[8000])))},
				par:40
			}
		})()
	].slice(0,Math.random()<0.25?1:2)),
	// Unit 03
	{
		text:"Define the internet.",
		type:"open",
		topic:"the Internet",
		modelAnswer:"A wide area network (WAN) spanning the entire globe. It is the largest existing WAN and has billions of users.",
		mark:function(answer){return "334".slice(0,keyword(answer,["glob","international","world","planet"],1)+keyword(answer,["wide area network","WAN"],1)+keyword(answer,["biggest","largest"],1,1))},
		par:20
	},
	{
		text:"Define the World Wide Web.",
		type:"open",
		topic:"the Internet",
		modelAnswer:"The part of the internet consisting of the interlinked web pages and other documents.",
		mark:function(answer){return "2345".slice(0,keyword(answer,["part","Internet","interlinked"])+keyword(answer,["web","page","site"],2,0.5))},
		par:20
	},
	{
		text:"Define a wide area network.",
		type:"open",
		topic:"types of network",
		modelAnswer:"Any network in which the computers communicate using resources supplied by a third party carrier. The devices in such a network are normally far apart.",
		mark:function(answer){return "345".slice(0,keyword(answer,["resources"])+keyword(answer,["third","party","carrier"],3,1/3)+keyword(answer,["remote","far","distant","large"],1))},
		par:30
	},
	(()=>{
		let amount = ranint(1,3,true)
		return {
			get text(){return "Give "+pluralize(amount,"exaple")+" of organisations which may use WANs."},
			type:"open",
			topic:"types of network",
			modelAnswer:["Universities and schools","large companies such as banks","governments","research organisations"].slice(0,amount).join("; "),
			mark:function(answer){return "334".slice(0,Math.min(keyword(answer,["universit","school"],1)+keyword(answer,["company","bank"],1)+keyword(answer,["government"])+keyword(answer,["research","scien"],1),amount))},
			get par(){return amount*10}
		}
	})(),
	{
		text:"Define the Internet of Things.",
		type:"open",
		topic:"the Internet",
		modelAnswer:"The devices with sensory capabilities (such as cat trackers, kitchen appliances and other 'smart home' items) that are connected to a network and are able to exchange data.",
		mark:function(answer){
			let out = {
				3:keyword(answer,["device"]),
				4:keyword(answer,["connect","network"],2,0.5)+keyword(answer,["transfer","exchange"],2,0.5)+keyword(answer,["data"]),
				5:keyword(answer,["sens"]),
				A:keyword(answer,["smart"])
			}
			if (out[4]===3) {
				out[4]=2
				out[5]=(out[5]??0)+1
			}
			return out
		},
		par:40
	},
	blankComposite([
		{
			text:"Define an IP address.",
			type:"open",
			topic:"the Internet",
			modelAnswer:"A unique identifier given to a device connected to a network.",
			mark:function(answer){return "45".slice(0,keyword(answer,["unique","different"],1)+keyword(answer,["give","assign","allocate"],1))},
			par:20
		},
		{
			text:"Explain the purpose of an IP address.",
			type:"open",
			topic:"the Internet",
			modelAnswer:"When a node wants to send a message to another node, it uses the recipient node's address as the destination. A switch on the network knows where the node with this address is and routes the message to it accordingly.",
			mark:function(answer){return "567".slice(0,keyword(answer,["message","data"],1)+keyword(answer,["recipient","address","destination"],2,0.5)+keyword(answer,["switch","know","route"],2,0.5))},
			par:60
		}
	].filter(x=>Math.random()<0.75)),
	{
		text:"Explain the difference between a static and dynamic IP address.",
		type:"open",
		topic:"the Internet",
		modelAnswer:"In networks with static IP addresses, a device will always be given the same IP address each time it connects to the network. In networks with dynamic IP addresses, the address changes each time the device connects.",
		mark:function(answer){
			let out = {
				2:keyword(answer,["network","IP address","connect"])-1,
				4:keyword(answer,["same","different"]),
			}
			return subMarks(out,[3,1,0][keyword(answer,["static","dynamic"])])
		},
		par:40
	},
	{
		text:"Describe the difference between circuit switching and packet switching.",
		type:"open",
		topic:"the Internet",
		modelAnswer:"In a circuit switching network, an entire file of data is transferred at once, over a single connection. Phone calls are an example of circuit switching. In a packet switching network, the data file is broken down into small \"packets\" which are transferred separately and usually through different routes. These packets are then reassembled into the original file at the target destination. The internet is an example of a packet switching network.",
		mark:function(answer){
			let marks = clamp(keyword(answer,["at once","in one","at the same time"],1)+keyword(answer,["1","one","single"],1)+keyword(answer,["connection","packet","route","original"])+keyword(answer,["break","broken","reduce","separate"],1)+keyword(answer,["assemble","produce","create"],1)+keyword(answer,["original"])+keyword(answer,["phone call","internet"],2,0.5),9)
			return "778789899".slice(0,marks)
		},
		par:120
	},
	{
		text:"State the technical term for points on a network diagram.",
		type:"multiplechoice",
		topic:"network diagrams",
		answers:multipleChoiceGenerator(["Node"],1,["Router","Switch","Hub"],3),
		markTransform:x=>x?"2":"",
		par:15
	},
	{
		text: "What is <code>"+["google.com","wikipedia.org","youtube.com","github.com","fandom.com","desmos.com","reddit.com","teddit.com"].select(1)+"</code> an example of?",
		type:"open",
		topic:"domains",
		modelAnswer:"Domain name",
		mark:function(answer){return {2:keyword(answer,["domain name"])-keyword(answer,["IP","DNS","web","address"])}},
		par:15
	},
	{
		text:"Fill in the gaps:",
		type:"gapfill",
		topic:"domains",
		words:gapfillGenerator([
			"<p>There are ",["13",function(answer){return {A:keyword(answer,["13","thirteen"],1)}}]," DNS root servers worldwide which keep a complete ",["database",function(answer){return {2:keyword(answer,["database","list"],1)}}]," of all ",gapfillExact("domain names","3")," and ",["IP",function(answer){return {4:keyword(answer,["IP","Internet Protocol"],1)}}]," addresses.</p>",
			"<p>Other DNS servers lower down the ",["hierarchy",function(answer){return {5:keyword(answer,["hierarchy","tree"],1)}}]," hold parts of the database.</p>",
			"<p>When a DNS server receives a ",gapfillExact("request","4"),"not in its database, it will ",["pass on",function(answer){return {5:keyword(answer,["pass on","forward"],1)}}]," the request to ",["another server",function(answer){return {4:keyword(answer,["server"])}}]," until it reaches one with the matching name and address.</p>",
			"<p>Lower level DNS servers are owned by ",["Internet Service Providers (ISP's)",function(answer){return {6:keyword(answer,["Internet Service Provider","ISP"],1)}}],"</p>."
		]),
		noTransform:true,
		par:90
	},
	blankComposite([
		{
			text:"Explain the purpose of a Network Interface Card.",
			type:"open",
			topic:"NIC and MAC",
			modelAnswer:"To uniquely identify devices connected to a network. It does so by storing a unique Media Access Control (MAC) address.",
			mark:function(answer){return "56".slice(0,keyword(answer,["ident"])+keyword(answer,["Media Access Control","MAC"],1))},
			par:20
		},
		{
			text:"Complete the sentence:",
			type:"gapfill",
			topic:"NIC and MAC",
			words:gapfillGenerator(["An NIC may be wireless with ",["an antenna",function(answer){return keyword(answer,["antenna"])}]," or wired with ",["a network cable socket",function(answer){return keyword(answer,["network","cable","socket"],2,0.5)}]],1),
			markTransform:x=>x?"5":""
		},
		{
			text:"Which part of a computer normally stores the Network Interface Card?",
			type:"open",
			topic:"NIC and MAC",
			modelAnswer:"Motherboard",
			mark:function(answer){return {A:keyword(answer,["motherboard"])}},
			par:10
		}
	].filter((x,i)=>Math.random()*(i+1)**0.25<1)),
	blankComposite([
		{
			text:"Why does a smartphone have two different MAC addresses?",
			type:"open",
			topic:"NIC and MAC",
			modelAnswer:"One is for Wi-Fi and the other is for Bluetooth",
			mark:function(answer){return {A:keyword(answer,["Wi-Fi","WiFi"],1,0.5)+keyword(answer,["Bluetooth"],1,0.5)}},
			par:15
		},
		{
			text:"Which part of a computer stores the MAC address?",
			type:"open",
			topic:"NIC and MAC",
			modelAnswer:"NIC",
			mark:function(answer){return {3:keyword(answer,["NIC","Network Interface Card"],1)}},
			par:10
		},
		{
			text:"How many unique possible MAC addresses are there? Give your answer as a power of two.",
			type:"gapfill",
			topic:"NIC and MAC",
			words:gapfillGenerator(["2<sup>",gapfillExact("48"),"</sup>"],1),
			markTransform:x=>x?"A":"",
			par:10
		}
	].select(ranint(1,3,true)).qSort()),
	// Unit 05
	{
		text:"In January 2020 the Metropolitan Police began to use live facial recognition.",
		type:"composite",
		components:[
			{
				text:"Describe how this system works.",
				type:"open",
				topic:["facial recognition","artificial intelligence"],
				modelAnswer:"It identifies people on a 'watchlist'. If it finds a match, it can alert police officers so that they stop the person.",
				mark:function(answer){return "34".slice(0,keyword(answer,["people","match"],"u",0.5)+keyword(answer,["identif","watchlist"],1,0.5)+keyword(answer,["alert","inform","notif","tell"],1,0.5)+keyword(answer,["police","officer"],1,0.5))},
				par:40
			},
			(()=>{
				let num = ranint(1,2,true)
				return {
					text:"Explain "+pluralize(num,"advantage")+" of this system.",
					type:"open",
					topic:["facial recognition","artificial intelligence"],
					modelAnswer: ["The system can be used to find criminals wanted by the police or courts, as well as people reported as missing. These people may be at risk of harm to themselves or others.",
					"It is also hoped to deter people from crime and save the police time."].slice(0,num).join("<br>"),
					mark:function(answer){
						let marks = []
						// finding criminals
						marks.push(keyword(answer,["find","locat","track","identif"],1)+keyword(answer,["criminals","missing","harm"],2,0.5))
						// crime deterrence
						marks.push(keyword(answer,["deter","prevent"],1)+keyword(answer,["save","time"],2,0.5))
						return bestMarks(marks,num,"56")
					},
					par:25*num
				}
			})(),
			(()=>{
				let num = ranint(1,3,true)
				return {
					get text(){return "Explain "+pluralize(num,"disadvantage")+" of this system."},
					type:"open",
					topic:["facial recognition","artificial intelligence"],
					get modelAnswer(){return [
						"Systems like this use personal biometric data which some people may not consent to.",
						"They may alter public behaviour - for example, people may no longer wish to take part in peaceful protests.",
						"There is evidence that facial recognition technology may be likely to misidentify people of colour, as a result of its training data usually consisting of mostly white men."
					].select(num).join("<br>")},
					mark:function(answer){
						let marks = []
						// personal biometric data
						marks.push(keyword(answer,["personal","biometric","data","consent"],4,0.5))
						// alter public behaviour
						marks.push(keyword(answer,["alter","change"],1,0.5)+keyword(answer,["public","behavio"],2,0.25)+keyword(answer,["want","wish","desire","choose"],1,1/3)+keyword(answer,["take part","participate","join"],1,1/3)+keyword(answer,["peaceful","protest"],2,1/6))
						// misidentify people of colour
						marks.push(keyword(answer,["misidentify","incorrect","wrong"],1,0.5)+keyword(answer,["black","colour","people"],2,0.25)+keyword(answer,["train"],1,0.5)+keyword(answer,["white"],1,0.25)+keyword(answer,["men","males"],1,0.25))
						return bestMarks(marks,num,"45")
					},
					par:25*num
				}
			})()
		].select(ranint(1,3)).qSort()
	},
	{
		text:"State how robots can work in each of the below:",
		type:"composite",
		components:[
			{
				text:"Amazon warehouses",
				type:"open",
				topic:"artificial intelligence",
				modelAnswer:"Robots can move products on shelves to pickers, making the pickers far more efficient",
				mark:function(answer){return {4:keyword(answer,["mov","picker"],2,0.5)+keyword(answer,["efficien","effectiv","fast","quick","speed"],1,0.5)}},
				par:20
			},
			{
				text:"Fast food restaurants",
				type:"open",
				topic:"artificial intelligence",
				modelAnswer:"They enable customers to order their own food",
				mark:function(answer){return {3:keyword(answer,["own","auto","self"],1)}},
				par:20
			},
			{
				text:"Hotels",
				type:"open",
				topic:"artificial intelligence",
				modelAnswer:"Robots such as Maidbot can clean hotel rooms automatically",
				mark:function(answer){return {5:keyword(answer,["clean"])}},
				par:20
			}
		].select(ranint(2,3,true)).qSort()
	},
	{
		text:"Internet speeds in the countryside are generally lower than in densely populated areas.",
		type:"composite",
		components:[
			(()=>{
				let num = ranint(1,3,true)
				return {
					text:"What information and services may someone in the countryside struggle to access? Give "+pluralize(num,"example")+".",
					type:"open",
					topic:"the digital divide",
					get modelAnswer(){return ["Video services such as iPlayer, Netflix or YouTube","Communication tools such as Skype","Video games","Cloud services"].select(num)},
					mark:function(answer){return "334".slice(0,keyword(answer,["video","communication","game","cloud"],num))},
					par:num*10
				}
			})(),
			(()=>{
				let num = ranint(1,3,true)
				return {
					text:"How may this affect someone starting a business? Give "+pluralize(num,"example")+",",
					type:"open",
					topic:"the digital divide",
					get modelAnswer(){return "They may find it harder to set up their website<br>"+["Sharing photos or videos of products will be harder","The website may be slower to respond to customer queries","They may not have access to newer cloud services"].select(num-1).join("<br>")},
					mark:function(answer){
						if ((keyword(answer,["web"])+keyword(answer,["page","site"],1))<2) return {}
						let marks = []
						marks.push(keyword(answer,["hard","difficult","problem","challenge"],1,0.5)+keyword(answer,["set","up"],2,0.25))
						marks.push(keyword(answer,["video","photo"],1))
						marks.push(keyword(answer,["respond","quer"],2,0.5))
						marks.push(keyword(answer,["new","cloud"],2,0.5))
						return "334".slice(0,marks.map(x=>Math.floor(x)).sum())
					},
					par:10*num
				}
			})()
		]
	},
	{
		text:"As of 2020, what proportion of 18-34-year-olds regularly works remotely?",
		type:"multiplechoice",
		topic:"remote work",
		answers:multipleChoiceGenerator(["70%"],1,["10%","20%","30%","40%","50%","60%","80%","90%"],3),
		markTransform:x=>x?"A":"",
		par:10
	},
	(()=>{
		let num = ranint(1,ranint(2,5,true),true)
		return {
			text:"Explain "+pluralize(num,"advantage")+" of remote work.",
			type:"open",
			topic:"remote work",
			modelAnswer:[
				"There will be less commuting, saving time and money.",
				"There will be less commuting, causing less pollution due to transportation.",
				"The company will not have to build as much office space, saving it money.",
				"Because employees do not have to travel to work, they do not have to relocate.",
				"Because employees are not limited by their proximity to the workplace, companies have a wider pool of candidates to choose from.",
				"Because employees spend less time commuting, they can improve their work-life balance.",
				"Because employees do not have to be physically present, virtual meetings can take place where face-to-face communication is not possible."
			].select(num).join("<br>"),
			mark:function(answer){
				let marks = []
				marks.push(keyword(answer,["sav","time","money"])<2?0:keyword(answer,["commut","travel","transport"])<1?1:2)
				marks.push(keyword(answer,["pollut","environment"])<1?0:keyword(answer,["commut","travel","transport"])<1?1:2)
				marks.push(keyword(answer,["sav","money"])<1?0:keyword(answer,["office","space","build"])<1?1:2)
				marks.push(keyword(answer,["relocate","move","house"])<1?0:keyword(answer,["commut","travel","transport"])<1?1:2)
				marks.push(keyword(answer,["wider","more","number","amount"],1)+keyword(answer,["people","candidates","workers","employees"],1)<2?0:keyword(answer,["distance","proximity","far","commut","travel","transport"])<1?1:2)
				marks.push(keyword(answer,["work","life","balance"])<3?0:keyword(answer,["commut","travel","transport"])<1?1:2)
				marks.push(keyword(answer,["meet","conference","communicat"])<1?0:keyword(answer,["face","physical","present","commut","travel","transport"])<1?1:2)
				let out = bestMarks(marks,num,"45")
				let extra = 0
				if (out[5]>2) {extra+=out[5]-2;out[5]=2}
				if (out[4]>3) {extra+=out[4]-3;out[4]=3}
				return addMarks([out,"66789".slice(0,extra)])
			},
			par:20*num
		}
	})(),
	(()=>{
		let num = ranint(1,ranint(1,5,true),true)
		return {
			text:"Explain "+pluralize(num,"disadvantage")+" of remote work.",
			level:5,
			type:"open",
			topic:"remote work",
			get modelAnswer(){return [
				"Remote workers can feel isolated due to the lack of contact with other employees",
				"There is less face-to-face contact, which can make it harder to build relationships with colleagues or participate in meetings",
				"It is difficult for companies to monitor employee performance, reducing profits",
				"It can be difficult to stop focusing on work, which disrupts work-life balance",
				"It can be hard to avoid distractions when working at home from children, spouses, pets and doorbells"
			].select(num)},
			mark:function(answer){
				let marks = []
				marks.push(keyword(answer,["isolate","lone"])<1?0:keyword(answer,["contact","employee","worker"])<1?1:2)
				marks.push(keyword(answer,["friend","ship"])<1?0:keyword(answer,["face","contact","physical","person"])<1?1:2)
				marks.push(keyword(answer,["monitor","check","assess","ensure"])<1?0:keyword(answer,["profit","earning","money"])<1?1:2)
				marks.push(keyword(answer,["focus","boundar","border"])<1?0:keyword(answer,["balance"])<1?1:2)
				marks.push(keyword(answer,["distract"])<1?0:keyword(answer,["child","spouse","pet","doorbell"])<1?1:2)
				let out = bestMarks(marks,num,"45")
				let extra = 0
				if (out[5]>2) {extra+=out[5]-2;out[5]=2}
				if (out[4]>3) {extra+=out[4]-3;out[4]=3}
				return addMarks([out,"66789".slice(0,extra)])
			},
			par:20*num
		}
	})(),
	// Unit 07
	(()=>{
		let categories = [  // $ = "s" for plural (example: "which [number] use$ iteration")
			["make use of iteration",3],
			["cannot compile",6],
			["use casting",3],
			["include a nested if-statement",4],
			["make use of sequence",4],
			["use arrays",6]
		]
		let options = [
			["i = 0<br>while i<10:<br>  print(i)<br>  i=i+1",[0,4]],
			["score = 100<br>while score != 0:<br>  playGame()",[0,4]],
			["age = int(input(\"How old are you?\"))<br>next = age + 1<br>print \"Next birthday, you will be\",age,\"years old\"",[1,2,4]],
			["points = int(input(\"What are your total GCSE points?\"))<br>if points>=35:<br>  if points>=40:<br>    print(\"You can go to Sixth Form\")<br>  else:<br>    print(\"An interview is needed\")<br>else:<br>  print(\"Sorry, you cannot go to Sixth Form\")\"",[2,3,4]],
			["month = input(\"What month is it?\")<br>day = input(\"What day number is it?\")<br>if month==12 and day==25:<br>  print(\"Today is Christmas Day\")<br>else:<br>  print(\"Today is not Christmas\")",[4]],
			["name = input(\"What is your name?\")<br>surname = input(\"What is your surname?\")<br>username = name[0:3] + surname[0:3]<br>print(\"Your username is\",username)",[4]],
			["seeAnother = \"yes\"<br>while seeAnother==\"yes\":<br>  number = int(input(\"Which record do you want to see?\"))<br>  print(\"On this day it was\",degrees[number],\"degrees\")<br>  seeAnother=input(\"Do you want to see another record?\")",[0,2,4,5]],
			["num1 = int(input(\"Input your first number\"))<br>num2 = int(input(\"Input your second number\"))<br>if num1>num2:<br>  print(\"The bigger number is \"num1)<br>else:<br>  print(\"The bigger number is \"num2)",[1,2,4]]
		].select(ranint(3,8,true))
		let out = []
		for (let i=0;i<categories.length;i++) {
			if ((Math.random()*categories.length>3)&&(out.length>0)) continue
			let correct = []
			for (let j=0;j<options.length;j++) if (options[j][1].includes(i)) correct.push(String.fromCharCode(j+65))
			let subMarks = (correct.length===0)?-1:(correct.length===options.length)?(correct.length-1):Math.max(0,correct.length*2-options.length) // if 4 out of 5 answers of correct question should be out of 1 not 4, then subMarks appeared
			out.push({
				text:"Which "+categories[i][0]+"?",
				type:"multiplechoice",
				topic:"programming",
				answers:multipleChoiceGenerator(correct,correct.length,countTo(options.length).map(x=>String.fromCharCode(x+64)),options.length-correct.length),
				markTransform:x=>String(categories[0][1]+Math.floor((options.length-2)/3)).repeat(x-subMarks),
				par:10+(options.length+correct.length)/2
			})
		}
		return {text:"Consider the below Python programs:<br>"+options.map((x,i)=>"<div style=\"width:40%;min-height:100px;margin:10px;border-style:solid\">Program "+String.fromCharCode(65+i)+"<br><pre>"+x[0]+"</pre></div>").join(""),type:"composite",components:out.qSort()}
	})(),
	multipleChoiceComposite("Select an appropriate data type to store each of the below:",[
		["Someone's birth year",["Integer"],"2"],
		["Whether a person is of legal age",["Boolean"],"3"],
		["Someone's full name",["String"],"2"],
		["A person's eight highest GCSE grades",["Array"],"4"]
	],ranint(2,6,true),"programming"),
	// Miscellaneous
	expandListOfAbbreviations([
		// U1
		["CPU","Central Processing Unit","3"],
		["RAM","Random Access Memory","3"],
		["ROM","Read-Only Memory","4"],
		["MAR","Memory Address Register","4"],
		["MDR","Memory Data Register","4"],
		["ALU","Arithmetic-Logic Unit","3"],
		["BIOS","Basic Input-Output System","4"],
		["OS","Operating System","2"],
		["HDD","Hard Disk Drive","3"],
		["SSD","Solid State Drive","3"],
		["CD","Compact Disc","2"],
		["DVD","Digital Versatile Disc","3"],
		// U2
		["KB","kilobyte","2"],
		["MB","megabyte","2"],
		["GB","gigabyte","2"],
		["TB","terabyte","3"],
		["PB","petabyte","3"],
		["EB","exabyte","A"],
		["ZB","zettabyte","A"],
		["YB","yottabyte","A"],
		["RB","ronnabyte","A"],
		["QB","quettabyte","A"],
		// U3
		["IP","Internet Protocol","2"],
		["LAN","Local Area Network","3"],
		["MAN","Metropolitan Area Network","A"],
		["WAN","Wide Area Network","3"],
		["DNS","Domain Name Server","4"],
		["NIC","Network Interface Card","4"],
		["MAC","Media Access Control","4"],
		// U5
		["AI","Artificial Intelligence","1"]
	])
]