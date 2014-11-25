/**
 * @author jorge
 */

//***************************
//** Iniciador do Diagrama **
//***************************
var positionx_uso=200;
var positiony_uso=20;
var positionx_actor=150;
var positiony_actor=80;
var widthPaperFromStart = Math.round(screen.availWidth)-500;
var heightPaperFromStart = Math.round(screen.availHeight-250);
var widthPaper = Math.round(screen.availWidth)-500;
var heightPaper =  Math.round(screen.availHeight-250);
var graph = new joint.dia.Graph;
//var b  =  element.scrollHeight - element.clientHeight;
//var c  =  element.scrollWidth - element.clientWidth;

//FUNÇÃO ATÉ VER DESNECESSÁRIA - NÃO ESTÁ A USO
function iniciarDiagramaCasosUso(graph) {
	// Gráficos do Ator e do caso de uso na posição da barra de ferramentas
	var caso = Amalia.dia.getGrafCasoUso(Math.round(screen.availWidth * .95)-60,20);
	var ator = Amalia.dia.getGrafAtor(Math.round(screen.availWidth * .95)-23,80);
	//Adicionar o ator e o caso de uso à barra de ferramentas
	graph.addCells([caso,ator]);

}

//RNPS
//Function to insert an Use Case in paper
//function insertUseCaseOnToGraph(){
//	var caso = Amalia.dia.getGrafCasoUso(Math.round(screen.availWidth * .95)-200,20);
//	graph.addCells([caso]);
//}


//Function to insert an Use Case in paper
function insertUseCaseOnToGraph(){
	var caso = Amalia.dia.getGrafCasoUso(positionx_uso,positiony_uso);
    positionx_uso = positionx_uso + 10;
    positiony_uso = positiony_uso + 10;
	graph.addCells([caso]);
}


//RNPS
//Function to insert an Actor in paper
//function insertActorOnToGraph(){
//    var ator = Amalia.dia.getGrafAtor(Math.round(screen.availWidth * .95)-23,80);
//    graph.addCells([ator]);
//}

function insertActorOnToGraph(){
    var ator = Amalia.dia.getGrafAtor(positionx_actor,positiony_actor);
    positionx_actor = positionx_actor + 10;
    positiony_actor = positiony_actor + 10;
    graph.addCells([ator]);
}


