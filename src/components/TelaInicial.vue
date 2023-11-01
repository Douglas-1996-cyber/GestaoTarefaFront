<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3 text-start">
            <nav class="navbar bg-body-tertiary ">
                <div class="container-fluid">
                    <form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" v-model="buscar">
                    </form>
                    <div class="alert alert-success" role="alert" v-if="sucesso">
                      {{ sucesso }}
                     </div>
                     <div class="alert alert-danger" role="alert" v-if="error">
                      {{ error }}
                     </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">{{nomeUsuario}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body text-uppercase ">
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
                                        <li><a class="dropdown-item"  @click="exportarPDF">PDF</a></li>
                                        <li><a class="dropdown-item" @click="exportar">CSV</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Perfil
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#alterarSenha">Alterar senha</a></li>
                                        <li><a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#logout" >Sair</a></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </nav>
        </div>

        <div class="card-body">
            <div v-if="tarefas.total <= 0">Nenhuma tarefa cadastrada</div>
            <div class="table-responsive" v-else>

                <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0"  >
                  
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Atrasado</th>
                            <th>Prioridade</th>
                            <th>Data Limite</th>
                            <th>Data conclusão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>


                    <tbody> 

                  <tr v-for="tarefa in tarefas.data" v-bind:key="tarefa">
                        
                            <td>{{ tarefa.name }}</td>
                            <td>{{verificaStatus(tarefa.status) }}</td>
                            <td>{{verificaAtrasado(tarefa.late) }}</td>
                            <td>{{verficaPrioridade(tarefa.level) }}</td>
                            <td>{{formataDataTempo(tarefa.data_limite)}}</td>
                            <td>{{ tarefa.data_conclusao?formataDataTempo(tarefa.data_conclusao):'' }}</td>
                            <td>
                            <th @click="verificarExclusao(tarefa)" data-bs-toggle="modal" data-bs-target="#exclusao" disabled><i
                                    class="bi bi-trash"></i></th>
                            <th @click="verificarAtualizacao(tarefa)" data-bs-toggle="modal" data-bs-target="#alteracao"><i
                                    class="bi bi-pencil"></i></th>
                            <th @click="verificarConclusao(tarefa)" data-bs-toggle="modal" data-bs-target="#concluir"><i
                                    class="bi bi-check-circle"></i></th>
                            <th @click="exibir(tarefa)" data-bs-toggle="modal" data-bs-target="#exibir"><i
                                    class="bi bi-envelope-open"></i></th>

                            </td>

                        </tr>
                
                    </tbody>
                  
                </table>

                <span  v-if="loading" class="loader"></span>

            </div>
     
        </div>
       
        <nav aria-label="Navegação de página exemplo" v-if="tarefas.last_page > 1">
            <ul class="pagination justify-content-end">
                <li class="page-item" v-for="l, key in tarefas.links" :key="key"  @click="paginar(l)"><a class="page-link" v-html="l.label" ></a></li>
            </ul>
        </nav>
     
    </div>
    <!-- Button trigger modal -->


    <!-- Modal -->


        <!-- Logout -->
        <div class="modal fade" id="logout" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Sair</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Deseja sair do sistema?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="logout">Sim</button>
                </div>
            </div>
        </div>
    </div>
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click = "excluir()">Excluir</button>
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
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="name">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Data limite</label>
                        <input type="date" class="form-control" id="exampleFormControlInput1"
                            v-model="data_limite">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="240"
                        v-model="description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" :disabled="alterarHabilitar" @click="alterar()">Salvar alterações</button>
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
                        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="nvTarefa.nome" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="">Escolha um nivel de prioridade</label>
                    <select class="form-select" aria-label="Default select example" v-model="nvTarefa.nivel">
                        <option value="0">Baixa</option>
                        <option value="1">Alta</option>
                    </select>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label" >Data limite</label>
                        <input type="date" class="form-control" id="exampleFormControlInput1" required
                            v-model="nvTarefa.data_limite">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="240"  required 
                            v-model="nvTarefa.description"></textarea>
                    </div>
                </div>
                    <div class="alert alert-danger" role="alert" v-if="error">
                    {{error}}
                    </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" :data-bs-dismiss= " error ? '': 'modal'" 
                        @click="salvar" :disabled="salvarHabilitar">Salvar</button>
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
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="concluir">Concluir</button>
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
                                :value="tarefa.name">
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
                                :value="verificaStatus(tarefa.status)">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" readonly
                                :value="tarefa.description"></textarea>
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
                    <button type="button" class="btn btn-primary" data-bs-target="#alterarSenhaStatic" data-bs-toggle="modal" data-bs-dismiss="modal"
                        @click="alterarSenha" :disabled= "senhaAntiga && senhaNova ? false : true " >Salvar</button>
                </div>
            </div>
        </div>
    </div>
      <!-- Alterar Senha -->

        <div class="modal fade" id="alterarSenhaStatic" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Alterar Senha</h1>
                </div>
                <div  v-if="resultadoAlterarSenha.erros">
                <div class="modal-body">
                    {{ resultadoAlterarSenha.erros }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
                </div>
            </div>
                <div v-if="resultadoAlterarSenha.sucesso">
                    <div class="modal-body">
                        {{ resultadoAlterarSenha.sucesso }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="inicial">Entendi</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
 

    <div class="modal fade" id="alterarSenhaStatic" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Alterar Senha</h1>
            </div>
            <div  v-if="resultadoAlterarSenha.erros">
            <div class="modal-body">
                {{ resultadoAlterarSenha.erros }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendi</button>
            </div>
        </div>
            <div v-if="resultadoAlterarSenha.sucesso">
            <div class="modal-body">
                {{ resultadoAlterarSenha.sucesso }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="inicial">Entendi</button>
            </div>
        </div>
            </div>
        </div>

    </div>

</template>

<script>
import axios from "axios"
    export default {
        name: 'TelaInicial',
        data: () => ({
            tarefas: {},
            manipularTarefa:{},
            tarefa:{},
            nvTarefa: {},
            senhaNova:'',
            senhaAntiga:'',
            nomeUsuario:'Dayane',
            urlBase:'https://tarefasapi-8a24ead464dc.herokuapp.com/api/v1/',
            urlPaginacao:'',
            buscar:'',
            teste:{},
            name:'',
            description:'',
            data_limite:'',
            id:'',
            salvarHabilitar:true,
            alterarHabilitar:true,
            error:'',
            sucesso:'',
            idUsuario:'',
            autorizado:true,
            resultadoAlterarSenha:{},

            loading:false

       

        }),
        computed:{

            token(){
               let token = document.cookie.split(';').find(indice=>{
                    return indice.includes('token=')
                })
              if(token == undefined){
                return false
              }else{
                token = token.split('=')
                token = 'Bearer '+token[1]
                return token
              }
            },
            
            },
            
        methods: {

            exportarPDF() {
                axios.interceptors.request.use(
                config =>{
                    config.headers.Accept = 'application/json'
                    config.headers.Authorization = this.token
                    return config
                        },
                        error =>{
                            return Promise.reject(error)
                        }
                    )
                    axios({
                        url: 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/v1/exportar',
                        method: 'GET',
                        responseType: 'blob',
                        
                    }).then((response) => {
                        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        var fileLink = document.createElement('a');

                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'file.pdf');
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    });
                },

                exportar() {
                    let url = 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/v1/exportacao'
                    const config = {
                        headers: {
                            responseType: 'blob',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }
                    axios
                        .get(url, config)
                        .then((res) => {
                            const fileURL = window.URL.createObjectURL(new Blob([res.data])) //montou a url
                            var filelink = document.createElement('a') //montou o link
                            filelink.href = fileURL
                            filelink.setAttribute('download', 'lista_de_tarefas.csv')
                            document.body.appendChild(filelink)
                            filelink.click()

                        })
                        .catch(error => {
                            this.error = error.response.data.msg ? error.response.data.msg : 'Um erro inesperado ocorreu'
                            setTimeout(() => {
                                this.error = ''
                            }, "5000")
                        })
                },

                logout() {
                    let url = 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/v1/logout'
                    const config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }
                    let data = {}
                    axios
                        .post(url, data, config)
                        .then(() => {
                            window.location.replace('https://gestao-tarefa-front.vercel.app/#/')
                        })
                        .catch(error => {
                                console.log(error)
                            })

                },

                me() {
                    if (this.token) {
                        let url = 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/v1/me'
                        const config = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': 'application/json',
                                'Authorization': this.token
                            }
                        }
                        let data = {}
                        axios
                            .post(url, data, config)
                            .then((response) => {
                                this.nomeUsuario = response.data.name
                            })
                            .catch(error => {
                                if (error.response.status == 401 && error.response.data.message == 'Token has expired') {
                                    axios.interceptors.request.use(
                                config =>{
                                    config.headers.Accept = 'application/json'
                                    config.headers.Authorization = this.token
                                    return config
                                        },
                                        error =>{
                                            return Promise.reject(error)
                                        }
                                    )
                                    axios.post('https://tarefasapi-8a24ead464dc.herokuapp.com/api/refresh/')
                                        .then(response => {
                                            document.cookie = 'token=' + response.data.token
                                            window.location.reload()
                                        })
                                        .catch(error =>{
                                            if (error.response.status == 500 && error.response.data.message == 'Token has expired and can no longer be refreshed'){
                                              
                                                window.location.replace('https://gestao-tarefa-front.vercel.app/#/')
                                            }
                                         })
                                }else{
                                    window.location.replace('https://gestao-tarefa-front.vercel.app/#/')
                                } 
                            })

                    } else {
                        window.location.replace('https://gestao-tarefa-front.vercel.app/#/')
                    }
                },

           

                montar(busca) {
                    this.loading = true
                    let url
                    let cont = 0
                    if (busca != undefined) {

                        url = this.urlBase + 'tarefa?search=' + busca + '&page=1'
                       
                    } else {
                        url = this.urlBase + 'tarefa?' + this.urlPaginacao
                    }
                    const config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }
                    axios
                        .get(url, config)
                        .then((res) => {
                            this.tarefas = res.data;
                            this.tarefas.data.forEach((elemento) => {
                                if (elemento.late == 1) {
                                    cont++
                                }
                            })
                            if (cont >= 1) {
                                document.getElementsByTagName("title")[0].innerText = 'Tarefas(Em atrasado)'
                            } else {
                                document.getElementsByTagName("title")[0].innerText = 'Tarefas'
                            }

                            this.loading = false


                        })
                        .catch(error => {
                            if (error.response.status == 401) {
                                this.autorizado = false

                                this.loading = false


                            }

                        });


                },

                paginar(l) {
                    if (l.url != null) {
                        this.urlPaginacao = l.url.split('?')[1]
                        this.montar()

                    }
                },

                formataDataTempo(data_americana) {
                    let data_brasileira = data_americana.split('-').reverse().join('/');
                    return data_brasileira
                },
                verificaStatus(status) {
                    return status == 0 ? "Pendente" : "Concluido"
                },
                verificaAtrasado(atraso) {
                    return atraso == 0 ? "Não" : "Sim"
                },
                verficaPrioridade(level) {
                    return level == 0 ? "Baixa" : "Alta"
                },

                verificarAtualizacao(tarefa) {

                    this.teste = tarefa
                    this.name = tarefa.name
                    this.description = tarefa.description
                    this.data_limite = tarefa.data_limite
                    this.id = tarefa.id
                },

                alterar() {
    
                    let data = {
                        name: this.name,
                        data_limite: this.data_limite,
                        description: this.description,
                        _method: 'put'
                    }
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                            'Authorization': this.token

                        }
                    }

                    axios.post(this.urlBase + 'tarefa/' + this.id, data, config)
                        .then(() => {
                      
                            this.sucesso = "Tarefa atualizada com sucesso"
                            setTimeout(() => {
                                this.sucesso = ''
                            }, "5000")
                            this.montar()
                        })
                        .catch(error => {
                            this.error = error.response.data.msg ? error.response.data.msg : 'Um erro inesperado ocorreu'
                            setTimeout(() => {
                                this.error = ''
                            }, "5000")
                        })

                },

                verificarConclusao(tarefa) {
                    this.id = tarefa.id
                },

                concluir() {
                    let data = {
                        _method: 'patch'
                    }
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }

                    axios.post(this.urlBase + 'concluir/' + this.id, data, config)
                        .then(() => {
                      
                            this.sucesso = "Tarefa concluida com sucesso"
                            setTimeout(() => {
                                this.sucesso = ''
                            }, "5000")
                            this.montar()
                        })
                        .catch(error => {
                            this.error = error.response.data.msg ? error.response.data.msg : 'Um erro inesperado ocorreu'
                            setTimeout(() => {
                                this.error = ''
                            }, "5000")
                        })

                },

                exibir(tarefa) {

                    this.tarefa = tarefa

                },

                salvar() {
                    let data = {
                        name: this.nvTarefa.nome,
                        data_limite: this.nvTarefa.data_limite,
                        description: this.nvTarefa.description,
                        level: this.nvTarefa.nivel
                    }
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }

                    axios.post(this.urlBase + 'tarefa', data, config)
                        .then(() => {
                          
                            this.sucesso = "Tarefa cadastrada com sucesso"
                            setTimeout(() => {
                                this.sucesso = ''
                            }, "5000")
                            this.montar()
                            this.nvTarefa = {}
                        })
                        .catch(error => {
                            this.error = error.response.data.msg ? error.response.data.msg : 'Um erro inesperado ocorreu'
                            setTimeout(() => {
                                this.error = ''
                            }, "5000")
                        })
                },

                verificarExclusao(tarefa) {
                    this.id = tarefa.id
                },

                excluir() {
      
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }
                    axios
                        .delete(this.urlBase + "tarefa/" + this.id, config)
                        .then(() => {
                            this.sucesso = "Tarefa excluida com sucesso"
                            setTimeout(() => {
                                this.sucesso = ''
                            }, "5000")
                            this.urlPaginacao = 'page=1'
                            this.montar()
                        })
                        .catch((error) => {
                            this.error = error.response.data.msg ? error.response.data.msg : 'Um erro inesperado ocorreu'
                            setTimeout(() => {
                                this.error = ''
                            }, "5000")
                        });

                },

                alterarSenha() {
                    let data = {
                        _method: 'patch',
                        senha_antiga: this.senhaAntiga,
                        senha_nova: this.senhaNova
                    }
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                            'Authorization': this.token
                        }
                    }

                    axios.post(this.urlBase + 'senha', data, config)
                        .then(() => {
                 
                            this.resultadoAlterarSenha.sucesso = "Senha alterada com sucesso"


                        })
                        .catch(error => {
                            this.resultadoAlterarSenha.erros = error.response.data.msg

                        })
                },

            },
            watch: {
                    buscar() {
                        this.montar(this.buscar)
                    },

                },

            created() {
                this.me()
                this.montar()

            },
            updated() {
                    if (this.nvTarefa.nome != '' && this.nvTarefa.data_limite != undefined && this.nvTarefa.nivel != undefined && this.nvTarefa.description != '') {
                        this.salvarHabilitar = false
                    } else {
                        this.salvarHabilitar = true
                    }

                    if (this.name != '' && this.data_limite != '' && this.description != '') {
                        this.alterarHabilitar = false
                    } else {
                        this.alterarHabilitar = true
                    }
                    this.me()
            }

            }


            /* axios.interceptors.request.use(
    config =>{
        config.headers.Accept = 'application/json'
        let token = document.cookie.split(';').find(indice =>{
            return indice.includes('token=')
        })
        token = token.split('=')[1]
        token = 'Bearer '+ token
        config.headers.Authorization = token
        return config
    },
    error =>{
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response =>{
        return response
    },
    error =>{
        if(error.response.status == 401 && error.response.data.message == 'Token has expired'){
            axios.post('https://tarefasapi-8a24ead464dc.herokuapp.com/api/refresh/')
            .then(response=>{
                document.cookie = 'token='+response.data.token
                window.location.reload()

            })
        }else if(error.response.status == 500 && error.response.data.message == 'Token has expired and can no longer be refreshed'){
            window.location.assign('https://gestao-tarefa-front.vercel.app/#/')
        }
        return Promise.reject(error)
    }
)  */
</script>

<style scoped>
.loader {
  color: rgb(5, 96, 231);
  font-size: 45px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position:absolute;
  transform: translateZ(0);
  animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;

}

@keyframes mltShdSpin {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, 
    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
     -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, 
     -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
     -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, 
     -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 
    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes round {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
 

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
    .alinhamento{
        text-align: center;
        width: 100%;
    }
</style>