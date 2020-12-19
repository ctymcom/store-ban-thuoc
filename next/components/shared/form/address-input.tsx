import { useEffect, useState } from 'react';

import { AddressRepository } from '../../../lib/repo/address-repo';
import { FormFieldProps } from './form-field.type';
import { SelectBox, SelectBoxOption } from './select-box';

type AddressValue = {
    province?: string,
    district?: string,
    ward?: string
}
type AddressInputProps = FormFieldProps & {
    addressValue?: AddressValue,
    dName?: string,
    dLabel?: string,
    wName?: string,
    wLabel?: string,
    dRequired?: boolean,
    wRequired?: boolean,
    onChangedAddress?: (value: AddressValue) => void;
    validateAddress?: (value: AddressValue) => string;
}
export function AddressInput({ label, name, dName, dLabel, dRequired, wName, wLabel, wRequired, required, addressValue, onChangedAddress } : AddressInputProps) {
    const [provinces, setProvinces]: [SelectBoxOption[], any] = useState([]);
    const [districts, setDistricts]: [SelectBoxOption[], any] = useState([]);
    const [wards, setWards]: [SelectBoxOption[], any] = useState([]);
    const [address, setAddress] = useState<AddressValue>(addressValue);
    const addressRepo = new AddressRepository();
    const changeProvince = (e) => { setAddress({  province: e, district: null, ward: null }) } ;
    const changeDistrict = (e) => setAddress({  ...address, district: e, ward: null });
    const changeWard = (e) => setAddress({  ...address, ward: e });
    useEffect(() => {
        addressRepo.getAllProvince().then(res => {
            setProvinces(res.map(r => ({ value: r.id, display: r.province })));
        })
    }, []);
    useEffect(() => {
        if (!address.district && dName) {
            addressRepo.getDistricts(address.province).then(res => setDistricts(res.map(r => ({ value: r.id, display: r.district }))));
            setWards([]);
        } else if (!address.ward && wName) {
            addressRepo.getWards(address.district).then(res => setWards(res.map(r => ({ value: r.id, display: r.ward }))));
        }
        if (onChangedAddress) onChangedAddress(address);
    }, [address]);


    return <div>
        <div className="flex flex-col mb-3">
            { label && <label className="font-bold mb-1" htmlFor={name} >{label}</label> } 
            <SelectBox 
                name={name}
                value={address.province}
                required={required}
                onChanged={changeProvince}
                options={provinces}
                noneOption={{ value: "", display: "Chưa chọn" }}
            />
        </div>
        { dName && <div className="flex flex-col mb-3">
            { dLabel && <label className="font-bold mb-1" htmlFor={dName} >{dLabel}</label> } 
            <SelectBox 
                name={dName}
                value={address.district}
                required={dRequired}
                onChanged={changeDistrict}
                options={districts}
                noneOption={{ value: "", display: "Chưa chọn" }}
            />
        </div>}
        { wName && <div className="flex flex-col mb-3">
            { wLabel && <label className="font-bold mb-1" htmlFor={wName} >{wLabel}</label> } 
            <SelectBox 
                name={wName}
                value={address.ward}
                required={wRequired}
                onChanged={changeWard}
                options={wards}
                noneOption={{ value: "", display: "Chưa chọn" }}
            />
        </div>}
        
    </div>;
}