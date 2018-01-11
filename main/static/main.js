
    function weekdays(momentLocale, mondayFirst = false) {
        const weekdays = moment.localeData(momentLocale).weekdaysMin()
        if (mondayFirst) {
            return weekdays.slice(1).concat(weekdays[0])
        }
        return weekdays
    }

    function monthDays(month, year, mondayFirst = false) {
        const monthDate = moment([year, month, 1])
        let firstDay = monthDate.day() - (mondayFirst ? 1 : 0)

        if (firstDay === -1) {
            firstDay = 6
        }

        let days = (new Array(monthDate.daysInMonth() + firstDay)).fill(null)

        return days.map((value, index) => {
            return index + 1 < firstDay ? null : index + 1 - firstDay
        })
    }

    function years() {
        const currentYear = moment().year()
        let years = []

        for (let i = currentYear - 100; i < currentYear + 100; i++) {
            years.push(i)
        }

        return years
    }

    function hours() {
        let hours = []

        for (let i = 0; i < 24; i++) {
            hours.push(i < 10 ? '0' + i : i)
        }

        return hours
    }

    function minutes() {
        let minutes = []

        for (let i = 0; i < 60; i++) {
            minutes.push(i < 10 ? '0' + i : i)
        }

        return minutes
    }

Vue.component('datepicker', {
        props: {
            value: {
                type: String,
                required: true
            },
            inputFormat: {
                type: String,
                default: ''
            },
            wrapperClass: {
                type: String
            },
            inputClass: {
                type: String
            },
            placeholder: {
                type: String
            },
            momentLocale: {
                type: String,
                default: null
            },
            minDate: {
                type: String,
                default: null
            },
            maxDate: {
                type: String,
                default: null
            },
            disabledDates: {
                type: Array,
                default() {
                    return []
                }
            },
            mondayFirst: {
                type: Boolean,
                default: false,
            },
            autoContinue: {
                type: Boolean,
                default: false
            },
            autoClose: {
                type: Boolean,
                default: false
            },
            required: {
                type: Boolean,
                default: false
            },
            i18n: {
                type: Object,
                default() {
                    return {
                        ok: 'Ok',
                        cancel: 'Cancel'
                    }
                }
            }
        },
        data() {
            let date = this.getDate()
            return {
                isOpen: false,
                show: null,
                date: date,
                newDate: null,
                currentMonthDate: null,
                typeFlow: new DatetimeTypeFlow(this, date ? date.clone() : moment().locale(this.momentLocale)),
                datePickerItemHeight: null
            }
        },
        watch: {
            value(newValue) {
                this.date = this.getDate()
                this.typeFlow.setDate(this.date ? this.date.clone() : moment().locale(this.momentLocale))
                this.newDate = this.getNewDate()
                this.currentMonthDate = this.getCurrentMonthDate()
            }
        },
        created() {
            if (this.date) {
                this.$emit('input', this.typeFlow.isoDate())
            }
        },
        computed: {
            inputValue() {
                return this.typeFlow.format(this.date, this.inputFormat || this.typeFlow.inputFormat())
            },
            newDay() {
                return this.newDate.format('ddd, MMM D')
            },
            newYear() {
                return this.newDate.format('YYYY')
            },
            currentMonth() {
                return this.currentMonthDate.format('MMMM YYYY')
            },
            weekdays() {
                return weekdays(this.momentLocale, this.mondayFirst)
            },
            currentMonthDays() {
                const currentYear = this.currentMonthDate.year()
                const currentMonth = this.currentMonthDate.month()
                console.log(currentMonth, currentYear, this.currentMonthDate);
                const isCurrentMonth = currentYear === this.newDate.year() &&
                    currentMonth === this.newDate.month()
                console.log(isCurrentMonth)
                let days = monthDays(currentMonth, currentYear, this.mondayFirst)
                console.log(days)
                console.log(days.map(day => {
                    return {
                        number: day || '',
                        selected: day ? isCurrentMonth && day === this.newDate.date() : false,
                        disabled: day ? this.isDisabled(moment([currentYear, currentMonth, day])) : true
                    }
                }))
                return days.map(day => {
                    return {
                        number: day || '',
                        selected: day ? isCurrentMonth && day === this.newDate.date() : false,
                        disabled: day ? this.isDisabled(moment([currentYear, currentMonth, day])) : true
                    }
                })
            },
            years() {
                return years().map(year => {
                    return {
                        number: year,
                        selected: year === this.newDate.year()
                    }
                })
            },
            hours() {
                return hours().map(hour => {
                    return {
                        number: hour,
                        selected: parseInt(hour) === parseInt(this.newDate.hour())
                    }
                })
            },
            minutes() {
                return minutes().map(minute => {
                    return {
                        number: minute,
                        selected: parseInt(minute) === this.newDate.minute()
                    }
                })
            },
            disabledDatesRanges() {
                return this.disabledDates.map(function (item) {
                    return Array.isArray(item) ? [moment(item[0]), moment(item[1])] : [moment(item), moment(item).add(1, 'day')]
                })
            },
            datePickerHeight() {
                let height = (Math.ceil(this.currentMonthDays.length / 7) + 1) * this.datePickerItemHeight
                return height ? height + 'px' : 'auto'
            }
        },
        methods: {
            getDate() {
                return this.value.length ? moment(this.value, this.type === 'time' ? 'HH:mm' : null).locale(this.momentLocale) : null
            },
            getNewDate() {
                let newDate = this.date ? this.date.clone() : moment().locale(this.momentLocale)
                for (let i = 0; i < 1e5 && this.isDisabled(newDate); i++) {
                    newDate = newDate.clone().add(1, 'day')
                }
                return newDate
            },
            getCurrentMonthDate() {
                console.log(moment([this.newDate.year(), this.newDate.month(), 1]))
                return moment([this.newDate.year(), this.newDate.month(), 1]).locale(this.momentLocale)
            },
            open() {
                this.newDate = this.getNewDate()
                this.currentMonthDate = this.getCurrentMonthDate()
                this.isOpen = true
                this.$refs.input.blur()
                this.typeFlow.open()
                this.$nextTick(() => {
                    let height = (this.$refs.popupBody.clientHeight - 25) + 'px'
                    this.$refs.hourPicker.style.height = height
                    this.$refs.minutePicker.style.height = height
                    this.$refs.yearPicker.style.height = height
                })
            },
            close(save = true) {
                this.typeFlow.close()
                if (save === true) {
                    this.date = this.typeFlow.date.clone()
                    this.$emit('input', this.typeFlow.isoDate())
                }
                this.isOpen = false
            },
            ok() {
                if (this.show === 'year') {
                    this.showDatePicker()
                } else {
                    this.typeFlow.ok()
                }
            },
            showDatePicker() {
                this.show = 'date'
                this.$nextTick(() => {
                    this.datePickerItemHeight = this.$refs.popupBody.getElementsByClassName('vdatetime-popup__date-picker__item')[7].offsetHeight
                })
            },
            showTimePicker() {
                this.show = 'time'
                this.$nextTick(() => {
                    let selectedHour = this.$refs.hourPicker.querySelector('.vdatetime-popup__list-picker__item--selected')
                    let selectedMinute = this.$refs.minutePicker.querySelector('.vdatetime-popup__list-picker__item--selected')
                    this.$refs.hourPicker.scrollTop = selectedHour ? selectedHour.offsetTop - 250 : 0
                    this.$refs.minutePicker.scrollTop = selectedMinute ? selectedMinute.offsetTop - 250 : 0
                })
            },
            showYearPicker() {
                this.show = 'year'
                this.$nextTick(() => {
                    let selectedYear = this.$refs.yearPicker.querySelector('.vdatetime-popup__list-picker__item--selected')
                    this.$refs.yearPicker.scrollTop = selectedYear ? selectedYear.offsetTop - 250 : 0
                })
            },
            previousMonth() {
                this.currentMonthDate = this.currentMonthDate.clone().subtract(1, 'month')
            },
            nextMonth() {
                this.currentMonthDate = this.currentMonthDate.clone().add(1, 'month')
            },
            selectYear(year) {
                this.currentMonthDate = this.currentMonthDate.clone().year(year)
                this.newDate = this.newDate.clone().year(year)
                if (this.autoContinue) {
                    this.showDatePicker()
                }
            },
            selectDay(day) {
                this.typeFlow.selectDay(this.currentMonthDate.year(), this.currentMonthDate.month(), day)
                this.newDate = this.typeFlow.date.clone()
            },
            selectHour(hour) {
                this.typeFlow.selectHour(hour)
                this.newDate = this.typeFlow.date.clone()
            },
            selectMinute(minute) {
                this.typeFlow.selectMinute(minute)
                this.newDate = this.typeFlow.date.clone()
            },
            isDisabled(date) {
                return (this.minDate && date.isBefore(this.minDate, 'day')) ||
                    (this.maxDate && date.isAfter(this.maxDate, 'day')) ||
                    (this.disabledDatesRanges && this.disabledDatesRanges.find(function (dates) {
                        return date.isBetween(dates[0], dates[1], 'day', '[)')
                    }) !== undefined)
            }
        },
        template: `
    <div class="vdatetime" :class="wrapperClass">
        <input ref="input"
               v-bind="$attrs"
               v-on="$listeners"
               type="text"
               :placeholder="placeholder"
               :value="inputValue"
               :class="inputClass"
               :required="required"
               @click="open"
               @focus="open"/>
        <transition name="vdatetime-fade">
            <div v-if="isOpen">
                <div class="vdatetime-overlay" @click.self="close(false)"></div>
                <div class="vdatetime-popup">
                    <div class="vdatetime-popup__header">
                        <div class="vdatetime-popup__year" @click="showYearPicker">{{ newYear }}</div>
                        {{ newDay }}
                    </div>
                    <div class="vdatetime-popup__body" ref="popupBody">
                        <div v-show="show === 'date'">
                            <div class="vdatetime-popup__month-selector">
                                <div class="vdatetime-popup__month-selector__previous" @click="previousMonth">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
                                        <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10" d="M56.3 97.8L9.9 51.4 56.3 5"/>
                                    </svg>
                                </div>
                                <div class="vdatetime-popup__month-selector__current">{{ currentMonth }}</div>
                                <div class="vdatetime-popup__month-selector__next" @click="nextMonth">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
                                        <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10" d="M56.3 97.8L9.9 51.4 56.3 5"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="vdatetime-popup__date-picker" :style="{height: datePickerHeight}">
                                <div class="vdatetime-popup__date-picker__item vdatetime-popup__date-picker__item--header" v-for="weekday in weekdays">{{ weekday }}</div>
                                <div class="vdatetime-popup__date-picker__item" v-for="day in currentMonthDays" @click="!day.disabled && selectDay(day.number)" :class="{'vdatetime-popup__date-picker__item--selected': day.selected, 'vdatetime-popup__date-picker__item--disabled': day.disabled}">
                                    <span><span>{{ day.number }}</span></span>
                                </div>
                            </div>
                        </div>
                        <div v-show="show === 'time'" class="vdatetime-popup__list-picker-wrapper">
                            <div class="vdatetime-popup__list-picker vdatetime-popup__list-picker--half" ref="hourPicker">
                                <div class="vdatetime-popup__list-picker__item" v-for="hour in hours" @click="selectHour(hour.number)" :class="{'vdatetime-popup__list-picker__item--selected': hour.selected}">{{ hour.number }}</div>
                            </div>
                            <div class="vdatetime-popup__list-picker vdatetime-popup__list-picker--half" ref="minutePicker">
                                <div class="vdatetime-popup__list-picker__item" v-for="minute in minutes" @click="selectMinute(minute.number)" :class="{'vdatetime-popup__list-picker__item--selected': minute.selected}">{{ minute.number }}</div>
                            </div>
                        </div>
                        <div v-show="show === 'year'" class="vdatetime-popup__list-picker-wrapper">
                            <div class="vdatetime-popup__list-picker" ref="yearPicker">
                                <div class="vdatetime-popup__list-picker__item" v-for="year in years" @click="selectYear(year.number)" :class="{'vdatetime-popup__list-picker__item--selected': year.selected}">{{ year.number }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="vdatetime-popup__actions">
                        <div class="vdatetime-popup__actions__button" @click="close(false)">{{ i18n.cancel }}</div>
                        <div class="vdatetime-popup__actions__button" @click="ok">{{ i18n.ok }}</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    `
    }
);

