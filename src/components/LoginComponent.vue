<template>
<div class="container">
    <div class="row justify-content-center mx-auto p-5 ">
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
                <input type="email" class="form-control" placeholder="Email" v-model="dados.email">
              </div>
              <div class="input-group mb-4">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input type="password" class="form-control" placeholder="Senha" v-model="dados.password">
              </div>
              <div class="row">
                <div class="col-6">
                  <button type="button" class="btn btn-primary px-4"  :disabled="habilitar" @click="login">
                    Login
                  </button>
                  <span  v-if="loading" class="loader"></span> 
                </div>
              </div>
            </div>
          </div>
         
           <div class="card text-white bg-primary py-20 d-md-down-none" style="width:100%">
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
      dados:{
        email:'',
        password:''
      },
      habilitar:false,
      erros:'',
      loading:false

    }),

    methods:{
      login(){
        this.loading = true
        if(this.dados.email != '' || this.dados.password != ''){
          let url = 'https://tarefasapi-8a24ead464dc.herokuapp.com/api/login'    
          let data = {
              email :this.dados.email,
              password :this.dados.password
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
                    .catch( (error) => {
                      this.erros = error.response.data.erro ? error.response.data.erro : "Ocorreu um erro inesperado, entre em contado com o desenvolvedor."
                      this.loading = false
                    
                  })  
  
             
          }
          else{
            this.erros = "Todos os compos devem ser preenchidos."
          }
      }
    },
    created(){
        this.habilitar = true
    },
    updated(){
      if(this.dados.email!='' && this.dados.password!==''){
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
       .loader {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        border: 2px solid;
        border-color: rgba(146, 145, 150, 0.15) rgba(5, 96, 231, 0.945) rgba(14, 161, 219, 0.35) rgba(104, 148, 230, 0.5);
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        margin-left: 10px;
        
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

 


  </style>
  