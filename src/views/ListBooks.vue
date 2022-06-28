<template>
    <div>
        Todos os livros cadastrados estão abaixo:
        <div>
            Você pode cadastrar livros clicando <router-link to="/addBook">aqui</router-link>.
        </div>
        <ul v-if="books">
            <li v-for="book in books" :key="book">
                Título:{{ book.title }} - Criado em : {{ book.creationDate }} - Gênero: {{ getBookGenderByValue(book.genre) }}
                Descrição: {{ book.description }}
                <button @click="deleteBook(book)">Deletar</button>
            </li>
        </ul>
        <div v-if="!books || books.length < 1">
            Não foram encontrados livros!
        </div>
    </div>
</template>    

<script>
    import { ref, onMounted  } from "vue";
    import { mainUrl } from '@/config/URIPath';

    export default {
        name: 'ListBooks',
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
        methods:{
            getBookGenderByValue(value){
                return this.genreOptions.find(option => option.value === value).text;
            },
            deleteBook(book){
                fetch(`${mainUrl}${book.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response)
                .then(() => {
                    this.books = this.books.filter(b => b.id !== book.id);
                })
                .catch(error => console.log(error));
            }
        },
        setup() {
            let books = ref(null);
            let loading = ref(true);
            let error = ref(null);
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