import React from "react";

import {
  DataGrid as MuiDataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

const DataGrid = ({ data, columns, isLoading, isError }) => {
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          flexDirection={{ xs: "column", md: "row" }}
          padding="0.5rem"
          flexWrap="wrap"
          sx={{}}
        >
          <GridToolbar />
          <QuickSearchToolbar />
        </Box>
      </GridToolbarContainer>
    );
  }

  return (
    <Box width="100%">
      <MuiDataGrid
        rows={!isLoading && !isError ? data : []}
        columns={columns}
        loading={isLoading}
        slots={{ toolbar: CustomToolbar }}
        rowSelection={false}
        autoPageSize
        sx={{ height: "50rem", width: "100%" }}
      />
    </Box>
  );
};

export default DataGrid;
