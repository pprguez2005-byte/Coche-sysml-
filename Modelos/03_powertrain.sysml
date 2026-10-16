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
    }
}
