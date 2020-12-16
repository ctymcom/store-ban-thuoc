import { NextSeo } from 'next-seo';

import { AddressInput } from '../../next/components/shared/address-input';
import { Button } from '../../next/components/shared/button';
import { Checkbox } from '../../next/components/shared/checkbox';
import { Input } from '../../next/components/shared/input';
import { SelectBox } from '../../next/components/shared/select-box';
import { GetMyIP } from '../../next/lib/get-my-ip';
import { FormDataRepository } from '../../next/lib/repo/form-data.repo';
import { FormModel, IForm } from '../../src/graphql/modules/form/form.model';
import { FormField, FormFieldType } from '../../src/graphql/modules/form/types/formField.type';

function Form({ form }: { form: IForm }) {
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
    <div className = "p-2">
        <div className="bg-gray-200 p-3 text-center text-lg font-bold rounded-lg shadow-md">
            <span>{form.title}</span>
        </div>
        <div className="bg-white shadow-md p-3 mt-2">
            <form onSubmit={onSubmit}>
                {form.fields.map(f => {
                    switch(f.type) {
                        case FormFieldType.boolean:
                            return <Checkbox key={f._id} field={f} />
                        case FormFieldType.select:
                            return <SelectBox key={f._id} field={f} />
                        case FormFieldType.address:
                            return <AddressInput key={f._id} field={f} />
                        case FormFieldType.datetime:
                            return <Input key={f._id} field={{ ...f, type: FormFieldType.datetime } as FormField} />
                        default:
                            return <Input key={f._id} field={f} />
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

function parseFormData(form: FormData) {
    var object = {};
    form.forEach(function(value, key){
        object[key] = value;
    });
    return object;
}

export default Form;