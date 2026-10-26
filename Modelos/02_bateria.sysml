package SubsistemaBateria {
    doc /* Definicion del sistema de almacenamiento de energia */
    private import ScalarValues::*;
    private import TiposBase::*;

    part def BatterySystem {
        attribute mass : Mass;
        attribute autonomia : Real;                 // Horas de uso continuo con carga completa (h)
        attribute temperaturaMaxima : Temperature;  // Temperatura maxima de las celdas (grados C)

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

    // Requisitos con restriccion numerica: se pueden comprobar con un valor del 'subject'
    requirement def ReqAutonomiaBateria {
        subject bateria : BatterySystem;
        doc /* La bateria debe ofrecer al menos 1 hora de uso continuo con una carga completa. */
        require constraint { bateria.autonomia >= 1.0 }
    }

    requirement def ReqTemperaturaMaximaBateria {
        subject bateria : BatterySystem;
        doc /* La temperatura de las celdas no debe superar los 60 C durante el funcionamiento para evitar su degradacion o incendio. */
        require constraint { bateria.temperaturaMaxima <= 60.0 }
    }

    // Instancia de la bateria comercial adquirida (1 h de autonomia y 290 K = 16.85 C)
    part bateriaComprada : BatterySystem {
        doc /* Bateria comercial comprada con 1 hora de autonomia y temperatura maxima de 16.85 C (290 K). */
        attribute :>> autonomia = 1.0;
        attribute :>> temperaturaMaxima = 16.85; // 290 K convertidos a grados centigrados (C)
    }

    // Relaciones 'satisfy': vinculan la bateria comprada con los requisitos formales que cumple
    satisfy requirement : ReqAutonomiaBateria by bateriaComprada;
    satisfy requirement : ReqTemperaturaMaximaBateria by bateriaComprada;

    // Requisitos textuales: solo 'doc', sin 'require constraint'
    requirement def ReqProteccionFuegoBateria {
        subject bateria : BatterySystem;
        doc /* La carcasa de la bateria debe ser de material ignifugo e impedir que el fuego de una celda se propague al resto de la bateria o al chasis. */
    }

    requirement def ReqVidaUtilBateria {
        subject bateria : BatterySystem;
        doc /* La bateria debe soportar al menos 500 ciclos completos de carga y descarga. */
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
