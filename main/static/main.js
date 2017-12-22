Vue.component('id-canvas', {
        data: function () {
            return {lorem: "canvas", canvas: this.$refs.canvas}
        },
        template: `
            <div class="mdc-card">
                <header class="mdc-toolbar">
                    <div class="mdc-toolbar-row">
                        <section class="mdc-toolbar__section">
                            <span class="mdc-toolbar__title">Teken hier</span>
                        </section>
                    </div>
                </header>
            </div>
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
                items: [],
                validForm: false,
                formInput: {student_number: "", sector: "", title: "", message: ""}
            }
        },
        methods: {
            submit() {
                this.$http.post('api/ideas/', this.formInput).then((response) => {
                    this.dialog = false;
                });
            }
        },
        template: `
            <div class="mdc-card">
               <header class="mdc-toolbar">
                   <div class="mdc-toolbar__row">
                       <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                           <span class="mdc-toolbar__title">Title</span>
                       </section>
                       <section class="mdc-toolbar__section mdc-toolbar__section--align-end">
                           <button class="mdc-button mdc-button--unelevated secondary-filled-button">
                               Raised disabled button
                           </button>
                       </section>
                   </div>
               </header>
               <mdc-list bordered two-line>
                    <a v-for="(item, i) in items" v-if="i < 7" href="" :key="i" class="mdc-ripple-surface mdc-list-item">         
                        <span class="mdc-list-item__text">
                            {{item.title}}
                            <span class="mdc-list-item__text__secondary">{{item.message}}</span>
                        </span>
                    </a>
                </mdc-list>
            </div>
            <!--<div class="mdc-card">-->
                <!--<header class="mdc-toolbar">-->
                  <!--<div class="mdc-toolbar__row">-->
                    <!--<section class="mdc-toolbar__section mdc-toolbar__section&#45;&#45;align-start">-->
                      <!--Section aligns to start.-->
                    <!--</section>-->
                    <!--<section class="mdc-toolbar__section">-->
                      <!--Section aligns to center.-->
                    <!--</section>-->
                    <!--<section class="mdc-toolbar__section mdc-toolbar__section&#45;&#45;align-end">-->
                      <!--Section aligns to end.-->
                    <!--</section>-->
                  <!--</div>-->
                <!--</header>-->
                <!--<mdc-list bordered two-line>-->
                    <!--<a v-for="(item, i) in items" v-if="i < 7" href="" :key="i" class="mdc-ripple-surface mdc-list-item">         -->
                        <!--<span class="mdc-list-item__text">-->
                            <!--{{item.title}}-->
                            <!--<span class="mdc-list-item__text__secondary">{{item.message}}</span>-->
                        <!--</span>-->
                    <!--</a>-->
                <!--</mdc-list>-->
                <!--<mdc-dialog ref="dialog" :overlay="false">-->
                    <!--<v-card>-->
                        <!--<v-toolbar dark color="teal">-->
                            <!--<v-btn icon @click.native="dialog = false" dark>-->
                                <!--<v-icon>close</v-icon>-->
                            <!--</v-btn>-->
                            <!--<v-toolbar-title>Deel jouw idee!</v-toolbar-title>-->
                            <!--<v-spacer></v-spacer>                               -->
                        <!--</v-toolbar>-->
                        <!--<v-card-text>-->
                            <!--<v-form v-model="validForm" lazy-validation>-->
                                <!--<v-container grid-list-md>-->
                                    <!--<v-layout row wrap>-->
                                        <!--<v-flex xs6>-->
                                            <!--<v-text-field @focus="focusInput($event, 'student_number')" type="text" data-layout="normal"  v-model="formInput.student_number" label="Stamnummer/gebruikersnaam" required :rules="[v=>!!v || 'this field is required']"></v-text-field>-->
                                        <!--</v-flex>-->
                                        <!--<v-flex xs6>-->
                                            <!--<v-select @focus="focusInput($event, 'sector')" type="text" data-layout="normal"  v-model="formInput.sector" label="Sector" autocomplete required :items="sectorItems" :rules="[v=>!!v || 'this field is required']"></v-select>-->
                                        <!--</v-flex>-->
                                    <!--</v-layout>-->
                                    <!--<v-flex xs12>-->
                                        <!--<v-text-field @focus="focusInput($event, 'title')" type="text" data-layout="normal"  v-model="formInput.title" label="Titel" required :rules="[v=>!!v || 'this field is required']"></v-text-field>-->
                                    <!--</v-flex>-->
                                    <!--<v-flex xs12>-->
                                        <!--<v-text-field @focus="focusInput($event, 'message')" type="text" data-layout="normal"  v-model="formInput.message" name="input-7-1" label="Bericht" multi-line required :rules="[v=>!!v || 'this field is required']"></v-text-field>-->
                                    <!--</v-flex>-->
                                    <!--<v-btn @click="submit" :disabled="!validForm">Submit</v-btn>-->
                                <!--</v-container>-->
                            <!--</v-form>-->
                        <!--</v-card-text>-->
                    <!--</v-card>-->
                <!--</mdc-dialog>-->
            <!--</div>-->`,
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
    el: '#app',
});
