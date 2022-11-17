export class BrandModel {
      public brandId: string;
      public brand: string;
      public img: string;

      constructor(brand: BrandModel) {
            this.brandId = brand.brandId;
            this.brand = brand.brand;
            this.img = brand.img;
      }
}

