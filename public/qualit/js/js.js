// js.js
const cliente = localStorage.getItem('cliente');
const usuario = localStorage.getItem('usuario');
const api = 'https://natalvalerio.pythonanywhere.com/api/sql?sql=';

if (!usuario) {
    window.location.href = 'index.html'; // Redireciona para index.html
}

// Atualiza a data e hora no footer
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString() + ` - [CLIENTE: ${cliente}] - [USUÁRIO: ${usuario}]`;
    document.getElementById("dateTime").textContent = dateTimeString;
}

setInterval(updateDateTime, 1000);

// Função genérica para requisições à API
async function fetchAPI(sqlQuery, loadingRef = null) {
    if (loadingRef) loadingRef.value = true;
    try {
        const encodedQuery = encodeURIComponent(sqlQuery);
        console.log("Query enviada:", sqlQuery); // Log para depuração
        const response = await fetch(`${api}${encodedQuery}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error('Erro na requisição');
        return await response.json();
    } catch (error) {
        console.error("Erro na API:", error);
        throw error;
    } finally {
        if (loadingRef) loadingRef.value = false;
    }
}

// Funções de notificação com SweetAlert2
function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: message,
        confirmButtonColor: '#A1A1D6'
    });
}

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: message,
        confirmButtonColor: '#A1A1D6'
    });
}

function showWarning(message) {
    Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: message,
        confirmButtonColor: '#A1A1D6'
    });
}

async function confirmAction(message) {
    const result = await Swal.fire({
        title: 'Confirmação',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#A1A1D6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
}

// Função genérica para adicionar novo item a uma lista
function addNewItem(listRef, defaultItem) {
    listRef.value.unshift(defaultItem);
}

// Função genérica para filtrar uma lista com base em um termo
function filterList(listRef, searchTermRef, field) {
    const term = searchTermRef.value.toLowerCase();
    return listRef.value.filter(item => 
        item[field].toLowerCase().includes(term)
    );
}

// Função genérica para operações CRUD
async function crudOperation(table, action, data, loadingRef, refreshCallback) {
    let sqlQuery;
    try {
        switch (action) {
            case 'create':
                // Remove o 'id' se estiver presente e vazio ou undefined
                const createData = { ...data };
                delete createData.id;
                const fields = Object.keys(createData).join(', ');
                const values = Object.values(createData).map(val => `'${val}'`).join(', ');
                sqlQuery = `insert into ${table} (${fields}) values (${values})`;
                await fetchAPI(sqlQuery, loadingRef);
                showSuccess('Dados salvos com sucesso!');
                break;
            case 'read':
                sqlQuery = `select * from ${table}`;
                return await fetchAPI(sqlQuery, loadingRef);
            case 'update':
                if (!data.id || data.id === '') {
                    // Se não tem ID, trata como create
                    await crudOperation(table, 'create', data, loadingRef, refreshCallback);
                    return;
                }
                const updates = Object.entries(data)
                    .filter(([key]) => key !== 'id')
                    .map(([key, value]) => `${key}='${value}'`)
                    .join(', ');
                sqlQuery = `update ${table} set ${updates} where id=${data.id}`;
                await fetchAPI(sqlQuery, loadingRef);
                showSuccess('Dados atualizados com sucesso!');
                break;
            case 'delete':
                if (!data.id) {
                    showWarning('Não é possível excluir uma linha sem ID.');
                    return;
                }
                const confirmed = await confirmAction('Tem certeza de que deseja excluir esta linha?');
                if (confirmed) {
                    sqlQuery = `delete from ${table} where id=${data.id}`;
                    await fetchAPI(sqlQuery, loadingRef);
                    showSuccess('Dados excluídos com sucesso!');
                } else {
                    return;
                }
                break;
            default:
                throw new Error('Ação CRUD inválida');
        }
        if (refreshCallback) await refreshCallback();
    } catch (error) {
        showError(`Erro ao ${action === 'read' ? 'buscar' : action === 'create' ? 'salvar' : action === 'update' ? 'atualizar' : 'excluir'} dados.`);
    }
}