import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [CommonModule, HousingLocationComponent],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    readonly baseUrl = "https://angular.dev/assets/images/tutorials/common";
    housingService: HousingService = inject(HousingService);

    housingLocationList: HousingLocation[] = [];
    filteredLocationList: HousingLocation[] = [];

    constructor() {
        // this.housingLocationList = this.housingService.getAllHousingLocations();
        // this.filteredLocationList = this.housingLocationList;
        this.housingService
            .getAllHousingLocations()
            .then((listHousingLocation) => {
                this.housingLocationList = listHousingLocation;
                this.filteredLocationList = listHousingLocation;
            });
    }

    filterResults(searchText: string) {
        if (!searchText) {
            console.log(`no input search value`);
            return;
        }
        const searchCity = searchText.toLowerCase();
        console.log(`Search: ${searchCity}`);
        const results = this.housingLocationList.filter((houseObj) => {
            const cityHouse = houseObj.city?.toLowerCase();
            if (!cityHouse) return;
            return cityHouse.includes(searchCity);
        });
        this.filteredLocationList = results;
    }
}
