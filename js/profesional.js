import persona from "./persona.js";

class profesional extends persona{
    constructor(id,nombre,apellido,edad,equipo,posicion,cantidadGoles){
        super(id,nombre,apellido,edad);
        this.equipo = equipo;
        this.posicion = posicion;
        this.cantidadGoles = cantidadGoles;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad} Equipo ${this.sueldo} Posicion ${this.ventas} CantidadGoles ${this.cantidadGoles}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default profesional;