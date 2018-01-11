/*!
 * vue-datetime v1.0.0-alpha.3
 * (c) 2017 Mario Juárez
 * Released under the MIT License.
 */

import { DateTime, Info } from 'luxon';

var FlowManager = function FlowManager (flow, endStatus) {
  if ( flow === void 0 ) flow = [];
  if ( endStatus === void 0 ) endStatus = null;

  this.flow = flow;
  this.endStatus = endStatus;
  this.diversionNext = null;
};

FlowManager.prototype.step = function step (index) {
  return this.flow.length > index ? this.flow[index] : this.endStatus
};

FlowManager.prototype.first = function first () {
  return this.step(0)
};

FlowManager.prototype.next = function next (current) {
  if (this.diversionNext) {
    var next = this.diversionNext;
    this.diversionNext = null;

    return next
  }

  return this.step(this.flow.indexOf(current) + 1)
};

FlowManager.prototype.diversion = function diversion (next) {
  this.diversionNext = next;
};

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function monthDays (year, month) {
  var monthDate = DateTime.local(year, month, 1);
  var firstDay = monthDate.weekday - 1;

  return new Array(monthDate.daysInMonth + firstDay)
    .fill(null)
    .map(function (value, index) {
      return index + 1 <= firstDay ? null : index + 1 - firstDay
    })
}

function weekdays () {
  return Info.weekdays('short').map(function (weekday) { return capitalize(weekday); })
}

function months () {
  return Info.months().map(function (month) { return capitalize(month); })
}

function hours (step) {
  return new Array(Math.ceil(24 / step)).fill(null).map(function (item, index) { return index * step; })
}

function minutes (step) {
  return new Array(Math.ceil(60 / step)).fill(null).map(function (item, index) { return index * step; })
}

function years (current) {
  return new Array(201).fill(null).map(function (item, index) { return current - 100 + index; })
}

function pad (number) {
  return number < 10 ? '0' + number : number
}

function createFlowManagerFromType (type) {
  var flow = [];

  switch (type) {
    case 'datetime':
      flow = ['date', 'time'];
      break
    default:
      flow = ['date'];
  }

  return new FlowManager(flow, 'end')
}

var DatetimeCalendar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdatetime-calendar"},[_c('div',{staticClass:"vdatetime-calendar__navigation"},[_c('div',{staticClass:"vdatetime-calendar__navigation--previous",on:{"click":_vm.previousMonth}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 61.3 102.8"}},[_c('path',{attrs:{"fill":"none","stroke":"#444","stroke-width":"14","stroke-miterlimit":"10","d":"M56.3 97.8L9.9 51.4 56.3 5"}})])]),_vm._v(" "),_c('div',{staticClass:"vdatetime-calendar__current--month"},[_vm._v(_vm._s(_vm.monthName)+" "+_vm._s(_vm.newYear))]),_vm._v(" "),_c('div',{staticClass:"vdatetime-calendar__navigation--next",on:{"click":_vm.nextMonth}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 61.3 102.8"}},[_c('path',{attrs:{"fill":"none","stroke":"#444","stroke-width":"14","stroke-miterlimit":"10","d":"M56.3 97.8L9.9 51.4 56.3 5"}})])])]),_vm._v(" "),_c('div',{staticClass:"vdatetime-calendar__month"},[_vm._l((_vm.weekdays),function(weekday){return _c('div',{staticClass:"vdatetime-calendar__month__weekday"},[_vm._v(_vm._s(weekday))])}),_vm._v(" "),_vm._l((_vm.days),function(day){return _c('div',{staticClass:"vdatetime-calendar__month__day",class:{'vdatetime-calendar__month__day--selected': day.selected, 'vdatetime-calendar__month__day--disabled': day.disabled},on:{"click":function($event){_vm.selectDay(day);}}},[_c('span',[_c('span',[_vm._v(_vm._s(day.number))])])])})],2)])},staticRenderFns: [],
  props: {
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    day: {
      type: Number,
      default: null
    },
    disabled: {
      type: Array
    }
  },

  data: function data () {
    return {
      weekdays: weekdays(),
      newYear: this.year,
      newMonth: this.month
    }
  },

  computed: {
    monthName: function monthName () {
      return months()[this.newMonth - 1]
    },
    days: function days () {
      var this$1 = this;

      return monthDays(this.newYear, this.newMonth).map(function (day) { return ({
        number: day,
        selected: day && this$1.year === this$1.newYear && this$1.month === this$1.newMonth && this$1.day === day,
        disabled: !day
      }); })
    }
  },

  methods: {
    selectDay: function selectDay (day) {
      this.$emit('change', this.newYear, this.newMonth, day.number);
    },
    previousMonth: function previousMonth () {
      var month = this.newMonth - 1;

      if (month < 1) {
        month = 12;
        this.newYear--;
      }

      this.newMonth = month;
    },
    nextMonth: function nextMonth () {
      var month = this.newMonth + 1;

      if (month > 12) {
        month = 1;
        this.newYear++;
      }

      this.newMonth = month;
    }
  }
};

var DatetimeTimePicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdatetime-time-picker"},[_c('div',{ref:"hourList",staticClass:"vdatetime-time-picker__list vdatetime-time-picker__list--hours"},_vm._l((_vm.hours),function(hour){return _c('div',{staticClass:"vdatetime-time-picker__item",class:{'vdatetime-time-picker__item--selected': hour.selected},on:{"click":function($event){_vm.selectHour(hour.number);}}},[_vm._v(_vm._s(hour.number))])})),_vm._v(" "),_c('div',{ref:"minuteList",staticClass:"vdatetime-time-picker__list vdatetime-time-picker__list--minutes"},_vm._l((_vm.minutes),function(minute){return _c('div',{staticClass:"vdatetime-time-picker__item",class:{'vdatetime-time-picker__item--selected': minute.selected},on:{"click":function($event){_vm.selectMinute(minute.number);}}},[_vm._v(_vm._s(minute.number))])}))])},staticRenderFns: [],
  props: {
    hour: {
      type: Number,
      required: true
    },
    minute: {
      type: Number,
      required: true
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    }
  },

  computed: {
    hours: function hours$1 () {
      var this$1 = this;

      return hours(this.hourStep).map(function (hour) { return ({
        number: pad(hour),
        selected: hour === this$1.hour
      }); })
    },
    minutes: function minutes$1 () {
      var this$1 = this;

      return minutes(this.minuteStep).map(function (minute) { return ({
        number: pad(minute),
        selected: minute === this$1.minute
      }); })
    }
  },

  methods: {
    selectHour: function selectHour (hour) {
      this.$emit('change', parseInt(hour), this.minute);
    },
    selectMinute: function selectMinute (minute) {
      this.$emit('change', this.hour, parseInt(minute));
    }
  },

  mounted: function mounted () {
    var selectedHour = this.$refs.hourList.querySelector('.vdatetime-time-picker__item--selected');
    var selectedMinute = this.$refs.minuteList.querySelector('.vdatetime-time-picker__item--selected');
    this.$refs.hourList.scrollTop = selectedHour ? selectedHour.offsetTop - 250 : 0;
    this.$refs.minuteList.scrollTop = selectedMinute ? selectedMinute.offsetTop - 250 : 0;
  }
};

var DatetimeYearPicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdatetime-year-picker"},[_c('div',{ref:"yearList",staticClass:"vdatetime-year-picker__list vdatetime-year-picker__list"},_vm._l((util.years),function(year){return _c('div',{staticClass:"vdatetime-year-picker__item",class:{'vdatetime-year-picker__item--selected': year.selected},on:{"click":function($event){_vm.select(year.number);}}},[_vm._v(_vm._s(year.number))])}))])},staticRenderFns: [],
  props: {
    year: {
      type: Number,
      required: true
    }
  },

  computed: {
    years: function years$1 () {
      var this$1 = this;

      return years(this.year).map(function (year) { return ({
        number: year,
        selected: year === this$1.year
      }); })
    }
  },

  methods: {
    select: function select (year) {
      this.$emit('change', parseInt(year));
    },

    scrollToCurrent: function scrollToCurrent () {
      var selectedYear = this.$refs.yearList.querySelector('.vdatetime-year-picker__item--selected');
      this.$refs.yearList.scrollTop = selectedYear ? selectedYear.offsetTop - 250 : 0;
    }
  },

  mounted: function mounted () {
    this.scrollToCurrent();
  },

  updated: function updated () {
    this.scrollToCurrent();
  }
};

var DatetimePopup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdatetime-popup"},[_c('div',{staticClass:"vdatetime-popup__header"},[_c('div',{staticClass:"vdatetime-popup__year",on:{"click":_vm.showYear}},[_vm._v(_vm._s(_vm.year))]),_vm._v(" "),_c('div',{staticClass:"vdatetime-popup__date"},[_vm._v(_vm._s(_vm.dateFormatted))])]),_vm._v(" "),_c('div',{staticClass:"vdatetime-popup__body"},[(_vm.step === 'year')?_c('datetime-year-picker',{attrs:{"year":_vm.year},on:{"change":_vm.onChangeYear}}):_vm._e(),_vm._v(" "),(_vm.step === 'date')?_c('datetime-calendar',{attrs:{"year":_vm.year,"month":_vm.month,"day":_vm.day},on:{"change":_vm.onChangeDate}}):_vm._e(),_vm._v(" "),(_vm.step === 'time')?_c('datetime-time-picker',{attrs:{"hour":_vm.hour,"minute":_vm.minute,"hour-step":_vm.hourStep,"minute-step":_vm.minuteStep},on:{"change":_vm.onChangeTime}}):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"vdatetime-popup__actions"},[_c('div',{staticClass:"vdatetime-popup__actions__button vdatetime-popup__actions__button--cancel",on:{"click":_vm.cancel}},[_vm._v(_vm._s(_vm.phrases.cancel))]),_vm._v(" "),_c('div',{staticClass:"vdatetime-popup__actions__button vdatetime-popup__actions__button--confirm",on:{"click":_vm.confirm}},[_vm._v(_vm._s(_vm.phrases.ok))])])])},staticRenderFns: [],
  components: {
    DatetimeCalendar: DatetimeCalendar,
    DatetimeTimePicker: DatetimeTimePicker,
    DatetimeYearPicker: DatetimeYearPicker
  },

  props: {
    datetime: {
      type: DateTime,
      required: true
    },
    phrases: {
      type: Object,
      default: function default$1 () {
        return {
          cancel: 'Cancel',
          ok: 'Ok'
        }
      }
    },
    type: {
      type: String,
      default: 'date'
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    }
  },

  data: function data () {
    var flow = createFlowManagerFromType(this.type);

    return {
      newDatetime: this.datetime,
      flow: flow,
      step: flow.first()
    }
  },

  computed: {
    year: function year () {
      return this.newDatetime.year
    },
    month: function month () {
      return this.newDatetime.month
    },
    day: function day () {
      return this.newDatetime.day
    },
    hour: function hour () {
      return this.newDatetime.hour
    },
    minute: function minute () {
      return this.newDatetime.minute
    },
    dateFormatted: function dateFormatted () {
      return this.newDatetime.toLocaleString({
        month: 'long',
        day: 'numeric'
      })
    }
  },

  methods: {
    nextStep: function nextStep () {
      this.step = this.flow.next(this.step);
    },
    showYear: function showYear () {
      this.step = 'year';
      this.flow.diversion('date');
    },
    confirm: function confirm () {
      this.nextStep();

      if (this.step === 'end') {
        this.$emit('confirm', this.newDatetime);
      }
    },
    cancel: function cancel () {
      this.$emit('cancel');
    },
    onChangeYear: function onChangeYear (year) {
      this.newDatetime = this.newDatetime.set({ year: year });
    },
    onChangeDate: function onChangeDate (year, month, day) {
      this.newDatetime = this.newDatetime.set({ year: year, month: month, day: day });
    },
    onChangeTime: function onChangeTime (hour, minute) {
      this.newDatetime = this.newDatetime.set({ hour: hour, minute: minute });
    }
  }
};

