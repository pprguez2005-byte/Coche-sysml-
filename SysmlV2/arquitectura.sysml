package ArquitecturaFreno {
    doc /* Instanciación y ensamblado de la arquitectura del vehículo y su sistema de freno */
    private import ScalarValues::*;
    private import DefinicionesFreno::*;

    part def Vehicle {
        attribute mass : Mass;
        part brakePedal : BrakePedal[1];
        part brakeCalipers : BrakeCaliper[4];
    }

    part vehiculo : Vehicle;
}
