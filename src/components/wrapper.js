/** @jsx jsx */

import { Box, jsx } from "theme-ui"

export default ({ children, ...props }) => (
    <Box
        {...props}
        sx={{
            p: 3,
        }}
    >
        {children}
    </Box>
)
