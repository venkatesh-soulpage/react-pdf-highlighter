function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import { asElement, isHTMLElement } from "../lib/pdfjs-dom";
var styles = {
  "root": "MouseSelection-module__root___1SAc0"
};

class MouseSelection extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      locked: false,
      start: null,
      end: null
    });

    _defineProperty(this, "root", void 0);

    _defineProperty(this, "reset", () => {
      const {
        onDragEnd
      } = this.props;
      onDragEnd();
      this.setState({
        start: null,
        end: null,
        locked: false
      });
    });
  }

  getBoundingRect(start, end) {
    return {
      left: Math.min(end.x, start.x),
      top: Math.min(end.y, start.y),
      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y)
    };
  }

  componentDidUpdate() {
    const {
      onChange
    } = this.props;
    const {
      start,
      end
    } = this.state;
    const isVisible = Boolean(start && end);
    onChange(isVisible);
  }

  componentDidMount() {
    if (!this.root) {
      return;
    }

    const that = this;
    const {
      onSelection,
      onDragStart,
      onDragEnd,
      shouldStart
    } = this.props;
    const container = asElement(this.root.parentElement);

    if (!isHTMLElement(container)) {
      return;
    }

    let containerBoundingRect = null;

    const containerCoords = (pageX, pageY) => {
      if (!containerBoundingRect) {
        containerBoundingRect = container.getBoundingClientRect();
      }

      return {
        x: pageX - containerBoundingRect.left + container.scrollLeft,
        y: pageY - containerBoundingRect.top + container.scrollTop
      };
    };

    container.addEventListener("mousemove", event => {
      const {
        start,
        locked
      } = this.state;

      if (!start || locked) {
        return;
      }

      that.setState({ ...this.state,
        end: containerCoords(event.pageX, event.pageY)
      });
    });
    container.addEventListener("mousedown", event => {
      if (!shouldStart(event)) {
        this.reset();
        return;
      }

      const startTarget = asElement(event.target);

      if (!isHTMLElement(startTarget)) {
        return;
      }

      onDragStart();
      this.setState({
        start: containerCoords(event.pageX, event.pageY),
        end: null,
        locked: false
      });

      const onMouseUp = event => {
        // emulate listen once
        event.currentTarget.removeEventListener("mouseup", onMouseUp);
        const {
          start
        } = this.state;

        if (!start) {
          return;
        }

        const end = containerCoords(event.pageX, event.pageY);
        const boundingRect = that.getBoundingRect(start, end);

        if (!isHTMLElement(event.target) || !container.contains(asElement(event.target)) || !that.shouldRender(boundingRect)) {
          that.reset();
          return;
        }

        that.setState({
          end,
          locked: true
        }, () => {
          const {
            start,
            end
          } = that.state;

          if (!start || !end) {
            return;
          }

          if (isHTMLElement(event.target)) {
            onSelection(startTarget, boundingRect, that.reset);
            onDragEnd();
          }
        });
      };

      const {
        ownerDocument: doc
      } = container;

      if (doc.body) {
        doc.body.addEventListener("mouseup", onMouseUp);
      }
    });
  }

  shouldRender(boundingRect) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
  }

  render() {
    const {
      start,
      end
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      ref: node => this.root = node
    }, start && end ? /*#__PURE__*/React.createElement("div", {
      className: styles.root,
      style: this.getBoundingRect(start, end)
    }) : null);
  }

}

export default MouseSelection;