import * as React from "react";

function SvgDeals(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 4.033h15c.072 0 .133.062.133.134v11.666a.136.136 0 01-.133.134h-15a.136.136 0 01-.133-.134V4.167c0-.072.061-.134.133-.134z"
        stroke={props.color || '#C2CFE0'}
        strokeWidth={1.4}
      />
      <path
        fill="#C2CFE0"
        d="M6.5 3.333h1.167v13.333H6.5zM12.333 3.333H13.5v13.333h-1.167z"
      />
    </svg>
  );
}

export default SvgDeals;
