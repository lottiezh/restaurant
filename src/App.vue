<template>
    <div>
        <h1> Zhenghao's Zi Char </h1>
        <nav>
            <ul>
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/orders" exact>Orders</router-link></li>
                <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
    }
</script>

<style>
h1 {
    text-align: center;
    background-color: gold;
    font-size: 60px;
}
</style>
