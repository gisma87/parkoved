import * as React from "react";

function SvgStatistics(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.375 5v0c0-.535.433-.967.958-.967h13.334c.53 0 .966.437.966.967v10c0 .53-.436.967-.966.967H3.333A.972.972 0 012.367 15s0 0 0 0l.008-10z"
        stroke={props.color || '#C2CFE0'}
        strokeWidth={1.4}
      />
      <path d="M2.5 5l7.5 5 7.5-5" stroke="#C2CFE0" strokeWidth={1.4} />
    </svg>
  );
}

export default SvgStatistics;
