package BrakingSystem {
    private import ScalarValues::*;

    // Attribute definitions
    attribute def Mass :> Real;
    attribute def Pressure :> Real;

    // Part definitions
    part def BrakePedal;
    part def BrakeCaliper;

    part def Vehicle {
        attribute mass : Mass;
        part brakePedal : BrakePedal[1];
        part brakeCalipers : BrakeCaliper[4];
    }

    // Requirement definitions
    requirement def MaxStoppingDistance {
        doc /* The vehicle stopping distance shall not exceed the specified threshold from reference speed under emergency braking conditions. */
    }
}
