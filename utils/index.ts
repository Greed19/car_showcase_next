import { CarFetchType, FilterProps } from "@/types";

const headers= {
    'x-rapidapi-key': '0b8870a627mshda824dd89bb6a4cp13f44cjsne6cb681fdcae',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
}

export const fetchCars = async(filters:FilterProps) => {
    const { manufacturer, year, model, limit, fuel } = filters;
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`    
    try {
        const response = await fetch(url,{headers})
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}
export const fetchCarImage = (car:CarFetchType,angle?:string) => {
    const url = new  URL("https://cdn.imagin.studio/getimage");
    const {make, year, model} = car
    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('paintdescription','radiant-green')
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('make', make);
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
    
    return `${url}`;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

  export const updateSearchParams = (type:string, value:string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(type,value);
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        return newPathname
  }