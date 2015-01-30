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
    //DMMLG
    //butão para cnacelar ao abri projecto do browser
    $("#btnCancelarAbrirProjecto").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("");
    });

    //RNPS
    //ligação com a cx de diálogo de abertura de projeto
    $("#btnOpenProjectFromBrowser").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("proj");
    });


    //DMMLG
    //btnAbrir Projecto
    $("#btnAbrirProjecto").click(function(){
        ControladorAmalia.abrirProjeto();
        window.location.href = "stage.html";

    });

    //DMMLG
    //bot\ao para abrir projecto do disco
    $("#btnOpenProjectFile").click(function(){
       if (window.File && window.FileReader && window.FileList && window.Blob)   {
        ControladorAmalia.toggleDialogoAbreProjectoDisco();
       }
    }

});

