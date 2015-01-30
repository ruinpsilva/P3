




$(document).ready(function(){

    ControladorAmalia.supportsLocalStorage();
    //botões provisórios do stage
    $("#btnCreateProject").click(function(){
        ControladorAmalia.toogleDialogoCriaProjecto();
    });

    $("#btnCancelarCriarProjecto").click(function(){
        ControladorAmalia.toogleDialogoCriaProjecto();
    });

    $("#btnCriarProjecto").click(function(){
        var nomeProjecto ="Projecto";
        if($("#nomeProjecto").val()){
            nomeProjecto = $("#nomeProjecto").val();
        }
        ControladorAmalia.CriaProject(nomeProjecto);
        ControladorAmalia.toogleDialogoCriaProjecto();
        projetoNome = nomeProjecto;
        ControladorAmalia.ActualizaVariaveis();
        window.location.href = "stage.html";
    });

    //RNPS
    //ligação com a cx de diálogo de abertura de projeto
    $("#btnOpenProjectFromBrowser").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("proj");
    });


    //DMMLG
    //btnAbrir Projecto
    $("#btnAbrirProjecto").click(function(){
        ControladorAmalia.abrirProjeto(graph, graph2);
                window.location.href = "casosuso.html";

    });


});

