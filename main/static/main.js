const Tokens = {
    // Sequences that no-one will ever put in their keyboards.
    PIPE: '7440011c983cf39ae730b1f831e2922ac5a76910',
    OPEN_BRACE: 'f630c4abcae620278f82e142a526ef325c2a773a',
    CLOSE_BRACE: 'ad982c66898e02a5dab419ea7568421b03f68ee2'
};

Vue.component('id-keyboard', {

        props: {
            value: {
                type: String,
                default: ''
            },
            layouts: {
                type: [String, Array],
                required: true
            },
            maxlength: {
                type: Number,
                default: 0,
                validator: value => value >= 0
            },
            pattern: {
                type: String,
                default: null
            }
        },

        data() {
            return {
                layout: 0
            };
        },

        computed: {
            /**
             * Whether or not the keyboard input has hit its maximum length.
             * @returns {Boolean}
             */
            full() {
                return this.maxlength > 0 && this.value.length >= this.maxlength;
            },

            /**
             * Whether or not the keyboard input is empty.
             * @return {Boolean}
             */
            empty() {
                return this.value.length === 0;
            },

            /**
             * Returns the lines that make up a layout.
             * @return {Array}
             */
            lines() {
                let layout = (Array.isArray(this.layouts) ? this.layouts : [this.layouts])[this.layout];

                return layout.replace('||', Tokens.PIPE)
                    .replace('{{', Tokens.OPEN_BRACE)
                    .replace('}}', Tokens.CLOSE_BRACE)
                    .split('|');
            },

            /**
             * Returns an array of buttons to render in the component.
             * @returns {Array[]}
             */
            buttons() {
                return this.lines.map(line => {
                    // TODO: Could potentially rely on Object.values() here instead of being explicit.
                    let stream = line.match(new RegExp(`(${Tokens.OPEN_BRACE}|${Tokens.CLOSE_BRACE}|${Tokens.PIPE}|.)`, 'g'));

                    let buttons = [];
                    let token = null;

                    stream.forEach(char => {
                        if (char === '{') {
                            token = '';
                        } else if (char === '}') {
                            let command = token.split(':');
                            let text = command.length > 1 ? command[0] : '';
                            let action = command.length > 1 ? command[1] : command[0];
                            let args = command.length > 2 ? command[2] : null;
                            let method = null;

                            if (['append', 'backspace', 'space', 'clear', 'goto'].indexOf(action) >= 0) method = this[action].bind(this, args);
                            else method = this.$emit.bind(this, action, this);

                            buttons.push({
                                type: 'action',
                                action: {name: action.replace(/\s+/g, '-').toLowerCase(), callable: method},
                                value: text,
                                args
                            });

                            token = null;
                        } else {
                            if (token !== null) {
                                token += char;
                            } else {
                                if (char === Tokens.PIPE) char = '|';
                                if (char === Tokens.OPEN_BRACE) char = '{';
                                if (char === Tokens.CLOSE_BRACE) char = '}';

                                buttons.push({
                                    type: 'char',
                                    action: {name: null, callable: this.append.bind(this, char)},
                                    value: char,
                                    args: null
                                });
                            }
                        }
                    });

                    return buttons;
                });
            },

            /**
             * Whether or not the current value matches the regex provided to pattern. Always
             * returns true if no pattern was provided.
             * @returns {Boolean}
             */
            valid() {
                return !this.pattern || this.value.match(new RegExp(this.pattern));
            }
        },

        methods: {
            /**
             * Mutates the keyboard value to a new value.
             * @param {String} value The new value.
             */
            mutate(value) {
                if (this.maxlength > 0) {
                    value = value.slice(0, this.maxlength);
                }

                this.$emit('input', value);
            },

            /**
             * Appends a new value to the end of the current keyboard value.
             * @param {String} char The character(s) to append.
             */
            append(char) {
                this.mutate(this.value + char);
            },

            /**
             * Remove the last character from the current keyboard value.
             */
            backspace() {
                this.mutate(this.value.slice(0, this.value.length - 1));
            },

            /**
             * Add one whitespace character to the current keyboard value.
             */
            space() {
                this.append(' ');
            },

            /**
             * Go to a new layout.
             * @param {Number} The layout index.
             */
            goto(layout) {
                if (Array.isArray(this.layouts)) {
                    if (layout >= 0 && layout < this.layouts.length) {
                        this.layout = layout;
                    } else {
                        throw new Error('The requested layout does not exist.');
                    }
                } else {
                    throw new Error('A single non-array layout was provided.');
                }
            },

            /**
             * Clear the entire keyboard value.
             */
            clear() {
                this.mutate('');
            }
        },
        template: `
        <aside class="vue-keyboard" role="application" :class="{ full: full, empty: empty, valid: valid, invalid: !valid }" :data-value="value" :data-layout="layout">
            <div role="row" class="vue-keyboard-row" v-for="row in buttons" :data-keys="row.length">
                <button
                    v-for="btn in row"
                    class="vue-keyboard-key"
                    role="button"
                    :class="btn.type"
                    :data-args="btn.args"
                    :data-text="btn.value"
                    :data-action="btn.action.name"
                    @click.prevent="btn.action.callable"
                >{{ btn.value }}</button>
            </div>
        </aside>
        `
    }
);

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
                                            <v-text-field @focus="focusInput($event, 'student_number')" type="text" data-layout="normal"  v-model="formInput.student_number" label="Stamnummer/gebruikersnaam" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-select @focus="focusInput($event, 'sector')" type="text" data-layout="normal"  v-model="formInput.sector" label="Sector" autocomplete required :items="sectorItems" :rules="[v=>!!v || 'this field is required']"></v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-flex xs12>
                                        <v-text-field @focus="focusInput($event, 'title')" type="text" data-layout="normal"  v-model="formInput.title" label="Titel" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field @focus="focusInput($event, 'message')" type="text" data-layout="normal"  v-model="formInput.message" name="input-7-1" label="Bericht" multi-line required :rules="[v=>!!v || 'this field is required']"></v-text-field>
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
    el: '#app',
});
