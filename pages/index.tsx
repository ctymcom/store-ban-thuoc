import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { DashboardLayout } from '../next/components/layout/dashboard-layout';
import { SectionHeader } from '../next/components/shared/card/section-header';
import { Table, TableDataItem, TableDataItemType } from '../next/components/shared/table/table';
import { Pagination } from '../next/lib/graphql/pagination';
import { FormRepository } from '../next/lib/repo/form.repo';
import { AuthMiddleware } from '../next/providers/auth-provider';

export default function IndexPage() {
    const { query } = useRouter();
    const { page = 1, limit = 10 } = query;
    const [items, setItems] = useState<any[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ limit: parseInt(limit.toString()), page: parseInt(page.toString()), offset: 0, total: 0 });
    const pageRef = useRef<Pagination>();
    const formRepo = new FormRepository();
    const router = useRouter();
    function loadForms(pagination: Pagination, cache: boolean = true) {
        return formRepo.getAll({ query: { limit: pagination.limit, page: pagination.page }, cache }).then(res => {
            setPagination(res.pagination);
            setItems(res.data.map(d => ({  
                cells: [
                    { type: TableDataItemType.text, value: d.name },
                    { type: TableDataItemType.text, value: d.code },
                    { type: TableDataItemType.text, value: 100 },
                    { type: TableDataItemType.link, value: d.redirectLink },
                    { type: TableDataItemType.link, value: d.submitLink },
                    { type: TableDataItemType.custom, builder: (item) => <div className="flex space-x-2">
                        <button className="text-primary-500" onClick={() => editForm(d.code)}>Cập nhật</button>
                        <button className="text-red-500" onClick={() => removeForm(d.id)}>Xoá</button>
                    </div>}
                ] as TableDataItem[],
                item: d,
                key: d._id,
            })));
        });
    }
    const removeForm = (formId: string) => {
        formRepo.delete({ id: formId }).then(res => loadForms(pageRef.current));
    }
    const editForm = (formCode: string) => {
        router.push(`form/edit/${formCode}`, undefined, { shallow: true });
    }
    useEffect(() => { loadForms(pagination); }, []);
    useEffect(() => { pageRef.current = pagination; }, [pagination]);
    const headers = ["Tên Form", "Mã", "Số lương", "Link", "QRLink"];
    return <DashboardLayout>
        <SectionHeader text="Danh sách Form QR" />
        <Table headers={headers} data={items} pagination={pagination} onPageChanged={(page) => loadForms({ ...pagination, page }) }></Table>
    </DashboardLayout>
}

export const getServerSideProps = AuthMiddleware();