import CardsGraficos from "@/app/components/cardsGraficos/cardsGraficos";
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/navBar/navBar";
import PresentacionEmpresas from "@/app/components/presentacionEmpresas/presentacionEmpresas";


export default function Empresas() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-gray-800 flex-grow flex flex-col items-center">
        <div className="h-0.5 w-[90%] bg-gray-500" />
        <PresentacionEmpresas />
      </div>
      <CardsGraficos/>
      <Footer />
    </div>
  );
}