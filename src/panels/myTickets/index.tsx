import React from "react";

import {
  Panel,
  Button,
  Group,
  CardGrid,
  Card,
  Div,
  ModalRoot
} from "@vkontakte/vkui";

interface IHomeProps {
  id: string;
}

const MyTickets: React.FC<IHomeProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <Group mode="plain">
        <CardGrid size="l">
          <Card className="card_wrap">Ваши билеты</Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default MyTickets;
