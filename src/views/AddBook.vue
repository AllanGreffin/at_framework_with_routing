<template>
    AddBook !
</template>

<script>

    export default{
        name: 'AddBook',
        data(){
            return {
                count: 0,
            }
        },
        methods: {
            addBook(){
                this.count++;
            }
        }
    }
</script>

<style>
</style>