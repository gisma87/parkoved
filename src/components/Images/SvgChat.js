import * as React from "react";

function SvgChat(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <g clipPath="url(#chat_svg__clip0)">
        <path
          d="M5 14.3h-.29l-.205.205-2.138 2.138V3.333c0-.53.436-.966.966-.966h13.334c.53 0 .966.436.966.966v10c0 .53-.436.967-.966.967H5z"
          stroke={props.color || '#C2CFE0'}
          strokeWidth={1.4}
        />
      </g>
      <defs>
        <clipPath id="chat_svg__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgChat;
