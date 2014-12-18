/**
 * @author jorge et al.
 */



//************************************************
//** Função para adicionar campos de texto para **
//**     atributos ou métodosde uma Classe      **
//************************************************
function addAtributoMetodo(classe){
	//Div para o Atributo
	var atributoP = $("<div />").addClass(classe);
	
	//Campo de texto para o atributo
	var nomeAtributo = $("<input />").addClass("nome_"+classe);
	nomeAtributo.attr ("type", "text");
	nomeAtributo.attr ("placeholder", classe);
	
	//botão para apagar atributo
	var btnApaga = $("<input />").addClass("btnApaga");
	btnApaga.attr("type", "button");
	btnApaga.attr("value","-");
	
	atributoP.append(nomeAtributo);
	atributoP.append(btnApaga);
	
	return atributoP;
}

function addMetodoInterface(interf){
	//Div para o Atributo
	var metodoP = $("<div />").addClass(interf);
	
	//Campo de texto para o atributo
	var nomeMetodo = $("<input />").addClass("nome_"+interf);
	nomeMetodo.attr ("type", "text");
	nomeMetodo.attr ("placeholder", interf);
	
	//botão para apagar metodo
	var btnApaga = $("<input />").addClass("btnApaga");
	btnApaga.attr("type", "button");
	btnApaga.attr("value","-");
	
	metodoP.append(nomeMetodo);
	metodoP.append(btnApaga);
	
	return metodoP;
}

//***************************
//** Iniciador do Diagrama **
//***************************
function iniciarDiagrama(graph){
		//Objetos da barra de ferramentas
	//var lixoGraf = Amalia.dia.getGrafLixo (10,400);
	var classGraf = Amalia.dia.getGrafClass(10,20);
	var abstractGraf = Amalia.dia.getGrafAbstract(10,140);
	var interfaceGraf = Amalia.dia.getGrafInterface(10,270);
	
	//Adicionar ao gráfico os objetos da barra de ferramentas
	graph.addCells([classGraf, abstractGraf, interfaceGraf]);
	
}
	
	
//*******************************************
//**           Página Carregada            **
//** Eventos e funcionaliddes da interface **
//*******************************************
$(document).ready(function(){


	
	var graph = new joint.dia.Graph;
	
	// Tipos de instancias dos objetos
	var instanceClass = joint.shapes.uml.Class;//são todos 
	var instanceAbstract = joint.shapes.uml.Abstract; //Classe abstracta
	var instanceInterface = joint.shapes.uml.Interface;// Interface	
	//var instanceLixo = joint.shapes.basic.Lixo;//Lixo
	var widthPaper = Math.round(screen.availWidth * .95);
	var heightPaper =  Math.round(screen.availHeight *.75);
	var minWidthDiagramPaper = 120;
	var minHeightDiagramPaper = 0;
	var minSizePaper = g.rect(0,0,widthPaper,heightPaper);
	
	//console.log("w-"+widthPaper+ "h-"+heightPaper);
	
	
	var paper = new joint.dia.Paper({
	el: $('#modelo'),
	width: widthPaper,
	height: heightPaper,// ainda tenho um problema com isto
	gridSize: 1,
	model: graph
	});
	
	iniciarDiagrama(graph);
	
	//Eventos a capturar
	
	//mousedown
	paper.on('cell:pointerdown',function(cellView,evt, x, y){
		
		var elemento = cellView.model;
		
		//trazer o elemento clicado para a frente do diagrama
		elemento.toFront();
		
		//Clonar o elemento e adicionar o clone ao gráfico se o click for na área de ferramentas
		if (x<minWidthDiagramPaper){
			//obter o id do elemento que está a ser arrastado para o paper e que irá fazer parte do diagrama
			//com elemento.id --- para implementar as funcionalidades que perimitirão o xml
			graph.addCells([elemento.clone()]);
		}
			
	});
	
	//Drop into para estabelecer ligações, mouseup
	paper.on('cell:pointerup', function(cellView, evt, x, y){
		
		var elementoCima = cellView.model;
		
		//area de diagrama x > 120
		if (x > minWidthDiagramPaper){
			
			//Acertar posição
			ControladorAmalia.elementoConfinadoAoPaper(minWidthDiagramPaper,minHeightDiagramPaper,widthPaper,heightPaper, elementoCima);//tenho problema com a largura

			//Obter o elemento que ficou por baixo daquele que estou a deslocar
			var elementoBaixo = graph.get('cells').find(function(cell){
				// esquisito mas o elemento de cima também é dos elementos do grupo e eu não estou interessado
				if (cell.id === elementoCima.id){return false;}
				
				//estou interessado Classes Inferfaces e Classes Abstratas cuja bounding box contem o ponto x,y
				//e essas coinsas são tudo classes
				if(cell instanceof instanceClass
					&& cell.getBBox().containsPoint(g.point(x, y))){
						return true;
					}else{
						return false;
					}
			});
			
			//Estabelecer ligações se ainda não existirem
			if (elementoBaixo && !_.contains(graph.getNeighbors(elementoBaixo), elementoCima)){
				
				//Casos
				if(elementoBaixo instanceof instanceInterface
					&& elementoCima instanceof instanceClass 
					&& !(elementoCima instanceof instanceInterface)){
											
						//O elemento de Baixo é uma interface - segue-se uma implementação se o de cima não for uma interface
						ControladorAmalia.associaImplementa(graph,elementoCima,elementoBaixo);
					
				}else if (elementoBaixo instanceof instanceAbstract
					&& elementoCima instanceof instanceClass
					&& !(elementoCima instanceof instanceInterface) ){
											
						// elemento de baixo é classe abstrata a de cima é classe ou classe abstrata --> herança
						ControladorAmalia.associaHeranca(graph,elementoCima.id,elementoBaixo.id);
				
				}else if (!(elementoBaixo instanceof instanceAbstract || elementoBaixo instanceof instanceInterface)
					&&!(elementoCima instanceof instanceAbstract || elementoCima instanceof instanceInterface)){
						
						ControladorAmalia.toogleDialogoAssociaClasses(elementoCima.id,elementoBaixo.id);						
	
				}
				
			}
		}else{
			// Aqui o comportamento de eliminação dos elementos que caem de novo na barra de ferramentas
			graph.getCell(elementoCima.id).remove();
		}
		
	});
	
		//Duplos clicks para mudar os momes dos objectos e alterar os seus atributos.
		paper.on('cell:pointerdblclick',function(cellView,evt, x, y){
			
		var elemento = cellView.model;
		
		if (elemento instanceof instanceInterface){
			//window.alert("AHAHAHAHAH");
			ControladorAmalia.toogleDialogoAlteraInterface(elemento);
		}
		else
			ControladorAmalia.toogleDialogoAlteraClasses(elemento);

	});
	


	
	//ideia para alterar as dimensões do paper mas a coisa é muito lenta
	
	/*
	graph.on('change:position', function(cell){
		console.log ("Estou a mexer coisas no paper");
		//var paperBox = paper.getContentBBox();
		var cellBox = cell.getBBox();
		
		//console.log("boxCell-"+cellBox.corner());
		if (minSizePaper.containsPoint(cellBox.corner())){
			console.log("Ainda não saiu do paper");
		}else{
			console.log("OOps!");
			//paper.fitToContent(1, 1, 0);
		}
		
	});
	*/
	//////////>>>>>>>>>>>>>>>>>>>>>>>>>>Eventos do IDE diagrama de classes e dialogos
		//Experiencia gravar e repor
		
	$("#btnVoltarInicio").click(function(){
		window.location.href ="index.html";
	});
	$("#btnGuardarDiagramaClasses").click(function (){
		ControladorAmalia.toogleDialogoGravarDiagrama("diagramaClasses");
		
	});
	//Cancelar a Gravação
	
	$("#btnCancelaGravarDiagrama").click(function(){
		ControladorAmalia.toogleDialogoGravarDiagrama("");
	});
	//Gravar o diagrama
	$("#btnGravarDiagrama").click(function(){
		ControladorAmalia.gravarDiagramaNoBrowser(graph);
	});
	
	
	//Experiência repor
	$("#btnRestaurarDiagramaClasses").click(function () {	
		ControladorAmalia.toogleDialogoAbreDiagrama("diagramaClasses");
	});
	
	//btnCancelaAbrirDiagrama
	$("#btnCancelaAbrirDiagrama").click(function(){
		ControladorAmalia.toogleDialogoAbreDiagrama("");
	});
	
	//btnAbrirDiagrama ---- Abrir o Diagrama
	$("#btnAbrirDiagrama").click(function(){
		ControladorAmalia.abirDiagrama(graph);
	});
	//--------------------------Botão apagarDiagrama
	$("#btnApagarDiagrama").click(function(){
		graph.clear();
		iniciarDiagrama(graph);
	});
	//--------------------------Botão cancelar do dialogoAlteraClasses
	$("#btnCancelarAlteraClasse").click(function(){
		
		 $("div.metodo").each(function(){
		 	$(this).remove();
		 });
		 $("div.atributo").each(function(){
		 	$(this).remove();
		 });
		ControladorAmalia.toogleDialogoAlteraClasses("");
	});
	//---------------------------Botão alterar do dialogoAlteraClasses
	$("#btnAceitarAlterarClasse").click(function(){
		var atributosArray = new Array();
		var metodosArray = new Array();
		
		//Capturar os atributos
		$("div.atributo").each(function(){
			var desigAtributo = $($(this).find("input.nome_atributo")[0]).val();
			atributosArray.push(desigAtributo);
			$(this).remove();
		});
		
		//Capturar os métodos
		$("div.metodo").each(function(){
			var desigMetodo = $($(this).find("input.nome_metodo")[0]).val();
			metodosArray.push(desigMetodo);
			$(this).remove();
		});
		var idClasse = $("#idClasse").val();
		var elemento = graph.getCell(idClasse);

		ControladorAmalia.setClasse(graph,atributosArray,metodosArray);
		ControladorAmalia.toogleDialogoAlteraClasses("");
	});
	//--------------------------Botão Limpar Nome
	$("#btnLimparNome").click(function(){
		$("#nomeDaClasse").val("");
	});
	//--------------------------Botão Add Atributo
	$("#btnAddAtributo").click(function(){
		$("#atributosClasse").append(addAtributoMetodo("atributo"));
	});
	//--------------------------Botão para Apagar atributo
	$("#atributosClasse").on("click",".btnApaga",function(){
		$(this).parent().remove();
	});
	//---------------------------Botão add Método -- btnAddMetodo
	$("#btnAddMetodo").click(function(){
		$("#metodosClasse").append(addAtributoMetodo("metodo"));
	});
	//--------------------------Botão para Apagar método
	$("#metodosClasse").on("click",".btnApaga",function(){
		$(this).parent().remove();
	});
	
	
	//--------------------------Botão cancelar do dialogoAlteraInterface
	$("#btnCancelarAlteraInterface").click(function(){
		
		 $("div.metodo").each(function(){
		 	$(this).remove();
		 });
		ControladorAmalia.toogleDialogoAlteraInterface("");
	});
	//---------------------------Botão alterar do dialogoAlteraInterface
	$("#btnAceitarAlterarInterface").click(function(){
		var metodosArray = new Array();
		
		//Capturar os métodos
		$("div.metodo").each(function(){
			var desigMetodo = $($(this).find("input.nome_metodo")[0]).val();
			metodosArray.push(desigMetodo);
			$(this).remove();
		});
		var idInterface = $("#idInterface").val();
		var elemento = graph.getCell(idInterface);

		ControladorAmalia.setInterface(graph,metodosArray);
		ControladorAmalia.toogleDialogoAlteraInterface("");
	});
	//--------------------------Botão Limpar Nome
	$("#btnLimparNomeInt").click(function(){
		$("#nomeDaInterface").val("");
	});
	//---------------------------Botão add Método -- btnAddMetodoInt
	$("#btnAddMetodoInt").click(function(){
		$("#metodosInterface").append(addMetodoInterface("metodo"));
	});
	//--------------------------Botão para Apagar método
	$("#metodosInterface").on("click",".btnApaga",function(){
		$(this).parent().remove();
	});
	
	
	
	//--------------------------Botão Cancela ligação de Classes
	$("#btnCancelaLigacaoClasses").click(function(){
		ControladorAmalia.toogleDialogoAssociaClasses("","");
	});
	//--------------------------Botão liga Classes
	$("#btnLigaClasses").click(function(){
		ControladorAmalia.associaClasses(graph);
		ControladorAmalia.toogleDialogoAssociaClasses("","");
	});
	
	//*************************************************
	//  Adaptar o dialogo de associação de classes
	//************************************************
	$("#ligarClasses").change(function(){
		if ($("#ligarClasses option:selected").val() == "h"){
			$("#cardCima").hide();
			$("#cardBaixo").hide();
		}else{
			$("#cardCima").show();
			$("#cardBaixo").show();
		}
	});
	
	//***********************************************************
	//** Simplificar o Interface quando a trabalhar no modelo  **
	//***********************************************************
	//    entra no modelo só deixa o título
	$("#modelo").mouseenter(function(){
		$("#controloDiagramaClasses").slideUp(200);
	});
	//    entra no título mostra ferramentas globais e navegação
	$("header").mouseenter(function(){
		$("#controloDiagramaClasses").slideDown(200);

	});
	
	//****************************************
	//  Fazer desaparecer o  blackHole
	// ***************************************
	$("#blackHole").mouseenter(function(){
		$("#blackHole").hide();
		$("#blackHole").delay(1000).fadeIn();
	});
	
	//****************************************
	//**          Exportar para xml         **
	//**     Não é necessário para gravar   **
	//** mas pode ser útil para outra coisa **
	//****************************************
	$("#btnExportarDiagramaClassesParaXML").click(function(){
		
		var xml = ControladorAmalia.diagramaToXML(graph,"classes");
		//console.log(xml);
		ControladorAmalia.toogleDialogoMostarXMLClasses(xml);
		
	});
	$("#btnFecharXMLClasses").click(function(){
		
		ControladorAmalia.toogleDialogoMostarXMLClasses("");
		
		
	});
	
	$("#btnDescarregarXML").click(function(){
		
		var xml = $("#xmlClasses").val();
		
		var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "diagramaClasses.xml");
		
		ControladorAmalia.toogleDialogoMostarXMLClasses("");
		
	});
	
	$("#btnGravarDiagramaClassesDisco").click(function(){
		
		ControladorAmalia.toggleDialogoGravaDiaClassesDisco("#nomeDiaClassesDisco");
		
	});
	
	$("#btnCancelarGravarDiscoDiaClasses").click(function(){
		
		ControladorAmalia.toggleDialogoGravaDiaClassesDisco(false);
	});
	$("#btnGravarDiscoDiaClasses").click(function(){
		var nomeFicheiro = "diagramaClasses";
		if ($("#nomeDiaClassesDisco").val()){
			nomeFicheiro = $("#nomeDiaClassesDisco").val();
		}
		nomeFicheiro = nomeFicheiro + ".dcl";
		var diagramaClassesJSON = JSON.stringify(graph.toJSON());
		var blob = new Blob([diagramaClassesJSON],{type: "text/plain;charset=utf-8"});
		saveAs (blob,nomeFicheiro);
		ControladorAmalia.toggleDialogoGravaDiaClassesDisco(false);
	});
	$("#btnRestaurarDiagramaClassesDisco").click(function(){
		if (window.File && window.FileReader && window.FileList && window.Blob){
			ControladorAmalia.toggleDialogoAbreDiagramaClassesDisco();
		}else{
			alert("Não é possível abir ficheiros do disco com este browser, utilizar a última versão do firefox(por exemplo) ");
			console.log("Estou lixado");
		}
	});
	$("#btnCancelaAbrirClassesDisco").click(function(){
		ControladorAmalia.toggleDialogoAbreDiagramaClassesDisco();
	});
//função para restaurar o diagrama de classes
	function readSingleFile(evt) {

    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	    var diagrama = e.target.result;

	    //só consigo saber se o conteúdo é de um diagrama ou qualquer coisa feita com o joint.js
	    //eventualmente colocar no início do ficheiro um id qq
	     if ((f.name).split(".").pop()=="dcl"){
	    	if (diagrama.substr(0,diagrama.indexOf(":")) =='{"cells"'){
	    	
	    		//console.log("é um ficheiro com um modelo");
	    		graph.clear();
	    		graph.fromJSON(JSON.parse(diagrama));
	    		ControladorAmalia.toggleDialogoAbreDiagramaClassesDisco();
	    	}
	    }else{
	    	alert("ficheiro inválido");
	    	//ControladorAmalia.toggleDialogoAbreDiagramaClassesDisco();
	    }

     };
      r.readAsText(f);
    } else { 
      alert("Não foi possível abir o ficheiro");
    }
  }

  //document.getElementById('ficheiroDiagramaClasses').addEventListener('change', readSingleFile, false);
	
});



