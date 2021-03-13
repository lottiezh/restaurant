<template>
    <div>
        <ul id="itemsList">
            <li v-for="item in items" v-bind:key="item.id">
                <p id="itemName">{{item.name}}</p>
                <img :src="item.imageURL">
                <p id="price">${{item.price}}</p>
                <qtyCounter v-on:counter="onCounter" v-bind:item = "item"></qtyCounter>
            </li>
        </ul>
        <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
    import Basket from './Basket.vue'
    import database from '../firebase.js'

    export default {
        data() {
            return {
                itemsSelected: [],
                items: []
            }
        },
        components: {
            Basket,
        },
        methods: {
            onCounter: function (item, count) {
                var updated = false;
                if (this.itemsSelected.length === 0 && count > 0) {
                    //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                    updated = true;
                } else {
                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];
                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if (item_name === item.name && count > 0) {
                            var a1 = this.itemsSelected.slice(0,i);
                            a1.push([item.name, count, item.price]);
                            var a2 = this.itemsSelected.slice(i+1);
                            this.itemsSelected = a1.concat(a2);
                            updated = true;
                        }
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        else if (item_name === item.name && count === 0) {
                            var b1 = this.itemsSelected.slice(0,i);
                            var b2 = this.itemsSelected.slice(i+1)
                            this.itemsSelected = b1.concat(b2);
                            updated = true;
                        }
                    }
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    if (!updated && count > 0) {
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
            },
            fetchItems: function() {
                database.collection('menu').get().then(snapshot => {
                    let item={};
                    snapshot.docs.forEach(doc => {
                        item=doc.data();
                        item.show=false;
                        this.items.push(item);
                    });
                });
            }
        },
        created() {
            this.fetchItems();
        }
    }
</script>

<style>
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    text-align: center;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}
img {
    width: 135px;
    height: 135px;
}
#price {
    font-size: 30px;
}
#itemName {
    font-size: 30px;
}
#shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
    background-color: "red";
}
#list {
    list-style-type: disc; 
    text-align: left;
    border: 0px;
    padding: 0px;
    margin: 0px;
    font-size: 24px;
}
p {
    text-align: center;
}
</style>