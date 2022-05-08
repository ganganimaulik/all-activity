import * as React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import useLogsData from "./useLogsData";
import { IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import RefreshDataContext from "./refreshDataContext";
import { useSnackbar } from "notistack";
import renderCellExpand from "./renderCellExpand";

interface RowsState {
  page: number;
  pageSize: number;
}

export default function LogsTable() {
  const { enqueueSnackbar } = useSnackbar();

  const [rowsState, setRowsState] = React.useState<RowsState>({
    page: 0,
    pageSize: 6,
  });
  const {
    isLoading,
    data: logsData,
    rowCount,
  } = useLogsData(rowsState.page, rowsState.pageSize);
  const { setRefresh } = React.useContext(RefreshDataContext);
  // Some api client return undefine while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(rowCount || 0);
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  return (
    <div style={{ height: 425, width: "100%" }}>
      <DataGrid
        disableColumnMenu={true}
        columns={[
          {
            field: "description",
            sortable: false,
            headerName: "Description",
            width: 500,
            renderCell: renderCellExpand,
          },
          {
            field: "startDateTime",
            headerName: "Start date",
            width: 265,
            sortable: false,
          },
          {
            field: "endDateTime",
            sortable: false,
            headerName: "End date",
            width: 265,
          },
          {
            field: "id",
            sortable: false,
            headerName: "Delete",
            width: 120,
            renderCell: (params: GridRenderCellParams<number>) => (
              <strong>
                <IconButton
                  onClick={() => {
                    fetch(`/api/logs/${params.value}`, {
                      method: "DELETE",
                    }).then(() => {
                      setRefresh(true);
                      enqueueSnackbar("LogEntry successfully created", {
                        variant: "success",
                      });
                    });
                  }}
                  color="error"
                  aria-label="delete log"
                  component="span"
                >
                  <DeleteForever />
                </IconButton>
              </strong>
            ),
          },
        ]}
        rows={logsData}
        rowCount={rowCountState}
        loading={isLoading}
        rowsPerPageOptions={[5]}
        pagination
        {...rowsState}
        paginationMode="server"
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        onPageSizeChange={(pageSize) =>
          setRowsState((prev) => ({ ...prev, pageSize }))
        }
      />
    </div>
  );
}
