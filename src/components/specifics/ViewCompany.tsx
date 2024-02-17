import { Raleway } from "next/font/google";
import { useRouter } from "next/router";

const raleway = Raleway({ subsets: ["latin"] });

export default function ViewCompany() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
        
   
  };

  return (
    <div>
      <div>
      <h1>Formulário para cadastro de empresa</h1>
      </div>
      
    

    </div>
  );
}
