package SubsistemaDireccion {
    doc /* Definicion del sistema de direccion Ackermann */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def SteeringSystem {
        attribute mass : Mass;

        // Parametros fisicos y geometricos
        attribute anguloMaximo : Real;    // Angulo maximo de giro (grados)
        attribute radioGiro : Real;       // Radio minimo de giro (metros)
        attribute parMaximo : Real;       // Par del actuador (N*m)

        // Puertos de conexion al vehiculo (compatibles con 06_triciclo.sysml)
        port chassisMount : MechanicalPort;
        port leftTieRod : MechanicalPort;
        port rightTieRod : MechanicalPort;

        // Puertos de control y sensor
        port entradaControl : ElectricalPort;   // Consigna enviada a la direccion
        port salidaAngulo : ElectricalPort;     // Angulo medido por el sensor
    }

    // Requisitos del subsistema
    requirement def RadioGiroMaximo {
        doc /* El radio de giro del vehiculo no debe superar los 4.0 metros para facilitar giros en espacios cerrados. */
    }

    requirement def GeometriaAckermann {
        doc /* La direccion debe seguir la geometria Ackermann para evitar que las ruedas delanteras derrapen al girar. */
    }
}
