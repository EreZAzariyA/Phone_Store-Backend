export class BrandModel {
      public brandId: string;
      public brandName: string;

      constructor(brand: BrandModel) {
            this.brandId = brand.brandId;
            this.brandName = brand.brandName;
      }
}

