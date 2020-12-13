<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    Image
                                </th>
                                <th class="text-left">
                                    Quantity Action
                                </th>
                                <th class="text-left">
                                    Quantity
                                </th>
                                <th class="text-left">
                                    Price
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                    v-for="item in products"
                                    :key="item.id"
                            >
                                <td>{{ item.title }}</td>
                                <td>
                                    <v-img :src="item.image" max-width="100" max-height="100"></v-img>
                                </td>
                                <td class="text-no-wrap">
                                    <v-btn color="purple" dark @click="increaseQty(item)">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                    <v-btn color="red" dark @click="decreaseQty(item)">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </td>
                                <td>{{ Number(item.qty.toFixed(2)) }}</td>
                                <td>${{ productPrice(item) }}</td>
                                <td>
                                    <v-btn color="red" dark @click="decreaseProduct(item)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <v-divider class="mb-5"></v-divider>
                <div class="d-flex">
                    <p>
                        Total Price
                    </p>
                    <v-spacer></v-spacer>
                    <p>$ {{ totalPrice }}</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "AddCart",
        data() {
            return {
                products: []
            }
        },
        mounted() {
            this.products = this.$root.cart
        },
        methods: {
            increaseQty(product) {
                product.qty++
            },
            decreaseQty(product) {
                if(product.qty === 1) {
                    product.qty = 1
                } else {
                    product.qty--
                }
            },
            productPrice(product) {
                return product.price * product.qty
            },
            decreaseProduct(product) {
                let cart = this.$root.cart;
                let index = cart.findIndex(c => c.id === product.id)
                cart.splice(index,1)
            }
        },
        computed: {
            totalPrice() {
                let totalprice = this.products.reduce((total,product) => {
                    total += (product.price * product.qty)
                    return total
                }, 0)
                return Number(totalprice.toFixed(2))
            }
        }
    }
</script>

<style scoped>

</style>
