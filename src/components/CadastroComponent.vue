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
                    <input type="nome" name="nome" class="form-control" placeholder="Nome" v-model="dados.nome">
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="email"  name="email" class="form-control" placeholder="Email" v-model="dados.email">
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="password" class="form-control" name="password" placeholder="Senha" v-model="dados.password">
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button type="button" class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#registrado"  :disabled="habilitar"  @click="registrar">Cadastrar</button>
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
              <div class="modal-body" v-if="msg">
                {{ msg }} 
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
          dados:{
          email:'',
          password:'',
          nome:''
        },
          habilitar:true,
          urlBase: 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/',
          erros : '',
          msg:'',
          classe:''
        }),
      
        methods:{
              registrar(){
            const config = {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                }   
              }
              let data = {
                name:this.dados.nome,
                email:this.dados.email,
                password:this.dados.password
              }
              let url = this.urlBase+'register'
                axios.post(url,data,config)
                    .then(() => {
                    this.msg = 'Cadastro realizado com sucesso. Seja bem vindo(a) '+ this.dados.nome
                    })
                    .catch(error => {
                      if(error.response != undefined){
                         this.erros = error.response.data.errors.email 
                         this.erros += error.response.data.errors.password  
                      }else{
                        this.erros = error.message
                      }
                         
                    });
                  
              }
        },


        updated(){
          if(this.dados.email && this.dados.nome && this.dados.password ){
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
      