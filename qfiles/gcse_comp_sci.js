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
			{
				text:"",
				type:"composite",
				components:[
					(()=>{
						let correct = ranint(1,3,true)
						let incorrect = ranint(2,4,true)
						return {
							get text(){return "Select the "+pluralize(correct,"input device")+" of a computer."},
							type:"multiplechoice",
							level:2,
							answers:multipleChoiceGenerator(["Keyboard","Buttons","Trackpad","Microphone"],correct,["Speakers","Display","Processor","MDR","ALU","CPU"],incorrect),
							markTransform:function(x){
								let max = Math.floor(Math.log2(correct)+1)
								return x*max/correct
							},
							get par(){return 8*correct+2*incorrect}
						}
					})(),
					(()=>{
						let correct = ranint(1,5,true)
						let incorrect = ranint(3,6,true)
						return {
							get text(){return "Select the "+pluralize(correct,"input device")+" of a smartphone."},
							type:"multiplechoice",
							level:2,
							answers:multipleChoiceGenerator(["Microphone","Buttons","GPS sensor","Gyroscopic sensor","Touchscreen"],correct,["Speakers","Display","Processor","MDR","ALU","CPU"],incorrect),
							markTransform:function(x){
								let max = Math.floor(Math.log2(correct)+1)
								return x*max/correct
							},
							get par(){return 8*correct+2*incorrect}
						}
					})()
				]
			},
			{
				text:"Select the two output devices.",
				type:"multiplechoice",
				level:1,
				answers:multipleChoiceGenerator(["Speakers","Display"],2,["Camera","Microphone","Keyboard","Buttons"],2),
				markTransform:x=>x,
				par:15
			}
		]
	},
	{
		text:"Describe the concept of a stored-program computer.",
		type:"open",
		level:4,
		modelAnswer:"In a stored-program computer, program instructions and the data used by the programs are both stored in the same memory. The CPU accesses both instructions and data from the same RAM.",
		mark:function(answer){return keyword(answer,["instructions","data","memory"],3,8/15)+keyword(answer,["CPU","access","RAM"],2,0.8)},
		par:40
	},
	{
		text:"Name the architecture typically used by stored-program computers.",
		type:"open",
		level:3,
		modelAnswer:"von Neumann architecture",
		mark:function(answer){return keyword(answer,["von","Neumann","architecture"],3,1/3)},
		par:15
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Give the full names of the two major components of the CPU.",
				type:"open",
				level:3,
				modelAnswer:"Control Unit; Arithmetic-Logic Unit.",
				mark:function(answer){return keyword(answer,["Control","Unit"],2,0.5)+keyword(answer,["Arithmetic","Logic","Unit"],3,1/3)},
				par:20
			},
			{
				text:"The CPU also contains memory locations called registers.",
				type:"composite",
				components:[
					{
						text:"Select the four registers of a CPU.",
						type:"multiplechoice",
						level:2,
						answers:multipleChoiceGenerator(["Program Counter","Memory Address Register","Memory Data Register","Accumulator"],4,["Random Access Memory","Read-Only Memory","Arithmetic-Logic Unit","SD card"],4),
						markTransform:x=>x*0.75,
						par:30
					},
					{
						text:"Two of the registers of the CPU work together. Name these registers and explain how they work together.",
						type:"open",
						level:3,
						modelAnswer:"The Memory Address Register (MAR) and Memory Data Register (MDR) work together as the MAR holds the address of data or instructions that need to be executed, and the MDR stores the instructions or data itself until the CPU can execute it.",
						mark:function(answer){return keyword(answer,["Memory Address Register","MAR"],1,0.5)+keyword(answer,["Memory Data Register","MDR"],1,0.5)+keyword(answer,["store","address","instruction","data","execute"],5,0.5)},
						par:15
					}
				]
			}
		]
	},
	{
		text:"The CPU contains memory locations. What word is used to refer to these?",
		type:"open",
		level:2,
		modelAnswer:"Registers",
		mark:function(answer){return keyword(answer,["register"])},
		par:10
	},
	{
		text:"Explain the function of the Control Unit.",
		type:"open",
		level:5,
		modelAnswer:"The Control Unit coordinates and controls all of the activities taking place within the CPU. It decodes instructions and executes them, receives signals from the system clock and directs the timing and control of other parts of the CPU.",
		mark:function(answer){return keyword(answer,["coordinate","control"])+keyword(answer,["fetch","decode","execute"],2,0.5)+keyword(answer,["signal","clock"],2,0.5)},
		par:30
	},
	{
		text:"Explain the function of the Arithmetic Logic Unit.",
		type:"open",
		level:5,
		modelAnswer:"The Arithmetic Logic Unit performs arithmetic operations and logical operations such as AND, OR and NOT.",
		mark:function(answer){return clamp(keyword(answer,["arithmetic","logic","operation"])-1,2)},
		par:20
	},
	{
		text:"The CPU operates by repeating three operations in a cycle called the fetch-decode-execute cycle. State what happens at each stage of this cycle.",
		type:"composite",
		components:[
			{
				text:"Fetch",
				type:"open",
				level:5,
				modelAnswer:"The next instruction and any data involved is fetched from memory, and the program counter is incremented",
				mark:function(answer){return clamp(keyword(answer,["instruction","data"])+keyword(answer,["fetch","retrieve","access"],1)+keyword(answer,["program counter","increase","increment"],2,0.5)-1,3)},
				par:30
			},
			{
				text:"Decode",
				type:"open",
				level:5,
				modelAnswer:"The instruction is decoded, or converted to an executable format",
				mark:function(answer){return keyword(answer,["decode"])+keyword(answer,["convert","format","execut","read"],2,0.5)},
				par:20
			},
			{
				text:"Execute",
				type:"open",
				level:5,
				modelAnswer:"The instruction is executed and its results are stored in the accumulator",
				mark:function(answer){return clamp(keyword(answer,["execute","accumulator"])+keyword(answer,["store","save"],1)-1,2)},
				par:20
			}
		]
	},
	{
		text:"Explain the function of the program counter.",
		type:"open",
		level:5,
		modelAnswer:"The program counter holds the address of the next instruction to be executed. It is incremented as soon as the instruction is fetched.",
		mark:function(answer){return keyword(answer,["hold","store","contain","has"],1,0.5)+keyword(answer,["address","increment","fetch"],3,0.5)},
		par:30
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain the function of the accumulator.",
				type:"open",
				level:4,
				modelAnswer:"The accumulator temporarily stores arithmetic and logic results.",
				mark:function(answer){return keyword(answer,["store","hold"],1)+keyword(answer,["temporar","until","before"],1)+keyword(answer,["arithmetic","logic","result"],3,1/3)},
				par:40
			},
			{
				text:"Which two functions of a calculator can the accumulator be compared to?",
				type:"multiplechoice",
				level:"A",
				answers:multipleChoiceGenerator(["M+","M-"],2,["MC","CE","log","CNC","OFF","+/-"],6),
				markTransform:x=>x,
				par:10
			}
		]
	},
	{
		text:"The processes carried out by the CPU can be represented in a table.",
		type:"composite",
		components:[
			(function(){
				let num = [ranint(6,12,true),ranint(4,8,true)]
				return {
					text:"Complete the table for a program that carries out the operation \""+num[0]+" + "+num[1]+"\" and store it in memory location 8.",
					type:"gapfill",
					level:6,
					words:resources_gcse_comp_sci.CPULanguageGapfillGenerator(["","","LDA 7",["ADD #"+num[1]],["STO 8"],"",num[0],""]),
					markTransform:x=>x,
					par:40
				}
			})(),
			{
				text:"",
				type:"composite",
				components:(function(){
					let num = []
					num[0] = ranint(4,8,true)
					num[1] = ranint(3,5,true)
					num[3] = ranint(3,5,true)
					num[2] = num[3]*ranint(4,8,true)
					return [
						{
							text:"Complete the table for a program that carries out the operation \"[15] * [14] - [13] ÷ [12]\" (where [x] is the contents of memory address x) and stores the result in memory address 11. Remember order of operations!",
							type:"gapfill",
							level:9,
							words:resources_gcse_comp_sci.CPULanguageGapfillGenerator(["",["LDA 15"],["MUL 14"],"STO 10",["LDA 13"],["DIV 12"],"STA 9",["LDA 10"],["SUB 9"],"STO 11","",num[3],num[2],num[1],num[0]],4),
							markTransform:x=>x,
							par:90
						},
						{
							text:"What value will get stored in memory address 11 when this program runs?",
							type:"open",
							level:9,
							modelAnswer:num[0]*num[1]-num[2]/num[3],
							mark:function(){return markTemplate.number(num[0]*num[1]-num[2]/num[3])},
							par:20
						}
					]
				})()
			}
		]
	},
	{
		text:"Select the three most common factors that may affect the speed of a CPU.",
		type:"multiplechoice",
		level:2,
		answers:multipleChoiceGenerator(["Clock speed","Number of cores","Cache size"],3,["RAM","ROM","Storage","Time of day","Price","Whether or not the system is embedded"],3),
		markTransform:x=>x*2/3,
		par:30
	},
	{
		text:"One of the most common factors that may affect the speed of a CPU is clock speed.",
		type:"composite",
		components:[
			{
				text:"State what is meant by clock speed.",
				type:"open",
				level:5,
				modelAnswer:"The number of fetch-decode-execute cycles per second",
				mark:function(answer){return keyword(answer,["cycle","per","second"],3,1/3)},
				par:15
			},
			{
				text:"Select the unit used to measure clock speed.",
				type:"multiplechoice",
				level:4,
				answers:multipleChoiceGenerator(["Hertz (Hz)"],1,["Cycles per second (cps)","Megabits per second (Mbps)","Gigabytes (GB)"],3),
				markTransform:x=>x,
				par:10
			},
			{
				text:"How would performance increase if clock speed was doubled?",
				type:"multiplechoice",
				level:1,
				answers:multipleChoiceGenerator(["Double"],1,["Halve","Quadruple","Quarter"],3),
				markTransform:x=>x,
				par:10
			},
			{
				text:"Fill in the gaps:",
				type:"gapfill",
				level:3,
				words:gapfillGenerator(["Everything in the computer happens on the ",["pulse",function(answer){return answer.replaceAll(" ","").toLowerCase()=="pulse"?1:0}],"of a clock."]),
				markTransform:x=>x,
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
				level:5,
				modelAnswer:"A duplicate processing unit",
				mark:function(answer){return keyword(answer,["processor","processing unit"],1)},
				par:15
			},
			{
				text:"",
				type:"composite",
				components:[
					{
						text:"Under ideal conditions, by what factor would performance increase if the number of cores was doubled?",
						type:"multiplechoice",
						level:3,
						answers:multipleChoiceGenerator(["2"],1,["Less than 2","More than 2"],2),
						markTransform:x=>x,
						par:10
					},
					{
						text:"Suggest a scenario in which your answer to part (b)(i) may not be true.",
						type:"open",
						level:5,
						modelAnswer:"If a computer is running a single program, it may not necessarily be any faster, since the program may have been designed to only run on one core.",
						mark:function(answer){return keyword(answer,["single","one","1","few"],1,2/3)+keyword(answer,["program","core"],2,2/3)},
						par:10
					}
				]
			}
		]
	},
	{
		text:"One of the most common factors that may affect the speed of a CPU is the cache size.",
		type:"composite",
		components:[
			{
				text:"State what is meant by cache.",
				type:"open",
				level:4,
				modelAnswer:"Memory stored on the CPU",
				mark:function(answer){return keyword(answer,["memory","CPU"],2,1/2)},
				par:15
			},
			{
				text:"How fast is cache relative to other forms of memory? Select <b>two</b> options.",
				type:"multiplechoice",
				level:2,
				answers:multipleChoiceGenerator(["Faster than RAM","Slower than registers"],2,["Slower than RAM","Roughly the same speed as RAM","Faster than registers","Roughly the same speed as registers"],4),
				markTransform:x=>x,
				par:20
			},
			{
				text:"There are multiple levels of cache.",
				type:"composite",
				components:[
					{
						text:"How many?",
						type:"multiplechoice",
						level:2,
						answers:multipleChoiceGenerator(["3"],1,["2","4","5","6"],3),
						markTransform:x=>x,
						par:10
					},
					{
						text:"Fill in the gaps:",
						type:"gapfill",
						level:3,
						words:gapfillGenerator(["Level ",["1",function(answer){return ["1","one"].includes(answer.toLowerCase())?1:0}]," cache is extremely fast, but also extremely small (typically between 2-256 ",["KB",function(answer){return ["KB","kilobytes"].includes(answer)?1:0}],"). Each core will have its own cache of this type.<br><br>Level ",["3",function(answer){return ["3","three"].includes(answer.toLowerCase())?1:0}]," cache is the slowest type of cache, but still faster than ",["RAM",function(answer){return answer=="RAM"?1:0}],". It is usually located on the CPU and stores ",["MB",function(answer){return ["MB","megabytes"].includes(answer)?1:0}],". It is shared between all cores on a CPU."],4),
						markTransform:x=>x,
						par:40
					}
				]
			}
		]
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Approximately what percentage of the time is Level 1 cache used?",
				type:"multiplechoice",
				level:"A",
				answers:multipleChoiceGenerator(["50%"],1,["10%","20%","30%","40%","60%","70%","80%","90%"],5),
				markTransform:x=>x,
				par:10
			},
			{
				text:"Approximately what percentage of the time is Level 2 cache used?",
				type:"multiplechoice",
				level:"A",
				answers:multipleChoiceGenerator(["90%"],1,["10%","20%","30%","40%","50%","60%","70%","80%"],5),
				markTransform:x=>x,
				par:10
			}
		]
	},
	(function(){
		let devices = []
		for (let i=0;i<8;i++) devices.push([String.fromCharCode(65+i),ranint(0,3),ranint(10,99,true)/10])
		let sorted = devices.sort((a,b)=>(2**b[1]*b[2])-(2**a[1]*a[2])).map(x => x[0])
		return {
			text:"Consider the following eight devices: <ul>"+devices.map(x => "<li>"+x[0]+": A "+(2**x[1])+" core processor running at "+x[2]+" GHz</li>").join("")+"Select the <b>four</b> devices which are <b>fastest</b>.",
			type:"multiplechoice",
			level:6,
			answers:multipleChoiceGenerator(sorted.slice(0,4),4,sorted.slice(4,8),4),
			markTransform:x=>x,
			par:160
		}
	})(),
	{
		text:"Devices with simple inputs normally use embedded systems.<br>Explain what an embedded computer is.",
		type:"open",
		level:6,
		modelAnswer:"A single microprocessor that includes RAM, ROM and CPU",
		mark:function(answer){return keyword(answer,["microprocessor"])+keyword(answer,["RAM","ROM","CPU"],3,1/3)},
		par:20
	},
	(()=>{
		let correct = ["Personal computer","Laptop","Smartphone","Tablet","Server"]
		let incorrect =["Car","Microwave","Washing machine","Credit card reader","Calculator","GPS system","Dishwasher","Central heating system","Digital alarm clock","Television","Video game console","Solar panel controller","Vending machine","Automated teller machine (ATM)","Burglar alarm","Digital watch"]
		return {
			text:"Select the <b>four</b> devices which are unlikely to use embedded systems.",
			type:"multiplechoice",
			level:3,
			answers:multipleChoiceGenerator(correct,4,incorrect,8),
			markTransform:x=>x,
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
				level:1,
				answers:multipleChoiceGenerator([["Embedded","General purpose"][ans]],1,[["General purpose","Embedded"][ans]],1),
				markTransform:x=>x,
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
				level:1,
				answers:multipleChoiceGenerator([["Primary","Secondary"][i[1]-1]],1,[["Secondary","Primary"][i[1]-1]],1),
				markTransform:x=>x,
				par:10
			})
		}
		return out
	})(),
	{
		text:"Describe what primary storage is used for in the von Neumann architecture.",
		type:"open",
		level:5,
		modelAnswer:"To store programs that are currently running and need to be accessed by the CPU.",
		mark:function(answer){return keyword(answer,["store","program","currently","access","CPU"],5,0.5)+keyword(answer,["use","running"],1,0.5)},
		par:30
	},
	{
		text:"When a computer is turned off, all data stored in RAM is lost.",
		type:"composite",
		components:[
			{
				text:"State the technical term for this.",
				type:"open",
				level:2,
				modelAnswer:"Volatility",
				mark:function(answer){return keyword(answer,["volatil"])-keyword(answer,["no"])},
				par:10
			},
			(function(){
				let parts = [["Hard drive",0],["ROM",0],["Cache",1],["CPU registers",1]].select(ranint(2,4,true))
				let out = {
					text:"For each of the below, select whether or not they lose data in this way when the computer is turned off.",
					type:"composite",
					components:[]
				}
				for (let i of parts) {
					out.components.push({
						text:i[0],
						type:"multiplechoice",
						level:1,
						answers:multipleChoiceGenerator([["Don't lose data","Lose data"][i[1]]],1,[["Lose data","Don't lose data"][i[1]]],1),
						markTransform:x=>x,
						par:10
					})
				}
				return out
			})()
		]
	},
	{
		text:"State what is meant by RAM being volatile.",
		type:"open",
		level:4,
		modelAnswer:"When the computer is turned off, data stored in RAM is lost.",
		mark:function(answer){return keyword(answer,["turn","switch"],1,0.5)+keyword(answer,["off","data","store"],3,1/3)+keyword(answer,["lost","deleted"],1,0.5)},
		par:20
	},
	{
		number:ranint(1,3,true),
		get text(){return "State "+pluralize(this.number,"example")+" of things which are normally stored on RAM at a given time."},
		type:"open",
		get level(){return this.number+2},
		get modelAnswer(){return ["The operating system","The software currently in use","Data used by this software"].slice(0,this.number).join("<br>")},
		mark:function(answer){return keyword(answer,["operating system","software","data"],this.number)},
		get par(){return 5+10*this.number}
	},
	{
		text:"A user attempts to open a browser to search the Internet, but the browser software needs more memory to run than is available in RAM. What <b>two</b> things can happen as a result?",
		type:"open",
		level:3,
		modelAnswer:"Either virtual memory is allocated, or an error occurs.",
		mark:function(answer){return keyword(answer,["virtual","memory"],2,0.5)+keyword(answer,["error","crash"],1)},
		par:20
	},
	{
		text:"Explain why virtual memory is slow.",
		type:"open",
		level:7,
		modelAnswer:"To access data, the existing data in RAM needs to be copied to the virtual memory, then data in virtual memory needs to be copied to RAM.",
		mark:function(answer){return keyword(answer,["access","data","existing","RAM","cop","virtual","memory"],6,1/2)},
		par:45
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State the technical term for the initial program which is run when a computer is turned on.",
				type:"open",
				level:3,
				modelAnswer:"Bootstrap",
				mark:function(answer){return keyword(answer,["bootstrap"])-keyword(answer,["OS","operating system"])},
				par:10
			},
			{
				text:"Select where this program gets stored.",
				type:"multiplechoice",
				level:2,
				answers:multipleChoiceGenerator(["ROM"],1,["RAM","Virtual memory","BIOS","Cache"],3),
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
				text:"Explain the purpose of the BIOS.",
				type:"open",
				level:6,
				modelAnswer:"It controls basic technical configuration such as the processor speed and system time.",
				mark:function(answer){return keyword(answer,["configuration","time"],2,2/3)+keyword(answer,["processor","speed"],2,1/3)
				},
				par:20
			},
			{
				text:"Select where the BIOS gets stored.",
				type:"multiplechoice",
				level:2,
				answers:multipleChoiceGenerator(["ROM"],1,["RAM","Virtual memory","BIOS","Cache"],3),
				markTransform:x=>x,
				par:10
			},
			{
				text:"Fill in the gaps:",
				type:"gapfill",
				level:3,
				words:gapfillGenerator(["The BIOS can run without a ",["hard drive",function(answer){return answer.replaceAll(" ","").toLowerCase()=="harddrive"?1:0}]," or other secondary ",["storage",function(answer){return answer.replaceAll(" ","").toLowerCase()=="storage"?1:0}]," being present."],ranint(1,2)),
				markTransform:x=>x,
				get par(){return maxMark(this)*10}
			}
		].select(ranint(1,3,true))
	},
	{
		text:"What is the typical size of ROM?",
		type:"multiplechoice",
		level:"A",
		answers:multipleChoiceGenerator(["4 - 8 MB"],1,["4 - 8 KB","16 - 32 KB","64 - 128 KB","256 - 512 KB","1 - 2 MB","16 - 32 MB","64 - 128 MB"],7),
		markTransform:x=>x,
		par:10
	},
	{
		number:ranint(1,6,true),
		get text(){return "State "+pluralize(this.number,"characteristic")+" of secondary storage devices that a buyer should consider."},
		type:"open",
		get size(){return this.number>2?2:1},
		get level(){return this.number},
		answers:["Capacity","Speed","Portability","Durability","Reliability","Cost"],
		get modelAnswer(){return this.answers.select(this.number).join("; ")},
		mark:function(answer){return keyword(answer,this.answers,this.number)*[1,2,2,3,3,4][this.number-1]/this.number},
		get par(){return 2+8*this.number}
	},
	{
		number:ranint(1,4,true)+ranint(1,4,true),
		get text(){return "State "+pluralize(this.number,"example")+" of offline secondary storage."},
		type:"open",
		get size(){return this.number>2?2:1},
		get level(){return this.number},
		get modelAnswer(){return ["Compact Disc (CD)","Digital Versatile Disc (DVD)","BluRay","Flash memory","SD card","Removable HDD","Removable SSD","Magnetic tape"].select(this.number).join("; ")},
		mark:function(answer){
			let marks = keyword(answer,["BluRay","Flash memory","SD card","Magnetic tape"])+keyword(answer,["Compact Disc","CD"],1)+keyword(answer,["Digital Versatile Disc","DVD"],1)+keyword(answer,["Removable HDD","Removable hard disk drive"],1)+keyword(answer,["Removable SSD","Removable solid state drive"],1)
			return Math.min(marks,this.number)*[1,2,2,3,3,4,5,5][this.number-1]/this.number
		},
		get par(){return 10*this.number}
	},
	{
		number:ranint(1,3,true),
		get text(){return "State "+pluralize(this.number,"type")+" of secondary storage devices."},
		type:"open",
		get level(){return this.number==3?3:2},
		get modelAnswer(){return ["Magnetic","Optical","Solid State"].select(this.number).join("; ")},
		mark:function(answer){return keyword(answer,["Magnetic","Optical","Solid State"],this.number,this.number==3?(2/3):1)},
		get par(){return 10*this.number}
	},
	{
		text:"The surface of a magnetic disk can be divided in two ways.",
		type:"composite",
		components:[
			{
				text:"What are the concentric circles on a magnetic disk called?",
				type:"open",
				level:3,
				modelAnswer:"Tracks",
				mark:function(answer){return keyword(answer,["track"])-keyword(answer,["sector"])},
				par:10
			},
			{
				text:"What are these concentric circles divided into?",
				type:"open",
				level:3,
				modelAnswer:"Sectors",
				mark:function(answer){return keyword(answer,["sector"])-keyword(answer,["track"])},
				par:10
			}
		]
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain how magnetic storage works.",
				type:"open",
				level:6,
				modelAnswer:"A drive head moves over the disk surface or magnetic tape to read or write data magnetically",
				mark:function(answer){return keyword(answer,["head","move","surface","tape"],4,1/3)},
				par:30
			},
			{
				text:"State how bits are physically stored by magnetic storage devices.",
				type:"open",
				level:"A",
				modelAnswer:"As tiny areas of magnetic north or south",
				mark:function(answer){return keyword(answer,["north","south"],2,0.5)},
				par:10
			}
		].slice(0,ranint(1,2))
	},
	{
		number:ranint(1,3),
		get text(){return "State "+pluralize(this.number,"advantage")+" of magnetic storage."},
		type:"open",
		get level(){return this.number==3?4:3},
		get modelAnswer(){return ["They are cheap","They have large storage capacities","They have a relatively fast write speed"].select(this.number).join("<br")},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["cheap"]))
			marks.push(keyword(answer,["high","large"],1,1/3)+keyword(answer,["storage"],1,2/3))
			marks.push(keyword(answer,["high","fast"],1,1/3)+keyword(answer,["write"],2,2/3))
			return Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),this.number)
		},
		get par(){return 10*this.number}
	},
	{
		text:"Explain why moving mechanical parts are a disadvantage of magnetic storage.",
		type:"open",
		level:3,
		modelAnswer:"Because a drive head has to move, read and write speeds are slower than with solid state drive (SSD) storage. In addition, the parts of a HDD can be damaged easily.",
		mark:function(answer){return keyword(answer,["drive","head"],2,0.5)+keyword(answer,["speed","slow","read","write","access"],2,0.5)+keyword(answer,["damage","wear"],1)},
		par:30
	},
	{
		text:"Explain how optical storage works.",
		type:"open",
		level:6,
		modelAnswer:"Data is stored as pits or lands burnt or pressed into a spiral track circulating outwards from the centre. A laser beam passes over the pits and lands and the level of reflection is measured. From this signal bit values can be derived.",
		mark:function(answer){return keyword(answer,["pits","lands"],2,0.5)+keyword(answer,["spiral","laser","reflection"])},
		par:45
	},
	{
		number:ranint(1,3),
		get text(){return "State "+pluralize(this.number,"advantage")+" of optical storage."},
		type:"open",
		get level(){return this.number==3?4:3},
		get modelAnswer(){return ["It is cheap","Disks are very easily portable","Disks are physically compact"].select(this.number).join("<br")},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["cheap"]))
			marks.push(keyword(answer,["port","move","locat"],1))
			marks.push(keyword(answer,["small","compact"],1))
			return Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),this.number)
		},
		get par(){return 10*this.number}
	},
	{
		number:ranint(1,3),
		get text(){return "State "+pluralize(this.number,"disadvantage")+" of optical storage."},
		type:"open",
		get level(){return this.number==3?4:3},
		get modelAnswer(){return ["They have less storage capacity compared to other forms of storage","They are easily damaged or scratched","They require a CD reader","They have slow write speeds"].select(this.number).join("<br")},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["capacity"],1,0.5)+keyword(answer,["low","less"],1,0.5))
			marks.push(keyword(answer,["damage","scratch"],1,0.5)+keyword(answer,["eas"],1,0.5))
			marks.push(keyword(answer,["CD","Compact Disc"],1,0.5)+keyword(answer,["reader"],1,0.5))
			marks.push(keyword(answer,["low","write","speed"],3,1/3))
			return Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),this.number)
		},
		get par(){return 10*this.number}
	},
	{
		text:"Explain why Blu-ray discs can store more data than CD's.",
		type:"open",
		level:5,
		modelAnswer:"Blue light has a higher wavelength than the red light used by CD's, so Blu-rays have smaller pits and lands, enabling them to store more data",
		mark:function(answer){return keyword(answer,["red","blue","light","wavelength"],4,0.5)+keyword(answer,["small","pit","land"],3,1/3)},
		par:30
	},
	{text:"",type:"composite",components:[
		{
			text:"Explain how flash memory works.",
			type:"open",
			level:5,
			modelAnswer:"A large electric current is used to force electrons through a barrier and trap them on the other side. They remain on the other side until 'flashed' with a new current",
			mark:function(answer){return keyword(answer,["electric","current","electron","barrier"],4,0.5)},
			par:30
		},
		{
			text:"Select the storage medium which uses flash memory.",
			type:"multiplechoice",
			level:3,
			answers:multipleChoiceGenerator(["Solid State Drive (SSD)"],1,["Hard Disk Drive (HDD)","CD","Blu-ray","SD card","USB stick"],5),
			markTransform:x=>x,
			par:15
		}
	]},
	{
		number:ranint(1,4),
		get text(){return "State "+pluralize(this.number,"advantage")+" of solid state drives."},
		type:"open",
		get level(){return this.number==4?4:3},
		get modelAnswer(){return ["They are highly durable","They have very fast read/write speeds","They make less noise due to no drive arm or fan","They have faster start-up times"].select(this.number).join("<br")},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["durab"]))
			marks.push(keyword(answer,["no","mov","part"],3,1/3))
			marks.push(keyword(answer,["fast","high"],1,0.5)+keyword(answer,["read","write"],2,0.25))
			marks.push(keyword(answer,["noise","loud","quiet"],1))
			marks.push(keyword(answer,["fast","start"],2,0.5))
			return Math.min(marks.map(x => Math.floor(x)).reduce((x,y)=>x+y),this.number)
		},
		get par(){return 10*this.number}
	},
	// Unit 02
	{
		text:"Select the number of bits in each of the following.",
		type:"composite",
		components:(function(){
			let list = [["nibble","4"],["byte","8"],["kilobit","1,000"],["kilobyte","8,000"],["megabit","1,000,000"],["megabyte","8,000,000"],["gigabit","10<sup>9</sup>"],["gigabyte","8×10<sup>9</sup>"],["terabit","10<sup>12</sup>"],["terabyte","8×10<sup>12</sup>"],["petabit","10<sup>15</sup>"],["petabyte","8×10<sup>15</sup>"],["exabit","10<sup>18</sup>"],["exabyte","8×10<sup>18</sup>"],["zettabit","10<sup>21</sup>"],["zettabyte","8×10<sup>21</sup>"],["yottabit","10<sup>24</sup>"],["yottabyte","8×10<sup>24</sup>"],["ronnabit","10<sup>27</sup>"],["ronnabyte","8×10<sup>27</sup>"],["quettabit","10<sup>30</sup>"],["quettabyte","8×10<sup>30</sup>"]]
			let out = []
			let qNumbers = countTo(22,true).select(ranint(2,8,true))
			for (let i of qNumbers) out.push({text:list[i][0],type:"multiplechoice",level:i>14?"A":Math.ceil(1+i/3),answers:multipleChoiceGenerator([list[i][1]],1,countTo(22,true).filter(x=>x!==i).map(x=>list[x][1]),7),markTransform:x=>x,par:10})
			return out
		})()
	},
	{
		text:"Fill in the table:",
		type:"gapfill",
		level:4,
		words:gapfillGenerator(["<table class=\"table\"><tr class=\"table\"><th class=\"table\">Number of switches (bits)</th><th class=\"table\">Possible combinations or states</th></tr><tr class=\"table\"><td class=\"table\">",["1",(answer)=>(answer=="1"?1:0)],"</td><td class=\"table\">",["2",(answer)=>(answer=="2"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["2",(answer)=>(answer=="2"?1:0)],"</td><td class=\"table\">",["4",(answer)=>(answer=="4"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["3",(answer)=>(answer=="3"?1:0)],"</td><td class=\"table\">",["8",(answer)=>(answer=="8"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["4",(answer)=>(answer=="4"?1:0)],"</td><td class=\"table\">",["16",(answer)=>(answer=="16"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["5",(answer)=>(answer=="5"?1:0)],"</td><td class=\"table\">",["32",(answer)=>(answer=="32"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["6",(answer)=>(answer=="6"?1:0)],"</td><td class=\"table\">",["64",(answer)=>(answer=="64"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["7",(answer)=>(answer=="7"?1:0)],"</td><td class=\"table\">",["128",(answer)=>(answer=="128"?1:0)],"</td></tr><tr class=\"table\"><td class=\"table\">",["8",(answer)=>(answer=="8"?1:0)],"</td><td class=\"table\">",["256",(answer)=>(answer=="256"?1:0)],"</td></tr></table>"],6),
		markTransform:x=>x/2,
		par:40
	},
	{
		text:"",
		type:"composite",
		components:(()=>{
			let bases = [2,3,8,10,16]
			let basePairs = (()=>{let out = [];for (let i of bases) for (let j of bases.filter(x=>x!==i)) out.push([i,j]);return out})()
			let usedPairs = [...basePairs.filter(x=>!x.includes(8)).select(ranint(1,6)),...basePairs.filter(x=>x.includes(8)).filter(x=>Math.random()<0.1)]
			let outList = []
			function baseName(x) {return dictionary(x,[[2,"binary"],[3,"ternary"],[8,"octal"],[10,"denary"],[16,"hexadecimal"]])}
			for (let i of usedPairs) {
				let num = ranint(100,255,true)
				outList.push({
					group:i[0],
					text:"Convert the "+baseName(i[0])+" integer "+num.toString(i[0])+" to "+baseName(i[1]),
					type:"open",
					level:i.includes(8)||i.includes(3)?"A":i.includes(10)?5:(Math.log2(i.product())%1==0)?6:8,
					modelAnswer:num.toString(i[1]),
					mark:function(answer){return ((i.includes(10)||Math.log2(i.product())%1==0)?1:2)-(keyword(answer,[this.modelAnswer])?0:keyword(answer,[num.toString(10)])?1:2)},
					get par(){return this.mark(this.modelAnswer)==2?40:10}
				})
			}
			let out = []
			for (let i of bases) out.push({text:"",type:"composite",components:outList.filter(x=>x.group==i).sort((a,b)=>averageLevel(a)-averageLevel(b))})
			return out.filter(x=>x.components.length>0).sort((a,b)=>averageLevel(a)-averageLevel(b))
		})()
	},
	{
		text:"",
		type:"composite",
		components:(()=>{
			let out = []
			let double = ranint(0,2)
			for (let i=0;i<3;i++) {
				let base = [2,16,8][i]
				let baseName = ["binary","hexadecimal","octal"][i]
				let num = []
				num[0] = ranint(100,238,true)
				num[1] = ranint(16,255-num[0],true)
				if (num[1]>num[0]) num.reverse()
				let next = {
					text:"Add the "+baseName+" integers "+num.map(x=>x.toString(base)).join(" and ")+". Leave your answer as a "+baseName+" integer.",
					type:"open",
					level:[7,6,"A"][i],
					modelAnswer:num.sum().toString(base),
					mark:function(answer){return answer.trim()==this.modelAnswer?1:0},
					par:30
				}
				if (i==double) next = {text:"",type:"composite",components:[next,{
					text:"Convert your answer to part "+questionPartName(1,i+1)+questionPartName(2,1)+" to a denary integer.",
					type:"open",
					level:[8,7,"A"][i],
					modelAnswer:num.sum().toString(),
					mark:function(answer){return answer.trim()==this.modelAnswer?1:0},
					par:30
				}]}
				out.push(next)
			}
			return out
		})()
	},
	{
		text:"Select the two binary numbers which are odd.",
		type:"multiplechoice",
		level:1,
		answers:multipleChoiceGenerator(countTo(2).map(x=>[ranint(1,127).toString(2)+"1"]),2,countTo(6).map(x=>[ranint(1,127).toString(2)+"1"]),6),
		markTransform:x=>x,
		par:10
	},
	(()=>{
		let num=ranint(1,3)
		return {
			text:"Explain "+pluralize(num,"advantage")+" of hexadecimal over binary",
			type:"open",
			level:5,
			modelAnswer:[
				"It is much easier to remember a hexadecimal value rather than a binary value",
				"It is much faster to write hexadecimal numbers than binary numbers",
				"People are less likely to make an error with fewer digits",
			].select(num).join("<br>"),
			mark:function(answer){
				let marks = keyword(answer,["remember","forget"],1)+keyword(answer,["write","type"],1)+keyword(answer,["error","mistake","accident","wrong"],1)
				if (marks>1) marks += keyword(answer,["convert"])
				return clamp(marks,num)
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
			let next = [
				{
					text:"",
					type:"composite",
					components:[
						{
							text:"Perform a binary "+["left","right"][i]+" shift of "+pluralize(places1,"place")+" on the binary number "+num1.toString(2),
							type:"open",
							level:2,
							modelAnswer:(i==0?(num1*2**places1):Math.floor(num1/2**places1)).toString(2),
							mark:function(answer){return answer.trim()==this.modelAnswer?1:0},
							par:10
						},
						{
							text:"Given that "+num1.toString(2)+" is "+num1+" in denary, convert your answer to part (a)(i) to denary.",
							type:"open",
							level:3,
							modelAnswer:(i==0?(num1*2**places1):Math.floor(num1/2**places1)).toString(),
							mark:function(answer){return (1+i)-(answer.trim()==this.modelAnswer?0:keyword(answer,this.modelAnswer)?1:2)},
							par:20
						}
					]
				},
				{
					text:"Perform a binary "+["left","right"][i]+" shift of "+pluralize(places2,"place")+" on the hexadecimal number "+num2.toString(16),
					type:"open",
					level:2,
					modelAnswer:(i==0?(num2*2**places2):Math.floor(num2/2**places2)).toString(16),
					mark:function(answer){return keyword(answer,[this.modelAnswer])?2:keyword(answer,[num2.toString(2),this.modelAnswer.toString(2)])?1:0},
					par:40
				}
			]
			if (i==0) next.push({
				text:"Explain what will happen if a binary left shift of two places is performed on the binary number "+ranint(64,255,true).toString(2) ,
				type:"open",
				level:4,
				modelAnswer:"The result will be too large for the number of bits the computer can work with so the ninth bit will be lost. This is called an overflow error.",
				mark:function(answer){return keyword(answer,["large","big",1])+keyword(answer,["overflow"])},
				par:20
			})
			out.push({text:"",type:"composite",components:next})
		}
		return out
	})(),
	(()=>{
		let num = ranint(0,1)
		return {
			text:"",
			type:"composite",
			components:[
				{
					text:"Explain what "+["ASCII","Unicode"][num]+" is an example of.",
					type:"open",
					level:4,
					modelAnswer:["ASCII","Unicode"][num]+" is an example of a character set. This is a set of letters, digits and symbols which can be represented by a computer",
					mark:function(answer){return (answer,["character","set"])<2?0:(1+keyword(answer,["represent"]))},
					par:25
				},
				{
					text:"What is the other major instance of this in use today?",
					type:"open",
					level:4,
					modelAnswer:["Unicode","ASCII"][num],
					mark:function(answer){return keyword(answer,[this.modelAnswer])},
					par:10
				}
			]
		}
	})(),
	{
		text:"State how many characters can be represented by each of the below:",
		type:"composite",
		components:(()=>{
			let out = []
			for (let i=0;i<3;i++) out.push({
				text:["ASCII","Extended ASCII","Unicode"][i],
				type:"open",
				level:[3,3,"A"][i],
				modelAnswer:["128","256","1114112"][i],
				mark:function(answer){return answer.replaceAll(/[^0-9]/g,"")==this.modelAnswer?1:0},
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
		return {
			text:"",
			type:"composite",
			components:[
				{
					text:"The character code for \""+String.fromCharCode(let1)+"\" is "+let1+".<br>State the character code of each of the below:",
					type:"gapfill",
					level:4,
					words:gapfillGenerator([String.fromCharCode(let1+1)+":",[String(let1+1),function(answer){return answer==String(let1+1)?1:0}],"<br>"+String.fromCharCode(let2)+":",[String(let2),function(answer){return answer==String(let2)?1:0}],"<br>"+String.fromCharCode(let3)+":",[String(let3),function(answer){return answer==String(let3)?1:0}]],3),
					markTransform:x=>x,
					par:30
				},
				{
					text:"The character code for "+num1+" is "+(num1+48)+".",
					type:"composite",
					components:[
						{
							text:"State the character code for "+num2+".",
							type:"open",
							level:3,
							modelAnswer:String(num2),
							mark:function(answer){return answer==this.modelAnswer?1:0},
							par:10
						},
						{
							text:"Convert your answer to part (b)(i) to a binary number",
							type:"open",
							level:4,
							modelAnswer:num2.toString(2),
							mark:function(answer){return answer==this.modelAnswer?1:0},
							par:10
						}
					]
				}
			]
		}
	})(),
	(()=>{
		let message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ")
		let message1 = message.slice(ranint(0,message.length-3)).slice(0,3).join(" ")
		let message2 = message.slice(ranint(0,message.length-8)).slice(0,ranint(4,6)).join(" ")
		let message3 = message.slice(ranint(0,message.length/2-1),ranint(message.length/2+1,message.length)).join(" ")
		let message4 = "あいうえおがぎぐげござじずぜぞだぢつ".split("").select(ranint(9,18)).join("")
		return {
			text:"",
			type:"composite",
			components:[
				{
					text:"Calculate the number of bytes needed to store the string \""+message1+"\".",
					type:"open",
					level:3,
					modelAnswer:message1.length.toString(),
					mark:function(answer){return keyword(answer,[this.modelAnswer])},
					par:15
				},
				{
					text:"Calculate the number of bits needed to store the string \""+message2+"\".",
					type:"open",
					level:Math.floor(4+message2.length/30),
					modelAnswer:message2.length+" × 8 = "+(message2.length*8),
					mark:function(answer){return keyword(answer,[this.modelAnswer])?2:keyword(answer,[message2.length])},
					par:20
				},
				{
					text:"Calculate the number of bits needed to store the string \""+message3+"\".",
					type:"open",
					level:"A",
					modelAnswer:message3.length+" × 8 = "+(message3.length*8),
					mark:function(answer){return keyword(answer,[this.modelAnswer])?3:keyword(answer,[message3.length])?(1+keyword(answer,[8])):0},
					par:40
				},
				{
					text:"Japanese characters require 2 bytes each to store.<br>Calculate the number of bits needed to store the string \""+message4+"\".",
					type:"open",
					level:7,
					modelAnswer:message4.length+" × 2 × 8 = "+(message4.length*16),
					mark:function(answer){return keyword(answer,[this.modelAnswer])?3:keyword(answer,[message4.length])?(1+keyword(answer,[16])):0},
					par:30
				}
			].select(ranint(1,4)).sort((a,b)=>averageLevel(a)-averageLevel(b))
		}
	})(),
	{
		text:"",
		type:"composite",
		components:[
			(()=>{
				let amount = ranint(1,6,true)
				let list = ["JPG","GIF","PNG","BMP","TIFF","XPM","XBM","PPM"]
				return {
					text:"Give "+pluralize(amount,"example")+" of bitmap image file formats.",
					type:"open",
					level:amount>3?"A":(3+amount),
					modelAnswer:list.slice(0,amount).join("; "),
					mark:function(answer){return keyword(answer,list,amount,[1,1,2/3,3/4,3/5,2/3][amount-1])},
					par:4+6*amount
				}
			})(),
			{
				text:"Explain what is meant by a bitmap image.",
				type:"open",
				level:7,
				modelAnswer:"An image consisting of a grid of pixels, each of which is given a binary color value representing a color - for example, 111100000000 may be red.",
				mark:function(answer){return keyword(answer,["grid","pixel"])+keyword(answer,["binary","value","represent"],3,0.5)+keyword(answer,["colour","color"],1,0.5)},
				par:30
			},
			{
				text:"What name is occasionally used to refer to bitmap images?",
				type:"open",
				level:2,
				modelAnswer:"Raster",
				mark:function(answer){return keyword(answer,["raster"])-keyword(answer,["vector"])},
				par:10
			},
			{
				text:"What is the origin of the word \"pixel\"?",
				type:"open",
				level:"A",
				modelAnswer:"Picture element",
				mark:function(answer){return keyword(answer,["picture","element"],2,0.5)},
				par:10
			}
		].filter(x=>Math.random()<0.75)
	},
	{
		text:"",
		type:"composite",
		components:[
			(()=>{
				let amount = ranint(1,6,true)
				let list = ["SVG","WMF","EPS","PDF","CDR","AI"]
				return {
					text:"Give "+pluralize(amount,"example")+" of vector image file formats.",
					type:"open",
					level:amount>3?"A":amount==2?6:4,
					modelAnswer:list.slice(0,amount).join("; "),
					mark:function(answer){return keyword(answer,list,amount,[1,1,2/3,3/4,3/5,2/3][amount-1])},
					par:4+6*amount
				}
			})(),
			{
				text:"Explain what is meant by a vector image.",
				type:"open",
				level:4,
				modelAnswer:"An image consisting of geometric shapes.",
				mark:function(answer){return keyword(answer,["shape"])},
				par:15
			},
			(()=>{
				let bigger = !ranint(0,1)
				return {
					text:"Which image type has the "+(bigger?"larger":"smaller")+" file size?",
					type:"multiplechoice",
					level:1,
					answers:multipleChoiceGenerator([bigger?"Bitmap":"Vector"],1,[bigger?"Vector":"Bitmap"],1),
					markTransform:x=>x,
					par:5
				}
			})()
		].filter(x=>Math.random()<0.75)
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by resolution.",
				type:"open",
				level:5,
				modelAnswer:"The concentration of pixels per unit area",
				mark:function(answer){return keyword(answer,["concentrat","tight","much","many"],1)+keyword(answer,["per","in"],1)+keyword(answer,["area"])},
				par:20
			},
			{
				text:"State the unit typically used to measure resolution",
				type:"composite",
				components:[
					{
						text:"on a screen",
						type:"open",
						level:3,
						modelAnswer:"Pixels per inch (PPI)",
						mark:function(answer){return Math.max(keyword(answer,["pixel","per","inch"],3,1/3),keyword(answer,["PPI"]))-keyword(answer,["dot","DPI"])},
						par:10
					},
					{
						text:"when printing",
						type:"open",
						level:3,
						modelAnswer:"Dots per inch (PPI)",
						mark:function(answer){return Math.max(keyword(answer,["dot","per","inch"],3,1/3),keyword(answer,["DPI"]))-keyword(answer,["pixel","PPI"])},
						par:10
					}
				].shuffle()
			}
		].shuffle()
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by colour depth.",
				type:"open",
				level:4,
				modelAnswer:"The number of bits contained by each pixel",
				mark:function(answer){return keyword(answer,["number","amount","many","much"],1,0.5)+keyword(answer,["bit"],1,0.5)},
				par:15
			},
			{
				text:"Increasing the colour depth causes the image quality to:",
				type:"multiplechoice",
				level:3,
				answers:multipleChoiceGenerator(["Increase"],1,["Decrease"],1),
				markTransform:x=>x,
				par:5
			}
		]
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Write the general equation for the size of an image. Include units in your answer.<br><span style=\"opacity:0.5\">(Hint: equations always have a = sign)</span>",
				type:"open",
				level:4,
				modelAnswer:"(File size / bits) = (height / pixels) × (width / pixels) × (colour depth / bits)",
				mark:function(answer){
					let sides = answer.split("=")
					if (sides.length!==2) return 0
					return (1+keyword(sides[0],["file size","bit"])+keyword(sides[1],["colour depth","pixel","bit"])+Math.max(keyword(answer,["height","width"],2,0.5),keyword(answer,["resolution"]))+keyword(sides[1],["×","*"],1))/2
				},
				par:40
			},
			(()=>{
				let scaleFactor = ranint(0,2)
				let height = ranint(10,20)*10**scaleFactor
				let width = ranint(10,20)*10**scaleFactor
				let depth = [2,4,8,12,16,24].select(1)[0]
				let ans = (height*width*depth/8000).toPrecision(5).split("")
				while (ans[ans.length-1]=="0") ans.splice(ans.length-1)
				return {
					text:"Calculate the image size of an image with dimensions "+height+" pixels × "+width+" pixels and colour depth "+depth+" bits.<br>Give your answer in kilobytes.",
					type:"open",
					level:7,
					modelAnswer:"(File size / bits) = (height / pixels) × (width / pixels) × (colour depth / bits)"
						+"<br>= ("+height+") × ("+width+") × ("+depth+")"
						+"<br>= "+(height*width*depth)
						+"<br>8000 b = 1 KB"
						+"<br>∴ "+(height*width*depth)+" b = "+ans+" KB"
						+"∴ the file size is "+ans+" KB",
					mark:function(answer){return keyword(answer,[ans])?3:keyword(answer,[height*width*depth,8000])},
					par:40
				}
			})(),
			multipleChoiceComposite("Select what will happen to the file size for each of the below.",[
				["The height doubles","It doubles",3],
				["The width doubles","It doubles",3],
				["The height halves","It halves",3],
				["The width halves","It halves",3],
				["The bit depth doubles","It doubles",4],
				["The bit depth halves","It halves",4],
				["The height is multiplied by 4","It multiplies by 4",3],
				["The width is divided by 4","It divides by 4",3],
				["The number of colours is multiplied by 4","It increases slightly",5],
				["The number of colours halves","It decreases slightly",5],
			],3)
		].slice(0,ranint(1,3))
	},
	{
		text:"The general formula for the size of an image is (File size / bits) = (height / pixels) × (width / pixels) × (colour depth / bits).<br>However, image sizes are often slightly higher than this due to the presence of metadata.",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by metadata.",
				type:"open",
				level:4,
				modelAnswer:"Data other than the image itself: data about data",
				mark:function(answer){return keyword(answer,["about"])},
				par:10
			},
			(()=>{
				let amount = ranint(1,4,true)
				return {
					text:"Give "+pluralize(amount,"example")+" of metadata which may be stored.",
					type:"open",
					level:2+amount,
					modelAnswer:["Colour depth in bits per pixel","Resolution","Date and time of creation","Author"].select(amount).join("<br>"),
					mark:function(answer){return clamp([
						keyword(answer,["colour","color"],1,0.5)+keyword(answer,["depth"],1,0.5),
						keyword(answer,["resolution"]),
						keyword(answer,["date"]),
						keyword(answer,["author"])
					].map(x=>Math.floor(x)).sum()*[1,1,2/3,3/4][amount-1],amount)},
					par:5+5*amount
				}
			})(),
			{
				text:"Which of these is most likely to be the size of metadata?",
				type:"multiplechoice",
				level:1,
				answers:multipleChoiceGenerator(["56 b"],1,["8 b","56 B","56 KB","256 b","256 B","256 KB"],5),
				markTransform:x=>x,
				par:5
			}
		].slice(0,ranint(0,3))
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Select the three primary colours used by computer screens.",
				type:"multiplechoice",
				level:5,
				answers:multipleChoiceGenerator(["Red","Green","Blue"],3,["Yellow","Cyan","Magenta","Purple","White","Black","Gray"],7),
				markTransform:x=>x*2/3,
				par:15
			},
			{
				text:"Select the four primary colours used by printers.",
				type:"multiplechoice",
				level:5,
				answers:multipleChoiceGenerator(["Cyan","Magenta","Yellow","Black"],4,["Red","Green","Blue","Purple","White","Gray"],6),
				markTransform:x=>x/2,
				par:15
			}
		]
	},
	multipleChoiceComposite("For each of the below, select whether it is true of an analogue or digital sound signal.",[
		["It is continuous","Analogue",2],
		["It is discrete","Digital",2],
		["Computers store sound as this type","Digital",1],
		["It has the shape of a sine wave","Analogue","A"]
	]),
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Explain how sound is digitized.",
				type:"open",
				level:5,
				modelAnswer:"By repeatedly measuring and recording a sound wave.",
				mark:function(answer){return keyword(answer,["repeat","measur","record"],3,2/3)},
				par:15
			},
			{
				text:"Name the component which:",
				type:"composite",
				components:[
					{
						text:"converts sound to digital signals",
						type:"open",
						level:3,
						modelAnswer:"Analogue to Digital Converter (ADC)",
						mark:function(answer){return keyword(stringSimplify(answer),["analoguetodigital","converter"])},
						par:10
					},
					{
						text:"converts digital signals back to sound",
						type:"open",
						level:3,
						modelAnswer:"Digital to Analogue Converter (DAC)",
						mark:function(answer){return keyword(stringSimplify(answer),["digitaltoanalogue","converter"])},
						par:10
					}
				]
			}
		].filter(x=>Math.random()<0.6)
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"State what is meant by a sound sample.",
				type:"open",
				level:4,
				modelAnswer:"A measurement of the amplitude of a sound wave at a given time.",
				mark:function(answer){return keyword(answer,["measure","amplitude","time"],3,2/3)},
				par:20
			},
			{
				text:"Name the two factors which determine the quality of sound.",
				type:"open",
				level:4,
				modelAnswer:"Sample rate; bit depth",
				mark:function(answer){return Math.floor(keyword(answer,["sample","rate"]))+Math.floor(keyword(answer,["bit","depth"]))},
				par:10
			}
		]
	},
	{
		text:"The two factors which influence the quality of a sound file are the sample rate and sample resolution.",
		type:"composite",
		components:[
			{
				text:"Explain what is meant by sample rate and state the unit used to measure it.",
				type:"open",
				level:3,
				modelAnswer:"Sample rate is the number of sound samples taken per second. It is measured in hertz (Hz).",
				mark:function(answer){return keyword(answer,["number","amount","many","much"],1)+keyword(answer,["second"])+keyword(answer,["hertz","Hz"],1)},
				par:20
			},
			{
				text:"",
				type:"composite",
				components:[
					{
						text:"Explain what is meant by sample resolution.",
						type:"open",
						level:3,
						modelAnswer:"The number of bits used to record each sample.",
						mark:function(answer){return keyword(answer,["number","amount","many","much"],1)+keyword(answer,["bit"])+keyword(answer,["record","store","hold"],1)},
						par:20
					},
					{
						text:"What term is sometimes used to refer to sample resolution?",
						type:"open",
						level:3,
						modelAnswer:"Audio bit depth",
						mark:function(answer){return keyword(answer,["bit","depth"],1)},
						par:10
					}
				]
			}
		].select(Math.random()<0.25?1:2)
	},
	{
		text:"The sample rate of a sound file is usually measured in hertz.",
		type:"composite",
		components:[
			{
				text:"How much is 1 hertz?",
				type:"open",
				level:2,
				modelAnswer:"1 sample per second",
				mark:function(answer){return keyword(answer,["1","one"],1,1/3)+keyword(answer,["sample","second"],3,1/3)},
				par:10
			},
			{
				text:"What is the typical sample rate of a CD?",
				type:"multiplechoice",
				level:"A",
				answers:multipleChoiceGenerator(["44,100 Hz"],1,["44 Hz","441 Hz","4,410 Hz","441,000 Hz","14 Hz","144 Hz","1,440 Hz","14,400 Hz","144,000 Hz"],5),
				markTransform:x=>x,
				par:10
			}
		]
	},
	// Unit 03
	{
		text:"Define the internet.",
		level:4,
		type:"open",
		modelAnswer:"A wide area network (WAN) spanning the entire globe. It is the largest existing WAN and has billions of users.",
		mark:function(answer){return keyword(answer,["glob","international","world","planet"],1)+keyword(answer,["wide area network","WAN"],1)+keyword(answer,["biggest","largest"],1,1)},
		par:20
	},
	{
		text:"Define the World Wide Web.",
		level:4,
		type:"open",
		modelAnswer:"The part of the internet consisting of the interlinked web pages and other documents.",
		mark:function(answer){return keyword(answer,["part","Internet","interlinked"])+keyword(answer,["web","page","site"],2,0.5)},
		par:20
	},
	{
		text:"Define a wide area network.",
		level:5,
		type:"open",
		modelAnswer:"Any network in which the computers communicate using resources supplied by a third party carrier. The devices in such a network are normally far apart.",
		mark:function(answer){return keyword(answer,["resources"])+keyword(answer,["third","party","carrier"],3,1/3)+keyword(answer,["remote","far","distant","large"],1)},
		par:30
	},
	{
		amount: ranint(1,3),
		get text(){return "Give "+numword(this.amount)+" example"+(this.amount==1?"":"s")+" of organisations which may use WANs."},
		level:4,
		type:"open",
		modelAnswer:"Universities and schools; large companies such as banks; governments; research organisations",
		mark:function(answer){return keyword(answer,["universit","school"],1)+keyword(answer,["company","bank"],1)+keyword(answer,["government"])+keyword(answer,["research","scien"])},
		get par(){return this.amount*10}
	},
	{
		text:"Define the Internet of Things.",
		level:6,
		type:"open",
		modelAnswer:"The devices with sensory capabilities (such as cat trackers, kitchen appliances and other 'smart home' items) that are connected to a network and are able to exchange data.",
		mark:function(answer){return clamp(keyword(answer,["device","sens","smart","connect","network","data"])+keyword(answer,["transfer","exchange"],1),6)},
		par:40
	},
	{
		text:"",
		type:"composite",
		components:[
			{
				text:"Define an IP address.",
				level:5,
				type:"open",
				modelAnswer:"A unique identifier given to a device connected to a network.",
				mark:function(answer){return keyword(answer,["unique","different"],1)+keyword(answer,["give","assign","allocate"],1)},
				par:20
			},
			{
				text:"Explain the purpose of an IP address.",
				level:7,
				type:"open",
				modelAnswer:"When a node wants to send a message to another node, it uses the recipient node's address as the destination. A switch on the network knows where the node with this address is and routes the message to it accordingly.",
				mark:function(answer){return keyword(answer,["message","data"],1)+keyword(answer,["recipient","address","destination"],2,0.5)+keyword(answer,["switch","know","route"],2,0.5)},
				par:60
			}
		].slice(0,ranint(1,2,true))
	},
	{
		text:"Explain the difference between a static and dynamic IP address.",
		level:6,
		type:"open",
		modelAnswer:"In networks with static IP addresses, a device will always be given the same IP address each time it connects to the network. In networks with dynamic IP addresses, the address changes each time the device connects.",
		mark:function(answer){return Math.min(keyword(answer,["static","dynamic"],2,2),keyword(answer,["network","same","connect","IP address"])+keyword(answer,["different","change"],1))},
		par:40
	},
	{
		text:"Describe the difference between circuit switching and packet switching.",
		level:8,
		type:"open",
		modelAnswer:"In a circuit switching network, an entire file of data is transferred at once, over a single connection. Phone calls are an example of circuit switching. In a packet switching network, the data file is broken down into small \"packets\" which are transferred separately and usually through different routes. These packets are then reassembled into the original file at the target destination. The internet is an example of a packet switching network.",
		mark:function(answer){return clamp(keyword(answer,["at once","in one","at the same time"],1)+keyword(answer,["1","one","single"],1)+keyword(answer,["connection","packet","route","original"])+keyword(answer,["break","broken","reduce","separate"],1)+keyword(answer,["assemble","produce","create"],1)+keyword(answer,["original"])+keyword(answer,["phone call","internet"],2,0.5),9)},
		par:120
	},
	{
		text:"State the technical term for points on a network diagram.",
		level:2,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["Node"],1,["Router","Switch","Hub"],3),
		markTransform:x=>x,
		par:15
	},
	{
		text: "What is <code>"+["google.com","wikipedia.org","youtube.com","github.com","fandom.com","desmos.com","reddit.com","teddit.com"].select(1)+"</code> an example of?",
		level:2,
		type:"open",
		modelAnswer:"Domain name",
		mark:function(answer){return keyword(answer,["domain name"])-keyword(answer,["IP","DNS","web","address"])},
		par:15
	},
	// Unit 5
	{
		text:"In January 2020 the Metropolitan Police began to use live facial recognition.",
		type:"composite",
		components:[
			{
				text:"Describe how this system works.",
				level:4,
				type:"open",
				modelAnswer:"It identifies people on a 'watchlist'. If it finds a match, it can alert police officers so that they stop the person.",
				mark:function(answer){return keyword(answer,["people","match"],"u",0.5)+keyword(answer,["identif","watchlist"],1,0.5)+keyword(answer,["alert","inform","notif","tell"],1,0.5)+keyword(answer,["police","officer"],1,0.5)},
				par:40
			},
			{
				number:ranint(1,2),
				get text(){return "Explain "+numword(this.number)+" advantage"+(this.number==1?"":"s")+" of this system."},
				level:6,
				type:"open",
				modelAnswer: ["The system can be used to find criminals wanted by the police or courts, as well as people reported as missing. These people may be at risk of harm to themselves or others.",
				"It is also hoped to deter people from crime and save the police time."].slice(0,this.number).join("<br>"),
				mark:function(answer){
					let marks = []
					// finding criminals
					marks.push(keyword(answer,["find","locat","track","identif"],1)+keyword(answer,["criminals","missing","harm"],2,0.5))
					// crime deterrence
					marks.push(keyword(answer,["deter","prevent"],1)+keyword(answer,["save","time"],2,0.5))
					return bestMarks(marks,this.number,2)
				},
				get par(){return 25*this.number}
			},
			{
				number:ranint(1,3,true),
				get text(){return "Explain "+numword(this.number)+" disadvantage"+(this.number==1?"":"s")+" of this system."},
				level:5,
				type:"open",
				get modelAnswer(){return [
					"Systems like this use personal biometric data which some people may not consent to.",
					"They may alter public behaviour - for example, people may no longer wish to take part in peaceful protests.",
					"There is evidence that facial recognition technology may be likely to misidentify people of colour, as a result of its training data usually consisting of mostly white men."
				].select(this.number).join("<br>")},
				mark:function(answer){
					let marks = []
					// personal biometric data
					marks.push(keyword(answer,["personal","biometric","data","consent"],4,0.5))
					// alter public behaviour
					marks.push(keyword(answer,["alter","change"],1,0.5)+keyword(answer,["public","behavio"],2,0.25)+keyword(answer,["want","wish","desire","choose"],1,1/3)+keyword(answer,["take part","participate","join"],1,1/3)+keyword(answer,["peaceful","protest"],2,1/6))
					// misidentify people of colour
					marks.push(keyword(answer,["misidentify","incorrect","wrong"],1,0.5)+keyword(answer,["black","colour","people"],2,0.25)+keyword(answer,["train"],1,0.5)+keyword(answer,["white"],1,0.25)+keyword(answer,["men","males"],1,0.25))
					return bestMarks(marks,this.number,2)
				},
				get par(){return 25*this.number}
			}
		].select(ranint(1,3))
	},
	{
		text:"State how robots can work in each of the below:",
		type:"composite",
		components:[
			{
				text:"Amazon warehouses",
				level:4,
				type:"open",
				modelAnswer:"Robots can move products on shelves to pickers, making the pickers far more efficient",
				mark:function(answer){return keyword(answer,["mov","picker"],2,0.5)+keyword(answer,["efficien","effectiv","fast","quick","speed"],1,0.5)},
				par:20
			},
			{
				text:"Fast food restaurants",
				level:3,
				type:"open",
				modelAnswer:"They enable customers to order their own food",
				mark:function(answer){return keyword(answer,["own","auto","self"],1)},
				par:20
			},
			{
				text:"Hotels",
				level:5,
				type:"open",
				modelAnswer:"Robots such as Maidbot can clean hotel rooms automatically",
				mark:function(answer){return keyword(answer,["clean"])},
				par:20
			}
		].select(ranint(2,3))
	},
	{
		text:"Internet speeds in the countryside are generally lower than in densely populated areas.",
		type:"composite",
		components:[
			{
				number:ranint(1,3,true),
				get text(){return "What information and services may someone in the countryside struggle to access? Give "+numword(this.number)+" example"+(this.number==1?"":"s")+"."},
				level:4,
				type:"open",
				get modelAnswer(){return ["Video services such as iPlayer, Netflix or YouTube","Communication tools such as Skype","Video games","Cloud services"].select(this.number)},
				mark:function(answer){return keyword(answer,["video","communication","game","cloud"],this.number)},
				get par(){return this.number*10}
			},
			{
				number:ranint(1,3,true),
				get text(){return "How may this affect someone starting a business? Give "+numword(this.number)+" example"+(this.number==1?"":"s")+"."},
				level:4,
				type:"open",
				get modelAnswer(){return ["They may find it harder to set up their website","Sharing photos or videos of products will be harder","The website may be slower to respond to customer queries","They may not have access to newer cloud services"].select(this.number).join("<br>")},
				mark:function(answer){
					if ((keyword(answer,["web"])+keyword(answer,["page","site"],1))<2) return 0
					let marks = []
					marks.push(keyword(answer,["hard","difficult","problem","challenge"],1,0.5)+keyword(answer,["set","up"],2,0.25))
					marks.push(keyword(answer,["video","photo"],1))
					marks.push(keyword(answer,["respond","quer"],2,0.5))
					marks.push(keyword(answer,["new","cloud"],2,0.5))
					return bestMarks(marks,this.number,1)
				},
				get par(){return this.number*10}
			}
		]
	},
	{
		text:"As of 2020, what proportion of 18-34-year-olds regularly works remotely?",
		level:2,
		type:"multiplechoice",
		answers:multipleChoiceGenerator(["70%"],1,["10%","20%","30%","40%","50%","60%","80%","90%"],3),
		markTransform:x=>x,
		par:10
	},
	{
		amount:ranint(1,5,true),
		get text(){return "Explain "+numword(this.amount)+" advantage"+(this.amount==1?"":"s")+" of remote work."},
		level:5,
		type:"open",
		get modelAnswer(){return [
			"There will be less commuting, saving time and money.",
			"There will be less commuting, causing less pollution due to transportation.",
			"The company will not have to build as much office space, saving it money.",
			"Because employees do not have to travel to work, they do not have to relocate.",
			"Because employees are not limited by their proximity to the workplace, companies have a wider pool of candidates to choose from.",
			"Because employees spend less time commuting, they can improve their work-life balance.",
			"Because employees do not have to be physically present, virtual meetings can take place where face-to-face communication is not possible."
		].select(this.amount).join("<br>")},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["sav","time","money"])<2?0:keyword(answer,["commut","travel","transport"])<1?1:2)
			marks.push(keyword(answer,["pollut","environment"])<1?0:keyword(answer,["commut","travel","transport"])<1?1:2)
			marks.push(keyword(answer,["sav","money"])<1?0:keyword(answer,["office","space","build"])<1?1:2)
			marks.push(keyword(answer,["relocate","move","house"])<1?0:keyword(answer,["commut","travel","transport"])<1?1:2)
			marks.push(keyword(answer,["wider","more","number","amount"],1)+keyword(answer,["people","candidates","workers","employees"],1)<2?0:keyword(answer,["distance","proximity","far","commut","travel","transport"])<1?1:2)
			marks.push(keyword(answer,["work","life","balance"])<3?0:keyword(answer,["commut","travel","transport"])<1?1:2)
			marks.push(keyword(answer,["meet","conference","communicat"])<1?0:keyword(answer,["face","physical","present","commut","travel","transport"])<1?1:2)
			return bestMarks(marks,this.amount,2)
		},
		get par(){return 20*this.amount}
	},
	{
		amount:ranint(1,5,true),
		get text(){return "Explain "+numword(this.amount)+" disadvantage"+(this.amount==1?"":"s")+" of remote work."},
		level:5,
		type:"open",
		get modelAnswer(){return [
			"Remote workers can feel isolated due to the lack of contact with other employees",
			"There is less face-to-face contact, which can make it harder to build relationships with colleagues or participate in meetings",
			"It is difficult for companies to monitor employee performance",
			"It can be difficult to stop focusing on work, which disrupts work-life balance",
			"It can be hard to avoid ditractions when working at home from children, spouses, pets and doorbells"
		].select(this.amount)},
		mark:function(answer){
			let marks = []
			marks.push(keyword(answer,["isolate","lone"])<1?0:keyword(answer,["contact","employee","worker"])<1?1:2)
			marks.push(keyword(answer,["friend","ship"])<1?0:keyword(answer,["face","contact","physical","person"])<1?1:2)
			marks.push(keyword(answer,["monitor","check","assess","ensure"],1,)<1?0:keyword(answer,[""]))
			return bestMarks(marks,this.amount,2)
		},
		get par(){return 20*this.amount}
	},
	// Miscellaneous
	expandListOfAbbreviations([
		[1,[["CPU","Central Processing Unit",3],["RAM","Random Access Memory",3],["ROM","Read-Only Memory",4],["MAR","Memory Address Register",4],["MDR","Memory Data Register",4],["ALU","Arithmetic-Logic Unit",3],["BIOS","Basic Input-Output System",4],["OS","Operating System",2],["HDD","Hard Disk Drive",3],["SSD","Solid State Drive",3],["CD","Compact Disc",2],["DVD","Digital Versatile Disc",3]]],
		[3,[["IP","Internet Protocol",2]]]
	],u=>"Unit "+u)
]