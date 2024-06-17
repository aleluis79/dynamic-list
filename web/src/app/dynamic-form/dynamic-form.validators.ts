import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const SelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const item = control?.value
    return typeof item === 'string' ? { selected: true } : null;
  }
  
  
  export const CuitValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  
    // Eliminar cualquier carácter no numérico
    const cuitCuilNumerico = control?.value.replace(/\D/g, '');
  
    // Verificar que la longitud sea 11
    if (cuitCuilNumerico.length !== 11) {
        return { cuit: true };
    }
  
    // Convertir a un array de números
    const cuitCuilArray = cuitCuilNumerico.split('').map(Number);
  
    // Coeficientes según la posición
    const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  
    // Calcular el número verificador
    const verificador = cuitCuilArray[10];
    const suma = cuitCuilArray.slice(0, 10).reduce((acc: number, num: number, index: number) => acc + num * coeficientes[index], 0);
    const resto = suma % 11;
    const digitoCalculado = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;
  
    // Verificar el dígito calculado con el dígito verificador
    return digitoCalculado === verificador ? null : { cuit: true };
  
  }
  
  export const CBUValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return validarCBU(control?.value) ? null : { cbu: true };
  }
  
  export const CVUValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return validarCBU(control?.value) ? null : { cvu: true };
  }
  
  function validarCBU(cbu: string) {
    if (cbu.length != 22) { return false }
    return validarCodigoBanco(cbu.slice(0,8)) && validarCuenta(cbu.slice(8,22))
  }
  
  function validarCodigoBanco(codigo: string) {
   if (codigo.length != 8) { return false }
   var banco = codigo.slice(0,3)
  
   var sucursal = codigo.slice(3,7)
   var digitoVerificador2 = codigo[7]
  
   var suma = parseInt(banco[0]) * 7 + parseInt(banco[1]) * 1 + parseInt(banco[2]) * 3 + parseInt(sucursal[0]) * 9 + parseInt(sucursal[1]) * 7 + parseInt(sucursal[2]) * 1 + parseInt(sucursal[3]) * 3
  
   var diferencia = 10 - (suma % 10)
  
   if(parseInt(digitoVerificador2)!=0 && diferencia == parseInt(digitoVerificador2)) return true;
   if(parseInt(digitoVerificador2)==0 && diferencia == 10) return true;
  
   return false;
  }
  
  function validarCuenta(cuenta: string) {
   if (cuenta.length != 14) { return false }
   var digitoVerificador = parseInt(cuenta[13])
   var suma = parseInt(cuenta[0]) * 3 + parseInt(cuenta[1]) * 9 + parseInt(cuenta[2]) * 7 + parseInt(cuenta[3]) * 1 + parseInt(cuenta[4]) * 3 + parseInt(cuenta[5]) * 9 + parseInt(cuenta[6]) * 7 + parseInt(cuenta[7]) * 1 + parseInt(cuenta[8]) * 3 + parseInt(cuenta[9]) * 9 + parseInt(cuenta[10]) * 7 + parseInt(cuenta[11]) * 1 + parseInt(cuenta[12]) * 3
   var diferencia = 10 - (suma % 10)
  
   if(digitoVerificador!=0 && diferencia == digitoVerificador) return true;
   if(digitoVerificador==0 && diferencia == 10) return true;
  
   return false;
  
  }