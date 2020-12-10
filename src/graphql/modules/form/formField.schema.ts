import { gql } from "apollo-server-express";
import { FormFieldType } from "./types/formField.type";

export default gql`
    type FormField {
        "Từ khoá"
        key: String
        "Nhãn hiển thị"
        label: String
        "Gợi ý"
        placeholder: String
        "Loại field ${Object.values(FormFieldType)}"
        type: String
        "bắt buộc nhập"
        required: Boolean
        "Giá trị mặc định"
        default: Mixed
    }

    input FormFieldInput {
        "Từ khoá"
        key: String!
        "Nhãn hiển thị"
        label: String!
        "Gợi ý"
        placeholder: String
        "Loại field ${Object.values(FormFieldType)}"
        type: String
        "bắt buộc nhập"
        required: Boolean
        "Giá trị mặc định"
        default: Mixed
    }
`;
