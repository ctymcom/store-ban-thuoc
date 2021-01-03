import { useEffect, useRef, useState } from 'react';

import { DashboardLayout } from '../../../next/components/layout/dashboard-layout';
import { SectionHeader } from '../../../next/components/shared/card/section-header';
import { Button } from '../../../next/components/shared/form/button';
import { Table, TableDataItem, TableDataItemType } from '../../../next/components/shared/table/table';
import { Pagination } from '../../../next/lib/graphql/pagination';
import { FormDataRepository } from '../../../next/lib/repo/form-data.repo';
import { AuthMiddleware } from '../../../next/providers/auth-provider';
import { FormModel, IForm } from '../../../src/graphql/modules/form/form.model';


export const getServerSideProps = AuthMiddleware(async (context) => {
    const { code } = context.query;
    const form = await FormModel.findOne({ code: code as string });
    return {
        props: { form: JSON.parse(JSON.stringify(form)) }
    }
});
export default function FormDataPage({ form }: { form: IForm }) {
    const [items, setItems] = useState<any[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ limit: 10, page: 1, offset: 0, total: 0 });
    const headers = ["Ngày gửi", "IP", ...form.fields.map(f => f.label)];
    const pageRef = useRef<Pagination>();
    const formRepo = new FormDataRepository();
    function loadForms(pagination: Pagination, cache: boolean = true) {
        return formRepo.getAll({ query: { limit: pagination.limit, page: pagination.page, filter: { formId: form._id }}, cache }).then(res => {
            setPagination(res.pagination);
            setItems(res.data.map(d => {  
                return { cells: [
                        { type: TableDataItemType.date, value: d.createdAt },
                        { type: TableDataItemType.text, value: d.ip },
                        ...form.fields.map(f => {

                            console.log('f', f);
                            return ({ type: TableDataItemType.text, value: d.data && d.data[f.key]  })
                        })
                    ] as TableDataItem[],
                    item: d,
                    key: d._id,
                };
            }));
        });
    }
    useEffect(() => { loadForms(pagination); }, []);
    useEffect(() => { pageRef.current = pagination; }, [pagination]);
    const download = () => {
        formRepo.export(form._id);
    }
    return <DashboardLayout>
        <SectionHeader text="Dữ liệu"/>
        <div className="flex"> 
            <div><Button onClick={download} text="Tải về"/></div>
        </div>
        <Table headers={headers} data={items} pagination={pagination} onPageChanged={(page) => loadForms({ ...pagination, page }) }></Table>
    </DashboardLayout>
}