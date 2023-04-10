import { DecimalPipe } from '@angular/common';
const decimalPipe = new DecimalPipe('en-US');

export class Helper {
  static timeFormat(timeData: any) {
    const time: any = timeData / 60;

    const time2 =
      time.toString()[0] == 0
        ? `${
            decimalPipe.transform(time, '1.2-2')?.toString().split('.')[1]
          } minutes`
        : `${decimalPipe.transform(time, '1.2-2')} hours`;

    return time2;
  }

  static extractAddress(address: string): string {
    const addressParts = address.split(', ');
    const relevantParts = addressParts.slice(1, 5); // Change the indices here to select the relevant parts of the address
    return relevantParts.join(', ');
  }
}
