import Link from 'next/link';
import { SettingGroup } from '../../../../lib/repo/setting-group.repo';

interface PropTypes extends ReactProps {
  settingGroup: SettingGroup
};
export function SettingGroupItem(props: PropTypes) {

  const href = `/admin/settings/${encodeURIComponent(props.settingGroup.slug)}`
  const isActive = location.pathname == href
  
  return <Link href={href}>
    <a className={`relative flex flex-col pl-4 pr-2 py-2 text-gray-600 group border-b border-gray-200}`}>
      {
        isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
      }
      <strong className={`group-hover:text-primary ${isActive && 'text-primary'}`}>{props.settingGroup.name}</strong>
      {/* <p>{props.settingGroup.desc}</p> */}
    </a>
  </Link>
}
