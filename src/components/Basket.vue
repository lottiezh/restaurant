<template>
    <div>
        <p>Menu:</p>
        <ul id="list">
            <li id="list" v-for="item in itemsSelected" v-bind:key="item.id">
                <p>{{item[0]}} x {{item[1]}}</p>
            </li>
        </ul>
        <br>
        <button @click="findTotal"> Calculate Total </button>
        <br>
        <p v-show="show"> Subtotal: ${{subtotal}} <br> Grand Total: ${{grandtotal}} </p>
        <br><br>
        <button v-on:click="sendOrder"> Add Order </button>
    </div>
</template>

<script>
    import database from '../firebase.js'

    export default {
        props: {
            itemsSelected: {
                type: Array
            }
        },
        data() {
            return {
                subtotal: 0,
                show: false,
            }
        },
        computed: {
            grandtotal: function() {
                var rounding = this.subtotal * 1.07;
                return rounding.toFixed(2);
            }
        },
        methods: {
            findTotal() {
                this.show = true;
                var sub = 0;
                for (var i = 0; i < this.itemsSelected.length; i++) {
                    sub += this.itemsSelected[i][2] * this.itemsSelected[i][1];
                }
                this.subtotal = sub;
            },
            sendOrder() {
                var newOrder = {
                    "Cereal Prawn": 0,
                    "Dry Beef Hor Fun": 0,
                    "Mapo Tofu": 0,
                    "Pork Fried Rice": 0,
                    "Prawn omelette": 0,
                    "Sambal KangKung": 0
                };
                this.itemsSelected.forEach((item) => {
                    newOrder[item[0]] = item[1];
                });
                database.collection('orders').add(newOrder).then(() => { location.reload() });
            }
        }
    }
</script>

<style>
p {
    font-size: 24px;
    font-weight: bold;
}
</style>
