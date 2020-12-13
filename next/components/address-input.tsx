import { useEffect, useState } from 'react';

import { IAddress } from '../../src/graphql/modules/address/address.model';
import { FormField } from '../../src/graphql/modules/form/types/formField.type';
import { AddressRepository } from '../lib/repo/address-repo';

export function AddressInput({ field } : { field: FormField }) {
    const { label, placeholder, key, districtKey, districtLabel, wardKey, wardLabel, required, requiredDistrict, requiredWard } = field;
    const [provinces, setProvinces]: [IAddress[], any] = useState([]);
    const [districts, setDistricts]: [IAddress[], any] = useState([]);
    const [wards, setWards]: [IAddress[], any] = useState([]);
    const [address, setAddress] = useState({
        provinceId: field.default
    } as {
        provinceId?: string,
        districtId?: string,
        wardId?: string
    });
    const addressRepo = new AddressRepository();
    const changeProvince = (e) => setAddress({  provinceId: e.target.value, districtId: null, wardId: null });
    const changeDistrict = (e) => setAddress({  ...address, districtId: e.target.value, wardId: null });
    const changeWard = (e) => setAddress({  ...address, wardId: e.target.value });
    useEffect(() => {
        addressRepo.getAllProvince().then(res => {
            setProvinces(res);
        })
    }, []);
    useEffect(() => {
        if (!address.districtId) {
            addressRepo.getDistricts(address.provinceId).then(res => setDistricts(res));
            setWards([]);
        } else if (!address.wardId) {
            addressRepo.getWards(address.districtId).then(res => setWards(res));
        }
    }, [address]);


    return <div>
        <div className="flex flex-col mb-3">
            { label && <label className="font-bold mb-1" htmlFor={key} >{label}</label> } 
            <select id={key} value={address.provinceId || ""} required={required} onChange={changeProvince} name={key} className="p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>-- {placeholder || "Chưa chọn"} --</option>
                { provinces.map(o => <option 
                    key={o.id} 
                    value={o.id}
                >{o.province}</option> )}
            </select>
        </div>
        { field.districtKey && <div className="flex flex-col mb-3">
            { label && <label className="font-bold mb-1" htmlFor={districtKey} >{districtLabel}</label> } 
            <select id={districtKey} value={address.districtId || ""} required={requiredDistrict} onChange={changeDistrict} name={districtKey} className="p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">-- {placeholder || "Chưa chọn"} --</option>
                { districts.map(o => <option 
                    key={o.id} 
                    value={o.id}>{o.district}</option> )}
            </select>
        </div>}
        { field.wardKey && <div className="flex flex-col mb-3">
            { label && <label className="font-bold mb-1" htmlFor={wardKey} >{wardLabel}</label> } 
            <select id={wardKey} value={address.wardId || ""} required={requiredWard} onChange={changeWard} name={wardKey} className="p-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">-- {placeholder || "Chưa chọn"} --</option>
                { wards.map(o => <option 
                    key={o.id} 
                    value={o.id}>{o.ward}</option> )}
            </select>
        </div>}
        
    </div>;
}