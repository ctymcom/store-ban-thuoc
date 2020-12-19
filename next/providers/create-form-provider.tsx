import { createContext, useState } from "react";
import { FormField, FormFieldType } from "../../src/graphql/modules/form/types/formField.type";
import { FormRepository } from '../lib/repo/form.repo';
export const CreateFormContext = createContext(null);
export function CreateFormProvider(props) {
    const formRepo = new FormRepository();
    const [formState, setFormState] = useState(props.initForm);
    const addField = () => {
        formState.fields.push({ type: FormFieldType.text, label: "Value " + formState.fields.length, placeholder: "" } as FormField);
        setFormState({ ...formState });
    }
    const removeField = (index: number) => {
        formState.fields.splice(index, 1);
        setFormState({ ...formState });
    }
    const saveForm = (e) => {
        console.log('formState', formState);
        formRepo.create({ data: formState }).then(res => {
            console.log("created", res);
        }).catch(err => alert(err.message));
    }

    return <CreateFormContext.Provider value={{ formState, setFormState, addField, removeField, saveForm }}>
        {props.children}
    </CreateFormContext.Provider>
}