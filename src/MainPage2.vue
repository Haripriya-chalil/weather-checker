<template>

    <div class="container" style="height: 100vh;">
    
        <div class="row p-5 h-100">
        
            <div class="col-12 col-lg-4 pe-lg-5 pb-3 pb-lg-0 d-flex flex-column justify-content-between">
                 <div class="right">
          <button type="button" class="btn mr-3  btn-success" @click="design1">Try with new</button>
                      <button type="button" class="btn   btn-danger" @click="reloadApp">Search</button>
          
      </div>
                <div class="row h-25 text-danger ">
                    <div class="h-50 d-flex">
                     

                         
                    </div>
                </div>
                 
            </div> 
            <div class="row d-flex justify-content-center">
            <div class="col-lg-12">
            <div v-if="currentData" class="d-flex h-100   d-flex justify-content-center">
                            <span class="display-5 text-dark ms-5 text-uppercase">{{ currentData.name }}</span>
                           
                        </div>
            </div>
            <div class="col-lg-6 ag-light text-dark rounded shadow blur weather-bg" style="--mdb-bg-opacity: 0.5;;background: #fff;">
            <div style="
    text-align: center;
    margin-top: 15px;
">
                          
            </div>
                <AdditionalData :currentData="currentData" :dailyData="dailyData"></AdditionalData>
            </div>
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
                this.$router.push('/page1?city=' + "leeds")
            
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
    .weather-bg
{
      background-image: url('@/assets/background2.jpg') !important;
      background-size: cover !important;
}
</style>