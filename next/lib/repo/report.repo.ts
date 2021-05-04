import { GraphRepository } from "./graph.repo";

export type SyncCollection = {
  name: string;
  syncAt: Date;
};

export class ReportRepository extends GraphRepository {
  async getSyncReport() {
    return this.query({
      query: `getSyncReport { name syncAt }`,
    }).then((res) => res.data.g0 as SyncCollection[]);
  }
}

export const ReportService = new ReportRepository();
