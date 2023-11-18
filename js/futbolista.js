import persona from "./persona.js";

class futbolista extends persona{
    constructor(id,nombre,apellido,edad,titulo,facultad,anoGraduacion){
        super(id,nombre,apellido,edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.anoGraduacion = anoGraduacion;
    }

    toString() {
        return `id ${this.id} nombre ${this.nombre} apellido ${this.apellido} Edad ${this.edad} titulo ${this.titulo} facultad ${this.facultad} anoGraduacion ${this.anoGraduacion}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

export default futbolista;