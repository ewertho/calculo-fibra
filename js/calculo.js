function colocaScript(callback){

    var scriptJquery = document.createElement('script')
    scriptJquery.type = 'text/javascript';
    scriptJquery.src = "http://code.jquery.com/jquery-1.10.2.min.js";
    scriptJquery.async = true;
    scriptJquery.onload = function()
    {
        callback();
    };
    headHTML = document.getElementsByTagName('head')[0];
    headHTML.insertBefore(scriptJquery, headHTML.firstChild);
}


colocaScript(function() {
            
    var contador
	contador = [1,1]
	window.onload = novaPagina(...contador)
		

	//função para zerar o layout sempre que um novo for solicitado
	function novaPagina() {
			//deleta 
		$("div[name='deleta']").remove();
		$("#demo").html(pagina(...arguments));	

			
	}
    
    
	function adicionaPagina(){
		$("#adiciona").html(pagina(...arguments));
	}
	
	//função para criar a pagina dinamicamente
	function pagina() {
			//argumentados passados para a função
			var array = arguments;
			//objetos com conteudo da divisão da fibra
			var array_desbalanceado = {"50x50":"3.6","40x60":"4.7,3.6","30x70":"6,1.9","20x80":"7.9,1.2","15x85":"9.6,1","10x90":"11.3,0.65","5x95":"14.6,0.4","2x98":"18.8,0.3","1x99":"22.5,0.25"};
			var array_balanceado = {"1x2":"4","1x4":"7.3","1x8":"10.5","1x16":"13.7","1x32":"16.9","1x64":"21"};
			
			//criação da pagina com variavel html
			var html="";
			
			for (var j = 0; j < array.length; j++) {
				
				html += '<div name="deleta" class="fds bt bt-shw" id="instancia'+(j)+'">';
				
				for (var i = 0; i < array[j]; i++) {
					
					html+='<div class="simple-division inline">';
						html+= '<div id="calculo'+(j)+(i)+' potencia'+(j)+(i)+'">';
							html+='Divisão '+(j+1)+'-'+(i+1);
							html+=' &nbsp | &nbsp';
							html+='Chegando ';
							html+='<input type="text" id="caixa'+(j)+(i)+'" disabled="disabled" class="create bt">';
							html+='<input type="number" class="metros create bt" name="distancia" id="distancia'+(j)+(i)+'" placeholder="distancia/caixa" required>';
						html+='</div>';
						html+='<div id="calculo'+(j)+(i)+' potencia'+(j)+(i)+'" class="create inline">';
							html+='<select name="trocaSpliter" id="seleciona'+(j)+(i)+'" class="seleciona bt">';
								for(var property in  array_desbalanceado){
									html+='<option value="'+(array_desbalanceado[property])+'">'+property+'</option>';
								};
								for (var item in array_balanceado) {
									html+='<option value="'+(array_balanceado[item])+'">'+item+'</option>';
								};
						
							html+='</select>';
						html+=' &nbsp &nbsp';
						html+='<input type="number" id="potenciaChegando'+(j)+(i)+'" class="create bt" placeholder="potencia Chegando">';
						html+='</div>';
						
					html+='</div>';
				}
				html+='<div id="adiciona"></div>'
				html+='</div>';
			}
			return html
  			//document.getElementById("demo").innerHTML += html;	
	}
		
	//função para pegar select criado dinamicamente
	//a partir do conteudo selecionado no layout criado definir valor seguinte para divisão da fibra
	function algoritmo() {
			//definições de atributos da função
			let numero_caixas = arguments;
			let cabeamento;
			let longa;
			let curta;
			let atualizado;
			let cx_atual;
			let cx_anterior;
			//pega valor da frequencia
			frequencia = parseFloat($("select[name='frequencia']").val());

			if ($("input[name='distancia']").val()!="") {
				distanciaM = parseInt($("input[name='distancia']").val());
				cabeamento = (frequencia/1000)*distanciaM;
			}else{
				cabeamento = frequencia;
			}
			/*
			for (var j = 0; j < numero_caixas.length; j++) {
				
				for (var i = 0; i < numero_caixas[j]; i++) {


					if (cx_anterior===undefined) {
						cx_anterior = parseFloat($("#caixa"+(j)+(i)).val());
						console.log(cx_anterior);
					}else{
						cx_anterior = atualizado;
						console.log(cx_anterior);
					}
					
					
					divisao_rede = selecionar();
					//console.log(divisao_rede);

					console.log(cabeamento);
					longa = parseFloat(divisao_rede);
					console.log(longa);
					cx_atual = cx_anterior - cabeamento - longa;
					console.log(cx_atual);
					
					atualizado = parseFloat(cx_atual.toFixed(2));
					console.log(atualizado);

					$("#caixa"+(j)+(i)).val(atualizado);
					console.log($("#caixa"+(j)+(i)).val());
					
				}	
			}
			*/
	};
		
	//função de controle dos selects da section esquerda
	$(function() {
			$("select[name='spliter']").change(function() {
				
				$("select option:selected").each(function () {
					if ($("#selectSpliter").val()=="balanceado") {
						$("#option-balanceado").css("display","inline");
						$("#option-desbalanceado").css("display","none");
						$("#option-balanceado").val("1x2");
						$("#divisao-fibra").css("visibility", "visible")
						contador = [4,4];
						novaPagina(...contador);
						algoritmo(...contador)
					}
					if($("#selectSpliter").val()=="desbalanceado"){
						$("#option-desbalanceado").css("display","inline");
						$("#option-balanceado").css("display","none");
						$("#option-desbalanceado").val("0/8");
						$("#divisao-fibra").css("visibility", "visible")
						contador = [1,1,1,1,1,1,1,1];
						novaPagina(...contador);
						algoritmo(...contador)
					}
					if($("#selectSpliter").val()=="mista"){
						$("#option-desbalanceado").css("display","block");
						$("#option-balanceado").css("display","none");
						$("#divisao-fibra").css("visibility", "hidden")
						contador = [1,1];
						novaPagina(...contador);
						algoritmo(...contador)
					}
				});
			});
	});

	
	$(function() {
			$("#option-desbalanceado").change(function() {

				switch($("#option-desbalanceado").val()){
					case "0/8":
					contador = [8];
						novaPagina(...contador);
						break;
					case "1/7":
						contador = [1,7];
						novaPagina(...contador);
						break;
					case "2/6":
						contador = [2,6];
						novaPagina(...contador);
						break;
					case "3/5":
						contador = [3,5];
						novaPagina(...contador);
						break;
				}
			})
	});

	$(function() {
			$("#option-balanceado").change(function() {
				
				switch($("#option-balanceado").val()){
					
					case "1x8":
						contador = [1,1,1,1,1,1,1,1];
						novaPagina(...contador);
						break;
					case "1x4":
						contador = [2,2,2,2];
						novaPagina(...contador);
						break;
					case "1x2":
						contador = [4,4];
						novaPagina(...contador);
						break;
				}
			})
	});
	
	//função para pegar a mudança do select das divisões
	//console.log dessa função serve apenas para identificar erro
	function selecionar() {
			$(".seleciona").mousedown(function () {
				//pega o id associado ao click
				let id = this.id;
				console.log(id);
				let idcaixa = id.split("a")
				let valcaixa = $("#caixa"+idcaixa[1]).val()
				console.log(valcaixa)

				var seguinte = Number(idcaixa[1])+1
					
				if(seguinte<=10){
					seguinte = "0"+seguinte
				}
					
				console.log(seguinte)
				console.log(idcaixa)
				//pega os valores selecionados a esse select do id
				$("#"+id).change(function () {					
					let valores = $("#"+id).val().split(",")
					let resultado = valcaixa - valores[0]
					console.log(resultado)
					$("#potenciaChegando"+idcaixa[1]).val(resultado.toFixed(2))
					
					$("#caixa"+seguinte).val(resultado.toFixed(2))
					contador = [1,1]
					adicionaPagina(...contador)
				});				
			})
	};
	
	$(function(){
			//botão iniciar
			$("#pesquisar").click(function() {
				
				let frequencia = parseFloat($("select[name='frequencia']").val());
				let potenciaSaindo = parseInt($("select[name='potenciaSaindo']").val());
				let distanciaM;
				let cabeamento;

				if ($("#distanciaM").val()!= 0){

					distanciaM = parseInt($("#distanciaM").val());
					$("input[name='distancia']").prop("disabled",true);
					$("input[name='distancia']").val(distanciaM);
					cabeamento = (frequencia/1000)*distanciaM;
				}else{
					cabeamento = frequencia;
				}
				
				let caixa1 = potenciaSaindo - cabeamento;
				$("#caixa00").val(caixa1);
				
				//loop para preencher os campos input criados
				/*
				for (let index = 0; index < contador.length; index++) {
					const element = contador[index];
					for (let index = 0; index < array.length; index++) {
						const element = array[index];
						
					}
				}
				*/
				$("#selectSpliter").prop("disabled", true)
				$(".selectDivisao").prop("disabled", true)
				
				
				let limpar = '<input type="button" id="limpar" value="limpar" class="bt bt-vm bt-shw">';
				document.getElementById("buttons").innerHTML += limpar;

				$("#limpar").click(function() {
					window.location.reload();
				});

				selecionar()
			});
	});
	
	function arrays_options() {

			for(var property in  array_desbalanceado){
				html+='<option value="'+(array_desbalanceado[property])+'">'+property+'</option>';
			};
			for (var item in array_balanceado) {
				html+='<option value="'+(array_balanceado[item])+'">'+item+'</option>';
			};

    }
});