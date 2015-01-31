$(document).ready(function(){


	$("#ucfolder").click(function(){
        window.location.href = "casosUso.html";
    });

	$("#ucText").click(function(){
        window.location.href = "casosUso.html";
    });

	$("#dmfolder").click(function(){
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
});
