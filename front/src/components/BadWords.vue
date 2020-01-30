<template>
    <div>
        <NavBar></Navbar>
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Palabra</th>
                    <th scope="col">Nivel</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="badWord in words" v-bind:key="badWord._id">
                    <td>{{badWord.word}}</td>
                    <td>{{badWord.level}}</td>
                    <td>
                        <b-button v-on:click="activeEdit(badWord._id)">Editar</b-button>
                        <b-button v-on:click="deleteWord(badWord._id)">Eliminar</b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="addForm">
            <form v-if="!edit">
                <h4>Añadir palabra</h4>
                <p>Palabla</p>
                <b-input class="form-control my-2" type="text" v-model="word"></b-input>
                <p>Nivel</p>
                <b-input class="form-control my-2" type="number" v-model="level"></b-input>
                <b-button v-on:click="addWords">Añadir</b-button>
            </form>

            <form v-if="edit">
                <h4>Añadir palabra</h4>
                <p>Palabla</p>
                <b-input class="form-control my-2" type="text" v-model="editWord"></b-input>
                <p>Nivel</p>
                <b-input class="form-control my-2" type="number" v-model="editLevel"></b-input>
                <b-button v-on:click="editWords(idWord)">Editar</b-button>
                <b-button v-on:click="calcelEdit">Cancelar</b-button>
            </form>
        </div>

    </div>
</template>


<script>
    import NavBar from './NavBar';
    import axios from 'axios';

    export default {
        name: 'badwords',
        components: {
            'NavBar': NavBar
        },
        data() {
            return {
                words: [],
                error: '',
                word: '',
                level: '',
                edit: false,
                editWord: '',
                editLevel: '',
                idWord: ''
            }
        },
        methods: {
            activeEdit: function (id) {
                this.edit = true;
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                axios.get(`http://localhost:3000/badwords/${id}`, config)
                    .then(response => {
                        this.editWord = response.data.word;
                        this.editLevel = response.data.level;
                        this.idWord = response.data._id
                        /* eslint-disable no-console */
                        console.log("data", response.data.word, response.data.level)
                        /* eslint-enable no-console */
                    }).catch(err => {
                        /* eslint-disable no-console */
                        console.log("err", err)
                        /* eslint-enable no-console */
                    })
            },
            calcelEdit: function () {
                this.edit = false;
            },
            deleteWord: function (id) {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                axios.delete(`http://localhost:3000/badwords/${id}`, config)
                    .then(() => {
                        for (let i = 0; i < this.words.length; i++) {
                            if (this.words[i]._id === id);
                            this.words.splice(i, 1);
                        }
                    }).catch(err => {
                        this.error = err
                    });
            },
            addWords: function () {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const data = {
                    word: this.word,
                    level: this.level
                };
                /* eslint-disable no-console */
                console.log("data", data)
                /* eslint-enable no-console */
                axios.post(`http://localhost:3000/badwords/`, data, config)
                    .then(response => {
                        this.words.push(response.data);
                    }).catch(err => {
                        this.error = err
                    });
            },
            editWords: function (id) {
                let token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const data = {
                    word: this.editWord,
                    level: this.editLevel
                }

                axios.put(`http://localhost:3000/badwords/${id}`, data, config)
                    .then(response => {
                        /* eslint-disable no-console */
                        console.log("axios.put", response.data)
                        /* eslint-enable no-console */
                    })
                    .catch(err => {
                        /* eslint-disable no-console */
                        console.log("error", err)
                        /* eslint-enable no-console */
                    })

            }
        },

        created() {
            let token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get('http://localhost:3000/badwords', config)
                .then(response => {
                    this.words = response.data
                    /* eslint-disable no-console */
                    console.log("get", response.data)
                    /* eslint-enable no-console */
                }).catch(err => {
                    this.error = err
                });
        }
    }
</script>

<style>
    @media (min-width: 1200px) {
        .addForm {
            width: 600px;
            margin: 0 auto;
        }
    }
</style>