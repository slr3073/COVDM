import {Component, Inject} from "@angular/core"
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"
import {DialogData} from "../models/DialogData"
import {ThemePalette} from "@angular/material/core"

@Component({
    selector: "app-dialog-insertion-avis",
    templateUrl: "./dialog-insertion-avis.component.html",
    styleUrls: ["./dialog-insertion-avis.component.scss"]
})
export class DialogInsertionAvisComponent {

    constructor(public dialogRef: MatDialogRef<DialogInsertionAvisComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {    }

    onNoClick(): void {
        this.dialogRef.close()
    }

    getRightColor(isInvalid: boolean, isTouched): ThemePalette {
        return isInvalid && isTouched ? "warn" : "primary"
    }
}
