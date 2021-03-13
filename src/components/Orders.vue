<template>
    <div>
        <ul>
            <li v-for="order in orders" v-bind:key="order.id">
                <ul v-for="(qty, name) in order[1]" v-bind:key="name">
                    <p id="i">{{name}}: {{qty}}</p>
                </ul>
                <button v-on:click="deleteItem($event)" v-bind:id="order[0]"> Delete </button>
                <button v-on:click="route($event)" v-bind:id="order[0]"> Modify </button>
            </li>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot)=>{
                let item={};
                querySnapShot.forEach(doc=>{
                    item=[doc.id, doc.data()];
                    this.orders.push(item);
                });
            });
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => { location.reload() });
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({ name: 'modify', params: {id: doc_id}});
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style>
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}
button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
}
p {
    font-size: 16px;
    text-align: center;
    padding: 1px;
    margin: 1px;
}

</style>