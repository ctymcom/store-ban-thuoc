import { useContext, useState } from 'react';

import { FormFieldBlock } from '../../../next/components/create-form/form-field-block';
import { DashboardLayout } from '../../../next/components/layout/dashboard-layout';
import { Card } from '../../../next/components/shared/card/card';
import { SectionHeader } from '../../../next/components/shared/card/section-header';
import { Button } from '../../../next/components/shared/form/button';
import { Input } from '../../../next/components/shared/form/input';
import { AuthMiddleware } from '../../../next/providers/auth-provider';
import { CreateFormContext, CreateFormProvider } from '../../../next/providers/create-form-provider';
import { FormModel, IForm } from '../../../src/graphql/modules/form/form.model';
import { FormField, FormFieldType } from '../../../src/graphql/modules/form/types/formField.type';
export const getServerSideProps = AuthMiddleware(async (context) => {
    const { code } = context.query;
    const form = await FormModel.findOne({ code: code as string });
    return {
        props: { form: JSON.parse(JSON.stringify(form)) }
    }
});
export default function EditFormPage({ form }: { form: IForm }) {
    const initForm = form;
    return <DashboardLayout>
    <CreateFormProvider initForm={initForm}>
        <div className="grid grid-cols-3 gap-4">
            <div className="col">
                <SectionHeader text="Tạo Form" />
                <Card>
                    <CreateFormContext.Consumer>
                        {({ formState, editForm }) => <>
                                <Input
                                    name="name"
                                    label="Tên biểu mẫu"
                                    required={true}
                                    value={formState.name}
                                    onChanged={value => formState.name = value}
                                    validate={value => "Thằng này bị lỗi"}
                                />
                                <Input
                                    name="title"
                                    label="Tiêu đề hiển thị"
                                    required={true}
                                    value={formState.title}
                                    onChanged={value => formState.title = value}
                                />
                                <Input
                                    name="redirectLink"
                                    label="Link điều hướng"
                                    required={true}
                                    value={formState.redirectLink}
                                    onChanged={value => formState.redirectLink = value}
                                />
                                <div className="flex flex-row-reverse">
                                    <Button text="Lưu" onClick={editForm}/>
                                </div>
                            </>}
                    </CreateFormContext.Consumer> 
                </Card>
            </div>
            <CreateFormContext.Consumer>
            {({ formState, addField }) => {
                return <div className="col-span-2 overflow-hidden">
                <SectionHeader text="Trường dữ liệu" />
                {formState.fields.map((i, index) => <FormFieldBlock key={"form-field-"+index} field={i} index={index}/>)}
                <Button text="Thêm trường"  onClick={addField}/>
            </div>
            }}
            </CreateFormContext.Consumer>
            
        </div>
    </CreateFormProvider>
    </DashboardLayout>
}