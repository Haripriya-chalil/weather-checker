<template>
    <div v-if="currentData" class="h-100 w-100 p-3 d-flex flex-column justify-content-between">
        <!-- Search bar -->
        <div>
             <div v-if="currentData" class="w-100 p-3 text-light">
        <h1 class="display-3 mb-0">{{ currentTemperature }}°C</h1>
        <span class="text-light  subhead">{{ currentData.weather[0].description }}</span>
    </div>
            <hr>

            <!-- Additional weather data -->
            <div class="row">
                <div class="col-6 text-start text-light">
                    <p>Perceptibly</p>
                    <p>Humidity</p>
                    <p>Pressure</p>
                    <p>Wind speed</p>
                    <p>Cloudy</p>
                </div>
                <div class="col-6 text-end">
                    <p>{{ Math.round(currentData.main.feels_like) }}°C</p>
                    <p>{{ Math.round(currentData.main.humidity) }}%</p>
                    <p>{{ currentData.main.pressure }}mbar</p>
                    <p>{{ parseFloat(currentData.wind.speed * 3.6).toFixed(1) }} km/h</p>
                    <p>{{ currentData.clouds.all }}%</p>
                </div>
                
            </div>
        </div>

        
        
    </div>
</template>

<script>
 

export default {
    components: {
       
    },
    props: {
        currentData: Object,
        dailyData: Object
    },
    computed: {
        progressPercent() {
            let currentMinutes = (new Date().getHours() * 60) + new Date().getMinutes();
            let sunsetMinutes = (new Date(this.currentData.sys.sunset * 1000).getHours() * 60) + new Date(this.currentData.sys.sunset).getMinutes();
            return Math.round(currentMinutes / sunsetMinutes * 100);
        },
         currentTemperature() {
            return Math.round(this.currentData.main.temp)
        }
    },
    methods: {
        
        getTime(unix) {
            let data = new Date(unix * 1000);
            return data.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
        
    }
}
</script>

<style scoped>
p{ 
    color: #000;
}
h1{ 
    color: #000;
}

.subhead
{
color :#555 !important;
}
</style>