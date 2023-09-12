<template>
    <div class="container">
        <div class="row justify-content-center">
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
                      <button type="button" class="btn btn-primary px-4" :disabled="habilitar" @click="login">Cadastrar</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
                <div class="card-body text-center">
                  <div>
                    <h2>Acesse</h2>
                    <p>Se você já possui cadastro, basta clicar no botão abaixo!</p>
                    <router-link to="/"><button type="button" class="btn btn-primary active mt-3 botao">Realize seu Login</button></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </template>
      
      <script>
      export default{
        name: 'CadastroComponent',
        data:()=>({
          nome:'',
          email:'',
          password:'',
          habilitar:false
        }),
    
        methods:{
          login(){
            console.log('Email:'+this.email)
            console.log('Senha:'+this.password)
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
      