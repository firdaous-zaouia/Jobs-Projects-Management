import { AbstractControl } from "@angular/forms";

export function DateValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const datedebut = control.get("dateDebut");
  const datefin = control.get("dateFin");
  if (datedebut?.pristine || datefin?.pristine) {
    return null;
  }
  return datedebut && datefin && datedebut.value > datefin.value
    ? { dateValue: true }
    : null;
}
