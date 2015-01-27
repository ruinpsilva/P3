




$(document).ready(function(){

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
        window.location.href = "stage.html";
    });

    //RNPS
    //ligação com a cx de diálogo de abertura de projeto
    $("#btnOpenProjectFromBrowser").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("");
    });


});

