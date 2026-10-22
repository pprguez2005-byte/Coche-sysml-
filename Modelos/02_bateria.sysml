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

    // 1. Eventos que disparan los cambios de estado de la batería (se modelan como 'item def')
    item def ConectarCargador;
    item def DemandarEnergia;
    item def DesconectarBateria;

    // 2. Definición de los 3 estados posibles de la batería ('state def')
    state def EstadoDesconectada {
        doc /* La batería está aislada eléctricamente, sin entregar ni recibir energía. */
    }

    state def EstadoCargando {
        doc /* La batería está recibiendo energía desde un cargador externo. */
    }

    state def EstadoDescargando {
        doc /* La batería está suministrando energía eléctrica al tren motriz. */
    }

    // 3. Máquina de estados del subsistema de batería que conecta los 3 estados mediante transiciones
    state def EstadosBateriaStateMachine {
        // Punto de entrada inicial: la batería comienza en estado 'desconectada'
        entry;
        then desconectada;

        // Instancias de los 3 estados dentro de la máquina
        state desconectada : EstadoDesconectada;
        state cargando : EstadoCargando;
        state descargando : EstadoDescargando;

        // Transiciones: transition <nombre> first <origen> accept <Evento> then <destino>;
        transition iniciar_carga first desconectada accept ConectarCargador then cargando;
        transition finalizar_carga first cargando accept DesconectarBateria then desconectada;
        transition iniciar_descarga first desconectada accept DemandarEnergia then descargando;
        transition finalizar_descarga first descargando accept DesconectarBateria then desconectada;
    }
}
