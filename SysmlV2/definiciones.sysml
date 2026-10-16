package DefinicionesFreno {
    doc /* Definiciones base, atributos, componentes y requisitos del sistema de freno */
    private import ScalarValues::*;

    // Attribute definitions
    attribute def Mass :> Real;
    attribute def Pressure :> Real;

    // Part definitions
    part def BrakePedal;
    part def BrakeCaliper;

    // Requirement definitions
    requirement def MaxStoppingDistance {
        doc /* The vehicle stopping distance shall not exceed the specified threshold from reference speed under emergency braking conditions. */
    }
}
