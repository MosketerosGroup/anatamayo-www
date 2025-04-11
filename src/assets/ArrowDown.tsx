interface iArrowDown {
  className: string;
}

export default function ArrowDown({ className } : iArrowDown) {

  return (
<svg className={className} version="1.1" viewBox="0 0 24.473 24.473" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(-77.115 28.597)">
    <g transform="matrix(.35278 0 0 -.35278 101.59 -16.36)">
      <path d="m0 0c0-19.157-15.53-34.686-34.686-34.686-19.157 0-34.686 15.529-34.686 34.686s15.529 34.686 34.686 34.686c19.156 0 34.686-15.529 34.686-34.686" fill="#1c1b1b"/>
    </g>
    <g transform="matrix(.35278 0 0 -.35278 82.712 -20.131)">
      <path d="m0 0h37.643l-18.821-27.378z" fill="#fff"/>
    </g>
  </g>
</svg>

  );
}