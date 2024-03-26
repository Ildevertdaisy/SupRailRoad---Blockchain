import React from "react";

const Components = {
  Preview: ({ path, name }) => {
    return(
      !!path && (
        <div alt={name} className="rounded p-1" style={{ width: "100%", height: "200px", backgroundImage: `url(${path}`, backgroundSize: "cover"}}></div>
      ))
  }, 
  Form: React.forwardRef(({isDisabled, isPending, onChange, onSubmit, message}, ref) => {
    const faded = isDisabled ? "0.5" : "1.0";
    const color = message === "Minting Token ...." ? "alert alert-info" : "alert alert-success";
    return(
      <form className="form p-2" onSubmit={onSubmit}>
        <div className="form_body d-flex justify-content-between flex-column">
          <div>
              <input className="form-control mb-2"  type="text" name="name" ref={ref} onChange={onChange}/>
              <input className="form-control mb-2"  type="file" name="file" ref={ref} onChange={onChange}/>
          </div>

          {isPending && 
            <div className={color} role="alert">
            {message}
          </div>}
          {!isPending && <button style={{opacity: faded}} className="form-control" type="submit" disabled={isDisabled}>create Ticket</button>}
        </div>
    </form>)
  })
}

export default Components;