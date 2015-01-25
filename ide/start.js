//Criacao das variaveis de projeto
var projetoNome;
var diagramaCU;
var listaCasos = [];
var listaAtores = [];
var UCBundle;


//RNPS
//Funcao para carregar um projeto armazenado na memoria do browser
function loadProjetFromProjet(){

}


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


});

