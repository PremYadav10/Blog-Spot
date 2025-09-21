import React from 'react'
import LogoImg from '../assets/TheBlogSpot.png'

function Logo({ width = "100px" }) {
  return (
      <img  width={width} src={LogoImg} alt="img" style={{ margin: "0px", padding: "0px" }}/>
  )
}

export default Logo