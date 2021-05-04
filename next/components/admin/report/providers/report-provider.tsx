import { createContext, useContext, useEffect, useState } from "react";
import { ReportService, SyncCollection } from "../../../../lib/repo/report.repo";
export const ReportContext = createContext<{
  [x: string]: any;
  syncReport?: SyncCollection[];
  loadSyncReport?: () => Promise<any>;
}>({});

export function ReportProvider(props) {
  const [syncReport, setSyncReport] = useState<SyncCollection[]>(null);
  const loadSyncReport = () => ReportService.getSyncReport().then(setSyncReport);
  useEffect(() => {
    loadSyncReport();
  }, []);
  return (
    <ReportContext.Provider value={{ syncReport, loadSyncReport }}>
      {props.children}
    </ReportContext.Provider>
  );
}

export const useReportContext = () => useContext(ReportContext);
