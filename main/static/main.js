Vue.component('id-canvas', {
        data: function () {
            return {lorem: "canvas", canvas: this.$refs.canvas}
        },
        template: `
            <v-card class="ma-2">
                <v-toolbar dark color="teal">
                        <v-toolbar-title>Teken hier</v-toolbar-title>
                </v-toolbar>
               
                <v-card-text v-text="lorem">
                </v-card-text>
            </v-card>
        `
    }
);

Vue.component('id-ideas', {
        data: function () {
            return {
                dialog: false,
                sectorItems: [
                    'Autotechniek',
                    'Bouw',
                    'CIOS',
                    'Dans en Theater',
                    'Entree',
                    'Handel en Commercie',
                    'Horeca en Facility',
                    'ICT',
                    'Lab',
                    'Logistiek',
                    'Maritiem',
                    'Marketing en Media',
                    'MyTec',
                    'Orde en Veiligheid',
                    'Recreatie',
                    'Techniek',
                    'Uiterlijke Verzorging',
                    'Welzijn',
                    'Zakelijk',
                    'Zorg'
                ],
                items: [
                ],
                validForm: false,
                formInput: {student_number: "", sector: "", title: "", message: ""}
            }
        },
        methods: {
            submit () {
                this.$http.post('api/ideas/', this.formInput).then((response) => {
                    this.dialog = false;
                });
            }
        },
        template: `
            <v-card class="ma-2">
                <v-toolbar dark color="teal">
                    <v-toolbar-title>Campus ideeen</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="purple" large dark @click.native="dialog = true">Deel jouw idee!</v-btn>
                </v-toolbar>
                <v-container>
                    <v-expansion-panel popout>
                         <v-expansion-panel-content v-for="(item, i) in items" :key="i">
                            <div slot="header">{{item.title}}</div>
                            <v-card>
                              <v-card-text class="grey lighten-3">{{item.message}}</v-card-text>
                            </v-card>
                         </v-expansion-panel-content> 
                    </v-expansion-panel>
                </v-container>
                <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                    <v-card>
                        <v-toolbar dark color="teal">
                            <v-btn icon @click.native="dialog = false" dark>
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Deel jouw idee!</v-toolbar-title>
                            <v-spacer></v-spacer>                               
                        </v-toolbar>
                        <v-card-text>
                            <v-form v-model="validForm" lazy-validation>
                                <v-container grid-list-md>
                                    <v-layout row wrap>
                                        <v-flex xs6>
                                            <v-text-field v-model="formInput.student_number" label="Stamnummer/gebruikersnaam" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-select v-model="formInput.sector" label="Sector" autocomplete required :items="sectorItems" :rules="[v=>!!v || 'this field is required']"></v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-flex xs12>
                                        <v-text-field v-model="formInput.title" label="Titel" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field v-model="formInput.message" name="input-7-1" label="Bericht" multi-line required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                    </v-flex>
                                    <v-btn @click="submit" :disabled="!validForm">Submit</v-btn>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-card>`,
        created() {
            this.$http.get('/api/ideas/').then((response) => {
                this.items = response.body;
            })
        }

    }
);

Vue.component('id-appointment', {
        data: function () {
            return {
                lorem: "form",
                dialog: false,
                validForm: false,
                formInput: {student_number: "", date: "", time: "", message: ""}
            }
        },
        methods: {
            submit() {
                this.$http.post('api/appointments/', this.formInput).then((response) => {
                    this.dialog = false;
                });
            }
        },
        template: `
        <v-card class="ma-2 mb-0">
            <v-toolbar dark color="teal">
                <v-toolbar-title>Zebra geloten?</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="purple" large dark @click.native="dialog = true">Maak een afspraak</v-btn>
            </v-toolbar>
            <v-container>
                
            </v-container>
            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                <v-card>
                    <v-toolbar dark color="teal">
                        <v-btn icon @click.native="dialog = false" dark>
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Maak een afspraak</v-toolbar-title>
                        <v-spacer></v-spacer>                               
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="validForm" lazy-validation>
                            <v-container grid-list-md>
                                    <v-layout row wrap>
                                        <v-flex d-flex>
                                            <v-flex xs8 offset-xs2>
                                                <v-text-field v-model="formInput.student_number" label="Stamnummer/gebruikersnaam" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                                <v-text-field v-model="formInput.message" name="input-7-1" label="Bericht" multi-line required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                                
                                                <v-flex xs12 d-flex>
                                                    <v-date-picker v-model="formInput.date" color="teal" ></v-date-picker>
                                                    <v-spacer></v-spacer>
                                                    <v-time-picker v-model="formInput.time" color="teal" ></v-time-picker>
                                                </v-flex>
                                                <v-flex xs2 offset-xs10>
                                                    <v-btn class="mt-3" @click="submit" block :disabled="!validForm">Submit</v-btn>
                                                </v-flex>
                                            </v-flex>   
                                        </v-flex>
                                    </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-card>`
    }
);


const app = new Vue({
    el: '#app'

});
