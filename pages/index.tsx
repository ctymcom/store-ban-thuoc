import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { DashboardLayout } from '../next/components/layout/dashboard-layout';
import { SectionHeader } from '../next/components/shared/card/section-header';
import { Table, TableDataItem, TableDataItemType } from '../next/components/shared/table/table';
import { Pagination } from '../next/lib/graphql/pagination';
import { FormRepository } from '../next/lib/repo/form.repo';
import { AuthMiddleware } from '../next/providers/auth-provider';

export default function IndexPage() {
    const { query } = useRouter();
    const { page = 1, limit = 20 } = query;
    const [items, setItems] = useState<any[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ limit: parseInt(limit.toString()), page: parseInt(page.toString()), offset: 0, total: 0 });
    const formRepo = new FormRepository();
    function loadForms(pagination: Pagination) {
        return formRepo.getAll({ query: { limit: pagination.limit, page: pagination.page }}).then(res => {
            console.log('load done');
            setPagination(res.pagination);
            setItems(res.data.map(d => ({  
                cells: [
                    { type: TableDataItemType.text, value: d.name },
                    { type: TableDataItemType.text, value: d.code },
                    { type: TableDataItemType.text, value: 100 },
                    { type: TableDataItemType.link, value: d.redirectLink },
                    { type: TableDataItemType.link, value: d.submitLink }
                ] as TableDataItem[],
                item: d,
                key: d._id,
            })));
        });
    }
    useEffect(() => {
        loadForms(pagination);
    }, []);
    const headers = ["Tên Form", "Mã", "Số lương", "Link", "QRLink"];
    return <DashboardLayout>
        <SectionHeader text="Danh sách Form QR" />
        <Table headers={headers} data={items} pagination={pagination} onPageChanged={(page) => loadForms({ ...pagination, page }) }></Table>
    </DashboardLayout>
}

export const getServerSideProps = AuthMiddleware();