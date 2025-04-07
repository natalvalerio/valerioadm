const apiBaseUrl = "https://natalvalerio.pythonanywhere.com/api/sql?sql=";

// Função para carregar dados auxiliares
async function carregarOpcoes(url, selectId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const select = document.getElementById(selectId);
        select.innerHTML = "";
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = Object.values(item)[0];
            option.textContent = Object.values(item)[0];
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar ", selectId, error);
    }
}

// Carregar selects ao iniciar
carregarOpcoes("https://natalvalerio.pythonanywhere.com/api/select/nichos", "nichos");
carregarOpcoes("https://natalvalerio.pythonanywhere.com/api/select/situacoes", "situacoes");
carregarOpcoes("https://natalvalerio.pythonanywhere.com/api/select/canais", "canais");
carregarOpcoes("https://natalvalerio.pythonanywhere.com/api/select/status", "status");

// Converter selects múltiplos para string separada por vírgulas
function getSelectValues(select) {
    return Array.from(select.selectedOptions).map(option => option.value).join(",");
}

// Buscar clientes e exibir na tabela
async function carregarClientes() {
	document.getElementById("loader").style.display = "flex"; 
    try {
        const response = await fetch(apiBaseUrl + "SELECT * FROM clientes");
        const data = await response.json();
        const tabela = document.getElementById("clientesTabela");
        tabela.innerHTML = "";
        data.forEach(cliente => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.cliente}</td>
                <td>${cliente.nichos}</td>
                <td>${cliente.situacoes}</td>
                <td>${cliente.canais}</td>
                <td>${cliente.status}</td>
                <td>
                    <button onclick="editarCliente(${cliente.id}, '${cliente.cliente}', '${cliente.nichos}', '${cliente.situacoes}', '${cliente.canais}', '${cliente.status}')">✏️ Editar</button>
                    <button onclick="excluirCliente(${cliente.id})">🗑️ Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar clientes", error);
    }
	document.getElementById("loader").style.display = "none"; 
}

// Adicionar ou editar cliente
document.getElementById("clienteForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const id = document.getElementById("clienteId").value;
    const nome = document.getElementById("clienteNome").value;
    const nichos = getSelectValues(document.getElementById("nichos"));
    const situacoes = getSelectValues(document.getElementById("situacoes"));
    const canais = getSelectValues(document.getElementById("canais"));
    const status = getSelectValues(document.getElementById("status"));
    
    const query = id ?
        `UPDATE clientes SET cliente='${nome}', nichos='${nichos}', situacoes='${situacoes}', canais='${canais}', status='${status}' WHERE id=${id}` :
        `INSERT INTO clientes (cliente, nichos, situacoes, canais, status) VALUES ('${nome}', '${nichos}', '${situacoes}', '${canais}', '${status}')`;
    
    await fetch(apiBaseUrl + query);
    document.getElementById("clienteForm").reset();
    document.getElementById("clienteId").value = "";
    carregarClientes();
});

// Preencher formulário para edição
function editarCliente(id, nome, nichos, situacoes, canais, status) {
    document.getElementById("clienteId").value = id;
    document.getElementById("clienteNome").value = nome;
    
    preencherSelect("nichos", nichos);
    preencherSelect("situacoes", situacoes);
    preencherSelect("canais", canais);
    preencherSelect("status", status);
}

// Preencher selects múltiplos ao editar
function preencherSelect(selectId, valores) {
    const select = document.getElementById(selectId);
    const lista = valores.split(",");
    Array.from(select.options).forEach(option => {
        option.selected = lista.includes(option.value);
    });
}

// Excluir cliente
async function excluirCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        await fetch(apiBaseUrl + `DELETE FROM clientes WHERE id=${id}`);
        carregarClientes();
    }
}

// Inicializar lista de clientes ao carregar a página
carregarClientes();
