Vue.component('id-canvas', {
        data: function () {
            return {lorem: "canvas", canvas: this.$refs.canvas}
        },
        template: `
            <v-card class="full-height ma-2">
                <v-toolbar dark color="teal">
                        <v-toolbar-title>Teken hier</v-toolbar-title>
                </v-toolbar>
               
                <v-card-text v-text="lorem">
                </v-card-text>
            </v-card>
        `
    }
);

Vue.component('id-info', {
        data: function () {
            return {item: "idee", dialog: false, validForm: false, formInput: {student_number: "", sector: "", title: "", message: ""}}
        },
        template: `
            <v-card class="full-height ma-2">
                <v-toolbar dark color="teal">
                    <v-toolbar-title>Campus ideeen</v-toolbar-title>
                </v-toolbar>
                <v-container>
                    <v-expansion-panel popout>
                         <v-expansion-panel-content v-for="(item,i) in 10" :key="i">
                            <div slot="header">hello</div>
                            <v-card>
                              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
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
                                    <v-layout wrap>
                                        <v-layout row wrap>
                                            <v-flex xs6>
                                                <v-text-field v-model="formInput.student_number" label="student number" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-select v-model="formInput.sector" label="sector" autocomplete required :items="['Techniek', 'Economie', 'Zorg']" :rules="[v=>!!v || 'this field is required']"></v-select>
                                            </v-flex>
                                        </v-layout>
                                        <v-flex xs12>
                                            <v-text-field v-model="formInput.title" label="title" required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field v-model="formInput.message" name="input-7-1" label="message" multi-line required :rules="[v=>!!v || 'this field is required']"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-btn @click="submit" :disabled="!validForm">Submit</v-btn>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-btn block color="purple" dark @click.native="dialog = true">Deel jouw idee!</v-btn>  
            </v-card>`

    }
);

Vue.component('id-form', {
    data: function () {
        return {lorem: "form"}
    },
    template: `
        <v-card class="full-height ma-2 mt-3">
            <v-toolbar dark color="teal">
                <v-toolbar-title>Zebra geloten?</v-toolbar-title>
            </v-toolbar>
            <v-container>
            <v-card>
            
            </v-card>
            
            </v-container>
        </v-card>`
    }
);


const app = new Vue({
    el: '#app'

});
