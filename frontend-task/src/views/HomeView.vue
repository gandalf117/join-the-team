<template>
    <div class="text-center">
        <h1 class="py-2 border-top border-bottom">Welcome to Jiminny Trainspotting</h1>
        <div>
            <router-link to="/schedule">
                <img class="m-5" alt="Jiminny train logo" src="../assets/train.svg">
                <h3> ENTER </h3>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home-view'
    }
</script>
