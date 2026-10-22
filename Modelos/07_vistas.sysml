package VistasTriciclo {
    doc /* Definición de vistas y diagramas arquitectónicos del triciclo eléctrico */
    private import StandardViewDefinitions::*;
    private import SubsistemaChasis::*;
    private import SubsistemaBateria::*;
    private import SubsistemaPowertrain::*;
    private import SubsistemaDireccion::*;
    private import SubsistemaRueda::*;
    private import SistemaTriciclo::*;
    private import ComportamientoTriciclo::*;

    // Vista 1: Estructura general y descomposición de partes (equivalente a BDD)
    view vistaEstructura : GeneralView {
        doc /* Muestra únicamente la jerarquía de partes y puertos del triciclo */
        expose ElectricTricycle;
        filter @SysML::PartUsage or @SysML::PartDefinition
            or @SysML::PortUsage or @SysML::PortDefinition;
    }

    // Vista 2: Interconexiones internas y puertos (equivalente a IBD)
    view vistaConexiones : InterconnectionView {
        doc /* Muestra el cableado eléctrico y acoplamientos mecánicos entre subsistemas */
        expose ElectricTricycle;
    }

    // Vista 3: Requisitos recopilados automáticamente de todos los paquetes
    // Nota: Si en el futuro creas un paquete nuevo (ej. SubsistemaFrenos), añade aquí 'expose NuevoPaquete::*;'
    view vistaRequisitos : GeneralView {
        doc /* Recopila automáticamente cualquier requisito definido en los paquetes expuestos */
        expose SubsistemaChasis::*;
        expose SubsistemaBateria::*;
        expose SubsistemaPowertrain::*;
        expose SubsistemaDireccion::*;
        expose SubsistemaRueda::*;
        expose SistemaTriciclo::*;
        filter @SysML::RequirementDefinition
            or @SysML::RequirementUsage
            or @SysML::SatisfyRequirementUsage;
    }

    // Vista 4: Máquina de estados de los modos de operación (equivalente a STM)
    view vistaModosOperacion : StateTransitionView {
        doc /* Muestra los 3 estados operativos del triciclo y sus transiciones */
        expose ComportamientoTriciclo::ModosTricicloStateMachine;
    }

    // Vista 5: Máquina de estados del subsistema de batería (equivalente a STM)
    view vistaEstadosBateria : StateTransitionView {
        doc /* Muestra los 3 estados operativos de la batería (desconectada, cargando, descargando) y sus transiciones */
        expose SubsistemaBateria::EstadosBateriaStateMachine;
    }
}
