import React, { useLayoutEffect, useRef, useState, useEffect } from "react"

const useDim = () => {
  const ref = useRef(null)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleWindowSizeChange = () => {
    setWidth(ref.current?.offsetWidth)
    setHeight(ref.current?.offsetHeight)
  }

  useLayoutEffect(() => {
    handleWindowSizeChange()
    window.addEventListener("resize", () => {
      handleWindowSizeChange()
    })

    return () => {
      // window.removeEventListener("load", handleWindowSizeChange)
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return { ref, width, height }
}
export default useDim
