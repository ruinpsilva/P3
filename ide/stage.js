$(document).ready(function(){


	$("#ucfolder").dblclick(function(){
        window.location.href = "casosUso.html";
    });

	$("#ucfolder").on('click touchend', function(){
		window.location.href = 'casosUso.html';
	}



	$("#dmfolder").dblclick(function(){
        window.location.href = "diagramaClasses.html";
    });

	$("#dmfolder").on('click touchend', function(){
		window.location.href = 'diagramaClasses.html';
	}



	$("#roller").mouseenter(function () {
        $("#controlStage").slideUp(200);
    });
    $("header").mouseenter(function () {
        $("#controlStage").slideDown(200);
    });

	//Botao fechar projecto
    $("#voltarPagPrincipal").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });

	$("#btnCancelaFecharProjeto").click(function(){
        ControladorAmalia.toogleDialogoFechaProjecto();
    });
    //Confirmaçao de que e para fechar o projecto
    $("#btnFecharProjecto").click(function(){
        ControladorAmalia.FechaProjecto();
        window.location.href = "index.html";

    });
});
