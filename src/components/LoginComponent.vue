<template>
<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <div class="card-body">
              <div class="alert alert-danger" role="alert" v-if="erros">
               {{erros}}
              </div>

              <h1>Login</h1>
              <p class="text-muted">Entre na sua conta</p>
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
                  <button type="button" class="btn btn-primary px-4" :disabled="habilitar" @click="login">Login</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
            <div class="card-body text-center">
              <div>
                <h2>Inscrever-se</h2>
                <p>Este sistema irá lhe propocionar uma forma de organizar suas tarefas, totalmente de graça</p>
                <router-link to="/cadastro"><button type="button" class="btn btn-primary active mt-3 botao">Inscreva-se agora!</button></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'LoginComponent',
    data:()=>({
      email:'',
      password:'',
      habilitar:false,
      erros:'',

    }),

    methods:{
      login(){
        let url = 'http://tarefasapi-8a24ead464dc.herokuapp.com/api/login'

     let data = {
         email :this.email,
         password :this.password
        }
         let config = {
           headers:{
             'Content-Type':'application/x-www-form-urlencoded',
             'Accept':'application/json'
           }
         }   
         axios.post(url,data,config)
              .then(response=>{
                if(response.data.token){
                  document.cookie = 'token='+response.data.token+';SameSite=Lax'
                  this.$router.push('/telaInicial')
                }else{
                  this.erros = response.data.erro  
                }
             })
              .catch( error=>{
                this.erros = error.message
                console.log(error.message)
                
             })  
        
      }
    },
    updated(){
      if(this.email!='' && this.password!==''){
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
  