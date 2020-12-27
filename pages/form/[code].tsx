import { NextSeo } from 'next-seo';

import { AddressInput } from '../../next/components/shared/form/address-input';
import { Button } from '../../next/components/shared/form/button';
import { Checkbox } from '../../next/components/shared/form/checkbox';
import { Input } from '../../next/components/shared/form/input';
import { SelectBox } from '../../next/components/shared/form/select-box';
import { GetMyIP } from '../../next/lib/get-my-ip';
import { parseFormData } from '../../next/lib/parse-form-data';
import { FormDataRepository } from '../../next/lib/repo/form-data.repo';
import { FormModel, IForm } from '../../src/graphql/modules/form/form.model';
import { FormFieldType } from '../../src/graphql/modules/form/types/formField.type';

function FormPage({ form }: { form: IForm }) {
    const formDataRepo = new FormDataRepository();
    let myIP = "";
    GetMyIP((error, ip) => myIP = ip);
    const onSubmit = (e) => {
        e.preventDefault();
        const data = parseFormData(new FormData(e.target));
        formDataRepo.create({ data: { data: data, formId: form._id } }).then(res => {
            location.href = form.redirectLink;
        }).catch(err => {
            console.error("error", err.message);
            alert('Lỗi :' + err.message);
        })
        
    }
    return <>
    <NextSeo 
        title={form.title}
        description={form.description || ""}
        openGraph={{
            url: `/form/${form.code}`,
            title: form.title,
            description: form.description || "",
            ... form.image && {
                images: [{ url: form.image }]
            },
            site_name: 'Submit QR',
            locale: 'vi'
          }}
    />
    <div className = "p-2 max-w-lg m-auto">
        <div className="bg-gray-200 p-3 text-center text-lg font-bold rounded-lg shadow-md">
            <span>{form.title}</span>
        </div>
        <div className="bg-white shadow-md p-3 mt-2">
            <form onSubmit={onSubmit}>
                {form.fields.map(f => {
                    switch(f.type) {
                        case FormFieldType.boolean:
                            return <Checkbox key={f._id} 
                                label={f.label} 
                                placeholder={f.placeholder} 
                                name={f.key} 
                                checked={f.default}/>
                        case FormFieldType.select:
                            return <SelectBox key={f._id} 
                                label={f.label} 
                                placeholder={f.placeholder} 
                                name={f.key} 
                                value={f.default} 
                                options={f.options}
                                noneOption={{ value: "", display: "Chưa chọn"}} />
                        case FormFieldType.address:
                            return <AddressInput key={f._id} label={f.label} 
                                placeholder={f.placeholder} 
                                name={f.key} 
                                dName={f.districtKey}
                                dLabel={f.districtLabel}
                                wName={f.wardKey}
                                wLabel={f.wardLabel}
                                addressValue={{province: f.default}} />
                        case FormFieldType.datetime:
                            return <Input key={f._id} 
                                label={f.label} 
                                inputType="datetime-local"
                                placeholder={f.placeholder} 
                                name={f.key} 
                                value={f.default} />
                        default:
                            return <Input key={f._id} 
                                label={f.label} 
                                inputType={f.type}
                                placeholder={f.placeholder} 
                                name={f.key} 
                                value={f.default}/>
                    }
                })}
                <Button type="submit" text="Gửi"></Button>
            </form>
        </div>
    </div>
    </>
    ;  
}

export async function getServerSideProps(context) {
    const { code } = context.query;
    const form = await FormModel.findOne({ code });

    return {
        props: { form: JSON.parse(JSON.stringify(form)) }
    }
}
export default FormPage;