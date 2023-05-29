"use strict"
/* A lot of questions have nearly identical marking criteria here, and each pair of English-French can be used to generate two questions. It is therefore easier and more compact to procedurally generate the question list from a list of vocabulary pairs. */
var resources_gcse_french = {
	/*
		0				 english
		1				 french (each item in array = 1 mark)
		2				 advanced
	*/
	vocab: [
		[["welcome;","reception"],["l'","accueil"],false,1],
		[["teenager","(m)"],["l'","adolescent"],false,1],
		[["teenager","(f)"],["l'","adolescente"],false,1],
		[["to adore;","to love"],["adorer"],false,1],
		[["adult"],["l'","adulte"],false,1],
		[["to help"],["aider"],false,1],
		[["to like;","to love"],["aimer"],false,1],
		[["friend","(m)"],["l'","ami"],false,1],
		[["friend","(f)"],["l'","amie"],false,1],
		[["friendship"],["l'","amitié"],false,1],
		[["love"],["l'","amour"],false,1],
		[["great-","grandmother"],["l'","arrière-","grand-","mère"],false,1],
		[["great-","grandfather"],["l'","arrière-","grand-","père"],false,1],
		[["great","grand-parents"],["les","arrière-","grand-","parents"],false,1],
		[["opinion"],["l'","avis;","l'","opinion"],false,1],
		[["in my opinion"],["à mon","avis"],false,1],
		[["to be allowed to"],["avoir la","permission","de"],false,1],
		[["to be right"],["avoir raison"],false,1],
		[["to be wrong"],["avoir tort"],false,1],
		[["group"],["la","bande"],false,1],
		[["group","of friends"],["la","bande","d'amis"],false,1],
		[["stepchildren"],["les","beaux-","enfants"],false,1],
		[["stepson;","son-in-law"],["le","beau-fils"],false,1],
		[["brother-in-law"],["le","beau-frère"],false,1],
		[["stepfather;","father-in-law"],["le","beau-père"],false,1],
		[["baby"],["le","bébé"],false,1],
		[["daughter-in-law;","stepdaughter"],["la","belle-fille"],false,1],
		[["mother-in-law;","stepmother"],["la","belle-mère"],false,1],
		[["sister-in-law"],["la","belle-sœur"],false,1],
		[["friend;","classmate;","companion","(m)"],["le","camarade"],false,1],
		[["friend;","classmate;","companion","(f)"],["la","camarade"],false,1],
		[["friendship;","fellowship"],["la","camaraderie"],false,1],
		[["dear;","expensive","(m)"],["cher"],false,1],
		[["dear;","expensive","(f)"],["chère"],false,1],
		[["darling"],["chéri"],false,1],
		[["circle"],["le","cercle"],false,1],
		[["to understand"],["comprendre"],false,1],
		[["acquaintance"],["la","connaissance"],false,1],
		[["known;","acquainted"],["connu"],false,1],
		[["couple"],["le","couple"],false,1],
		[["friend;","mate;","buddy","(m)"],["le","copain"],false,1],
		[["friend;","mate;","buddy","(f)"],["le","copine"],false,1],
		[["cousin","(m)"],["le","cousin"],false,1],
		[["cousin","(f)"],["la","cousine"],false,1],
		[["agreed"],["d'","accord"],false,1],
		[["half-brother"],["le","demi-frère"],false,1],
		[["half-sister"],["la","demi-sœur"],false,1],
		[["to hate"],["détester"],false,1],
		[["to discuss"],["discuter"],false,1],
		[["divorced"],["divorcé"],false,1],
		[["child"],["l'","enfant"],false,1],
		[["to marry"],["épouser"],false,1],
		[["spouse","(m)"],["l'","époux"],false,1],
		[["spouse","(f)"],["la","épouse"],false,1],
		[["to be friend","with"],["être ami","avec"],false,1],
		[["related","(to)"],["être parent"],false,1],
		[["to get to know;","meet"],["faire","la","connaissance","de"],false,1],
		[["family"],["la","famille"],false,1],
		[["woman;","wife"],["la","femme"],false,1],
		[["engaged"],["fiancé"],false,1],
		[["young girl"],["la","fillette"],false,1],
		[["godson"],["la","filleul"],false,1],
		[["god-daughter"],["la","filleule"],false,1],
		[["only child","(m)"],["le","fils","unique"],false,1],
		[["only child","(f)"],["la","fille","unique"],false,1],
		[["brother"],["le","frère"],false,1],
		[["son-in-law"],["le gendre"],false,1],
		[["grandmother"],["la","grand-","mère"],false,1],
		[["grandparents"],["les","grands-","parents"],false,1],
		[["grandfather"],["le","grand-","père"],false,1],
		[["man"],["l'","homme"],false,1],
		[["to forbid"],["interdire"],false,1],
		[["young","woman"],["la","jeune","femme"],false,1],
		[["young","teenage","girl"],["la","jeune","fille"],false,1],
		[["young","man"],["le","jeune","homme"],false,1],
		[["twins","(m)"],["les","jumeaux"],false,1],
		[["twins","(f)"],["les","jumelles"],false,1],
		[["relationship"],["les","liens"],false,1],
		[["Madam;","Mrs"],["Madame"],false,1],
		[["Miss"],["Mademoiselle"],false,1],
		[["marriage"],["le","mariage"],false,1],
		[["married"],["marié"],false,1],
		[["godmother"],["la","marraine"],false,1],
		[["mother"],["la","mère"],false,1],
		[["Sir;","Mr"],["Monsieur"],false,1],
		[["nephew"],["le","neveu"],false,1],
		[["niece"],["la","nièce"],false,1],
		[["surname"],["le","nom","de","famille"],false,1],
		[["maiden name"],["le","nom","de","jeune fille"],false,1],
		[["uncle"],["l'","oncle"],false,1],
		[["godfather"],["le","parrain"],false,1], 
		[["relative;","relation"],["le","parent"],false,1],
		[["related to","(m)"],["parent","de"],false,1],
		[["related to","(f)"],["parente","de"],false,1],
		[["parents"],["les","parents"],false,1],
		[["unfair"],["pas","juste"],false,1],
		[["father"],["le","père"],false,1],
		[["to allow"],["permettre"],false,1],
		[["permission"],["la","permission"],false,1],
		[["grandchildren","(m)"],["les","petits-","enfants"],false,1],
		[["grandchildren","(f)"],["les","petites-","enfants"],false,1],
		[["grandson"],["le","petit-","fils"],false,1],
		[["granddaughter"],["la","petite-","fille"],false,1],
		[["first","name"],["le","prénom"],false,1],
		[["close"],["proche"],false,1],
		[["relationship;","relation"],["le","rapport"],false,1],
		[["separated"],["séparé"],false,1],
		[["to get on","with"],["s'","entendre"],false,1],
		[["to greet"],["saluer;","accueillir"],false,1],
		[["greeting"],["la","salutation"],false,1],
		[["to marry"],["se","marier"],false,1],
		[["sister"],["la","sœur"],false,1],
		[["understanding;","pleasant;","likeable"],["sympathique"],false,1],
		[["to want"],["vouloir"],false,1],
		[["Buddhist"],["bouddhiste"],false,1],
		[["Catholic"],["catholique"],false,1],
		[["Christian","(m)"],["chrétien"],false,1],
		[["Christian","(f)"],["chrétienne"],false,1],
		[["Hindu"],["hindou"],false,1],
		[["Islamic"],["islamique"],false,1],
		[["Jew","(m)"],["juif"],false,1],
		[["Jew","(f)"],["juive"],false,1],
		[["Muslim","(m)"],["musulman"],false,1],
		[["Muslim","(f)"],["musulmane"],false,1],
		[["Protestant","(m)"],["protestant"],false,1],
		[["Protestant","(f)"],["protestante"],false,1],
		[["Sikh"],["sikh"],false,1],
	],
	/* longer tasks which require regular question constructors */
	misc: [
	],
	connectMarks: function(text) {return text.join(" ").replaceAll("' ","'").replaceAll("- ","-")},
	QConstructor: function(text,advanced,modelAnswer,language,weighting) {
		this.text = "Translate \""+resources_gcse_french.connectMarks(text)+"\" to "+language+"."
		this.level = advanced?"A":Math.round(Math.max(1,Math.min(9,2+resources_gcse_french.connectMarks(modelAnswer).length/6)))
		this.type = "open"
		this.unjoinedModelAnswer = modelAnswer
		this.modelAnswer = resources_gcse_french.connectMarks(modelAnswer)
		this.mark = function(answer) {
			let marks = keyword(answer,this.unjoinedModelAnswer.map(x => x.replaceAll(";","").replaceAll("/","")))*weighting
			let divisor = Math.max(1,answer.length/this.modelAnswer.length)**1.5
			return clamp(marks/divisor+0.5)
		}
		this.par = modelAnswer.length*7.5
	},
	generateQuestionList: function() {
		let out = []
		for (let i=0;i<this.vocab.length;i++) {
			out.push(new this.QConstructor(this.vocab[i][0],this.vocab[i][2],this.vocab[i][1],"French",this.vocab[i][3]))
			out.push(new this.QConstructor(this.vocab[i][1],this.vocab[i][2],this.vocab[i][0],"English",this.vocab[i][3]))
		}
		for (let i=0;i<this.misc.length;i++) out.push(this.misc[i])
		for (let i=0;i<out.length;i++) out.specialCharDisclaimers = [3,4,5,6]
		return out
	}
}
var question_file_at_gcse_french = resources_gcse_french.generateQuestionList()