import React from "react";
function Index() {
  return (
    <>
      <div className="content-header" key="header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Welcome to Simple CRM</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">
                  <a href="/">Home</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content" key="content" />
    </>
  );
}
export default Index;
