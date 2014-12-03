/**
 * @author jorge et al.
 */
ControladorAmalia ={
	
	// Aparecer desaparecer dialogos para mudar os atributos dos elementos do diagrama.
	
	toogleDialogo: function (dialogoNome, focus){
		
		if ($(dialogoNome).css("visibility") == "visible"){
			$(dialogoNome).css("visibility","hidden");
		}else{
			$(dialogoNome).css("visibility","visible");
			if(focus){
				$(focus).focus();
			}
		}
	},


	// Provavelmente desnecessário
	toogleDialogoSemFocus:function(dialogoNome){
		if ($(dialogoNome).css("visibility") == "visible"){
			$(dialogoNome).css("visibility","hidden");
		}else{
			$(dialogoNome).css("visibility","visible");
		}
	},
	
	toogleDialogoAtor: function (actorId){
		
		$("#idActor").val(actorId);
		$("#nomeActor").val(""); // ir buscar o nome atual ao modelo
		
		ControladorAmalia.toogleDialogo("#dialogo_actor","#nomeActor");

	},

	toogleDialogoCasoUso: function(caso){
		//Muito dependente dos detalhes do html
		if (caso){
			var elementoCaso = caso.toJSON();
			var nomeCaso = elementoCaso.attrs.text.text; // ir buscar o nome Actual
			$("#idCaso").val(caso.id);
			$("#nomeCasoUso").val(nomeCaso);// Colocar o nome actual
		}
		
		ControladorAmalia.toogleDialogo("#dialogo_casos_uso","#nomeCasoUso");

	},
	
	toogleDialogoAssociaCasos: function(elementoCimaId, elementoBaixoId){
		
		if( elementoCimaId && elementoBaixoId){
			$("#elementoCimaId").val(elementoCimaId);
			$("#elementoBaixoId").val(elementoBaixoId);
		}else{
			$("#elementoCimaId").val("");
			$("#elementoBaixoId").val("");
		}
		
		ControladorAmalia.toogleDialogo("#dialogo_associa_casos",false);
		
	},
	
	toogleDialogoAlteraClasses: function (classe){
		
		if (classe){
			var classeJSON = classe.toJSON();
			$("#idClasse").val(classeJSON.id);
			$("#nomeDaClasse").val(classeJSON.name);
			//atributos
			var atributos = classeJSON.attributes;
			for(i = 0 ; i < atributos.length ; i++){
				$("#atributosClasse").append(ControladorAmalia.addAtributoMetodo("atributo",atributos[i]));
			}
			//metodos
			var metodos = classeJSON.methods;
			for(i = 0 ; i < metodos.length ; i++){
				$("#metodosClasse").append(ControladorAmalia.addAtributoMetodo("metodo",metodos[i]));
			}
			
		}else{
			$("#idClasse").val("");
			$("#nomeDaClasse").val("");
			
		}
		
		ControladorAmalia.toogleDialogo("#dialogoAlteraClasse",false);
		
		
	},
		
	toogleDialogoAlteraInterface: function (classe){
		
		if (classe){
			var classeJSON = classe.toJSON();
			$("#idInterface").val(classeJSON.id);
			$("#nomeDaInterface").val(classeJSON.name);
			//metodos
			var metodos = classeJSON.methods;
			for(i = 0 ; i < metodos.length ; i++){
				$("#metodosInterface").append(ControladorAmalia.addAtributoMetodo("metodo",metodos[i]));
			}
			
		}else{
			$("#idInterface").val("");
			$("#nomeDaInterface").val("");
			
		}
		
		ControladorAmalia.toogleDialogo("#dialogoAlteraInterface",false);
		
		
	},
	
	toogleDialogoAssociaClasses: function(elementoCimaId,elementoBaixoId){
		
		if (elementoCimaId && elementoBaixoId){
			$("#elementoCimaId").val(elementoCimaId);
			$("#elementoBaixoId").val(elementoBaixoId);
			if ($("#ligarClasses option:selected").val() == "h"){
				$("#cardCima").hide();
				$("#cardBaixo").hide();
			}else{
				$("#cardCima").show();
				$("#cardBaixo").show();
			}
		}else{
			$("#elementoCimaId").val("");
			$("#elementoBaixoId").val("");
		}
		
		ControladorAmalia.toogleDialogo("#dialogoAssociaClasses", false);

	},
	
	toogleDialogoGravarDiagrama: function(tDia){
		$("#tipoDeDiagrama").val(tDia);
		this.toogleDialogo("#dialogoGravarDiagrama", false);
	},

    toogledialogoAtribuirNomeDiagrama: function(tDia){
        $("#tipoDeDiagrama").val(tDia);
        this.toogleDialogo("dialogoAtribuirNomeDiagrama", false);
    },
	
	toogleDialogoAbreDiagrama: function (tDia){
		$("#tipoDeDiagramaAbrir").val(tDia);
		$("#diagramasDisponíveis").empty();
		
		for (i =0 ; i < localStorage.length; i++){
			var nome = localStorage.key(i);
			console.log(nome.substring(0,tDia.length));
			if(nome.substring(0,tDia.length)== tDia){
				var opt = $("<option>");
				opt.val(nome);
				opt.html(nome);
				$("#diagramasDisponíveis").append(opt);
			}
		}
		
		this.toogleDialogo("#dialogoAbreDiagrama",false);
	},
	
	toogleDialogoMostarXMLClasses : function (texto){
		
		$("#xmlClasses").val(texto);
		ControladorAmalia.toogleDialogo("#dialogoMostarXMLClasses",false);
	},
	
	toogleDialogoMostarXMLCasos : function (texto){
		
		$("#xmlCasos").val(texto);
		ControladorAmalia.toogleDialogo("#dialogoMostarXMLCasos",false);
	},
	toggleDialogoAbreDiagramaCasosUsoDisco : function(){
		this.toogleDialogo("#dialogoAbreDiagramaCasosDisco",false);
	},
	toggleDialogoAbreDiagramaClassesDisco : function(){
		this.toogleDialogo("#dialogoAbreDiagramaClassesDisco",false);
	},
	toggleDialogoGravaDiaClassesDisco: function(focus){
		this.toogleDialogo("#dialogoGravaDiaClassesDisco",focus);
	},
	
	toggleDialogoGravaDiaCasosDisco:function(focus){
		this.toogleDialogo("#dialogoGravaDiaCasosDisco",focus);
	},
	
	//>>>>>>>>>>>>>>>>>>>> Alterar atributos dos elementos dos diagramas
	setNomeActor : function (graph){
		
		//Não sei se isto é a melhor forma obriga a que o controlador conheça detalhes da vista
		var nomeActor = $("#nomeActor").val();
		var idActor = $("#idActor").val();
		if ( nomeActor && idActor ){
			//definido nome para já alterar no gráfico
			//alterar modelo registando o nome
			var actor = graph.getCell(idActor);
			actor.attr({ text:{text:nomeActor} });
		}
	},
	setNomeCaso : function (graph){
		var nomeCaso = $("#nomeCasoUso").val();
		var idCaso =$("#idCaso").val();
		if (nomeCaso && idCaso){
			// definido o nome do caso daqui chamar alterações ao modelo
			//registando novo nome e largura + altura
			var caso = graph.getCell(idCaso);
			caso.resize( nomeCaso.length * 8 + 40 , 50);
			caso.attr({text:{text:nomeCaso}});
		}
		
	},
	//Altera as características de uma classe
	setClasse : function(graph, atributos, metodos){
		//Obter o nome da classe
		var nomeClasse = $("#nomeDaClasse").val();
		// Obter o Id da classe
		var idClasse =$("#idClasse").val();
		//Definir a largura
		var largura = nomeClasse.length;
		//Descobrir qual a string mais comprida
		for (i = 0 ; i < atributos.length ; i++){
			var t = atributos[i].length;
			if(t > largura) {largura = t;}
		}
		for ( i = 0 ; i < metodos.length ; i++ ){
			var t = metodos[i].length;
			if ( t > largura ) { largura = t;}
		}
		//Calcular a largura
		var largura = largura * 8 + 40;
		//Calcular a altura
		var altura = ( 3 + atributos.length + metodos.length ) * 15;
		
		if(nomeClasse && idClasse){
			
			//A altura e a largura miníma é sempre de 100
			if( altura < 100 ) {altura = 100;}
			if (largura < 100){ largura = 100;}
			
			//obter o elemento
			var classe = graph.getCell(idClasse);
			
			//Alterar o tamanho para que caibam os elementos a adicionar
			classe.resize( largura, altura);
			//colocar os elementos a adicionar
			classe.set( { name:nomeClasse } );
			classe.set( { attributes:atributos } );
			classe.set( { methods:metodos } );
				//Modificar o xml
		}
		
	},
	
	
	
	//Altera as características de uma interface
	setInterface : function(graph, metodosInt){
		//Obter o nome da classe
		var nomeInterface = $("#nomeDaInterface").val();
		// Obter o Id da classe
		var idInterface =$("#idInterface").val();
		//Definir a largura
		var largura = nomeInterface.length;
		//Descobrir qual a string mais comprida
	//	for (i = 0 ; i < atributos.length ; i++){
	//		var t = atributos[i].length;
	//		if(t > largura) {largura = t;}
	//	}
		for ( i = 0 ; i < metodosInt.length ; i++ ){
			var t = metodosInt[i].length;
			if ( t > largura ) { largura = t;}
		}
		//Calcular a largura
		var largura = largura * 8 + 40;
		//Calcular a altura
		var altura = ( 3 + metodosInt.length ) * 15;
		
		if(nomeInterface && idInterface){
			
			//A altura e a largura miníma é sempre de 100
			if( altura < 100 ) {altura = 100;}
			if (largura < 100){ largura = 100;}
			
			//obter o elemento
			var elinterface = graph.getCell(idInterface);
			
			//Alterar o tamanho para que caibam os elementos a adicionar
			elinterface.resize( largura, altura);
			//colocar os elementos a adicionar
			elinterface.set( { name:nomeInterface } );
		//	elinterface.set( { attributes:atributos } );
			elinterface.set( { methods:metodosInt } );
				//Modificar o xml
		}
		
	},
	
	
	
	//Estabelecer ligações
	//AssociarCasos
	associaCasos : function (graph){
		var elementoCimaId = $("#elementoCimaId").val();
		var elementoBaixoId = $("#elementoBaixoId").val();
		var ligaCasos = $('input[name="ligaCasos"]:checked').val();
		if (elementoCimaId && elementoBaixoId && ligaCasos){
			if(ligaCasos == "include"){
				var liga = Amalia.liga.getGrafLigaInclude(elementoCimaId,elementoBaixoId);
				//registar a ligação no modelo e a posição final
				//entre que elementos e de que tipo
			}else if (ligaCasos == "extends"){
				var liga = Amalia.liga.getGrafLigaExtend(elementoCimaId,elementoBaixoId);
				//registar a ligação no modelo
				//entre que elementos e de que tipo
			}else{
				var liga = false;
			}
			if (liga){
				graph.addCell(liga);
				(graph.getCell(elementoCimaId)).translate(150,150);
				
				
			}
		}
		
	},


	//Associar Actor a Caso
	associaActorAoCaso: function (graph, elementoCimaId, elementoBaixoId){
		var liga = Amalia.liga.getGrafLigaAssocia(elementoCimaId,elementoBaixoId);
		//registar a ligação no modelo
		//entre que elementos e de que tipo
		// o elemento de Cima é sempre um caso de uso
		graph.addCell(liga);
		(graph.getCell(elementoCimaId)).translate(150,0);
	},


	//especialização de Actor ou classes quando o elemento de baixo é classe abstrata
	associaHeranca: function (graph, elementoCimaId, elementoBaixoId){
		var liga = Amalia.liga.getGrafLigaHeranca(elementoCimaId,elementoBaixoId);
		//registar a ligação no modelo
		//entre que elementos e de que tipo
		graph.addCell(liga);
		(graph.getCell(elementoCimaId)).translate(0,150);
	},



	//ligações entre classes
	associaClasses: function(graph){
		var elementoCimaId = $("#elementoCimaId").val();
		var elementoBaixoId = $("#elementoBaixoId").val();
		var ligaClasses = $('#ligarClasses option:selected').val();
		var cardCima =$('#cardCima option:selected').val();
		var cardBaixo = $('#cardBaixo option:selected').val();
		if (elementoCimaId && elementoBaixoId && ligaClasses){
			switch (ligaClasses){
				case "h":
					var liga = Amalia.liga.getGrafLigaHeranca(elementoCimaId,elementoBaixoId);
					break;
				case "c":
					var liga = Amalia.liga.getGrafLigaComposicaoComCardinalidade(elementoCimaId,elementoBaixoId,cardCima,cardBaixo);
					break;
				case "a":
					var liga = Amalia.liga.getGrafLigaAgregacaoComCardinalidade(elementoCimaId,elementoBaixoId,cardCima,cardBaixo);
					break;	
				case "s":
					var liga = Amalia.liga.getGrafLigaAssociaAmaliaComCardinalidade(elementoCimaId,elementoBaixoId,cardCima,cardBaixo);
					break;
				default:
					var liga = false;
				break;
			}
			
			if (liga){
				// este bloco de código está por todo o lado secalha deveria estar isolado 
				graph.addCell(liga);
				(graph.getCell(elementoCimaId)).translate(0,150);
			}
		}
	},
	//associa classes concretas ou abstratas a interfaces
	associaImplementa: function (graph,elementoCima,elementoBaixo){
		var liga = Amalia.liga.getGrafLigaImplementacao(elementoCima.id,elementoBaixo.id);
		if (liga){
			graph.addCell(liga);
			elementoCima.translate(0,150);
		}
		
	},
	//*************************************************
	//** Reposiciona elementos para que fiquem dentro
	//** do paper
	//*************************************************
	elementoConfinadoAoPaper: function(minWidth, minHeight, maxWidth, maxHeight,elemento){
		
		var acertoAOlhoPorcento = 130; // Uma correção por tentativa e erro para atinar com a margem do canvas
		var zonaDiagrama = g.rect(minWidth+1, minHeight+1, maxWidth-acertoAOlhoPorcento, maxHeight-1);
		
		//If selected object isn't of Association type following coditions must be verified. BUG#1 FIXED!
		if(!elemento instanceof joint.shapes.uml.Association){
		var bBoxElemento = elemento.getBBox();


		if(!zonaDiagrama.containsPoint(bBoxElemento.origin())){

			elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.origin()).x, zonaDiagrama.pointNearestToPoint(bBoxElemento.origin()).y);
		}
		
		if(!zonaDiagrama.containsPoint(bBoxElemento.bottomLeft())){

			if(elemento.toJSON().size){
				elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.bottomLeft()).x ,
								 zonaDiagrama.pointNearestToPoint(bBoxElemento.bottomLeft()).y - elemento.toJSON().size.height );
			}
			
		}
		
		if (!zonaDiagrama.containsPoint(bBoxElemento.topRight())){

			if(elemento.toJSON().size){
				elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.topRight()).x -  elemento.toJSON().size.width,
								 zonaDiagrama.pointNearestToPoint(bBoxElemento.topRight()).y );
			}
		}
		
		if (!zonaDiagrama.containsPoint(bBoxElemento.corner())){
			elemento.position(zonaDiagrama.pointNearestToPoint(bBoxElemento.corner()).x - elemento.toJSON().size.width,
							zonaDiagrama.pointNearestToPoint(bBoxElemento.corner()).y - elemento.toJSON().size.height);
		}
		}
	},
	
	
	//*************************************************
	//** Produção de xml
	//*************************************************
	diagramaToXML: function (graph,diagrama){
		
		
		if (diagrama == "classes"){
			var elementosNasFerramentas = 3;
			var inicioXML = '<diagrama_classes>\n';
			var fimXML = '</diagrama_classes>';
		}else if (diagrama == "casos de uso"){
			var elementosNasFerramentas = 2;
			var inicioXML = '<diagrama_casos_uso>\n';
			var fimXML = '</diagrama_casos_uso>';
		}
		
		//elementos e ligações do diagrama
		var elementos = graph.getElements();
		var ligacoes = graph.getLinks();
		
		var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
		//processamento
		xml += inicioXML;
		xml += ControladorAmalia._elementosToXML(graph,elementos);
		xml += ControladorAmalia._ligacoesToXML3(graph,ligacoes);
		xml += fimXML;
		
		return xml;
		
		
	},
	//função interna para obter o xml do elementos
	_elementosToXML: function (graph, elementos){
		
		var xml = "<elementos>\n";
		for (i = 0 ; i < elementos.length ; i++){
				
				var el = graph.getCell(elementos[i].id).toJSON();


				//elementos da barra de ferramentas ignorar
				//if (el.position.x < 120){ continue;}
				// restantes elementos
				xml += '\t<elemento id="' + el.id + '">\n';
				var tipoElemento = (el.type).split(".")[0];
				if (tipoElemento == "uml"){
					xml += ControladorAmalia._classeToXML(el);
				}else if (tipoElemento == "basic"){
					xml += ControladorAmalia._casosAtoresToXML(el);
				}
				xml += "\t</elemento>\n";
			}
		xml += '</elementos>\n';
		return xml;
		
	},
	//função interna para obter o xml de uma classe
	_classeToXML: function(el){
		var xml ="";
		if (el.type == "uml.Class"){
			xml += '\t\t<tipo>Classe</tipo>\n'; 
		}else if (el.type == "uml.Abstract"){
			xml += '\t\t<tipo>Classe Abstrata</tipo>\n'; 
		}else if (el.type == "uml.Interface"){
			xml += '\t\t<tipo>Interface</tipo>\n'; 
		}
		xml += '\t\t<nome>' + el.name + "</nome>\n";
		if (el.attributes){
			xml += "\t\t<atributos>\n";
			for (j = 0 ; j < (el.attributes).length ; j++){
				xml += "\t\t\t<atributo>" + el.attributes[j] + "</atributo>\n";
			}
			xml += "\t\t</atributos>\n";
		}
		if (el.methods){
			xml +="\t\t<metodos>\n";
			for (j = 0 ; j < (el.methods).length ; j++){
				xml += "\t\t\t<metodo>" + el.methods[j] + "</metodo>\n";
			}
			xml +="\t\t</metodos>\n";
		}
		return xml;
	},
	//função interna para obter o xml de atores e casos de uso
	_casosAtoresToXML: function (el){
		var xml = "";
		if (el.type == "basic.Actor"){
			xml += '\t\t<tipo>Actor</tipo>\n';
			if( el.attrs.text){
				xml += '\t\t<nome>'+el.attrs.text.text+'</nome>\n';
			}
		}else if (el.type == "basic.Circle"){
			xml += '\t\t<tipo>caso de uso</tipo>\n';
			if( el.attrs.text){
				xml += '\t\t<nome>'+el.attrs.text.text+'</nome>\n';
			}
		}
		return xml;
	},
	//função interna para obter o xml das ligações
	_ligacoesToXML : function( graph, ligacoes){
		var xml="<ligacoes>\n";
		
		for (i = 0 ; i < ligacoes.length ; i++ ){
				
				var lig = graph.getCell( ligacoes[i].id).toJSON();
				xml +='\t<ligacao id="' + lig.id + '">\n';
				if (lig.type == "uml.Generalization"){
					xml +='\t\t<tipo>heranca</tipo>\n';
				}else if (lig.type == "uml.Composition"){
					xml +='\t\t<tipo>composicao</tipo>\n';
				}else if (lig.type == "uml.Aggregation"){
					xml +='\t\t<tipo>agregacao</tipo>\n';
				}else if(lig.type == "uml.Implementation"){
					xml +='\t\t<tipo>implementacao</tipo>\n';
				}else if(lig.labels){
					// Ligações entre casos de uso
					if (lig.labels[0].attrs.text.text == " << include >> "){
						xml += "\t\t<tipo>include</tipo>\n";
					}else{
						xml += "\t\t<tipo>extend</tipo>\n";
					}
					
				}else{
					xml +='\t\t<tipo>associacao</tipo>\n';
				}
				xml +='\t\t<origem_id>' + lig.source.id+ '</origem_id>\n';
				xml +='\t\t<destino_id>' + lig.target.id+ '</destino_id>\n';
				xml +='\t</ligacao>\n';
			}
		
		xml += "</ligacoes>\n";
		return xml;
	},
	_ligacoesToXML2 : function(graph,ligacoes){
		var xml="<ligacoes>\n";
		
		for (i = 0 ; i < ligacoes.length ; i++ ){
			var ligObj = graph.getCell(ligacoes[i]);
			var lig = graph.getCell( ligacoes[i].id).toJSON();
			xml +='\t<ligacao id="' + lig.id + '">\n';
			if(lig.type){
				var tipo = lig.type;
				console.log(tipo);
				switch (tipo){
					case "uml.Generalization":
						xml +='\t\t<tipo>heranca</tipo>\n';
						break;
					case "uml.Composition":
						xml +='\t\t<tipo>composicao</tipo>\n';
						break;
					case "uml.Aggregation":
						xml +='\t\t<tipo>agregacao</tipo>\n';
						break;
					case "uml.Implementation":
						xml +='\t\t<tipo>implementacao</tipo>\n';
						break;
					case "uml.Association":
						xml +='\t\t<tipo>associacao</tipo>\n';
						break;
					case "amaliaLinks.Include":
						xml +='\t\t<tipo>include</tipo>\n';
						break;
					case "amaliaLinks.Extends":
						xml +='\t\t<tipo>extend</tipo>\n';
						break;
					case "amaliaLinks.Composition":
						xml +='\t\t<tipo>composicao</tipo>\n';
						xml +='\t\t<cardinalidade>'+ligObj.getCardinalityString()+'</cardinalidade>\n';
						break;
					case "amaliaLinks.Association":
						xml +='\t\t<tipo>associacao</tipo>\n';
						xml +='\t\t<cardinalidade>'+ligObj.getCardinalityString()+'</cardinalidade>\n';
						break;
					case "amaliaLinks.Agregation":
						xml +='\t\t<tipo>agregacao</tipo>\n';
						xml +='\t\t<cardinalidade>'+ligObj.getCardinalityString()+'</cardinalidade>\n';
						break;
					default:
						xml +='\t\t<tipo>undefined</tipo>\n';
						break;
					
				}
				
			}
			xml +='\t\t<origem_id>' + lig.source.id+ '</origem_id>\n';
				xml +='\t\t<destino_id>' + lig.target.id+ '</destino_id>\n';
				xml +='\t</ligacao>\n';
		}
		
		xml += "</ligacoes>\n";
		return xml;
	},
	_ligacoesToXML3 : function( graph, ligacoes){
		var xml="<ligacoes>\n";
		
		for (i = 0 ; i < ligacoes.length ; i++ ){
				
				var lig = graph.getCell( ligacoes[i].id).toJSON();
				xml +='\t<ligacao id="' + lig.id + '">\n';
				if (lig.type == "uml.Generalization"){
					xml +='\t\t<tipo>heranca</tipo>\n';
				}else if (lig.type == "uml.Composition"){
					xml +='\t\t<tipo>composicao</tipo>\n';
					xml +='\t\t<cardDestino>'+lig.labels[0].attrs.text.text+'</cardDestino>\n';
					xml +="\t\t<cardOrigem>"+lig.labels[1].attrs.text.text+"</cardOrigem>\n";
				}else if (lig.type == "uml.Aggregation"){
					xml +='\t\t<tipo>agregacao</tipo>\n';
					xml +='\t\t<cardDestino>'+lig.labels[0].attrs.text.text+'</cardDestino>\n';
					xml +="\t\t<cardOrigem>"+lig.labels[1].attrs.text.text+"</cardOrigem>\n";
				}else if(lig.type == "uml.Implementation"){
					xml +='\t\t<tipo>implementacao</tipo>\n';
				}else if(lig.type == "uml.Association"){
					if (lig.labels){
						var labelZero = lig.labels[0].attrs.text.text;
						if (labelZero == " << include >> "){
							xml +='\t\t<tipo>include</tipo>\n';

						}else if (labelZero == " << extend >> "){
							xml +='\t\t<tipo>extend</tipo>\n';

						}else{
							xml +='\t\t<tipo>associacao</tipo>\n';
							xml +='\t\t<cardDestino>'+lig.labels[0].attrs.text.text+'</cardDestino>\n';
							xml +="\t\t<cardOrigem>"+lig.labels[1].attrs.text.text+"</cardOrigem>\n";
						}
					}else{
						xml +='\t\t<tipo>associacao</tipo>\n';
					}
				}
				xml +='\t\t<origem_id>' + lig.source.id+ '</origem_id>\n';
				xml +='\t\t<destino_id>' + lig.target.id+ '</destino_id>\n';
				xml +='\t</ligacao>\n';
			}
		
		xml += "</ligacoes>\n";
		return xml;
	},
	//**************************************************
	// Gravar Diagrama no Browser
	//**************************************************
	
	gravarDiagramaNoBrowser: function(graph){
		var modeloJSON = graph.toJSON();
		var diagrama = JSON.stringify(modeloJSON);
		var perfixo = $("#tipoDeDiagrama").val();
		var nome = $("#nomeDoDiagrama").val();
		if(nome){
			localStorage.setItem(perfixo+"_"+nome, diagrama);
		}else{
			localStorage.setItem(perfixo,diagrama);
		}
		this.toogleDialogoGravarDiagrama("");
		
	},
	
	abirDiagrama:function (graph){
		
		graph.clear();
		var nome = $("#diagramasDisponíveis option:selected").val();
		var diagrama = localStorage.getItem(nome);
		graph.fromJSON(JSON.parse(diagrama));
		this.toogleDialogo("#dialogoAbreDiagrama",false);
		
	},
	//***************************
	//**   Funções Utilitárias **
	//***************************
	//-----------------------------------------------Adicionar um atributo ou um método ao dialogoAlteraClasse
	addAtributoMetodo: function(classe,valor){
		//Div para o Atributo
		var atributoP = $("<div />").addClass(classe);
	
		//Campo de texto para o atributo
		var nomeAtributo = $("<input />").addClass("nome_"+classe);
		nomeAtributo.attr ("type", "text");
		nomeAtributo.attr ("placeholder", classe);
		nomeAtributo.val(valor);
	
		//botão para apagar atributo
		var btnApaga = $("<input />").addClass("btnApaga");
		btnApaga.attr("type", "button");
		btnApaga.attr("value","-");
	
		atributoP.append(nomeAtributo);
		atributoP.append(btnApaga);
	
		return atributoP;
	},
	
	addMetodoInterface: function(interf,metodo){
		//Div para o Metodo
		var metodoP = $("<div />").addClass(interface);
	
		//Campo de texto para o Metodo
		var nomeMetodo = $("<input />").addClass("nome_"+interf);
		nomeMetodo.attr ("type", "text");
		nomeMetodo.attr ("placeholder", interf);
		nomeMetodo.val(metodo);
	
		//botão para apagar atributo
		var btnApaga = $("<input />").addClass("btnApaga");
		btnApaga.attr("type", "button");
		btnApaga.attr("value","-");
	
		metodoP.append(nomeAtributo);
		metodoP.append(btnApaga);
	
		return atributoP;
	}
	
};

