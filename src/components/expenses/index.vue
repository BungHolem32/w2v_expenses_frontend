<template>
    <div class="expense-page">
        <v-toolbar flat color="white">
            <v-toolbar-title>
                <v-select v-model="currencySelector"
                          :items="currencies"
                          item-text="name"
                          item-value="conversion"
                          label="SELECT CURRENCY"
                          return-object
                          @change="updateCurrency"
                ></v-select>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.name" label="Description"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select v-model="editedItem.currency"
                                              item-text="name"
                                              :items="currencies"
                                              label="Currency"
                                    >
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.converted"
                                                  label="Converted Price to USD"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="records"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.price }}</td>
                <td class="text-xs-left">{{ props.item.currency }}</td>
                <td class="text-xs-left">{{ props.item.converted }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
        <v-footer>
            <v-spacer></v-spacer>
            <div>Total expenses : {{ getTotalExpenses()}} {{currencySelector.name || 'USD'}}</div>
        </v-footer>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "ExpenseListIndex",
        data() {
            return {
                dialog: false,
                headers: [
                    {text: 'Description', align: 'left', sortable: true, value: "name"},
                    {text: 'Price', align: 'left',  value: 'price'},
                    {text: 'Currency', align: 'left',  value: 'currency'},
                    {text: 'Converted Price', align: 'left', value: 'converted'}
                ],
                records: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    price: 0,
                    currency: 'USD',
                    converted: 0,
                },
                defaultItem: {
                    name: '',
                    price: 0,
                    currency: 'USD',
                    converted: 0,
                },
                currencySelector:'',
                cronJob:''
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            ...mapGetters([
                'currencies',
                'currentModel'
            ]),
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },

        created() {
            this.initialize();
            this.cronJob = this.scheduleTask(4000,this.updateRecords);
        },

        methods: {
            ...mapActions([
                'getCurrencies',
                'getConversionRateByName'
            ]),
            async initialize() {
                let records = [
                    {
                        name: 'SpeedSteak Gel',
                        price: 7,
                        currency: 'ILS',
                        converted: 0
                    },
                    {
                        name: 'Iphone X',
                        price: 3000,
                        currency: 'ILS',
                        converted: 0
                    },
                    {
                        name: 'Dell Xps 9560',
                        price: 1040,
                        currency: 'GBP',
                        converted: 0
                    },
                    {
                        name: 'Jbl 483 Earphones',
                        price: 40,
                        currency: 'EUR',
                        converted: 0
                    },
                    {
                        name: 'Samsung Tv',
                        price: 2034,
                        currency: 'CAD',
                        converted: 0
                    },
                ];
                await records.forEach(async (record) => {
                    let rate = await this.getConversionRateByName(record.currency);
                    record['converted'] = Math.round((record.price * rate.conversion) * 100) / 100;

                    return record;
                });

                this.records = records;

            },
            editItem(item) {
                this.editedIndex = this.records.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.records.indexOf(item);
                confirm('Are you sure you want to delete this item?') && this.records.splice(index, 1)
            },

            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.records[this.editedIndex], this.editedItem)
                } else {
                    this.records.push(this.editedItem)
                }
                this.close()
            },
            getTotalExpenses() {
                let total = 0;
                this.records.forEach((record) => {
                    total += record.converted;
                });

                return Math.round(total * 100) / 100;
            },
            updateCurrency(currency) {
                this.records.forEach(async (record) => {
                    let expenseCurrency = await this.getConversionRateByName(record.currency);
                    let currency = currency || {conversion: 1};
                    record['converted'] = Number(Math.round(((record.price / expenseCurrency.conversion) * currency.conversion) + 'e2') + 'e-2');
                })
            },
            updateRecords(){
                this.getCurrencies();
                this.updateCurrency(this.currencySelector);
            },
            scheduleTask(time,callback,props = false){
                return setInterval(()=>{
                    callback(props);
                },time);
            }
        }
    }
</script>

<style scoped>

</style>