<template>
    <form v-if="!loading">
        <label for="title">Título</label>
        <input id="title" type="text" v-model="book.title">
        <br>
        <label for="genre">Gênero</label>
        <select v-model="book.genre">
            <option v-for="option in genreOptions" :key="option" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        <br>
        <label for="description">Descrição</label>
        <textarea id="description" type="text" v-model="book.description"></textarea>
        <br>
        <button @click="editBook()">Enviar</button>
    </form>
</template>

<script>
    import { ref, onMounted  } from "vue";
    import { mainUrl } from '@/config/URIPath';
    import { useRoute } from 'vue-router';

    export default{
        name: 'AddBook',
        data(){
            return {
                genreOptions: [
                    { text: "Aventura", value: 0},
                    { text: "Romance", value: 1},
                    { text: "Terror", value: 2},
                    { text: "Outros", value: 3}
                ]
            }
        },
        methods: {
            editBook(){
                fetch(`${mainUrl}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.book)
                })
                .then(response => response)
                .then(() => {
                })
                .catch(error => console.log(error))
            }
        },
        setup() {
            let book = ref(null);
            let loading = ref(true);
            let error = ref(null);
            const route = useRoute()
            // console.log(route.params.id);
            function fetchData() {
                loading.value = true;
                return fetch(mainUrl + route.params.id, {
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
                    book.value = json;
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
                book,
                loading,
                error
            };
        }
    };
</script>

<style>
</style>