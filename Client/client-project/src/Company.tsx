import axios from "axios";
import {useState, useEffect} from 'react';
import Modal from "./Modal";

function Company(){
    const [company, setCompany] = useState("");
    const [content, setContnet] = useState([]);
    const [isMOdal, setIsModal] = useState(false);
    const [data, setData] = useState(null);


    const fetchApi = async () => {
        try{
            console.log("fetchApi start");
            const response = await axios.get('http://localhost:8080/?input_parameter='+company);
            console.log(response.data);
            
            setContnet(response.data);
        } catch(error){
            console.log(error);
        }

    }

    function handleCompanyChange(event: any){
        setCompany(event.target.value);
        console.log(event.target.value);
    }

    function handleCompany(){
        console.log('start');
        fetchApi();
    }

    function editEmployee(event: any){
        const data = event.target.getAttribute('data-item');
        setData(data);
        console.log(data);
        setIsModal( ! isMOdal );
        //console.log(isMOdal);
    }

    const handleClose = () => {setIsModal(false);
        console.log(Modal);
    }

    return(
        <div>
            <input type="text" id="company-code" placeholder="Enter company code" onChange={handleCompanyChange}></input>
            <button onClick={handleCompany}>Submit</button>
            <div>
                    <table>
                        <tr>
                            <th>Employee Code</th>
                            <th>First Name E</th>
                            <th>First Name A</th>
                            <th>Father Name E</th>
                            <th>Father Name A</th>
                            <th>Marital Status</th>
                        </tr>
                        {
                             content.map((value, index) => 
                                <tr key={index}>
                                    <td>{value.employeecode}</td>
                                    <td>{value.empfirstnamee}</td>
                                    <td>{value.empfirstnamea}</td>
                                    <td>{value.empfathernamee}</td>
                                    <td>{value.empfathernamea}</td>
                                    <td>{value.maritalstatus == "M" ? "Married" : "Single"}</td>
                                    <td><button data-item={value.companycode} onClick={(e) => editEmployee(e)}>Edit</button></td>
                                </tr>
                            )
                        }
                    </table>
            </div>
            

            {isMOdal && <Modal empdata={data} handleClose={handleClose}></Modal>}
        </div>
    )
}
export default Company