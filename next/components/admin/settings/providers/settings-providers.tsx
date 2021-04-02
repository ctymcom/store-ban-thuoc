import { isEqual } from "lodash";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "../../../../lib/providers/toast-provider";
import { SettingGroup, SettingGroupService } from "../../../../lib/repo/setting-group.repo";
import { Setting } from "../../../../lib/repo/setting.repo";
import { SettingService } from "./../../../../lib/repo/setting.repo";
import { MutableSetting } from "./../components/setting-list";

export const SettingsContext = createContext<
  Partial<{
    loadingSettings: boolean;
    settings: Setting[];
    settingGroups: SettingGroup[];
    settingGroup: SettingGroup;
    saveSettings: (settings: MutableSetting[]) => Promise<any>;
    loadDone: boolean;
  }>
>({});

export function SettingsProvider({ children }: any) {
  const router = useRouter();
  const [loadDone, setLoadDone] = useState<boolean>(false);
  const [loadingSettings, setLoadingSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<Setting[]>(null);
  const [settingGroups, setSettingGroups] = useState<SettingGroup[]>(null);
  const [settingGroup, setSettingGroup] = useState<SettingGroup>(null);

  const toast = useToast();

  useEffect(() => {
    SettingGroupService.getAll({ query: { limit: 0 } }).then((res) => {
      setSettingGroups(res.data);
      setLoadDone(true);
    });
  }, []);

  useEffect(() => {
    if (loadDone) {
      const { slug } = router.query;
      if (slug) {
        if (!settingGroups.find((x) => x.slug == slug)) router.push("/admin/settings");
      } else {
        if (settingGroups.length) router.push("/admin/settings/" + settingGroups[0].slug);
      }
    }
  }, [loadDone]);

  useEffect(() => {
    if (loadDone) {
      const { slug } = router.query;
      setSettingGroup(slug ? settingGroups.find((x) => x.slug == slug) : null);
    }
  }, [router.query, loadDone]);

  useEffect(() => {
    if (settingGroup) {
      setLoadingSettings(true);
      SettingService.getAll({
        query: { limit: 0, filter: { groupId: settingGroup.id } },
      })
        .then((res) => {
          setSettings(res.data);
        })
        .catch((err) => {
          console.error(err);
          setSettings(null);
        })
        .finally(() => {
          setLoadingSettings(false);
        });
    } else {
      setSettings(null);
    }
  }, [settingGroup]);

  const saveSettings = async (mutableSettings: MutableSetting[]) => {
    const filteredSettings = mutableSettings.filter(
      (setting) => !isEqual(setting.value, settings.find((x) => x.id == setting.id).value)
    );
    if (!filteredSettings.length) {
      toast.info("Chưa có dữ liệu nào thay đổi");
      return;
    }

    try {
      await SettingService.mutate({
        mutation: filteredSettings.map((setting) =>
          SettingService.updateQuery({
            id: setting.id,
            data: { value: setting.value },
          })
        ),
      });
      setSettings(
        mutableSettings.map((x) => {
          const { values, ...settings } = x;
          return settings;
        })
      );
      toast.success("Lưu cấu hình thành công");
    } catch (err) {
      toast.error("Lưu cấu hình thất bại. " + err.message);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ loadingSettings, settings, settingGroups, settingGroup, saveSettings, loadDone }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext);
