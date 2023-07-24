import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Order = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={12} sm={5} md={2.5}>
        <FormControl fullWidth>
          <InputLabel sx={{ width: "100%" }} id="demo-simple-select-label">
            Ordenar por
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Ordenar por"
            sx={{ width: "100%" }}
          >
            <MenuItem value={10}>Ascendente alfabéticamente</MenuItem>
            <MenuItem value={20}>Descendente alfabéticamente</MenuItem>
            <MenuItem value={30}>De menor a mayor precio</MenuItem>
            <MenuItem value={30}>De mayor a menor precio</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={5} md={2.5}>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
          <Input
            id="standard-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Order;
