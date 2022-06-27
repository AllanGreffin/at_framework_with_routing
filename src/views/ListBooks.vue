<template>
    <div>
        Todos os livros cadastrados estão abaixo:

        <ul v-if="books">
            <li v-for="book in books" :key="book">
                {{ book }}
            </li>
        </ul>
        <div v-if="!books || books.length < 1">
            Não foram encontrados livros! Você pode cadastrá-los clicando <router-link to="/addBook">aqui</router-link>.
        </div>
    </div>
</template>    

<script>
    import { ref, onMounted  } from "vue";
    import { mainUrl } from '@/config/URIPath';

    export default {
        name: 'ListBooks',
        setup() {
            const books = ref(null);
            const loading = ref(true);
            const error = ref(null);

            function fetchData() {
            loading.value = true;
                return fetch(mainUrl, {
                    method: 'get',
                    headers: {
                    'content-type': 'application/json'
                    }
                })
                .then(res => {
                    if (!res.ok) {
                        const error = new Error(res.statusText);
                        error.json = res.json();
                        throw error;
                    }
                    return res.json();
                })
                .then(json => {
                    books.value = json;
                    console.log(json);
                })
                .catch(err => {
                    error.value = err;
                    if (err.json) {
                        return err.json.then(json => {
                            error.value.message = json.message;
                        });
                    }
                })
                .then(() => {
                    loading.value = false;
                });
            }

            onMounted(() => {
                fetchData();
            });

            return {
                books,
                loading,
                error
            };
        }
    };
</script>

<style>

</style>