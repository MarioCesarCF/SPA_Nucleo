import { useRouter } from "next/router";
import style from "@/styles/adminpage.module.css";
import { parseCookies } from 'nookies';
import { useState, useEffect } from "react";
import { CompanyDTO } from "@/dto/CompanyDTO";
import { UserDTO } from "@/dto/UserDTO";

const AdminPage = () => {
    const router = useRouter();
    const { "nucleo-token": token } = parseCookies();
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [companies, setCompanies] = useState<CompanyDTO[]>([]); // Estado para armazenar os empreendimentos

    useEffect(() => {
        const fetchData = async () => {
            try {
                let apiUrlUsers = 'https://api-coordinates.onrender.com/user';
                let apiUrlCompanies = 'https://api-coordinates.onrender.com/company'; // URL para obter empreendimentos

                const responseUsers = await fetch(apiUrlUsers, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });

                const responseCompanies = await fetch(apiUrlCompanies, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!responseUsers.ok || !responseCompanies.ok) {
                    throw new Error('Failed to fetch data');
                }

                const dataUsers = await responseUsers.json();
                const dataCompanies = await responseCompanies.json();

                setUsers(dataUsers.results || []);
                setCompanies(dataCompanies.results || []);
                console.log(responseUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <button className={style.btn_return_home} onClick={() => router.push(`/home`)}><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></button>
            <div className={style.container}>
                <div>
                    <h1 className={style.title}>Acesso Administrador</h1>
                </div>
                <div className={style.btns}>
                    <div className={style.btn_style}>
                        <button>Excluir usuário</button>
                        <select>
                            <option>Selecione</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.btn_style}>
                        <button>Excluir empreendimentos</button>
                        <select>
                        <option>Selecione</option>
                            {companies.map(company => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default AdminPage;

/*
<div className={style.btn_style}>
                        <form>
                            <input type="text" placeholder="nome" />
                            <input type="mail" placeholder="email" />
                            <input type="password" placeholder="senha" />
                            <input type="text" placeholder="documento" />
                            <select>
                            <option>Administrador</option>
                            <option>Técnico</option>
                            <option>Cliente</option>
                            </select>
                            <button>Cadastrar usuário</button>
                        </form>
                    </div>
*/