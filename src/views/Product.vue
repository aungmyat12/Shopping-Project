<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card v-if="!loading">
                    <v-img class="mx-auto" width="400px" :src="product.image"></v-img>
                    <v-card-text>
                        <v-card-title>{{ product.title }}</v-card-title>
                        <v-card-subtitle>{{ product.description }}</v-card-subtitle>
                        <div>
                            <v-chip color="primary">{{ product.category }}</v-chip>
                            Price - {{ product.price }}
                        </div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green" dark @click="addToCart">Add Cart</v-btn>
                    </v-card-actions>
                </v-card>
                <div class="loading" v-else>
                    <v-progress-circular
                            indeterminate
                            color="red"
                            size="100"
                    ></v-progress-circular>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Product",
        data() {
          return {
              loading: true,
              product: {}
          }
        },
        created() {
            let id = this.$route.params.id
            axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(product => {
                this.product = product.data
                this.loading = false
            })
        },
        methods: {
            addToCart() {
                let cart = this.$root.cart
                let isInCart = cart.find(v => v.title === this.product.title)
                if(isInCart) {
                    isInCart.qty++
                } else {
                    cart.push({...this.product, qty: 1})
                }

            }
        }
    }
</script>

<style scoped>

    .loading {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        z-index: 10;
        right: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.0092), rgba(0, 0, 0, 0.0092));
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