var Datetime = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vdatetime"},[_c('input',_vm._g(_vm._b({staticClass:"vdatetime-input",attrs:{"type":"text"},domProps:{"value":_vm.inputValue},on:{"click":_vm.open,"focus":_vm.open}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),_c('transition-group',{attrs:{"name":"vdatetime-fade","tag":"div"}},[(_vm.isOpen)?_c('div',{key:"overlay",staticClass:"vdatetime-overlay",on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.cancel($event);}}}):_vm._e(),_vm._v(" "),(_vm.isOpen)?_c('datetime-popup',{key:"popup",attrs:{"type":_vm.type,"datetime":_vm.popupDate,"phrases":_vm.phrases,"hour-step":_vm.hourStep,"minute-step":_vm.minuteStep},on:{"confirm":_vm.confirm,"cancel":_vm.cancel}}):_vm._e()],1)],1)},staticRenderFns: [],
  components: {
    DatetimePopup: DatetimePopup
  },

  props: {
    value: {
      type: String
    },
    valueZone: {
      type: String,
      default: 'UTC'
    },
    zone: {
      type: String,
      default: 'local'
    },
    format: {
      type: Object
    },
    type: {
      type: String,
      default: 'date'
    },
    phrases: {
      type: Object,
      default: function default$1 () {
        return {
          cancel: 'Cancel',
          ok: 'Ok'
        }
      }
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    }
  },

  data: function data () {
    var date = DateTime.fromISO(this.value).toUTC();

    return {
      isOpen: false,
      date: date.isValid ? date : null
    }
  },

  created: function created () {
    this.emitInput();
  },

  computed: {
    inputValue: function inputValue () {
      var format = this.format || (this.type === 'date' ? DateTime.DATE_MED : DateTime.DATETIME_MED);

      return this.date ? this.date.setZone(this.zone).toLocaleString(format) : ''
    },
    popupDate: function popupDate () {
      return this.date ? this.date : DateTime.local()
    }
  },

  methods: {
    emitInput: function emitInput () {
      this.$emit('input', this.date ? this.date.setZone(this.valueZone).toISO() : null);
    },
    open: function open () {
      this.isOpen = true;
    },
    close: function close () {
      this.isOpen = false;
    },
    confirm: function confirm (datetime) {
      this.date = datetime;
      this.emitInput();
      this.close();
    },
    cancel: function cancel () {
      this.close();
    }
  }
};

function plugin (Vue) {
  Vue.component('datetime', Datetime);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '1.0.0-alpha.3';

export { Datetime, version };export default plugin;
