import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Directive({
    selector: '[formControl][disableIf]'
})
export class DisableFormControlDirective {
    @Input() formControl: FormControl;

    get disableIf(): boolean {
        return !!this.formControl && this.formControl.disabled;
    }

    @Input() set disableIf(v: boolean) {
        if (!this.formControl) return;
        else if (v) this.formControl.disable();
        else this.formControl.enable();
    }
}
