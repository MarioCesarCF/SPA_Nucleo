import { useRouter } from "next/router";
//Alterar a parte de cliente para empresa (company)
export default function Cliente() {
  const router = useRouter();
  const { id } = router.query;

  const clientes = [
    {
      id: "123",
      name: "Cliente A",
      document: "11.222.333/0000-99",
      city: "Ecops",
      coordenadaX: -18.2222,
     coordenadaY: -40.5555,
     informacoes: "Número de contato do responsável (27)99999-9999"
    },
  ];
  
  //possível forma de usar filtro

  const client = clientes.map((element) => {
    if (element.id === id) {
      return element;
    }
  })
  
  return (
    <>
      <div>
        {/*
          title com nome do cliente
          todas as informações cadastradas e botões para atualizar dados e excluir cliente
          por último o mapa clicável que abre no maps
        */}

        <h1>{client[0].name}</h1>
        <h2>{client[0].document}</h2>
        <h2>{client[0].city}</h2> 
      </div>
    </>
  )
}