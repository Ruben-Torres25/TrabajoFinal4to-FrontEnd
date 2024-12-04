import Cards from "@/app/components/cards/cards";
import Carrousel from "@/app/components/carrousel/carrousel";
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/navBar/navBar";


export default function Homes() {
  return (
    <>
      <NavBar />
      <div className="bg-gray-800  flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
      </div>
    <div className="bg-gray-800 pt-8 pb-8">
      <Carrousel />
      </div>
      <div className="bg-gray-800 flex flex-col items-center">
    <div className="h-0.5 w-[90%] bg-gray-500" />
  </div>

      <div className='bg-gray-800 pt-8 pb-8'>
      <Cards />
      </div>

      <div className="bg-gray-800 flex flex-col items-center">
    <div className="h-0.5 w-[90%] bg-gray-500" />
  </div>
  
      <Footer />
    </>
  );
}