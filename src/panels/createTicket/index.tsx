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

const CreateTickets: React.FC<IHomeProps> = ({ id, onBack }) => {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>
        Добавление события
      </PanelHeader>
      <Group mode="plain">
        <CardGrid size="l">
          <Card className="card_wrap">Создать событие</Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default CreateTickets;
