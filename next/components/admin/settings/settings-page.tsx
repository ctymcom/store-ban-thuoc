import { Spinner } from "../../shared/utilities/spinner";
import { useEffect, useState } from "react";
import { SettingGroupList } from "./components/setting-group-list";
import { useRouter } from 'next/router';
import { useSettingsContext } from './providers/settings-providers';
import { SettingList } from "./components/setting-list";

interface PropTypes extends ReactProps {
};
export function SettingsPage(props: PropTypes) {


  const { loadDone } = useSettingsContext()

  return <> 
    {
      !loadDone ? <Spinner/> : 
      <div className="flex">
        <div className="w-80 flex-shrink-0 flex-grow-0">
          <SettingGroupList/>
        </div>
        <div className="pl-3 min-w-2xl">
          <SettingList/>
        </div>
      </div>
    }
  </>
}
