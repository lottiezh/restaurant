<template>
    <div>
        <p v-for="(qty, name) in datapacket" v-bind:key="name" id="mod">
            <label>{{name}}: {{qty}}</label>
            <br><br>
            <input type="number" placeholder=0 min="0" max="10" v-bind:id="name" required/>
            <br><br>
        </p>
        <button v-on:click="updateOrder">Update Order</button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            datapacket: {}
        }
    },
    methods: {
        fetchItems: function() {
            let item = {};
            database.collection('orders').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    if (doc.id == this.$route.params.id) {
                        item = doc.data();
                        this.datapacket = item;
                    }
                });
            });
        },
        updateOrder: function() {
            let copy = this.datapacket;
            copy["Cereal Prawn"] = Number(document.getElementById("Cereal Prawn").value);
            copy["Dry Beef Hor Fun"] = Number(document.getElementById("Dry Beef Hor Fun").value);
            copy["Mapo Tofu"] = Number(document.getElementById("Mapo Tofu").value);
            copy["Pork Fried Rice"] = Number(document.getElementById("Pork Fried Rice").value);
            copy["Prawn omelette"] = Number(document.getElementById("Prawn omelette").value);
            copy["Sambal KangKung"] = Number(document.getElementById("Sambal KangKung").value);
            this.datapacket = copy;
            database.collection('orders').doc(this.$route.params.id).update(this.datapacket).then(this.$router.push('orders'));
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style>
#mod {
    text-align: left;
}
</style>