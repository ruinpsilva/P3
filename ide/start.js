function actualizaFicheiros(){
     var proj ="proj_";
        var opt=[];
        for(var i = 0; i < localStorage.length; i++){
            var nome = localStorage.key(i);
            console.log(nome.substring(0,proj.length));
            if(nome.substring(0,proj.length) == proj){
                opt.push(nome);
                console.log(opt);
            }
        }
        if(opt.length>5){
            for(var j=0; j<5;j++){
                var p = document.createElement("P");
                var text = document.createTextNode(opt[j]);
                var idi="#i0"+(j+1)+"";
                var idZ="#z0"+(j+1)+"";
                projetoNome = opt[j];
                p.appendChild(text);
                p.addEventListener("click",function(){ControladorAmalia.abreProjecto2()});
                $(idZ).append(p);
                var htmli="<p>"+(j+1)+"</p>";
                 $(idi).append(htmli);
                ControladorAmalia.ActualizaVariaveis();
            }
            }
        else{
            for(var j=0; j<opt.length;j++){
                var p = document.createElement("P");
                var text = document.createTextNode(opt[j]);
                var idi="#i0"+(j+1)+"";
                var idZ="#z0"+(j+1)+"";
                projetoNome = opt[j];
                console.log(nome);
                p.appendChild(text);
                p.addEventListener("click",function(){ControladorAmalia.abreProjecto2()});
                $(idZ).append(p);
                var htmli="<p>"+(j+1)+"</p>";
                 $(idi).append(htmli);
                ControladorAmalia.ActualizaVariaveis();
            }
        }





};

$(document).ready(function(){

    ControladorAmalia.supportsLocalStorage();
    actualizaFicheiros();

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
      console.log((f.name).split(".").pop());

      //só consigo saber se o conteúdo é de um diagrama ou qualquer coisa feita com o joint.js
      //eventualmente colocar no início do ficheiro um id qq
      if ((f.name).split(".").pop() == "proj") {
          var projetoS =JSON && JSON.parse(diagrama) || $.parseJSON(diagrama);
        projetoNome=projetoS.proj;
        UCBundle= projetoS.CasosUso;
        CLBundle= projetoS.Classe;
        graph.fromJSON(UCBundle.diagCU);
        listaCasos= UCBundle.listaCU;
        listaAtores=UCBundle.listaAtores;
        graph2.fromJSON(CLBundle.diagCL);
        listaClasses=CLBundle.listaCL;
        listaInterfaces=CLBundle.listaIT;
        listaAbstracts=CLBundle.listaABS;
        ControladorAmalia.ActualizaVariaveis();
        window.location.href = "stage.html";
          ControladorAmalia.toggleDialogoAbreProjectoDisco();
      } else {
        alert("Ficheiro inválido");
        ControladorAmalia.toggleDialogoAbreProjectoDisco();
      }
    };
    r.readAsText(f);
  } else {
    alert("Não foi possível abir o ficheiro");
  }
}
    document.getElementById('ficheiroProjecto').addEventListener('change', readSingleFile, false);
});

