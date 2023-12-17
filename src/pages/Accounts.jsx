import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";
import { getAllAccounts } from "../selectors/accountServices.mjs";
import { CustomTable } from "../components/table/CustomTable";


export const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllAccounts();
                setAccounts(data.data);
            } catch (err) {
                setHasError(true);
            }
        };
        fetchData();
    }, []);
    
    return (
        <>
            <h1> Listado de cuentas </h1>
            <section className="accounts-list">
                {!hasError ?
                    accounts.length > 0 ?
                        <CustomTable data={accounts} /> :
                        <>
                            < Spinner animation="border" />
                            <p>Un momento por favor, estamos cargando la información</p>
                        </>
                    :
                    <h2> Error cargando la información, intente nuevamente por favor.</h2>
                }
            </section>
        </>
    )
}