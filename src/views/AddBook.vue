<template>
    <form>
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
        <button @click="addBook()">Enviar</button>
    </form>
</template>

<script>
    import { mainUrl } from '@/config/URIPath';

    export default{
        name: 'AddBook',
        data(){
            return {
                count: 0,
                book:   {
                            title: "",
                            creationDate: "2022-06-27T23:44:45.866Z",
                            genre: 0,
                            description: ""
                        },
                genreOptions: [
                    { text: "Aventura", value: 0},
                    { text: "Romance", value: 1},
                    { text: "Terror", value: 2},
                    { text: "Outros", value: 3}
                ]
            }
        },
        methods: {
            addBook(){
                fetch(`${mainUrl}`, {
                method: 'POST',
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
        }
    };
</script>

<style>
</style>