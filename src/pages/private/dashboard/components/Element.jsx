import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"

export const Element = ({ xs, title, cantidad }) => {
  return (
    <Grid item xs={xs}>
        <Card paddingX={3} paddingY={2} sx={{ bgcolor: "#f3f2f2" }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary" >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" letterSpacing="0">
                            {cantidad}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary" >
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
  )
}
