'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var classNames = require('classnames');
var omit = require('object.omit');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var PanelGroup = createReactClass({
  displayName: 'PanelGroup',
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    amStyle: PropTypes.string,
    activeKey: PropTypes.any,
    defaultActiveKey: PropTypes.any,
    onSelect: PropTypes.func,
    accordion: PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      classPrefix: 'panel-group'
    };
  },

  getInitialState: function() {
    return {
      activeKey: this.props.defaultActiveKey
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function(e, key) {
    e.preventDefault();

    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  },

  renderPanel: function(child, index) {
    var activeKey = this.props.activeKey != null ?
      this.props.activeKey : this.state.activeKey;

    var props = {
      amStyle: child.props.amStyle || this.props.amStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.collapsible = true;
      props.expanded = (child.props.eventKey === activeKey);
      props.onSelect = this.handleSelect;
    }

    return React.cloneElement(child, props);
  },

  render: function() {
    var classes = this.getClassSet();
    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

    return (
      <div
        {...restProps}
        className={classNames(classes, this.props.className)}
      >
        {React.Children.map(this.props.children, this.renderPanel)}
      </div>
    );
  },
});

module.exports = PanelGroup;
