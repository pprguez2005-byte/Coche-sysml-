package VistasTriciclo {
    doc /* Definición de vistas y diagramas arquitectónicos del triciclo eléctrico */
    private import StandardViewDefinitions::*;
    private import SistemaTriciclo::*;

    // Vista 1: Estructura general y descomposición de partes (equivalente a BDD)
    view vistaEstructura : GeneralView {
        doc /* Muestra la jerarquía de partes del triciclo */
        expose ElectricTricycle;
    }

    // Vista 2: Interconexiones internas y puertos (equivalente a IBD)
    view vistaConexiones : InterconnectionView {
        doc /* Muestra el cableado eléctrico y acoplamientos mecánicos entre subsistemas */
        expose ElectricTricycle;
    }
}
