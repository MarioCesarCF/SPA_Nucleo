import styles from "@/styles/home.module.css";
import { useState, useEffect } from "react";
import { CompanyDTO } from "@/dto/CompanyDTO";
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function Homepage() {
  const router = useRouter();

  const [nameFilter, setNameFilter] = useState('');
  const [documentFilter, setDocumentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const [companies, setCompanies] = useState<CompanyDTO[]>([]);

  useEffect(() => {
    const { "nucleo-token": token } = parseCookies();

    if (!token) {
      router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          let apiUrl = 'https://api-coordinates.onrender.com/company';
          const queryParams = [];
          if (nameFilter) queryParams.push(`name=${encodeURIComponent(nameFilter)}`);
          if (documentFilter) queryParams.push(`document=${encodeURIComponent(documentFilter)}`);
          if (cityFilter) queryParams.push(`city=${encodeURIComponent(cityFilter)}`);
          if (queryParams.length > 0) apiUrl += `?${queryParams.join('&')}`;

          const response = await fetch(apiUrl, {
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
  }, [nameFilter, documentFilter, cityFilter]);

  const handleSearch = async (e: any) => {
    e.preventDefault();

    const newNameFilter = document.getElementById('nomeFiltro').value;
    const newDocumentFilter = document.getElementById('documentoFiltro').value;
    const newCityFilter = document.getElementById('cidadeFiltro').value;

    setNameFilter(newNameFilter);
    setDocumentFilter(newDocumentFilter);
    setCityFilter(newCityFilter);
  };

  const handleEdit = (companyId: any) => {
    // Redireciona o usuário para a página de edição da empresa com base no ID da empresa
    // Ainda não implementado
    router.push(`/company-edit/${companyId}`);
  };

  const handleDelete = async (companyId: any) => {
    const { "nucleo-token": token } = parseCookies();

    try {
      await fetch(`https://api-coordinates.onrender.com/company/${companyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir a empresa:', error);
      alert("Erro ao excluir a empresa!");
    }

  };

  const handleViewDetails = (companyId: any) => {
    // Redireciona o usuário para a página de detalhes da empresa com base no ID da empresa
    // Ainda não implementado
    router.push(`/view/${companyId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <main className={styles.main}>
          <div className={styles.login_form}>

            <button className={styles.btn_cadastrar} onClick={() => router.push(`/cadastrar`)}>Cadastrar novo cliente</button>
            <div className="">
              <h1 className="d-flex justify-content-center mt-5 mb-5 display-5">PESQUISAR CLIENTES</h1>
              <form>
                <div className={styles.form_group}>
                  <div className="form-group col-md-2 offset-md-2">
                    <label htmlFor="nomeFiltro">Nome:</label>
                    <input type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)} id="nomeFiltro" className="form-control" />

                  </div>
                  <div className="form-group col-md-2 offset-md-1">
                    <label htmlFor="documentoFiltro">Documento:</label>
                    <input type="text" value={documentFilter} onChange={e => setDocumentFilter(e.target.value)} id="documentoFiltro" className="form-control" />
                  </div>
                  <div className="form-group col-md-2 offset-md-1">
                    <label htmlFor="cidadeFiltro">Cidade:</label>
                    <input type="text" value={cityFilter} onChange={e => setCityFilter(e.target.value)} id="cidadeFiltro" className="form-control" />
                  </div>
                </div>
                <br></br>
                <div className={styles.position_btn}>
                  <button className={styles.btn_pesquisar} onClick={handleSearch}>Pesquisar</button>
                </div>
              </form>
            </div>
            <br></br>
            <div className="d-flex justify-content-center table-container">
              <table className={styles.table}>
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
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td className={styles.actions}>
                        <button onClick={() => handleEdit(company.id)} className={styles.btn_icon}><i className="fa-solid fa-location-dot" title="Visite o ponto no Google Maps."></i></button>
                        <button onClick={() => handleEdit(company.id)} className={styles.btn_icon}><i className="fa-solid fa-arrows-rotate" title="Atualize os dados desta empresa."></i></button>
                        <button onClick={() => handleDelete(company.id)} className={styles.btn_icon}><i className="fa-solid fa-trash" title="Exclua está empresa."></i></button>
                        <button onClick={() => handleViewDetails(company.id)} className={styles.btn_icon}><i className="fa-solid fa-eye" title="Confira as informações da empresa."></i></button>
                      </td>
                      <td className={styles.actions}>{company.name}</td>
                      <td className={styles.actions}>{company.document}</td>
                      <td className={styles.actions}>{company.city}</td>
                      <td className={styles.actions}>{company.coordinatesX}</td>
                      <td className={styles.actions}>{company.coordinatesY}</td>
                      <td className="">{company.informations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
