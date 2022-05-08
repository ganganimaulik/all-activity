import * as React from "react";
// context to be used for refreshing table data when the user deletes/adds log.
const RefreshDataContext = React.createContext({
  refresh: false,
  setRefresh: (refresh: boolean) => {
    refresh;
  },
});

export default RefreshDataContext;
