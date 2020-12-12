import { IForm, FormModel } from '../../src/graphql/modules/form/form.model';
import { Input } from '../../next/components/input';
import {Checkbox} from '../../next/components/checkbox';
import {SelectBox} from '../../next/components/selectbox';
import {Button} from '../../next/components/button';
import { FormFieldType } from '../../src/graphql/modules/form/types/formField.type';
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
                            return <Checkbox field={f}></Checkbox>
                        case FormFieldType.select:
                            return <SelectBox field={f}></SelectBox>
                        default:
                            return <Input field={f}></Input>
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