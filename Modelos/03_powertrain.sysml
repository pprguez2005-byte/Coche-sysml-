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
        }

        part inverter {
            doc /* Inversor que convierte la corriente continua de la bateria */
            attribute mass : Mass;
        }

        // Acciones
        action convertPower {
            doc /* Convierte la energia electrica DC de entrada en corriente trifasica para el motor */
        }

        action transmitTorque {
            doc /* Transmite el par mecanico del motor hacia la rueda motriz */
        }

        // Requisito
        requirement maxRatedPowerReq {
            doc /* La potencia nominal del motor no debe superar los 5000 W */
            require constraint {
                motor.ratedPower <= 5000.0
            }
        }

        // Restriccion de masa
        assert constraint massSum {
            mass == motor.mass + inverter.mass
        }
    }
}
