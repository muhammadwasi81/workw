import React from "react";

class ErrorBoundary extends React.Component {
    state = {
        error: '',
        errorInfo: '',
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        console.log(error, "****")
        return {hasError: true, error};

    }

    componentDidCatch(error, errorInfo) {
        window.onerror = (message, file, line, column, errorObject) => {
            console.log( message, file, line, column);

        }
        // eslint-disable-next-line no-console
        console.log({error, errorInfo});
        this.setState({errorInfo});
    }

    render() {
        const {hasError, errorInfo, error} = this.state;
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className="card my-5">
          {/*      <div className="card-header">*/}
          {/*          <p>*/}
          {/*              There was an error in loading this page.{' '}*/}
          {/*              <span*/}
          {/*                  style={{cursor: 'pointer', color: '#0077FF'}}*/}
          {/*                  onClick={() => {*/}
          {/*                      window.location.reload();*/}
          {/*                  }}*/}
          {/*              >*/}
          {/*  Reload this page*/}
          {/*</span>{' '}*/}
          {/*          </p>*/}
          {/*      </div>*/}
                <div className="card-body">
                    <div className="error-details">
                        {/*<summary>Click for error details</summary>*/}
                        {/*<h3 style={{color: "red"}}>{error && error.message.toString()}</h3>*/}
                        {/*<h4>{error && error.stack.toString()}</h4>*/}
                        {/*{errorInfo && errorInfo.componentStack.toString()}*/}
                        <h2>{error.toString()}</h2>
                        <h4>{error && error.stack.toString()}</h4>


                    </div>
                </div>
            </div>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;