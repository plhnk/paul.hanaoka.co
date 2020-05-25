import React from "react"
import Wrapper from './Wrapper'
import ThemeToggle from "./ThemeToggle"

export default ({children}) => (
    <Wrapper>
        <ThemeToggle/>
        {children}
    </Wrapper>
)