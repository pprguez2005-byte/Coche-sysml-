package SubsistemaPowertrain {
    doc /* Definicion del tren motriz electrico */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def Powertrain {
        attribute mass : Mass;
        // Puertos
        port chassisMount : MechanicalPort;
        port powerIn : ElectricalPort;
        port driveOut : MechanicalPort;

        // Subpartes interiores
        part motor {
            doc /* Motor electrico de traccion */
            attribute mass : Mass;
            attribute ratedPower : Real;
            attribute operatingTemp : Temperature;
        }

        part inverter {
            doc /* Inversor que convierte la corriente continua de la bateria */
            attribute mass : Mass;
        }

        part coolingSystem {
            doc /* Sistema de refrigeracion liquida que evacua el calor generado por el motor */
            attribute mass : Mass;
            attribute coolantTemp : Temperature;
        }

        // Acciones
        action convertPower {
            doc /* Convierte la energia electrica DC de entrada en corriente trifasica para el motor */
        }

        action transmitTorque {
            doc /* Transmite el par mecanico del motor hacia la rueda motriz */
        }

        action dissipateHeat {
            doc /* Evacua el calor del motor mediante el circuito de refrigeracion para mantener su temperatura de operacion */
        }

        // Requisitos
        requirement maxRatedPowerReq {
            doc /* La potencia nominal del motor no debe superar los 5000 W */
            require constraint {
                motor.ratedPower <= 5000.0
            }
        }

        requirement maxOperatingTempReq {
            doc /* La temperatura de operacion del motor no debe superar los 120 grados Celsius */
            require constraint {
                motor.operatingTemp <= 120.0
            }
        }

        // La accion de disipacion de calor satisface el requisito de temperatura
        satisfy maxOperatingTempReq by dissipateHeat;

        // Restriccion de masa
        assert constraint massSum {
            mass == motor.mass + inverter.mass + coolingSystem.mass
        }

        // Restriccion de temperatura: el refrigerante debe estar mas frio que el motor para poder evacuar calor
        assert constraint thermalGradient {
            coolingSystem.coolantTemp < motor.operatingTemp
        }
    }
}
