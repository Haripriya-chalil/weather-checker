<template>

    <div class="container" style="height: 100vh;">
    
        <div class="row p-5 h-100">
        
            <div class="col-12 col-lg-4 pe-lg-5 pb-3 pb-lg-0 d-flex flex-column justify-content-between">
                 <div class="right">
        
        <button type="button" class="btn mr-3  btn-success" @click="design1">Try with new</button>
                      <button type="button" class="btn   btn-danger" @click="reloadApp">Search</button> 
      </div>
                <div class="row h-25 text-danger">
                    <div class="h-50 d-flex">
                     
                        <router-link to="/">
                            <img src="@/assets/logo.png" alt="Logo" class="h-100">
                        </router-link>
                        <div v-if="currentData" class="d-flex h-100 flex-column">
                            <span class="display-5 text-dark ms-5 text-uppercase">{{ currentData.name }}</span>
                            <span class="ms-5 text-dark">{{ getDate(currentData.dt) }}</span>
                        </div>
                    </div>
                </div>
                 
            </div> 
            <div class="col-12 col-lg-8 ag-light text-dark rounded shadow blur weather-bg " style="--mdb-bg-opacity: 0.5;background: #fff;">
                <AdditionalData :currentData="currentData" :dailyData="dailyData"></AdditionalData>
            </div>
        </div>
    </div>
</template>

<script>
 
import AdditionalData from '@/components/AdditionalData.vue' 
import axios from 'axios';

export default {
    components: { 
        AdditionalData, 
    },
    data() {
        return {
            currentData: null,
            dailyData: null,
            hourlyData: null
        }
    },
    async mounted() {

        if(this.$route.query.city == undefined || this.$route.query.city == null) {
            this.$router.push('/');
        } else {

            let city = this.$route.query.city;
            let errorBool = false;
            
            await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + process.env.VUE_APP_API_KEY +'&lang=en&units=metric')
                .then(response => {
                    this.currentData = response.data;
                })
                .catch(function() {
                     errorBool = true;
            });

            await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + process.env.VUE_APP_API_KEY +'&units=metric&lang=en')
                .then(response => {
                    this.dailyData = response.data;
                })
                .catch(function() {
                    errorBool = true;
            });

        

            if(errorBool) {
                this.$router.push('/');
            }
        }
    },
     created () {
        this.getWeather();
        this.timer = setInterval(this.getWeather, 60000);
    },
    methods: {
        getDate(unix) {
            let data = new Date(unix * 1000);
            return data.toLocaleString();
        },
           reloadApp() {
       this.$router.push('/');
    },
      getWeather: async function () {
      
        if(this.$route.query.city == undefined || this.$route.query.city == null) {
            this.$router.push('/');
        } else {

            let city = this.$route.query.city;
            let errorBool = false;
            
            await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + process.env.VUE_APP_API_KEY +'&lang=en&units=metric')
                .then(response => {
                    this.currentData = response.data;
                })
                .catch(function() {
                     errorBool = true;
            });

            await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + process.env.VUE_APP_API_KEY +'&units=metric&lang=en')
                .then(response => {
                    this.dailyData = response.data;
                })
                .catch(function() {
                    errorBool = true;
            });

        

            if(errorBool) {
                this.$router.push('/');
            }
        }
    },
    design1() { 
                this.$router.push('/page2?city=' + "leeds")
            
        },
    }
}
</script>

<style scoped>
.mr-3
{
    margin-right :10px;
}
    .blur {
        backdrop-filter: blur(10px);
    }
    .shadow {
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.25)!important;
}

.weather-bg
{
      background-image: url('@/assets/background_weather.jpg') !important;
      background-size: cover !important;
}
</style>