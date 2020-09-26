import * as React from "react";

function SvgObjectPark(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 16" fill="none" {...props}>
      <path
        d="M1.5 1.2h14.167c.071 0 .133.062.133.133v5a.136.136 0 01-.133.134H1.5a.136.136 0 01-.133-.134v-5c0-.071.061-.133.133-.133zm0 8.333h14.167c.071 0 .133.062.133.134v5a.136.136 0 01-.133.133H1.5a.136.136 0 01-.133-.133v-5c0-.072
.061-.134.133-.134z"
        stroke={props.color || '#C2CFE0'}
        strokeWidth={1.4}
      />
    </svg>
  );
}

export default SvgObjectPark;
