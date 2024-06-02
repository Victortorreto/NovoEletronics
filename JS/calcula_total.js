// todos os clientes que fizeram encomendas
var clientes = document.querySelectorAll(".cliente");

//Passa por cada encomenda, calculando o valor total
for (var count = 0; count < clientes.length; count++) {

    //Captura a quantidade encomendada
    var qntd = clientes[count].querySelector(".qntd").textContent;

    //Captura a valor unitário do produto
    var unitario = clientes[count].querySelector(".valor").textContent;

    // Função para validar a quantidade
    function validarQuantidade(qntd) {
    if(qntd<1 || isNaN(qntd)) {
        return false;
    } else {
        return true;
    }
}

    // Função para validar o valor unitário
    function validarValorUnitario(unitario) {
    if(unitario<1 || isNaN(unitario)) {
        return false;
    } else {
        return true;
    }
}

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

    if(validarQuantidade(qntd) && validarValorUnitario(unitario)){
    //Quantidade OK, prossegue
    //Calcula o valor total da encomenda
    var total = qntd * unitario;
    clientes[count].querySelector(".total").textContent = formatarValor(total);
    clientes[count].querySelector(".valor").textContent = formatarValor(unitario);
    clientes[count].querySelector(".valor").textContent = "R$" + unitario;
    } else {
        //Valida a quantidade
        if(!validarQuantidade(qntd)){
        //Quantidade NOK, avisa o usúario
        clientes[count].querySelector(".qntd").textContent = " QNTD INVÁLIDA!";
        //clientes[count].style.color="red"; coloca toda a escrita da coluna em vermelho
        //clientes[count].style.backgroundColor="red"; //coloca todo o fundo da coluna 
        clientes[count].querySelector(".qntd").classList.add("qntd-invalida"); //coloca apenas o texto da quantidade em vermelho
        
    } else {
            //Valida o valor Unitário
            if (!validarValorUnitario(unitario)){
            //Valor Unitário NOK, avisa o usúario
            clientes[count].querySelector(".valor").textContent = " Unitário inválido";
            clientes[count].style.backgroundColor="red"; //coloca todo o fundo da coluna 
            }  
    }
}  
}
function validarInserir() {
    var qtd = parseInt(document.getElementById("qtd").value);
    var vlor = parseFloat(document.getElementById("vlor").value);

    if (!validarQuantidade(qtd) && validarValorUnitario(vlor)) {
        alert("Quantidade ou valor unitário inválidos! Insira novamente os dados.");
        return false;
    } else {
        alert("Dados salvo com sucesso!!"); 
    }

    /*if (!validarValorUnitario(vlor)) {
        alert("Valor unitário inválido! Insira novamente o valor do produto .");
        return false;
    }*/

    return true;
}

function addEncomenda(encomenda) {
    var Tabela = document.querySelector(".tabela");
    var linha = Tabela.insertRow();

    // Adicionando a classe .cliente à linha
    linha.classList.add("cliente", "visivel");

    var linha1 = linha.insertCell(0);
    var linha2 = linha.insertCell(1);
    var linha3 = linha.insertCell(2);
    var linha4 = linha.insertCell(3);
    var linha5 = linha.insertCell(4);

    linha1.textContent = encomenda.nome;
    linha2.textContent = encomenda.produto;
    linha3.textContent = encomenda.qntd;
    linha4.textContent = formatarValor(encomenda.valor);
    
   // Calcula o total com base na quantidade e no valor unitário
   var total = encomenda.qntd * encomenda.valor;
   linha5.textContent = formatarValor(total); // Mostra o total na tabela

      // Aplica o filtro novamente para mostrar apenas as encomendas visíveis
      aplicarFiltro();
    }
    
    //Função para aplicar o filtro e mostrar apenas as encomendas visíveis
    function aplicarFiltro() {
        campoFiltro.dispatchEvent(new Event('input')); // Dispara o evento de input no campo de filtro
    }

//Função para inserir novas encomendas
function Inserir(){
    if (!validarInserir()) {
        return;
    }
    var nome = document.getElementById("nme").value;
    var produto = document.getElementById("prduto").value;
    var qntd = parseInt(document.getElementById("qtd").value);
    var valor = parseFloat(document.getElementById("vlor").value);
    var total = qntd * valor;

    // Criando um objeto com os detalhes da encomenda
    var encomenda = {
        nome: nome,
        produto: produto,
        qntd: qntd,
        valor: valor,
        total: total
    };

    // Adicionando a nova encomenda na tabela
    addEncomenda(encomenda);

    //Limpa os campos do formulário
    document.getElementById("nme").value ="";
    document.getElementById("prduto").value ="";
    document.getElementById("qtd").value ="";
    document.getElementById("vlor").value ="";
}