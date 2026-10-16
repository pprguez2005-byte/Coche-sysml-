package SubsistemaRueda {
    doc /* Definicion del conjunto de rueda */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def Wheel {
        attribute mass : Mass;

        // Puertos
        port hubMount : MechanicalPort;
        port driveInput : MechanicalPort;
        port steerInput : MechanicalPort;
    }
}
