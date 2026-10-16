package ArquitecturaVehiculo {
    doc /* Instanciación y ensamblado de componentes */
    import DefinicionesSistema::*;

    part vehiculo {
        part motorPrincipal : Motor;
        part chasisEstructural : Chasis;
    }
}
