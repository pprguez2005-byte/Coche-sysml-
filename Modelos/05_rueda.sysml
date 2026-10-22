package SubsistemaRueda {
    doc /* Definicion del conjunto de rueda descompuesto en llanta y neumatico */
    private import ScalarValues::*;
    private import TiposBase::*;

    // 1. Parte: Llanta (Rim) - Elemento estructural y de montaje
    part def Rim {
        doc /* Llanta sobre la que se asienta el neumatico y se ancla al buje */
        attribute mass : Mass;
        attribute rimDiameter : Real = 26.0;   // Diametro de la llanta en pulgadas
        attribute rimWidth : Real = 2.0;       // Ancho de la llanta en pulgadas

        port hubInterface : MechanicalPort;   // Union con el eje/buje
        port tireSeat : MechanicalPort;       // Labio de asiento para el neumatico
    }

    // 2. Parte: Neumatico (Tire) - Elemento neumatico que soporta la presion
    part def Tire {
        doc /* Cubierta de caucho con camara de aire/presion */
        attribute mass : Mass;
        attribute outerDiameter : Real = 26.0; // Diametro exterior total en pulgadas
        attribute tireWidth : Real = 2.5;     // Ancho del neumatico en pulgadas

        attribute vehicleMass : Mass;         // Carga/masa del vehiculo soportada (kg)
        attribute recommendedPressure : Real; // Presion recomendada en bar

        // Calculo de la presion recomendada segun el peso del vehiculo
        assert constraint calculateTirePressure {
            recommendedPressure == 1.8 + (vehicleMass * 0.012)
        }

        port rimMount : MechanicalPort;       // Asiento sobre la llanta
    }

    // 3. Conjunto Rueda (Wheel) - Ensamblado visible en los esquemas
    part def Wheel {
        doc /* Conjunto rueda compuesto por llanta y neumatico */
        attribute mass : Mass;
        attribute vehicleMass : Mass;
        attribute recommendedPressure : Real;

        // Subpartes que aparecen como bloques hijos en el esquema BDD
        part rim : Rim;
        part tire : Tire;

        // Balance de masa: la masa total de la rueda es la suma de llanta y neumatico
        assert constraint wheelMassBalance {
            mass == rim.mass + tire.mass
        }

        // Propagacion de parametros
        assert constraint propagateParams {
            tire.vehicleMass == vehicleMass and
            recommendedPressure == tire.recommendedPressure
        }

        // Puertos externos del conjunto (mantienen compatibilidad con el triciclo)
        port hubMount : MechanicalPort;
        port driveInput : MechanicalPort;
        port steerInput : MechanicalPort;

        // Conexiones internas visibles en el esquema de interconexiones (IBD)
        connect rim.tireSeat to tire.rimMount;
        connect hubMount to rim.hubInterface;
    }
}
