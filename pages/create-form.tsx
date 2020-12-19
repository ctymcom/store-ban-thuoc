import { DashboardLayout } from "../next/components/layout/dashboard-layout";
import { Input } from '../next/components/shared/form/input';
import { SectionHeader } from "../next/components/shared/card/section-header";
import { FormField, FormFieldType } from "../src/graphql/modules/form/types/formField.type";
import { FormFieldBlock } from "../next/components/create-form/form-field-block";
import { Card } from "../next/components/shared/card/card";
import { useState } from 'react';

export default function CreateFormPage() {
    const [form, setForm] = useState({
        name: "Biểu mẫu",
        title: "",
        redirectLink: "",
        fields: [{
            type: FormFieldType.email,
            label: "Email",
            placeholder: "Nhập Email"
        }] as FormField[]
    });
    
    return <DashboardLayout>
        <div className="grid grid-cols-3 gap-4">
            <div className="col">
                <SectionHeader text="Tạo Form" />
                <Card>
                    <form>
                        <Input
                            name="name"
                            label="Tên biểu mẫu"
                            required={true}
                            value={form.name}
                        />
                        <Input
                            name="title"
                            label="Tiêu đề hiển thị"
                            required={true}
                            value={form.title}
                        />
                        <Input
                            name="redirectLink"
                            label="Link điều hướng"
                            required={true}
                            value={form.redirectLink}
                        />
                    </form>
                </Card>
            </div>
            <div className="col-span-2">
                <SectionHeader text="Trường dữ liệu" />
                {form.fields.map((i, index) => <FormFieldBlock key={"form-field-"+index} field={i}/>)}
                
                <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    Thêm trường
                    <span className="ml-2" aria-hidden="true">+</span>
                </button>
            </div>
        </div>
    </DashboardLayout>
}