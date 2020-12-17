import { DashboardLayout } from "../next/components/layout/dashboard-layout";
import { Table, TableDataItem, TableDateItemType } from '../next/components/shared/table';
import { FormModel, IForm } from '../src/graphql/modules/form/form.model';
import { formService} from '../src/graphql/modules/form/form.service';
import { QueryInput } from '../next/lib/graphql/query-input';
import { Pagination } from '../next/lib/graphql/pagination';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FormRepository } from '../next/lib/repo/form.repo';


export default function Index() {
    const { query } = useRouter();
    const { page = 1, limit = 20 } = query;
    const [items, setItems] = useState<any[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ limit: parseInt(limit.toString()), page: parseInt(page.toString()), offset: 0, total: 0 });
    const formRepo = new FormRepository();
    function loadForms(pagination: Pagination) {
        return formRepo.getAll({ query: { limit: pagination.limit, page: pagination.page }}).then(res => {
            setPagination(res.pagination);
            setItems(res.data.map(d => ({  
                cells: [
                    { type: TableDateItemType.text, value: d.name, key: d._id },
                    { type: TableDateItemType.text, value: d.code, key: d._id },
                    { type: TableDateItemType.text, value: 100, key: d._id },
                    { type: TableDateItemType.text, value: d.redirectLink, key: d._id },
                ],
                item: d,
                key: d._id,
            })));
        });
    }
    useEffect(() => {
        loadForms(pagination);
    }, []);
    const headers = ["Tên Form", "Mã", "Số lương", "Link"];
    return <DashboardLayout>
        <Table headers={headers} data={items} pagination={pagination} onPageChanged={(page) => loadForms({ ...pagination, page }) }></Table>
    </DashboardLayout>
}