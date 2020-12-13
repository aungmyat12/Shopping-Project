<template>
    <v-container>
        <v-row>
            <v-col cols="4" v-for="product in products" :key="product.id">
                    <v-card v-if="!loading">
                        <div class="d-block text-center">
                            <img width="200px" height="200px" :src="product.image" />
                        </div>
                        <v-card-title>
                            {{ product.title }}
                        </v-card-title>
                        <div class="d-flex">
                            <v-card-subtitle>
                                Price - {{ product.price }}
                            </v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn color="primary" @click="detailProduct(product.id)">Details</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                    <div class="loading" v-if="loading">
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
        name: "Dashboard",
        data() {
            return {
                loading: true,
                products: [],
                zIndex: 0,
            }
        },
        created() {
            axios.get('https://fakestoreapi.com/products')
            .then(response => {
                this.products = response.data
                this.loading = false
            })
        },
        methods: {
            detailProduct(id) {
                this.$router.push('/product/' + id)
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
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
