import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkinBeforeCheckoutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkin = control.get('checkinTime')?.value;
    const checkout = control.get('checkoutTime')?.value;

    if (!checkin || !checkout) {
      return null; // 如果任一字段为空，则不进行验证
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    // 这里进行更严格的检查，确保日期有效
    if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
      return { invalidDate: true }; // 返回一个错误对象，指示日期无效
    }

    if (checkinDate >= checkoutDate) {
      return { checkinBeforeCheckout: true };
    }

    return null;
  };
}
