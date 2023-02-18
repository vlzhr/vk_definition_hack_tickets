import React from "react";

import {
  Panel,
  Button,
  Group,
  CardGrid,
  Card,
  PanelHeaderBack,
  PanelHeader
} from "@vkontakte/vkui";
import "./index.css";

interface IHomeProps {
  id: string;
  onBack: () => void;
}

const MyTickets: React.FC<IHomeProps> = ({ id, onBack }) => {
  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderBack
            style={{ borderRadius: 0!, boxShadow: "unset"! }}
            onClick={onBack}
          />
        }
      >
        Ваши билеты
      </PanelHeader>
      <Group mode="plain">
        <CardGrid size="l">
          <Card className="card_wrap">Ваши билеты</Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default MyTickets;
