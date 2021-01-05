import React, { Component } from "react";
var styles = {
  "root": "Highlight-module__root___1gzqY",
  "emoji": "Highlight-module__emoji___3JzKQ",
  "parts": "Highlight-module__parts___1vpYj",
  "part": "Highlight-module__part___1EGhE",
  "popup": "Highlight-module__popup___3StVT",
  "scrolledTo": "Highlight-module__scrolledTo___2FX5P"
};

class Highlight extends Component {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo
    } = this.props;
    const {
      rects,
      boundingRect
    } = position;
    return /*#__PURE__*/React.createElement("div", {
      className: `Highlight ${styles.root} ${isScrolledTo ? styles.scrolledTo : ""}`
    }, comment ? /*#__PURE__*/React.createElement("div", {
      className: `Highlight__emoji ${styles.emoji}`,
      style: {
        left: 20,
        top: boundingRect.top
      }
    }, comment.emoji) : null, /*#__PURE__*/React.createElement("div", {
      className: styles.parts
    }, rects.map((rect, index) => /*#__PURE__*/React.createElement("div", {
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onClick: onClick,
      key: index,
      style: rect,
      className: `Highlight__part ${styles.part}`
    }))));
  }

}

export default Highlight;