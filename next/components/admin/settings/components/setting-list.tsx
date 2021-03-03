

import { useEffect, useState } from 'react';
import { HiCog } from 'react-icons/hi';
import { cloneDeep } from '../../../../lib/lodash';
import { Setting } from '../../../../lib/repo/setting.repo';
import { Form } from '../../../shared/utilities/form/form';
import { NotFound } from '../../../shared/utilities/not-found';
import { Spinner } from '../../../shared/utilities/spinner';
import { useSettingsContext } from '../providers/settings-providers';
import { SettingItem } from './setting-item';
import { HomepageSettings } from './static-settings/homepage-settings';

export interface MutableSetting extends Setting {
  values: { 
    key: string,
    value: string
  }[]
}

interface PropTypes extends ReactProps {
};
export function SettingList(props: PropTypes) {

  const { loadingSettings, saveSettings, settings, settingGroup } = useSettingsContext()

  const [mutableSettings, setMutableSettings] = useState<MutableSetting[]>(null);
  useEffect(() => {
    onInitData()
  }, [settings]);

  const [isStaticSettings, setIsStaticSettings] = useState<boolean>(false);
  useEffect(() => {
    if (settingGroup) {
      if (settingGroup.slug == 'TRANG_CHU') {
        setIsStaticSettings(true)
      } else {        
        setIsStaticSettings(false)
      }
    }
  }, [settingGroup]);

  const onSettingChanged = (setting: MutableSetting, id: string) => {
    let index = mutableSettings.findIndex(x => x.id == id)
    if (index >= 0) {
      mutableSettings[index] = setting
    }
    setMutableSettings([...mutableSettings])
  }

  const onFormChanged = (form: HTMLFormElement, event: Event) => {
    console.log(form, event)
  }

  const onInitData = () => {
    if (settings) {
      let clonedSettings = cloneDeep(settings) as MutableSetting[]
      
      // for (let setting of clonedSettings) {
      //   switch(setting.type) {
      //     case 'object': {
      //       setting.values = Object.keys(setting.value).map((key) => ({ key, value: setting.value[key] }));
      //       break
      //     }
      //   }
      // }
  
      setMutableSettings(clonedSettings)
    } else {
      setMutableSettings(null)
    }
  }

  return <>
    {
      loadingSettings ? <Spinner/> : <>
        {
          !!mutableSettings && <>
            {
              <Form className="bg-white shadow-sm border rounded border-gray-300" onChange={onFormChanged}>
                <div className="p-3 font-semibold border-b border-gray-200 text-gray-600">{settingGroup.name}</div>
                <div className="p-3 v-scrollbar" style={{ maxHeight: 'calc(100vh - 156px)' }}>
                  {
                    !mutableSettings.length ? <NotFound text="Chưa có cấu hình nào" icon={<HiCog/>}/> : <>
                      {
                        isStaticSettings ? <> {
                          {
                            'TRANG_CHU': <HomepageSettings settings={mutableSettings} onSettingsChange={settings => setMutableSettings(settings)}/>
                          }[settingGroup.slug]
                        } </> :
                        <> {
                          mutableSettings.map(setting => 
                            <SettingItem key={setting.id} setting={setting} 
                              onChange={(setting) => onSettingChanged(setting, setting.id) }/>)
                        } </>
                      }
                    </>
                  }
                </div>
                <div className="p-3 flex justify-end border-t border-gray-200">
                  <button type="button" className="btn-gray" onClick={onInitData}>
                    <span>Reset dữ liệu</span>
                  </button>
                  <button type="submit" className="btn-primary ml-2" onClick={() => saveSettings(mutableSettings)}>
                    <span>Lưu thay đổi</span>
                  </button>
                </div>
              </Form>
            }
          </>
        }
      </>
    }
  </>
}