$(document).ready(function(){
	
	//Variáveis
	
	//var graph = new joint.dia.Graph;
	//var ModeloJSON 
	var modeloJSON ="";
    //$("#blackHole").hide;
	//os casos de uso são shapes.basic.Circle e os atores shapes.basic.Actor
	var instanceCasoUso = joint.shapes.basic.Circle;
	var instanceActor = joint.shapes.basic.Actor;
	// tamanho do paper




    var minWidthDiagramPaper = 0;
	//var toolbarAreaWidth = Math.round(screen.availWidth * .95)-120; //determina a largura da toolbar
	var treeAreaWidth = 120;
	var minHeightDiagramPaper = 0;


	var paper = new joint.dia.Paper({
		el: $('#modelo'),
		width: widthPaper,
		height: heightPaper,
		gridSize: 10,
		model: graph
	});
//    var rect = new joint.shapes.basic.Rect({
//            position: { x:0, y: heightPaper-120},
//            size: { width: 120, height: 120 },
//    });
//
//    rect.attr({
//        rect:{position:'static'},
//        rect:{fill:'#808080'}
//    });
//    graph.addCell(rect);

    //paper.setDimensions(wi,500);
    //paper.setOrigin(200,200);
    //posição do paper no ecrã
    //paper.setOrigin(500,500);
	//console.log("w-"+widthPaper+ "h-"+heightPaper);
	//iniciarDiagramaCasosUso(graph);
    //insertUseCaseOnToGraph(graph);

	//Eventos que é necessário capturar.
	
	//mouse down para trazer elementos para a frente do diagrama
    paper.on('cell:',function(cellView, evt){

    });
	paper.on('cell:pointerdown',function(cellView,evt, x, y){
		var elemento = cellView.model;
		//trazer o elemento clicado para a frente do diagrama
		elemento.toFront();
        //$("#blackHole").show();
	});
	
	//mouse up para estabelecer ligações entre os elementos na área de desenho
	paper.on('cell:pointerup', function(cellView, evt, x, y){
		
		var elementoCima = cellView.model;
        //$("#blackHole").hide();
		//console.log(JSON.stringify (elementoCima.toJSON()));
		//console.log((elementoCima.toJSON()).position.x);

        //RNPS
        //Crescimento (20px) do paper, caso um elemento chega a uma das extremidades do paper
        if (x > widthPaper-20){
            widthPaper = widthPaper+50;
			paper.setDimensions(widthPaper,heightPaper);

		}
        if(y > heightPaper-20){
            heightPaper = heightPaper +50;
            paper.setDimensions(widthPaper,heightPaper);
            rect.attr({
                rect:{Position:{y:heightPaper-120}}
            });
            graph.resetCells(rect);

        }
		
		//area de diagrama x > 120 - mudado para area de diagrama x < 120
		if (x < widthPaper){
			
			//Acertar posição
			ControladorAmalia.elementoConfinadoAoPaper(minWidthDiagramPaper,minHeightDiagramPaper,widthPaper,heightPaper, elementoCima);//tenho problema com a largura

			//Obter o elemento que ficou por baixo daquele que estou a deslocar
			var elementoBaixo = graph.get('cells').find(function(cell){
				// esquisito mas o elemento de cima também é dos elementos do grupo e eu não estou interessado
				if (cell.id === elementoCima.id){return false;}
				
				//estou interessado em casos de uso e atores cuja bounding box contem o ponto x,y
				
				if((cell instanceof instanceCasoUso || cell instanceof instanceActor)
					&& cell.getBBox().containsPoint(g.point(x, y))){
						return true;
					}else{
						return false;
					}
			});
			
			//Agora que tenho o elemento de cima e o debaixo posso implementar o comportamento de ligação
			//se existir um elemento de baixo e se os dois elementos não estiverem ligados - não vale a pena fazer
			// mais do que uma ligação
			if (elementoBaixo && !_.contains(graph.getNeighbors(elementoBaixo), elementoCima)){
				
				// se os dois elementos são casos de uso podemos ter include ou extend
				if (elementoBaixo instanceof instanceCasoUso && elementoCima instanceof instanceCasoUso){
					
					// Abre um dialogo com as opções include ou extends o processamento do dialogo é feito em
					//ControladorAmalia.associaCasos(graph)
					ControladorAmalia.toogleDialogoAssociaCasos(elementoCima.id,elementoBaixo.id);
					
				}
				// Um caso de uso é colocado sobre um ator. O ator participa no caso de uso.
				if (elementoBaixo instanceof instanceActor && elementoCima instanceof instanceCasoUso){
					
					ControladorAmalia.associaActorAoCaso(graph,elementoCima.id,elementoBaixo.id);

				}
				//Um ator é colocado sobre um ator, então temos herança
				if( elementoBaixo instanceof instanceActor && elementoCima instanceof instanceActor){
					
					ControladorAmalia.associaHeranca(graph,elementoCima.id,elementoBaixo.id);
				}
			}

            //RNPS
            //Every element that is mouse down can be removed
            //Objective: create an floating area in paper in the bottom left corner that when an element is over it, it will be removed
            if(x < 120 && y > heightPaper-120) // Remove area size (trying 120x120 px)
            {
                graph.getCell(elementoCima.id).remove();
            }
			
		}else{
			// falta aqui o comportamento de remover os objectos que voltam a entrar na zona de ferramentas
			//graph.getCell(elementoCima.id).remove();


		}
		
		
	});
	
	//Duplos clicks para mudar os momes dos objectos e alterar o tamanho dos casos de uso.
		paper.on('cell:pointerdblclick',function(cellView,evt, x, y){
		var elemento = cellView.model;

		//mudar atributos do caso de uso
		if (elemento instanceof instanceCasoUso){
			// esta era uma tentativa de ter uma só função para chamar os dois dialogos mais é uma complicação
			//mais vale a função comentada
			//ControladorAmalia.toogleDialogoMudaNome(elemento.id,"#idCaso","#dialogo_casos_uso","#nomeCasoUso");
			ControladorAmalia.toogleDialogoCasoUso(elemento);

		}
		//mudar atributos do ator
		if (elemento instanceof instanceActor){
			ControladorAmalia.toogleDialogoAtor(elemento.id);

		}
		
	});




	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ToolBox Events <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
    //RNPS
	//FIXME o zoom to fit continua com bug, nem sempre consegue se limitar ao tamanho inicial
    //
	//Add Use Case graph to paper
	$("#addUseCaseGraph").click(function(e){
		insertUseCaseOnToGraph();
        e.preventDefault();
	});
	
	//Add Actor graph to paper
    $("#addActorGraph").click(function(e){
        insertActorOnToGraph();
        e.preventDefault();
         });

    //Zoom paper to fit content
    $("#makeZoomToFit").click(function(e){
        if(paper.options.height > heightPaperFromStart || paper.options.width > widthPaperFromStart){
            paper.fitToContent(0,0,20,0);
        } else {
            paper.setDimensions(widthPaperFromStart,heightPaperFromStart);

        }
        heightPaper = paper.options.height;
        widthPaper = paper.options.width;
    });

    //Clear Diagram
    $("#clearDiagram").click(function(e){
        graph.clear();
    });




	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Eventos dos dialogos <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
	//Alterar o nome do Caso de Uso
	$("#caso_uso").submit(function(e){

		ControladorAmalia.setNomeCaso(graph);
		ControladorAmalia.toogleDialogoCasoUso("");
		e.preventDefault();
		
	});
	//Cancelar a alteração do nome do Caso de uso
	$("#btnCancelarAlterarNomeCasoUso").click(function(){
		ControladorAmalia.toogleDialogoCasoUso("");
	});
	//Alterar o nome do Actor
	$("#ator_nome").submit(function(e){

		ControladorAmalia.setNomeActor(graph);
		ControladorAmalia.toogleDialogoAtor("");
		e.preventDefault();
	});
	
	//Cancelar a alteração do nome do Actor
	$("#btnCancelarAlterarNomeActor").click(function(){
		ControladorAmalia.toogleDialogoAtor("");
	});
	//Associar os casos de uso com include ou extends
	$("#ligacaoCasos").click(function(){
		ControladorAmalia.associaCasos(graph);
		ControladorAmalia.toogleDialogoAssociaCasos("","");
	});
	//Cancelar Associação entre casos de uso
	$("#cancelaLigacao").click(function(){
		ControladorAmalia.toogleDialogoAssociaCasos("","");
	});
	
	//Experiencia gravar e repor
	$("#btnGuardarCasosUso").click(function (){
		ControladorAmalia.toogleDialogoGravarDiagrama("diagramaCasosUso");
	});
	//Gravar para o disco em JSON
	$("#btnGuardarCasosUsoDisco").click(function(){
		ControladorAmalia.toggleDialogoGravaDiaCasosDisco("#nomeDiaCasosDisco");
	});
	
	$("#btnCancelarGravarDiscoDiaCasos").click(function(){
		ControladorAmalia.toggleDialogoGravaDiaCasosDisco(false);
	});
	
	$("#btnGravarDiscoDiaCasos").click(function(){
		var nomeFicheiro = "diagramaCasosUso";
		if ($("#nomeDiaCasosDisco").val()){
			nomeFicheiro = $("#nomeDiaCasosDisco").val();
		}
		nomeFicheiro = nomeFicheiro + ".dcu";
		var diagramaCasosJSON = JSON.stringify(graph.toJSON());
		var blob = new Blob([diagramaCasosJSON],{type: "text/plain;charset=utf-8"});
		saveAs (blob,nomeFicheiro);
		ControladorAmalia.toggleDialogoGravaDiaCasosDisco(false);
	});
	//Obter o diagrama do disco JSON 
	$("#btnRestaurarCasosUsoDisco").click(function(){
		if (window.File && window.FileReader && window.FileList && window.Blob){
			//console.log("consigo ler");
			ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
		}else{
			alert("Não é possível abir ficheiros do disco com este browser, utilizar a última versão do firefox(por exemplo) ");
			console.log("Estou lixado");
		}
	});
	//Cancelar a abertura do ficheiro
	$("#btnCancelaAbrirCasosDisco").click(function(){
		ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
	});
	//Cancelar a Gravação
	
	$("#btnCancelaGravarDiagrama").click(function(){
		ControladorAmalia.toogleDialogoGravarDiagrama("");
	});
	// Voltar ao inicío
	$("#btnVoltarInicio").click(function(){
		window.location.href ="index.html";
	});
	
	//Gravar o diagrama
	$("#btnGravarDiagrama").click(function(){
		ControladorAmalia.gravarDiagramaNoBrowser(graph);
	});
	
	
	//Experiência repor
	$("#btnRestaurarCasosUso").click(function () {	
		ControladorAmalia.toogleDialogoAbreDiagrama("diagramaCasosUso");
	});
	
	//btnCancelaAbrirDiagrama
	$("#btnCancelaAbrirDiagrama").click(function(){
		ControladorAmalia.toogleDialogoAbreDiagrama("");
	});
	
	//btnAbrirDiagrama ---- Abrir o Diagrama
	$("#btnAbrirDiagrama").click(function(){
		ControladorAmalia.abirDiagrama(graph);
	});

// Botão Apagrar diagrama
	$("#btnApagarDiagrama").click(function(){
		graph.clear();
		iniciarDiagramaCasosUso(graph);
	});
	
	//****************************************
	//**          Exportar para xml         **
	//**     Não é necessário para gravar   **
	//** mas pode ser útil para outra coisa **
	//****************************************
	$("#btnExportarDiagramaCasosParaXML").click(function(){
		
		var xml = ControladorAmalia.diagramaToXML(graph,"casos de uso");
		console.log (xml);
		ControladorAmalia.toogleDialogoMostarXMLCasos(xml);
		
	});
	
	$("#btnFecharXMLCasos").click(function(){
		ControladorAmalia.toogleDialogoMostarXMLCasos("");
	});
	
	$("#btnDescarregarXML").click(function(){
		var xml = $("#xmlCasos").val();
		
		var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "diagramaCasosUso.xml");
		ControladorAmalia.toogleDialogoMostarXMLCasos("");
		
	});
	
	//***********************************************************
	//** Simplificar o Interface quando a trabalhar no modelo  **
	//***********************************************************
	$("#modelo").mouseenter(function(){
		$("#controlCasosUso").slideUp("slow");
	});
	$("header").mouseenter(function(){
		$("#controlCasosUso").slideDown("slow");
	});


    //RPNS
    //Hide/unhide blackhole
    $("#blackHole").mouseenter(function(){
        $("#blackHole").hide();
        $("$blackHole").delay(1000).fadeIn();
    });


	
	//Função para ler ficheiros exp obtida de http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=nRJ-e_eoFaY
	function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	    var diagrama = e.target.result;
	    //console.log(diagrama);
	    console.log ((f.name).split(".").pop());
	    
	    //só consigo saber se o conteúdo é de um diagrama ou qualquer coisa feita com o joint.js
	    //eventualmente colocar no início do ficheiro um id qq
	    if ((f.name).split(".").pop()=="dcu"){
	    	if (diagrama.substr(0,diagrama.indexOf(":")) =='{"cells"'){
	    		//console.log("é um ficheiro com um modelo");
	    		graph.clear();
	    		graph.fromJSON(JSON.parse(diagrama));
	    		ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
	    	}else{
	    		alert("Ficheiro inválido");
	    		ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
	    	}
	    }else{
	    	//console.log("Ficheiro inválido");
	    	alert("Ficheiro inválido");
	    	ControladorAmalia.toggleDialogoAbreDiagramaCasosUsoDisco();
	    }
        //console.log(  "conteudo: " + contents.substr(0,contents.indexOf(":")));  
     };
      r.readAsText(f);
    } else { 
      alert("Não foi possível abir o ficheiro");
    }
  }

  document.getElementById('ficheiroDiagrama').addEventListener('change', readSingleFile, false);
	
});
