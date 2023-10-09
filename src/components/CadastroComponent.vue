<template>
    <div class="container">
        <div class="row justify-content-center mx-auto p-5">
          <div class="col-md-8">
            <div class="card-group mb-0">
              <div class="card p-4">
                <div class="card-body">
                  <h1>Cadastre-se</h1>
                  <p class="text-muted">Informe os dados</p>
                  <div class="input-group mb-3">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="email" class="form-control" placeholder="Nome" v-model="nome">
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="password" class="form-control" placeholder="Senha" v-model="password">
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button type="button" class="btn btn-primary px-4"   data-bs-toggle="modal" data-bs-target="#registrado" :disabled="habilitar" @click="registrar">Cadastrar</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card text-white bg-primary py-5 d-md-down-none" style="width:100%">
                <div class="card-body text-center">
                  <div>
                    <h2>Acesse</h2>
                    <p>Se você já possui cadastro, basta clicar no botão abaixo !</p>
                  <button type="button" class="btn btn-primary active mt-3 botao" @click="$router.push('/')">Realize seu Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
        <div class="modal fade" id="registrado" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Cadastro</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" v-if="!erros">
                Cadastro realizado com sucesso. Seja bem vindo(a) {{nome}}. 
                <p>Realize o seu login.</p>
              </div>
              <div class="modal-body" v-else>
               {{erros}}. 
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$router.push('/')">Login</button>
              </div>
            </div>
          </div>
        </div>

     </template>
      
      <script>

   import axios from "axios"
      export default{
        name: 'CadastroComponent',
        data:()=>({
          nome:'',
          email:'',
          password:'',
          habilitar:false,
          urlBase: 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/',
          erros : ''
        }),
      
        methods:{
              registrar(){
          
            const config = {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                }   
              }
              let data = {
                name:this.nome,
                email:this.email,
                password:this.password
              }
              let url = this.urlBase+'register'
                axios.post(url,data,config)
                    .then((response) => {
                      console.log(response)
                    })
                    .catch(error => {
                     
                      if(error.response != undefined){
                         this.erros = error.response.data.errors.email 
                         this.erros += error.response.data.errors.password  
                      }else{
                        this.erros = error.message
                        console.log(this.erros)
                      }
                         
                    });
                  
              }
        },
        updated(){
          if(this.email!='' && this.password!=='' && this.nome!==''){
            this.habilitar = false
          }else{
            this.habilitar = true
          }
        }
      }
      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
       .botao:hover{
        background-color: rgb(5, 96, 231);
       }
      </style>
      