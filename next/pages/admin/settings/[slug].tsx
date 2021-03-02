import { SettingsProvider } from "../../../components/admin/settings/providers/settings-providers";
import { SettingsPage } from "../../../components/admin/settings/settings-page";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function Slug() {

  return <SettingsProvider>
    <SettingsPage/>
  </SettingsProvider>;
}

Slug.Layout = AdminLayout