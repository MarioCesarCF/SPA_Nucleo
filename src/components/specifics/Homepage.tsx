import styles from "../../styles/home.module.css";
import { Raleway } from "next/font/google";
import { useState, useEffect } from "react";
import { CompanyDTO } from "@/dto/CompanyDTO";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const raleway = Raleway({ subsets: ["latin"] });

export default function Homepage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<CompanyDTO[]>([]);

  useEffect(() => {
    // Aqui você pode verificar se o token JWT está presente nos cookies
    // Se não estiver, redirecione para a página de login

  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      // Aqui você faria uma requisição para obter os dados das empresas da sua API
      // Exemplo fictício de como obter os dados das empresas:
      const fetchData = async () => {
        try {
          const response = await fetch('https://api-coordinates.onrender.com/company', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          
          setCompanies(data.results || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, []);

  const handleEdit = (company: CompanyDTO) => {
    // Redireciona o usuário para a página de edição da empresa com base no ID da empresa
    router.push(`/edit-company/${company}`);
  };

  const handleDelete = (companyId: any) => {
    fetch(`https://api-coordinates.onrender.com/company?id=${companyId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
  };

  const handleViewDetails = (companyId: any) => {
    // Redireciona o usuário para a página de detalhes da empresa com base no ID da empresa
    // Ainda não implementado
    router.push(`/company-details/${companyId}`);
  };

  /*
  useEffect(() => {
    // Aqui você pode verificar se o token JWT está presente nos cookies
    // Se não estiver, redirecione para a página de login
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  const [itens, setItens] = useState(
    [
      
      {
        id: "123",
        name: "Cliente A",
        document: "11.222.333/0000-99",
        city: "Ecops",
        coordenadaX: -18.2222,
        coordenadaY: -40.5555,
        informacoes: "Número de contato do responsável (27)99999-9999"
      },

      {
        id: "456",
        name: "Cliente B",
        document: "11.222.333/0000-99",
        city: "Ecops",
        coordenadaX: -18.2222,
        coordenadaY: -40.5555,
        informacoes: "Número de contato do responsável (27)99999-9999"
      },
      
    ]
  );

  function getClient() {
    fetch('https://api-coordinates.onrender.com/client', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data))
  }

  function updateClient(item: ClientDto) {
    fetch(`https://api-coordinates.onrender.com/client?id=${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => getClient())
  }

  function deleteClient(item: ClientDto) {
    fetch(`https://api-coordinates.onrender.com/client?id=${item.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => getClient())
  }

  useEffect(() => {
    getClient()
  }, [])

  */
  return (
    <div className={styles.pageContainer}>
      <div className={raleway.className}>
        <main className={styles.main}>
          <div className={styles.login_form}>

            <button className="btn btn-success mt-2 ml-2" id="btn_cadastrar" onClick={() => router.push(`/cadastrar`)}>Cadastrar novo cliente</button>

            <div className="container">
              <h1 className="d-flex justify-content-center mt-5 mb-5 display-5">PESQUISAR CLIENTES</h1>
              <form>
                <div className="form-group col-md-4 offset-md-4">
                  <label htmlFor="nomeFiltro">Nome:</label>
                  <input type="text" id="nomeFiltro" className="form-control"></input>
                </div>
                <div className="form-group col-md-4 offset-md-4">
                  <label htmlFor="documentoFiltro">Documento:</label>
                  <input type="text" id="documentoFiltro" className="form-control"></input>
                </div>
                <div className="form-group col-md-4 offset-md-4">
                  <label htmlFor="cidadeFiltro">Cidade:</label>
                  <input type="text" id="cidadeFiltro" className="form-control"></input>
                </div>
                <br></br>
                <button className="btn btn-primary col-md-2 offset-md-5">Pesquisar</button>
              </form>
            </div>
            <br></br>

            <div className="d-flex justify-content-center">
              <table className="table w-75 table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Ações</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Coordenada X</th>
                    <th scope="col">Coordenada Y</th>
                    <th scope="col">Informações gerais</th>
                  </tr>
                </thead>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td className="d-flex justify-content-center">
                      <button onClick={() => handleEdit(company)} className={styles.btn_icon}><i className="fa-solid fa-location-dot"></i></button>
                      <button onClick={() => handleEdit(company)} className={styles.btn_icon}><i className="fa-solid fa-arrows-rotate"></i></button>
                      <button onClick={() => handleDelete(company.id)} className={styles.btn_icon}><i className="fa-solid fa-trash"></i></button>
                      <button onClick={() => handleViewDetails(company.id)} className={styles.btn_icon}><i className="fa-solid fa-eye"></i></button>
                    </td>
                    <td >{company.name}</td>
                    <td>{company.document}</td>
                    <td>{company.city}</td>
                    <td>{company.coordinatesX}</td>
                    <td>{company.coordinatesY}</td>
                    <td>{company.informations}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
