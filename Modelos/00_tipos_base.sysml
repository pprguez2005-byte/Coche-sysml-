package TiposBase {
    doc /* Tipos de datos, magnitudes fisicas y definiciones de puertos comunes */
    private import ScalarValues::*;

    attribute def Mass :> Real;
    
    port def MechanicalPort;
    port def ElectricalPort;
}
