import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios"

createApp(App).use(store).use(router).mount('#app')

axios.interceptors.request.use(
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
)



