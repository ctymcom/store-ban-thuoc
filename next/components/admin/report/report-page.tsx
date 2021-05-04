import { format } from "date-fns";
import { SyncCollection } from "../../../lib/repo/report.repo";
import { Spinner } from "../../shared/utilities/spinner";
import { ReportProvider, useReportContext } from "./providers/report-provider";

export default function ReportPage() {
  return (
    <ReportProvider>
      <div className="max-w-xl">
        <div className="text-lg bold">Báo cáo đồng bộ gần nhất</div>
        <ListSyncCollection />
      </div>
    </ReportProvider>
  );
}

function ListSyncCollection() {
  const { syncReport, loadSyncReport } = useReportContext();
  if (!syncReport) return <Spinner />;
  return (
    <div className="p-4 bg-white shadow-md rounded-sm flex flex-col my-4">
      {syncReport.map((i, index) => (
        <Row key={index} item={i} />
      ))}
    </div>
  );
}

function Row(props: { item: SyncCollection }) {
  return (
    <div className="flex flex-row justify-between border-b border-gray-400 py-4">
      <div>{props.item.name}</div>
      <div>
        {props.item.syncAt ? format(new Date(props.item.syncAt), "dd/MM/yyyy HH:mm:ss") : ""}
      </div>
    </div>
  );
}
