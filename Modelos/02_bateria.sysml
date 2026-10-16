package SubsistemaBateria {
    doc /* Definicion del sistema de almacenamiento de energia */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def BatterySystem {
        attribute mass : Mass;
        
        // Puertos
        port chassisMount : MechanicalPort;
        port powerOut : ElectricalPort;
    }
}
