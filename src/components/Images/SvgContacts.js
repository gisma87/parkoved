import * as React from "react";

function SvgContacts(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6.811 6.111a3.188 3.188 0 013.19-3.189 3.188 3.188 0 013.188 3.19A3.188 3.188 0 0110 9.3a3.188 3.188 0 01-3.189-3.189zm-3.889 8.75c0-.39.19-.782.625-1.184.44-.406 1.084-.773 1.851-1.08 1.536-.616 3.392-.925 4.602-.925 1.21
 0 3.066.31 4.602.925.767.307 1.41.674 1.85 1.08.436.402.626.795.626 1.184v2.217H2.922V14.86z"
        stroke={props.color || '#C2CFE0'}
        strokeWidth={1.4}
      />
    </svg>
  );
}

export default SvgContacts;
