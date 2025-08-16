
import { arrancar } from "./clicaSlot.js";
// atualiza os dados em função do avanço de tempo
export function avancaTempoSlot(slot) {
  slot.controleTempo = true;
  if (slot.estado === "plantado") {
    //se a planta está há 5 semanas sem água, isto é, está para completar 6 semanas, ela morre e o terreno é limpo
    if (slot.planta.tempoSede === 5) {
      arrancar(slot);
      return;
    }
    //se tempoSede > 0, aumenta o tempo de sede e não cresce
    if (slot.planta.sede) {
      //incrementa o tempo de sede
      slot.planta.tempoSede++;
    } else {
      //se a planta não está com sede, ela cresce desde que já não esteja no crescimento maaximo, e volta a ficar com sede
      if (slot.planta.ciclosCrescimento < slot.planta.crescimentoMaximo)
      {
        slot.planta.ciclosCrescimento++;
        slot.planta.sede = true;
        slot.planta.tempoSede = 1;
      }  
    }
  }
}