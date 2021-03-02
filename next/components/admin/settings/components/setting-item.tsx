import { Input } from './../../../shared/utilities/form/input';
import { MutableSetting } from './setting-list';

interface PropTypes extends ReactProps {
  setting: MutableSetting
  onChange: (setting: MutableSetting) => any
};
export function SettingItem({
  setting,
  ...props
}: PropTypes) {

  const onSettingValueChanged = (value: any) => {
    props.onChange({...setting, value })
  }

  const onItemValueChanged = (key: string, value: string) => {
    const index = setting.values.findIndex(x => x.key == key)
    if (index >= 0) {
      setting.values[index].value = value
      setting.value = setting.values.reduce((obj, item) => ({
        ...obj, [item.key]: setting.value[item.value] || ''
      }), {});
      props.onChange({...setting })
    }
  }

  return <div className="pb-3">
    <div className="text-gray-600 font-semibold pl-1 pb-1">{setting.name}</div>
    {
      {
        'string': <Input name={setting.name} value={setting.value} onChange={onSettingValueChanged}/>,
        'object': <>
          { 
            setting.values && setting.values.map((item) => 
              <Input key={item.key} value={item.value} onChange={(val) => onItemValueChanged(item.key, val)}/>) 
          }
        </>,
      }[setting.type]
    }
  </div>
}
