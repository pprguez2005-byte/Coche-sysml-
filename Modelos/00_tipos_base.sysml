package TiposBase {
    doc /* Tipos de datos, magnitudes fisicas y definiciones de puertos comunes */
    private import ScalarValues::*;

    attribute def Mass :> Real;
    attribute def Temperature :> Real {
        doc /* Temperatura expresada siempre en grados centigrados (Celsius) */
    }
    
    port def MechanicalPort;
    port def ElectricalPort;
}
