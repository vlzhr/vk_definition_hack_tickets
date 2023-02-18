/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./index.css";
import { ReactComponent as Selected } from "./selected.svg";

import {
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  usePlatform,
  useAdaptivityConditionalRender,
  PanelHeaderButton,
  Button,
  Div,
  Platform
} from "@vkontakte/vkui";

import { useStores } from "@/hooks/useStores";
import { useWalletConnection } from "@/crypto/walletHelpers/WalletConnect";
import AppConnector from "@/crypto/AppConnector";

import { Icon24Dismiss } from "@vkontakte/icons";

interface IProps {
  id: string;
  onClose: () => void;
  dynamicContentHeight: boolean;
}

const DynamicModalPage: React.FC<IProps> = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const {
    AppStore: { wallets }
  } = useStores();
  const { sizeX } = useAdaptivityConditionalRender();
  const [expanded, setExpanded] = React.useState(false);
  const [isConnecting, setConnecting] = React.useState(false);
  const { setWallet, selectedWallet } = useWalletConnection();
  const toggle = React.useCallback(() => setExpanded(!expanded), [expanded]);

  const submit = async () => {
    try {
      AppConnector.init().then((instance: any) => {
        if (!instance) return;
        instance.connector
          .isUserConnected()
          .then(() => {
            console.log("instance.connector");
            // @ts-ignore: Unreachable code error
            afterConnect();
          })
          .catch(() => {
            console.log(instance, "connector1");
            // console.log('user not connected')
            let walletValue = selectedWallet ? selectedWallet : "walletconnect";
            instance.connector.connectToWallet(walletValue).catch((e: any) => {
              console.log(`Error connecting to ${selectedWallet} `, e);
            });
          });
      });
    } catch (e) {
      console.log(e);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <ModalPage
      {...props}
      header={
        <ModalPageHeader
          before={
            sizeX.compact &&
            platform === Platform.ANDROID && (
              <PanelHeaderClose
                className={sizeX.compact.className}
                onClick={onClose}
              />
            )
          }
          after={
            sizeX.compact &&
            platform === Platform.IOS && (
              <PanelHeaderButton
                className={sizeX.compact.className}
                onClick={onClose}
              >
                <Icon24Dismiss />
              </PanelHeaderButton>
            )
          }
        >
          Выберите кошелёк
        </ModalPageHeader>
      }
    >
      <Group>
        <div className="wallet__step-items">
          {wallets.map((_) => (
            <div
              key={_.id}
              onClick={() => (_.available ? setWallet(_.key) : null)}
              className={selectedWallet === _.key ? "selected" : undefined}
            >
              <div style={{ backgroundColor: _.color }}>
                <img alt="" src={`img/connect/wallet/${_.key}.svg`} />
              </div>
              <div>{_.name}</div>
              <Selected />
            </div>
          ))}
        </div>
      </Group>
      <Div style={{ margin: "auto", textAlign: "center" }}>
        <Button size="l" mode="primary" onClick={submit}>
          Подключить
        </Button>
      </Div>
    </ModalPage>
  );
};

export default DynamicModalPage;
