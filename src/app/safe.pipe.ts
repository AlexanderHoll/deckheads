import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})

// old pipe - copy and pasted, allowed for as selection between pipes
// HTML passing of 'resourceurl' for mixcloud player, didn't work with inserting adjacent html back into DOM

// export class SafePipe implements PipeTransform {

//   constructor(protected sanitizer: DomSanitizer) {}
 
//   // establish safe pipe dom sanitizer for any situation where security needs to be bypassed
//   public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//     switch (type) {
//       case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
//       case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
//       case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
//       case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
//       // used to bypass security on mixcloud embed url
//       case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//       default: throw new Error(`Invalid safe type specified: ${type}`);
//     }
//   }
// }

export class SafePipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    // used to bypass security on mixcloud embed url
    return this.sanitized.bypassSecurityTrustResourceUrl(value);
  }
}