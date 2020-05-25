/** @jsx jsx */

import React from "react"
import Wrapper from './Wrapper'
import ThemeToggle from "./ThemeToggle"
import { jsx, Link } from "theme-ui"

export default () => (
  <Wrapper>
    <nav
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link>[logo]</Link>
      <div sx={{ mx: 'auto' }} />
      <Link>[feed]</Link>
      <Link>[about]</Link>
      <Link>[design]</Link>
      <div sx={{ mx: 'auto' }} />
      <ThemeToggle />
    </nav>
  </Wrapper>
);