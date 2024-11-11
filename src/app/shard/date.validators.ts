import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

// export function DateValidator(
//   control: AbstractControl
// ): { [key: string]: boolean } | null {
//   const datedebut = control.get("dateDebut");
//   const datefin = control.get("dateFin");
//   if (datedebut?.pristine || datefin?.pristine) {
//     return null;
//   }
//   return datedebut && datefin && datedebut.value > datefin.value
//     ? { dateValue: true }
//     : null;
// }
export function DateValidator(
  startDateField: string,
  endDateField: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const startDateControl = control.get(startDateField);
    const endDateControl = control.get(endDateField);

    if (startDateControl?.pristine || endDateControl?.pristine) {
      return null;
    }

    return startDateControl && endDateControl && startDateControl.value > endDateControl.value
      ? { dateValue: true }
      : null;
  };
}