<template>
    <div class="container" style="height: 100vh;">
        <div class="row p-3 h-100 d-flex align-items-center">
            <div class="col-2"></div>
            <div class="col-8 col-lg-8 bg-dark text-dark p-4 h-60 rounded shadow d-flex justify-content-between flex-column align-items-center" style="--mdb-bg-opacity: 0.7;">
                 
                <div class="w-75 text-center">
                    <div class="form-outline">
                        <div class="text-start text-white">Search With City Name</div>
                        <input v-model="cityName" type="search" id="searchForm" class="form-control bg-light text-warning" placeholder="" aria-label="Search" style="--mdb-bg-opacity: 0.3;" />
                    </div>
                    <button type="button" class="btn btn-outline-warning mt-3" data-mdb-ripple-color="warning" @click="search()">Search</button> 
                </div>
               
            </div>
            
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            cityName: null
        }
    },
    methods: {
        search() {
            if(this.cityName != null) {
                this.$router.push('/page1?city=' + this.cityName)
            }
        },
       
    }
}
</script>

<style scoped>

</style>