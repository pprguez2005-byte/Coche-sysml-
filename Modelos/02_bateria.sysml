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

    // Requisito del subsistema: se recopilará automáticamente en vistaRequisitos (07_vistas.sysml)
    requirement def ReqMasaBateria {
        // 'subject' indica a qué tipo de bloque se aplica este requisito
        subject bateria : BatterySystem;
        doc /* La masa del sistema de batería no debe superar los 15 kg para facilitar el montaje. */
        // 'require constraint' formaliza la condición que debe cumplirse
        require constraint { bateria.mass <= 15.0 }
    }
}
