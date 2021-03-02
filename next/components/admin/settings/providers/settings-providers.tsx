import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { SettingGroup, SettingGroupService } from "../../../../lib/repo/setting-group.repo";
import { Setting } from "../../../../lib/repo/setting.repo";
import { SettingService } from './../../../../lib/repo/setting.repo';

export const SettingsContext = createContext<Partial<{
  loadingSettings: boolean
  settings: Setting[]
  settingGroups: SettingGroup[]
  settingGroup: SettingGroup
  loadDone: boolean
}>>({});

export function SettingsProvider({ children }: any) {
  const router = useRouter()
  const [loadDone, setLoadDone] = useState<boolean>(false);
  const [loadingSettings, setLoadingSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<Setting[]>(null);
  const [settingGroups, setSettingGroups] = useState<SettingGroup[]>(null);
  const [settingGroup, setSettingGroup] = useState<SettingGroup>(null);
  
  useEffect(() => {
    SettingGroupService.getAll({ query: { limit: 0 }}).then(res => {
      setSettingGroups(res.data)
      setLoadDone(true)
    })
  }, []);

  useEffect(() => {
    if (loadDone) {
      const { slug } = router.query
      if (slug) {
        if (!settingGroups.find(x => x.slug == slug)) router.push('/admin/settings')
      } else {
        if (settingGroups.length) router.push('/admin/settings/' + settingGroups[0].slug)
      }
    }
  }, [loadDone]);

  useEffect(() => {
    if (loadDone) {
      const { slug } = router.query
      setSettingGroup(slug ? settingGroups.find(x => x.slug == slug) : null)
    }
  }, [router.query, loadDone]);

  useEffect(() => {
    if (settingGroup) {
      setLoadingSettings(true)
      SettingService.getAll({
        query: { limit: 0, filter: { groupId: settingGroup.id } }
      }).then(res => {
        setSettings(res.data)
      }).catch(err => {
        console.error(err)
        setSettings(null)
      }).finally(() => {
        setLoadingSettings(false)
      })
    } else {
      setSettings(null)
    }
  }, [settingGroup]);

  return (
    <SettingsContext.Provider value={{ loadingSettings, settings, settingGroups, settingGroup, loadDone }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext)