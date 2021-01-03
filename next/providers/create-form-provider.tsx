import { createContext, useState } from "react";
import { FormField, FormFieldType } from "../../src/graphql/modules/form/types/formField.type";
import { FormRepository } from '../lib/repo/form.repo';
import { useRouter } from 'next/router';
export const CreateFormContext = createContext(null);
export function CreateFormProvider(props) {
    const formRepo = new FormRepository();
    const [formState, setFormState] = useState(props.initForm);
    const router = useRouter();
    const addField = () => {
        formState.fields.push({ type: FormFieldType.text, label: "Value " + formState.fields.length, placeholder: "", key: "Value " + formState.fields.length } as FormField);
        setFormState({ ...formState });
    }
    const removeField = (index: number) => {
        formState.fields.splice(index, 1);
        setFormState({ ...formState });
    }
    const createForm = (e) => {
        formRepo.create({ data: formState }).then(res => {
            router.push('/form/edit/' + res.code);
        }).catch(err => alert(err.message));
    }
    const editForm = (e) => {
        const { _id, createdAt, updatedAt, __v, ...data } = formState;
        data.fields.forEach(f => delete f._id);
        formRepo.update({ id: formState._id , data }).then(res => {
            router.push('/form/edit/' + res.code);
        }).catch(err => alert(err.message));
    }

    return <CreateFormContext.Provider value={{ formState, setFormState, addField, removeField, createForm, editForm }}>
        {props.children}
    </CreateFormContext.Provider>
}