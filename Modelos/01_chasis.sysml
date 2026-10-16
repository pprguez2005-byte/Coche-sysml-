package SubsistemaChasis {
    doc /* Definicion del bastidor estructural */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def Chassis {
        attribute mass : Mass;

        // Puertos de montaje estructural
        port frontLeftMount : MechanicalPort;
        port frontRightMount : MechanicalPort;
        port rearMount : MechanicalPort;
        port steeringMount : MechanicalPort;
        port batteryMount : MechanicalPort;
        port powertrainMount : MechanicalPort;
    }
}
