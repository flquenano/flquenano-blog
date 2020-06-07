import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const AlertComponent = () => {
  const alertState = useSelector((state) => state.alert);
  useEffect(() => {
    console.log(alertState);
  }, []);
  const displayAlerts = () =>
    alertState.map((alert) => (
      <Alert key={alert.id} variant={alert.variant}>
        {alert.variant}
      </Alert>
    ));

  return <>{displayAlerts}</>;
};

export default AlertComponent;
