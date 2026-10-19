package ComportamientoTriciclo {
    doc /* Máquina de estados mínima para modelar los modos operativos del triciclo eléctrico */

    // 1. Eventos que disparan los cambios de estado (se modelan como 'item def')
    item def Encender;
    item def IniciarMarcha;
    item def Detener;
    item def Apagar;

    // 2. Definición de los 3 estados posibles del vehículo ('state def')
    state def ModoApagado {
        doc /* El sistema eléctrico está desconectado. */
    }

    state def ModoListo {
        doc /* El triciclo está encendido y detenido, esperando orden del acelerador. */
    }

    state def ModoConduciendo {
        doc /* El tren motriz entrega par a la rueda trasera. */
    }

    // 3. Máquina de estados principal que conecta los estados mediante transiciones
    state def ModosTricicloStateMachine {
        // Punto de entrada inicial: al arrancar el modelo comienza en 'apagado'
        entry;
        then apagado;

        // Instancias de los 3 estados dentro de la máquina
        state apagado : ModoApagado;
        state listo : ModoListo;
        state conduciendo : ModoConduciendo;

        // Transiciones: transition <nombre> first <origen> accept <Evento> then <destino>;
        transition encender_vehiculo first apagado accept Encender then listo;
        transition iniciar_conduccion first listo accept IniciarMarcha then conduciendo;
        transition detener_vehiculo first conduciendo accept Detener then listo;
        transition apagar_vehiculo first listo accept Apagar then apagado;
    }
}
