'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var ReactDOM = require('react-dom');
var fecha = require('fecha');
var omit = require('object.omit');
var Events = require('../utils/Events');
var isNodeInTree = require('../utils/isNodeInTree');
var Input = require('../Input');
var DateTimePicker = require('./DateTimePicker');

class DateTimeInput extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    dateTime: PropTypes.string,
    date: PropTypes.string,
    onSelect: PropTypes.func,
    showTimePicker: PropTypes.bool,
    showDatePicker: PropTypes.bool,
    amStyle: PropTypes.oneOf(['success', 'danger', 'warning']),
    viewMode: PropTypes.string,
    minViewMode: PropTypes.string,
    daysOfWeekDisabled: PropTypes.array,
    locale: PropTypes.string,
    weekStart: PropTypes.number,
    minDate: PropTypes.string,
    maxDate: PropTypes.string
  };

  static defaultProps = {
    dateTime: '',
    format: 'YYYY-MM-DD HH:mm'
  };

  state = {
    value: this.props.dateTime || fecha.format(new Date(), this.props.format),
    showPicker: false
  };

  handleOuterClick = (event) => {
    var picker = ReactDOM.findDOMNode(this.refs.DateTimePicker);

    if (!isNodeInTree(event.target, picker)) {
      this.handleClose();
    }
  };

  bindOuterHandlers = () => {
    Events.on(document, 'click', this.handleOuterClick);
  };

  unbindOuterHandlers = () => {
    Events.off(document, 'click', this.handleOuterClick);
  };

  handleClose = () => {
    this.unbindOuterHandlers();
    return this.setState({
      showPicker: false
    });
  };

  handleClick = () => {
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
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  handleSelect = (date) => {
    this.setState({
      value: date
    });

    this.props.onSelect && this.props.onSelect.call(this, date);
  };

  renderPicker = () => {
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
  };

  render() {
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
}

module.exports = DateTimeInput;

// TODO: 动画
