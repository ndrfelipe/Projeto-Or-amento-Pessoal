class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
       this.ano = ano
       this.mes = mes
       this.dia = dia
       this.tipo = tipo
       this.descricao = descricao
       this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros(){

        //array de despesas
        let despesas = []

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i<= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            
            //verificar se existe a possibilidade de haver índices removidos
            //pular esses índices removidos
            if(despesa === null){
                continue
            }
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa){
        console.log(despesa)
    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor =document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value,

    )

    if(despesa.validarDados()){
        bd.gravar(despesa)
        
        document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById("modal_titulo_div").className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Os seus dados foram inseridos com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        $('#modalRegistroEmpresa').modal('show')
        document.getElementById('ano').value = ""
        document.getElementById('mes').value = ""
        document.getElementById('dia').value = ""
        document.getElementById('tipo').value = ""
        document.getElementById('descricao').value = ""
        document.getElementById('valor').value = ""
    }else{
        document.getElementById('modalTitulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById("modal_titulo_div").className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Existem campos que ainda não foram preenchidos!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#modalRegistroEmpresa').modal('show')
    }
    
}

function carregaListaDespesa(){

    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    //selecionando tb
    let listaDespesas = document.getElementById('listaDespesas')

    // percorrer o arry despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        
        //criando tr
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` 
        

        //ajustar tipo
        switch(parseInt(d.tipo)){
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor 
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}