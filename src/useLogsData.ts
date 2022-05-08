import * as React from "react";
import { GridRowModel } from "@mui/x-data-grid";
import RefreshDataContext from "./refreshDataContext";

// custom hook to fetch Logs from sqlite using api
const useLogsData = (page: number, pageSize: number) => {
  const [rowCount, setRowCount] = React.useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<GridRowModel[]>([]);
  const { refresh, setRefresh } = React.useContext(RefreshDataContext);

  const loadLogs = async (page: number, pageSize: number) => {
    let result = await fetch(`/api/logs?page=${page}&pageSize=${pageSize}`);
    let json = await result.json();
    return json;
  };

  React.useEffect(() => {
    let active = true;
    setIsLoading(true);
    setRowCount(undefined);
    loadLogs(page, pageSize).then((result) => {
      if (!active) {
        return;
      }
      setData(result.data);
      setRowCount(result.total);
      setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, [page, pageSize]);

  React.useEffect(() => {
    console.log(refresh);
    if (!refresh) return;
    setRefresh(false);

    setIsLoading(true);
    setRowCount(undefined);
    loadLogs(page, pageSize).then((result) => {
      setData(result.data);
      setRowCount(result.total);
      setIsLoading(false);
    });
  }, [refresh]);

  return { isLoading, data, rowCount };
};
export default useLogsData;
