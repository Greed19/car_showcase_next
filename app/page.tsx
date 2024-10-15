import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default async function Home({searchParams}:any) {
  console.log(searchParams,'searchParamszxc')
  const searchPara = {
    manufacturer: searchParams?.manufacturer || '',
    year: searchParams?.year || 2024,
    fuel: searchParams?.fuel || '',
    limit: searchParams?.limit || 10,
    model: searchParams?.model || '',
  }
  const allCars = await fetchCars(searchPara)
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
  return (
    <main className="overflow-hidden">
      <Hero />
      <section id="discover" className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>  
        </div>
        {
          !isDataEmpty ? 
          (
          <section>
            <div className="home__cars-wrapper">
              {
                allCars?.map((car) => (
                  <CarCard car={car} key={car.model} />
                ))
              }
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars?.length}
              />
          </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }
      </section>
    </main>
  );
}
