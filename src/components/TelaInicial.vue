<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3 text-uppercase text-start">
            <nav class="navbar bg-body-tertiary ">
                <div class="container-fluid">
                    <form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search">
                    </form>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" data-bs-toggle="modal"
                                        data-bs-target="#cadastrar">Cadastrar</a>
                                </li>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Exportar
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exportar">PDF</a></li>
                                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exportar">XLS</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Perfil
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#alterarSenha">Alterar senha</a></li>
                                        <li><a class="dropdown-item" href="#">Sair</a></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Data Limite</th>
                            <th>Data conclusão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tarefa in tarefas" v-bind:key="tarefa">
                            <td>{{ tarefa.nome }}</td>
                            <td>{{ tarefa.status }}</td>
                            <td>{{ formataDataTempo(tarefa.data_limite) }}</td>
                            <td>{{formataDataTempo(tarefa.data_conclusao) }}</td>
                            <td>
                            <th @click="excluir" data-bs-toggle="modal" data-bs-target="#exclusao"><i
                                    class="bi bi-trash"></i></th>
                            <th @click="alterar(tarefa)" data-bs-toggle="modal" data-bs-target="#alteracao"><i
                                    class="bi bi-pencil"></i></th>
                            <th @click="concluir" data-bs-toggle="modal" data-bs-target="#concluir"><i
                                    class="bi bi-check-circle"></i></th>
                            <th @click="exibir(tarefa)" data-bs-toggle="modal" data-bs-target="#exibir"><i
                                    class="bi bi-envelope-open"></i></th>

                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <nav aria-label="Navegação de página exemplo">
            <ul class="pagination justify-content-end">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Anterior</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Próximo</a>
                </li>
            </ul>
        </nav>
    </div>
    <!-- Button trigger modal -->


    <!-- Modal -->
    <!-- Exclusão -->
    <div class="modal fade" id="exclusao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Excluir</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Deseja excluir a tarefa?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-danger">Excluir</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Exportação -->
    <div class="modal fade" id="exportar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Exportar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                    <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    

    <!-- Alteração -->
    <div class="modal fade" id="alteracao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Alteração</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="">Nome</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" :value="tarefa.nome">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Data limite</label>
                        <input type="date" class="form-control" id="exampleFormControlInput1"
                            :value="tarefa.data_limite">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            :value="tarefa.descricao"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" @click="salvar">Salvar alterações</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Cadastrar -->
    <div class="modal fade" id="cadastrar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cadastrar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="">Nome</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="nvTarefa.nome">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Data limite</label>
                        <input type="date" class="form-control" id="exampleFormControlInput1"
                            v-model="nvTarefa.data_limite">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            v-model="nvTarefa.descricao"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="salvar">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Conclusão -->
    <div class="modal fade" id="concluir" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Concluir</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Deseja concluir a tarefa?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-success">Concluir</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Visualizar -->
    <div class="modal fade" id="exibir" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalhes</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                    <form>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" readonly
                                :value="tarefa.nome">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label">Data limite</label>
                            <input type="date" class="form-control" id="exampleFormControlInput2" readonly
                                :value="tarefa.data_limite">
                        </div>
                        <div class="mb-3" v-if="tarefa.data_conclusao">
                            <label for="exampleFormControlInput3" class="form-label">Data Conclusão</label>
                            <input type="date" class="form-control" id="exampleFormControlInput3" readonly
                                :value="tarefa.data_conclusao">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput4" class="form-label">Status</label>
                            <input type="text" class="form-control" id="exampleFormControlInput4" readonly
                                :value="tarefa.status">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" readonly
                                :value="tarefa.descricao"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>

                </div>
            </div>
        </div>
    </div>
    <!-- Alterar Senha -->
    <div class="modal fade" id="alterarSenha" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Alterar Senha</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="text-align: left;">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="">Senha antiga</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="senhaAntiga">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput2" class="">Nova Senha</label>
                        <input type="password" class="form-control" id="exampleFormControlInput2" v-model="senhaNova">
                    </div>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="salvar">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TelaInicial',
        data: () => ({
            tarefas: [{
                    nome: "Comprar Agua",
                    status: "Concluido",
                    data_limite: "2023-09-15",
                    data_conclusao: "2023-09-04",
                    descricao: "Comprar agua no mercantil os 5 reais esta na carteira"
                },
                {
                    nome: "Fazer projeto",
                    status: "Pendente",
                    data_limite: "2023-09-10",
                    data_conclusao: "",
                    descricao: "Só falta postar no git"
                },
            ],
            tarefa: {},
            nvTarefa: {},
            senhaNova:'',
            senhaAntiga:''

        }),
        methods: {
            formataDataTempo(data_americana) {
                let data_brasileira = data_americana.split('-').reverse().join('/');
                return data_brasileira
            },
            excluir() {
                console.log('Excluir')

            },
            alterar(tarefa) {

                this.tarefa = tarefa

            },
            concluir() {
                console.log('concluir')
            },
            exibir(tarefa) {

                this.tarefa = tarefa

            },
            salvar() {
                this.nvTarefa.data_conclusao = ""
                this.nvTarefa.status = "Pendente"
                this.tarefas.push(this.nvTarefa)
                console.log(this.tarefas)
            }

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    i:hover {
        cursor: pointer;
        color: blue;
    }

    td th {
        padding-left: 10px;
        font-size: large;
    }

    li a:hover {
        cursor: pointer;
    }
</style>