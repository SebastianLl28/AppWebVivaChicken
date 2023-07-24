import { Typography } from "@mui/material";

export const Title = ({ children, position }) => (
  <Typography
    variant="h4"
    textAlign={position ?? "start"}
    sx={{ fontWeight: 500, lineHeight: 1.7 }}
  >
    {children}
  </Typography>
);