//<<<<<<<<<<<<<<<<<<<<< Change CSS style sheets with cookies >>>>>>>>>>>>>>>>>>>>>>>
//http://www.thesitewizard.com/javascripts/change-style-sheets.shtml

// *** TO BE CUSTOMISED ***

var style_cookie_name = "style" ;
var style_cookie_duration = 30 ;

// *** END OF CUSTOMISABLE SECTION ***
// You do not need to customise anything below this line

function switch_style ( css_title )
{
// You may use this script on your site free of charge provided
// you do not remove this notice or the URL below. Script from
// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
    i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
      link_tag[i].title) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
      }
    }
    set_cookie( style_cookie_name, css_title,
      style_cookie_duration );
  }
}
function set_style_from_cookie()
{
  var css_title = get_cookie( style_cookie_name );
  if (css_title.length) {
    switch_style( css_title );
  }
}
function set_cookie ( cookie_name, cookie_value,
    lifespan_in_days, valid_domain )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ?
                       ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name +
                       "=" + encodeURIComponent( cookie_value ) +
                       "; max-age=" + 60 * 60 *
                       24 * lifespan_in_days +
                       "; path=/" + domain_string ;
}
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match (
                        '(^|;)[\s]*' +
                        cookie_name +
                        '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
    return '' ;
}

