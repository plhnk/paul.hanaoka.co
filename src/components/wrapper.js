/** @jsx jsx */

import React from "react"
import { Box, jsx } from "theme-ui"

export default ({ children }) => (
    <Box 
        width={[1, 1, 1/2]}
    >
        {children}
    </Box>
)
