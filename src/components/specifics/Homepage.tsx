import styles from "@/styles/home.module.css";
import { useState, useEffect } from "react";
import { CompanyDTO } from "@/dto/CompanyDTO";
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

export default function Homepage() {
  const router = useRouter();
  const { "nucleo-token": token } = parseCookies();

  const [nameFilter, setNameFilter] = useState('');
  const [documentFilter, setDocumentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const [companies, setCompanies] = useState<CompanyDTO[]>([]);

  useEffect(() => {
    if (!token) {
      router.push('/');
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

    const nomeFiltroElement = document.getElementById('nomeFiltro') as HTMLInputElement | null;
    const documentoFiltroElement = document.getElementById('documentoFiltro') as HTMLInputElement | null;
    const cidadeFiltroElement = document.getElementById('cidadeFiltro') as HTMLInputElement | null;

    const newNameFilter = nomeFiltroElement ? nomeFiltroElement.value : '';
    const newDocumentFilter = documentoFiltroElement ? documentoFiltroElement.value : '';
    const newCityFilter = cidadeFiltroElement ? cidadeFiltroElement.value : '';

    setNameFilter(newNameFilter);
    setDocumentFilter(newDocumentFilter);
    setCityFilter(newCityFilter);
  };

  const handleDelete = async (companyId: any) => {
    try {
      await fetch(`https://api-coordinates.onrender.com/company/${companyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      alert("Registro excluído com sucesso.")
      window.location.reload();
    } catch (error) {
      alert(`Erro ao excluir a empresa: ${error}`);
    }

  };

  const handleViewDetails = (companyId: any) => {
    router.push(`/view/${companyId}`);
  };

  const handleEdit = (companyId: any) => {
    router.push(`/edit/${companyId}`);
  };

  const handleNavigation = (coordinatesX: number | undefined, coordinatesY: number | undefined) => {
    var urlMaps = `https://www.google.com.br/maps/place/${coordinatesX},${coordinatesY}`;
    window.open(urlMaps, '_blank');
  };

  const formatDocument = (document: string): string => {
    if (document.length === 11) {
      return `${document.substring(0, 3)}.${document.substring(3, 6)}.${document.substring(6, 9)}-${document.substring(9)}`;
    } else if (document.length === 14) {
      return `${document.substring(0, 2)}.${document.substring(2, 5)}.${document.substring(5, 8)}/${document.substring(8, 12)}-${document.substring(12)}`;
    } else {
      return document;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <main className={styles.main}>
          <div className={styles.login_form}>

            <button className={styles.btn_cadastrar} onClick={() => router.push(`/cadastrar`)} title="Botão para cadastrar novo empreendimento">Cadastrar novo empreendimento</button>
            <div className="">
              <h1 className="d-flex justify-content-center mt-5 mb-5 display-5">PESQUISAR EMPREENDIMENTOS</h1>
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
                  {companies
                    .sort((a, b) => {
                      if (a.name && b.name) {
                        return a.name.localeCompare(b.name);
                      }
                      return 0;
                    })
                    .map((company) => (

                      <tr key={company.id}>
                        <td className={styles.actions}>
                          <button onClick={() => handleNavigation(company.coordinatesX, company.coordinatesY)} className={styles.btn_icon}><i className="fa-solid fa-location-dot" title="Visite o ponto no Google Maps."></i></button>
                          <button onClick={() => handleEdit(company.id)} className={styles.btn_icon}><i className="fa-solid fa-arrows-rotate" title="Atualize os dados desta empresa."></i></button>
                          <button onClick={() => handleDelete(company.id)} className={styles.btn_icon}><i className="fa-solid fa-trash" title="Exclua está empresa."></i></button>
                          <button onClick={() => handleViewDetails(company.id)} className={styles.btn_icon}><i className="fa-solid fa-eye" title="Confira as informações da empresa."></i></button>
                        </td>
                        <td className={styles.actions}>{company.name}</td>
                        <td className={styles.actions}>{company.document && formatDocument(company.document)}</td>
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
