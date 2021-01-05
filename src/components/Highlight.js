// @flow

import React, { Component } from "react";

import styles from "../style/Highlight.module.css";

import type { T_LTWH } from "../types.js";

type Props = {
  position: {
    boundingRect: T_LTWH,
    rects: Array<T_LTWH>
  },
  onClick?: () => void,
  onMouseOver?: () => void,
  onMouseOut?: () => void,
  comment: {
    emoji: string,
    text: string
  },
  isScrolledTo: boolean
};

class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo
    } = this.props;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`Highlight ${styles.root} ${isScrolledTo ? styles.scrolledTo : ""}`}
      >
        {comment ? (
          <div
            className={`Highlight__emoji ${styles.emoji}`}
            style={{
              left: 20,
              top: boundingRect.top
            }}
          >
            {comment.emoji}
          </div>
        ) : null}
        <div className={styles.parts}>
          {rects.map((rect, index) => (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              style={rect}
              className={`Highlight__part ${styles.part}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
