import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-details",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingService = inject(HousingService);
    housingDetail: HousingLocation | undefined;

    applyForm = new FormGroup({
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        email: new FormControl(""),
    });

    constructor() {
        const housingLocId = Number(this.route.snapshot.params["id"]);
        // this.housingDetail =
        //     this.housingService.getHousingLocationById(housingLocId);
        this.housingService
            .getHousingLocationById(housingLocId)
            .then((housingDetailObj) => {
                this.housingDetail = housingDetailObj;
            });
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstName ?? "",
            this.applyForm.value.lastName ?? "",
            this.applyForm.value.email ?? ""
        );
    }
}
