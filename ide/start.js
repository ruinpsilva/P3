

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
    //butão para cancelar ao abri projecto do browser
    $("#btnCancelarAbrirProjecto").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("");
    });

    //RNPS
    //ligação com a cx de diálogo de abertura de projeto
    $("#btnOpenProjectFromBrowser").click(function(){
        ControladorAmalia.toogleDialogoAbreProjeto("proj");
    });

	//RNPS
	//ligação com a cx de diálogo de exportar o projeto
	$("#btnExportProject").click(function(){
		ControladorAmalia.toogleDialogoAbreProjetoParaExportar("proj");
		ControladorAmalia.abrirProjetoParaExportar();
		exportToXML();

	});

	//RNPS
	//botão cancelar do dialogo de exportar projecto


	//RNPS
	//ligação com a cx de diálogo de eliminar o projecto
	$("#btnApagarProjecto").click(function(){
		ControladorAmalia.toogleDialogoAbreProjetoParaEliminar("proj");
	});

	//RNPS
	//botão cancelar da cx de dialogo de eliminar projecto
	$("#btnCancelarEliminarProjecto").click(function(){
		ControladorAmalia.toogleDialogoAbreProjetoParaEliminar("");
	});

	//RNPS
	//botão eliminar da cx de dialogo de eliminar projecto
	$("#btnEliminarProjecto").click(function(){
		var nome = $("#projetosDisponiveisParaEliminar option:selected").val();
		try{
			localStorage.removeItem(nome);
			alert("Project deleted!");
		} catch (err){
			alert("Error - Please try again!");
			}
		ControladorAmalia.toogleDialogoAbreProjetoParaEliminar("");
	});

    //DMMLG
    //btnAbrir Projecto
    $("#btnAbrirProjecto").click(function(){
        ControladorAmalia.abrirProjeto();
        window.location.href = "stage.html";
    });

    //DMMLG
    //bot\ao para abrir projecto do ficheiro
    $("#btnOpenProjectFile").click(function(){
       if (window.File && window.FileReader && window.FileList && window.Blob)   {
        ControladorAmalia.toggleDialogoAbreProjectoDisco();
       }
    });

	//RNPS
	//botão cancel do dialogo abrir projecto do ficheiro
	$("#btnCancelaAbrirCasosDisco").click(function(){
		ControladorAmalia.toggleDialogoAbreProjectoDisco();
	});


	//****************************************
    //**          Exportar para xml         **
    //**     N├úo ├® necess├írio para gravar   **
    //** mas pode ser ├║til para outra coisa **
    //****************************************
    function exportToXML () {

        var xml = ControladorAmalia.diagramaToXML();
        console.log(xml);
        ControladorAmalia.toogleDialogoMostarXMLCasos(xml);

    };

    $("#btnFecharXMLCasos").click(function () {
        ControladorAmalia.toogleDialogoMostarXMLCasos("");
    });

    $("#btnDescarregarXML").click(function () {
        var xml = $("#xmlCasos").val();

        var blob = new Blob([xml], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "diagramaCasosUso.xml");
        ControladorAmalia.toogleDialogoMostarXMLCasos("");

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

