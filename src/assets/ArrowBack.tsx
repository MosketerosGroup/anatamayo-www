import React from "react";

interface ArrowBackProps {
  className?: string;
}

const ArrowBack = ({className } : ArrowBackProps) => {
  return (
    <svg className={className} fill="none" version="1.1" viewBox="0 0 19.374 19.374" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.6868" cy="9.6868" r="8.9368" fill="#fff" stroke="#000" strokeWidth="1.5"/>
      <path d="m14.55 9.6868h-9.7263m0 0 4.0526-4.0256m-4.0526 4.0256 4.0526 4.0256" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
    </svg>
  )
}

export default ArrowBack;
