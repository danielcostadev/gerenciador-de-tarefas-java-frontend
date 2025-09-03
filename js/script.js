const form = document.querySelector('#form-nova-tarefa');
const inputNome = document.querySelector('#nome');
const inputDescricao = document.querySelector('#descricao');
const selectCategoria = document.querySelector('#categoria')
const selectPrioridade = document.querySelector('#prioridade');

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const nome = inputNome.value;
    const descricao = inputDescricao.value;
    const categoria = selectCategoria.value;
    const prioridade = selectPrioridade.value;

    const novaTarefa = {
        nome: nome,
        descricao: descricao,
        categoria: categoria,
        prioridade: prioridade,
        status: "pendente"
    };

    enviarDadosParaAPI(novaTarefa);

    form.reset();

    async function enviarDadosParaAPI(dadosDaTarefa){

        console.log("Enviando dados para API");
        
        try {

            const response = await fetch("http://localhost:8080/tarefas", {

            method: "POST",
            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify(dadosDaTarefa)
        });


        if (!response.ok){
            throw new Error('Erro ao salvar tarefa. Status: ' + response.status)
        }

        const tarefaSalva = await response.json();
        console.log("Tarefa salva com sucesso! Tarefa:", tarefaSalva);

        
        // TODO: No futuro, aqui chamaremos uma função para adicionar a 'tarefaSalva' na lista da tela.


        } catch (error) {
            console.error("Falha na comunicação com a API:", error)
            alert("Não foi possível salvar a tarefa. Verifique se o back-end está rodando e tente novamente.")
        }

    }

})