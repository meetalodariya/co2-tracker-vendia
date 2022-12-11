import React, { useState, useEffect } from 'react';
import { Battery } from 'src/apps/Battery/types';
import { Transport } from 'src/apps/Transport/types';
import { Motor } from 'src/apps/Motor/types';

type componentType = 'battery' | 'motor' | 'transport' | '';

export interface WorkbenchContextType {
  batteries: Battery[];
  transports: Transport[];
  motors: Motor[];
  selectedBattery: Battery;
  selectedTransport: Transport;
  selectedMotor: Motor;
  activeComponentList: componentType;
  setBatteryList: (batteries: Battery[]) => void;
  setMotorList: (motors: Motor[]) => void;
  setTransportList: (transports: Transport[]) => void;
  handleMotorSelect: (motorId: string) => void;
  handleBatterySelect: (batteryId: string) => void;
  handleTransportSelect: (transportId: string) => void;
  resetSelection: () => void;
  setActiveComponentList: (component: componentType) => void;
}

export const WorkbenchContext = React.createContext<WorkbenchContextType>({
  batteries: [],
  transports: [],
  motors: [],
  selectedBattery: null,
  selectedTransport: null,
  selectedMotor: null,
  activeComponentList: '',
  setBatteryList: () => undefined,
  setMotorList: () => undefined,
  setTransportList: () => undefined,
  handleMotorSelect: () => undefined,
  handleBatterySelect: () => undefined,
  handleTransportSelect: () => undefined,
  resetSelection: () => undefined,
  setActiveComponentList: () => undefined,
});

export function WorkbenchProvider({ children }: { children: React.ReactNode }) {
  const [selectedBattery, setSelectedBattery] = useState<Battery>(null);
  const [selectedTransport, setSelectedTransport] = useState<Transport>(null);
  const [selectedMotor, setSelectedMotor] = useState<Motor>(null);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [motors, setMotors] = useState<Motor[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [activeComponentList, setActiveComponentList] =
    useState<componentType>('');

  const setBatteryList = (batteryList: Battery[]) => setBatteries(batteryList);

  const setMotorList = (motorList: Motor[]) => setMotors(motorList);

  const setTransportList = (transportList: Transport[]) =>
    setTransports(transportList);

  const handleMotorSelect = (motorId: string) => {
    const motorFromList = motors.find((motor) => motorId === motor._id);

    if (motorFromList) {
      setSelectedMotor(motorFromList);
    }
  };

  const handleBatterySelect = (batteryId: string) => {
    const batteryFromList = batteries.find(
      (battery) => batteryId === battery._id,
    );

    if (batteryFromList) {
      setSelectedBattery(batteryFromList);
    }
  };

  const handleTransportSelect = (transportId: string) => {
    const transportFromList = transports.find(
      (transport) => transportId === transport._id,
    );

    if (transportFromList) {
      setSelectedTransport(transportFromList);
    }
  };

  const resetSelection = () => {
    setSelectedTransport(null);
    setSelectedBattery(null);
    setSelectedMotor(null);
  };

  const value = {
    batteries,
    motors,
    transports,
    setBatteryList,
    setTransportList,
    setMotorList,
    handleMotorSelect,
    handleBatterySelect,
    handleTransportSelect,
    selectedBattery,
    selectedTransport,
    selectedMotor,
    resetSelection,
    activeComponentList,
    setActiveComponentList,
  };

  return (
    <WorkbenchContext.Provider value={value}>
      {children}
    </WorkbenchContext.Provider>
  );
}

export function useWorkbench() {
  return React.useContext(WorkbenchContext);
}
