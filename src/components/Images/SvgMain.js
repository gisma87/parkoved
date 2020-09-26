import * as React from "react";

function SvgMain(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M1.5 8.133a.3.3 0 01-.3-.3V1.5a.3.3 0 01.3-.3h4.667a.3.3 0 01.3.3v6.333a.3.3 0 01-.3.3H1.5zm0 6.667a.3.3 0 01-.3-.3v-3a.3.3 0 01.3-.3h4.667a.3.3 0 01.3.3v3a.3.3 0 01-.3.3H1.5zm8.333 0a.3.3 0 01-.3-.3V8.167a.3.3 0 01.3-.3H14
.5a.3.3 0 01.3.3V14.5a.3.3 0 01-.3.3H9.833zm-.3-13.3a.3.3 0 01.3-.3H14.5a.3.3 0 01.3.3v3a.3.3 0 01-.3.3H9.833a.3.3 0 01-.3-.3v-3z"
        stroke={props.color || '#C2CFE0'}
        strokeWidth={1.4}
      />
    </svg>
  );
}

export default SvgMain;
