'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var fecha = require('fecha');
var omit = require('object.omit');
var Events = require('../utils/Events');
var isNodeInTree = require('../utils/isNodeInTree');
var Input = require('../Input');
var DateTimePicker = require('./DateTimePicker');

var DateTimeInput = React.createClass({
  propTypes: {
    format: React.PropTypes.string,
    dateTime: React.PropTypes.string,
    date: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    showTimePicker: React.PropTypes.bool,
    showDatePicker: React.PropTypes.bool,
    amStyle: React.PropTypes.oneOf(['success', 'danger', 'warning']),
    viewMode: React.PropTypes.string,
    minViewMode: React.PropTypes.string,
    daysOfWeekDisabled: React.PropTypes.array,
    locale: React.PropTypes.string,
    weekStart: React.PropTypes.number,
    minDate: React.PropTypes.string,
    maxDate: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      dateTime: '',
      format: 'YYYY-MM-DD HH:mm'
    };
  },

  getInitialState: function() {
    return {
      value: this.props.dateTime || fecha.format(new Date(), this.props.format),
      showPicker: false
    };
  },
  componentWillReceiveProps:function(nextProps) {
    if (this.props.dateTime !== nextProps.dateTime) {
      this.setState({
        value: nextProps.dateTime || fecha.format(new Date(), this.props.format),
      });
    }
  },

  handleOuterClick: function(event) {
    var picker = ReactDOM.findDOMNode(this.refs.DateTimePicker);

    if (!isNodeInTree(event.target, picker)) {
      this.handleClose();
    }
  },

  bindOuterHandlers: function() {
    Events.on(document, 'click', this.handleOuterClick);
  },

  unbindOuterHandlers: function() {
    Events.off(document, 'click', this.handleOuterClick);
  },

  handleClose: function() {
    this.unbindOuterHandlers();
    return this.setState({
      showPicker: false
    });
  },

  handleClick: function() {
    this.bindOuterHandlers();

    var positionNode = ReactDOM.findDOMNode(this.refs.dateInput);
    // fixes #57
    // @see http://stackoverflow.com/questions/1044988/getting-offsettop-of-element-in-a-table
    var rect = positionNode.getBoundingClientRect();
    var offset = {
      top: rect.top + positionNode.offsetHeight,
      left: rect.left
    };

    var styles = {
      display: 'block',
      top: offset.top,
      left: offset.left,
      position: 'fixed',
      zIndex: 1120
    };

    this.setState({
      showPicker: true,
      pickerStyle: styles
    });
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  handleSelect: function(date) {
    this.setState({
      value: date
    });

    this.props.onSelect && this.props.onSelect.call(this, date);
  },

  renderPicker: function() {
    if (this.state.showPicker) {
      return (
        <DateTimePicker
          style={this.state.pickerStyle}
          ref="DateTimePicker"
          showDatePicker={this.props.showDatePicker}
          showTimePicker={this.props.showTimePicker}
          onSelect={this.handleSelect}
          onClose={this.handleClose}
          amStyle={this.props.amStyle}
          dateTime={this.state.value}
          viewMode={this.props.viewMode}
          minViewMode={this.props.minViewMode}
          daysOfWeekDisabled={this.props.daysOfWeekDisabled}
          weekStart={this.props.weekStart}
          format={this.props.format}
          locale={this.props.locale}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
        />
      );
    }
  },

  render: function() {
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <div>
        <Input
          {...restProps}
          type="text"
          value={this.state.value}
          onClick={this.handleClick}
          onChange={this.handleChange}
          onSelect={null}
          ref="dateInput"
        />
        {this.renderPicker()}
      </div>
    );
  }
});

module.exports = DateTimeInput;

// TODO: 动画
