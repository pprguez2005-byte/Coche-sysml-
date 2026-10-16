package SubsistemaDireccion {
    doc /* Definicion del sistema de direccion Ackermann */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def SteeringSystem {
        attribute mass : Mass;

        // Puertos
        port chassisMount : MechanicalPort;
        port leftTieRod : MechanicalPort;
        port rightTieRod : MechanicalPort;
    }
}
