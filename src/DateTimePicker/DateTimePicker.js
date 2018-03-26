'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var fecha = require('fecha');
var omit = require('object.omit');
var ClassNameMixin = require('../mixins/ClassNameMixin');
var Icon = require('../Icon');
var DatePicker = require('./DatePicker');
var TimePicker = require('./TimePicker');

var DateTimePicker = createReactClass({
  displayName: 'DateTimePicker',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    showTimePicker: PropTypes.bool,
    showDatePicker: PropTypes.bool,
    caretDisplayed: PropTypes.bool,
    amStyle: PropTypes.oneOf(['success', 'danger', 'warning']),
    viewMode: PropTypes.string,
    minViewMode: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    daysOfWeekDisabled: PropTypes.array,
    format: PropTypes.string,
    dateTime: PropTypes.string,
    locale: PropTypes.string,
    weekStart: PropTypes.number,
    minDate: PropTypes.string,
    maxDate: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'datepicker',
      dateTime: '',
      format: 'YYYY-MM-DD HH:mm',
      showTimePicker: true,
      showDatePicker: true,
      caretDisplayed: true
    };
  },

  getInitialState: function() {
    var showToggle;
    var showTimePicker;

    if (this.props.showTimePicker && this.props.showDatePicker) {
      showToggle = true;
      showTimePicker = false;
    }

    if (!showToggle && !this.props.showDatePicker) {
      showTimePicker = true;
    }

    // `fecha.parse` return `false` when passed invalid parameter
    // fixes: https://github.com/amazeui/amazeui-react/issues/119
    var date = fecha.parse(this.props.dateTime, this.props.format);
    !date && (date = new Date());

    return {
      showTimePicker: showTimePicker,
      showDatePicker: this.props.showDatePicker,
      caretDisplayed: this.props.caretDisplayed,
      showToggle: showToggle,
      date: date,
      toggleDisplay: {
        toggleTime: {
          display: 'block'
        },
        toggleDate: {
          display: 'none'
        }
      }
    };
  },

  handleToggleTime: function() {
    this.setState({
      showDatePicker: false,
      showTimePicker: true,
      toggleDisplay: {
        toggleTime: {
          display: 'none'
        },
        toggleDate: {
          display: 'block'
        }
      }
    });
  },

  handleToggleDate: function() {
    this.setState({
      showDatePicker: true,
      showTimePicker: false,
      toggleDisplay: {
        toggleTime: {
          display: 'block'
        },
        toggleDate: {
          display: 'none'
        }
      }
    });
  },

  handleSelect: function(date) {
    this.setState({
      date: date
    });
    this.props.onSelect(fecha.format(date, this.props.format));
  },

  renderToggleTime: function() {
    if (this.state.showToggle) {
      return (
        <div
          style={this.state.toggleDisplay.toggleTime}
          className={this.prefixClass('toggle')}
          onClick={this.handleToggleTime}
        >
          <Icon icon="clock-o" />
        </div>
      );
    }
  },

  renderToggleDate: function() {
    if (this.state.showToggle) {
      return (
        <div
          style={this.state.toggleDisplay.toggleDate}
          className={this.prefixClass('toggle')}
          onClick={this.handleToggleDate}
        >
          <Icon icon="calendar" />
        </div>
      );
    }
  },

  renderDatePicker: function() {
    if (this.state.showDatePicker) {
      return (
        <DatePicker
          onSelect={this.handleSelect}
          onClose={this.props.onClose}
          weekStart={this.props.weekStart}
          viewMode={this.props.viewMode}
          minViewMode={this.props.minViewMode}
          daysOfWeekDisabled={this.props.daysOfWeekDisabled}
          format={this.props.format}
          date={this.state.date}
          locale={this.props.locale}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
        />
      );
    }
  },

  renderTimePicker: function() {
    if (this.state.showTimePicker) {
      return (
        <TimePicker
          onSelect={this.handleSelect}
          date={this.state.date}
          format={this.props.format}
        />
      );
    }
  },

  renderCaret: function() {
    if (this.state.caretDisplayed) {
      return <div className={this.prefixClass('caret')}></div>;
    }
  },

  render: function() {
    var classSet = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    this.props.amStyle &&
    (classSet[this.prefixClass(this.props.amStyle)] = true);

    return (
      <div
        {...restProps}
        className={classNames(classSet, this.props.className)}
      >
        {this.renderCaret()}
        <div className={this.prefixClass('date')}>
          {this.renderDatePicker()}
        </div>
        <div className={this.prefixClass('time')}>
          {this.renderTimePicker()}
        </div>
        {this.renderToggleTime()}
        {this.renderToggleDate()}
      </div>
    );
  },
});

module.exports = DateTimePicker;
