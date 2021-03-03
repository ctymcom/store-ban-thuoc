
import { useSettingsContext } from '../providers/settings-providers';
import { SettingGroupItem } from './setting-group-item';
import { HiPlusCircle } from 'react-icons/hi';
interface PropTypes extends ReactProps {
};
export function SettingGroupList(props: PropTypes) {

  const { settingGroups } = useSettingsContext()

  return <div className="border border-gray-300 rounded bg-gray-50">
    {
      settingGroups.map((settingGroup, index) => 
        <SettingGroupItem key={settingGroup.id} settingGroup={settingGroup}/>)
    }
    <button className="btn-default w-full h-10">
      <i className="text-xl"><HiPlusCircle/></i>
      <span>Thêm nhóm cấu hình mới</span>
    </button>
  </div>
}
