/** @jsx jsx */

import { Box, jsx } from "theme-ui"

export default ({ children, ...props }) => (
    <Box
        {...props}
        sx={{
            p: 3,
            maxWidth: '100vw',
        }}
    >
        {children}
    </Box>
)
