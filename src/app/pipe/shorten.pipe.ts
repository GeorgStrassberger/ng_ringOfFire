import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * A Pipe to cute off after (limit) characters
   */
  transform(value: any, limit: number = 100) {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    } else {
      return value;
    }
  }
}
