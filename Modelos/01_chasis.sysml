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
    requirement def ReqMasaChasis {
        // 'subject' indica a qué tipo de bloque se aplica este requisito
        subject chasis : Chassis;
        doc /* La masa del chasis no debe superar los 200 kg para facilitar el montaje. */
        // 'require constraint' formaliza la condición que debe cumplirse
        require constraint { chasis.mass <= 15.0 }
    }
}
