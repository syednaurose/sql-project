function Modal({empdata, handleClose}: any){
    console.log(empdata.employeecode);
    return(
        <div className="modal-div">
            <div className="modal-dlg">
                <p>OK</p>
                <p>{empdata.employeecode}</p>
                <p>{empdata.employeecode}</p>
                <p>{empdata.employeecode}</p>
                <button className="close-btn" onClick={handleClose}>CLOSE</button>
            </div>
        </div>
    )
}
export default Modal