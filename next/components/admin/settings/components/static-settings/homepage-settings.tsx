import { MutableSetting } from "../setting-list";

interface PropTypes extends ReactProps {
  settings: MutableSetting[]
};

export function HomepageSettings({
  settings,
  ...props
}: PropTypes) {

  console.log(settings)

  return <div>

  </div>
}
