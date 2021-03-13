<template>
    <div id="app">
        <button @click="decrement"> - </button>
        <label for="count"> {{counter}} </label>
        <button @click="increment"> + </button>
    </div>
</template>


<script>
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                counter: 0,
            };
        },
        methods: {
            increment() {
                if (this.counter < 10) {
                    this.counter++;
                } else {
                    alert("You cannot buy more than 10 items.");
                }
                this.$emit('counter', this.item, this.counter);
            },
            decrement() {
                if (this.counter > 0) {
                    this.counter--;
                } 
                this.$emit('counter', this.item, this.counter);
            }
        }
    }
</script>

<style>


</style>