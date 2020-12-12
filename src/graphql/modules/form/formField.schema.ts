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
        "Giá trị tuỳ chọn dành chi select"
        options: [String]
        "Từ khoá quận / huyện"
        districtKey: String
        "Từ khoá phường / xã"
        wardKey: String
        "Bắt buộc nhập quận / huyện"
        requiredDistrict: Boolean
        "Bắt buộc nhập phường / xã"
        requiredWard: Boolean
        "Nhãn quận / huyện"
        districtLabel: String
        "Nhãn phường / xã"
        wardLabel: String
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
        "Giá trị tuỳ chọn dành chi select"
        options: [String]
        "Từ khoá quận / huyện"
        districtKey: String
        "Từ khoá phường / xã"
        wardKey: String
        "Bắt buộc nhập quận / huyện"
        requiredDistrict: Boolean
        "Bắt buộc nhập phường / xã"
        requiredWard: Boolean
        "Nhãn quận / huyện"
        districtLabel: String
        "Nhãn phường / xã"
        wardLabel: String
    }
`;
