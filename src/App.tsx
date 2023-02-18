import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import ConnectWallet from "./panels/connect";

const App = () => {
  const [activePanel, setActivePanel] = useState("connectWallet");
  const [fetchedUser, setUser] = useState<any>(null);
  const [popout, setPopout] = useState<any>(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = (e: any) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <ConnectWallet id="connectWallet" go={go} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
