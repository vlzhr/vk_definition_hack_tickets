import React from "react";
import PropTypes from "prop-types";

import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import persik from "../img/persik.png";
import "./Persik.css";

interface IProps {
  id: any;
  go: any;
}

const Persik: React.FC<IProps> = (props) => {
  return (
    <Panel id={props.id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={props.go} data-to="home" />}
      >
        Persik
      </PanelHeader>
      <img className="Persik" src={persik} alt="Persik The Cat" />
    </Panel>
  );
};

Persik.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Persik;
