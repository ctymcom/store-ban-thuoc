import { IForm, FormModel } from '../../src/graphql/modules/form/form.model';
import { Input } from '../../next/components/input';
import {Checkbox} from '../../next/components/checkbox';
import {SelectBox} from '../../next/components/select-box';
import {Button} from '../../next/components/button';
import { FormField, FormFieldType } from '../../src/graphql/modules/form/types/formField.type';
import { AddressInput } from '../../next/components/address-input';
function Form({ form }: { form: IForm }) {
    return <div className = "p-2">
        <div className="bg-gray-200 p-3 text-center text-lg font-bold rounded-lg shadow-md">
            <span>{form.title}</span>
        </div>
        <div className="bg-white shadow-md p-3 mt-2">
            <form >
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
                <Button text="Gửi"></Button>
            </form>
        </div>
    </div>;  
}

export async function getServerSideProps(context) {
    const { code } = context.query;
    const form = await FormModel.findOne({ code });

    return {
        props: { form: JSON.parse(JSON.stringify(form)) }
    }
}

export default Form;