Vue.component('id-canvas', {
        data: function () {
            return {lorem: "canvas", canvas: this.$refs.canvas}
        },
        template: `
            <div class="card">
                <nav>
                    <div class="nav-wrapper purple">
                        <div class="row">
                            <div class="col s12">
                                <label class="brand-logo">Teken hier!</label>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        `
    }
);

Vue.component('id-ideas', {
        data: function () {
            return {
                dialog: false,
                sectorList: [
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
            <div class="card">
                <nav>
                    <div class="nav-wrapper purple">
                        <div class="row">
                            <div class="col s12">
                                <label class="brand-logo">Deel jouw idee!</label>
                                <ul class="right">
                                    <a class="waves-effect waves-light btn modal-trigger teal" href="#modal1">Klik hier</a>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <ul class="collapsible" data-collapsible="accordion">
                    <li v-for="(item, i) in items" v-if="i < 7" href="" :key="i">
                        <div class="collapsible-header">{{item.title}}</div>
                        <div class="collapsible-body"><span>{{item.message}}</span></div>
                    </li>
                </ul>
                
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <form>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="user" type="text" class="validate" required>
                                    <label for="user" data-error="Vul stamnummer of gebruikersnaam in">Stamnummer/Gebruikersnaam</label>
                                </div>
                                <div class="input-field col s6">
                                    <select>
                                        <option value="" disabled selected>Kies je sector</option>
                                        <option v-for="sector in sectorList" :value="sector">{{sector}}</option>
                                    </select>
                                    <label>Sector</label>
                                </div>
                                <div class="input-field col s12">
                                    <input id="title" type="text" class="validate">
                                    <label for="title" data-error="Vul een titel in">Titel</label>
                                </div>
                                <div class="input-field col s12">
                                    <textarea id="message" class="materialize-textarea"></textarea>
                                    <label for="message">Typ hier je bericht.</label>
                                </div>
                            </div>  
                        </form>
                    </div>
                    <div class="modal-footer">
                      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Submit</a>
                    </div>
                </div>
            </div>
            `,
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
                formInput: {student_number: "", date: "2018-01-11 18:00", time: "", message: ""}
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
        <div class="card">
            <nav>
                <div class="nav-wrapper purple">
                    <div class="row">
                        <div class="col s12">
                            <label class="brand-logo">Zebra gesloten? Maak een afspraak!</label>
                            <ul class="right">
                                <a class="waves-effect waves-light btn modal-trigger teal" href="#modal2">Klik hier</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            
            <div id="modal2" class="modal">
                    <div class="modal-content">
                        <form>
                            <div class="row">

                                <datepicker v-model="formInput.date"
          input-format="DD-MM-YYYY HH:mm"></datepicker>

                            </div>  
                        </form>
                    </div>
                    <div class="modal-footer">
                      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Submit</a>
                    </div>
                </div>
            </div>
            `
    }
);


const app = new Vue({
    el: '#app',
});