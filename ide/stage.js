$(document).ready(function(){


	$("#ucfolder").dblclick(function(){
        window.location.href = "casosUso.html";
    });

	$("#ucText").click(function(){
        window.location.href = "casosUso.html";
    });

	$("#dmfolder").dblclick(function(){
        window.location.href = "diagramaClasses.html";
    });

	$("#dmText").click(function(){
        window.location.href = "diagramaClasses.html";
    });

	$("#blockIcons").mouseenter(function () {
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
    //Confirmaç\ao de que é para fechar o projecto
    $("#btnFecharProjecto").click(function(){
        ControladorAmalia.FechaProjecto();
    });
});
