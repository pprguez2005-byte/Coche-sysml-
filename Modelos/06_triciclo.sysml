package SistemaTriciclo {
    doc /* Ensamblado principal y conexiones internas del triciclo electrico Tadpole */
    private import ScalarValues::*;
    private import TiposBase::*;
    private import SubsistemaChasis::*;
    private import SubsistemaBateria::*;
    private import SubsistemaPowertrain::*;
    private import SubsistemaDireccion::*;
    private import SubsistemaRueda::*;

    part def ElectricTricycle {
        // Subsistemas instanciados
        part chassis : Chassis;
        part battery : BatterySystem;
        part powertrain : Powertrain;
        part steering : SteeringSystem;
        part frontWheelLeft : Wheel;
        part frontWheelRight : Wheel;
        part rearWheel : Wheel;

        // Conexiones estructurales al chasis
        connect chassis.batteryMount to battery.chassisMount;
        connect chassis.powertrainMount to powertrain.chassisMount;
        connect chassis.steeringMount to steering.chassisMount;
        connect chassis.frontLeftMount to frontWheelLeft.hubMount;
        connect chassis.frontRightMount to frontWheelRight.hubMount;
        connect chassis.rearMount to rearWheel.hubMount;

        // Conexiones funcionales
        connect battery.powerOut to powertrain.powerIn;
        connect steering.leftTieRod to frontWheelLeft.steerInput;
        connect steering.rightTieRod to frontWheelRight.steerInput;
        connect powertrain.driveOut to rearWheel.driveInput;

        // Balance de masa total
        attribute totalMass : Mass;
        assert constraint massSum {
            totalMass == chassis.mass + battery.mass + powertrain.mass +
                         steering.mass + frontWheelLeft.mass + frontWheelRight.mass +
                         rearWheel.mass
        }
    }

    // Instancia de uso
    part triciclo : ElectricTricycle;
}
