<template>
    <form>
        <label for="title">Título</label>
        <input id="title" type="text" placeholder="Título do livro aqui" v-model="book.title" required minlength="3">
        <br>
        <label for="genre">Gênero</label>
        <select v-model="book.genre">
            <option v-for="option in genreOptions" :key="option" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        <br>
        <label for="description">Descrição</label>
        <textarea id="description" placeholder="Insira uma descrição do livro aqui" type="text" v-model="book.description"></textarea>
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

<style scoped>
    form {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: left;
    }
    label {
        margin-bottom: 10px;
        align-self: flex-start;
    }
    input {
        margin-bottom: 10px;
        width: 100%;
    }
    textarea {
        margin-bottom: 10px;
        width: 100%;
        height: 100px;
    }
    button {
        margin-top: 10px;
        height: 30px;
        width: 200px;
        align-self: center;
        border-radius: 10px;
    }
    button:hover{
        background-color: aqua;
        border: 2px solid blue;
    }
</style>